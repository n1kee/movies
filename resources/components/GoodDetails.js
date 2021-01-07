import './App/App.css';
import React from 'react';
import {Link} from 'react-router-dom';
import http from "./http";
import Error from "./Error";
import Form from "./Form";
import {numericMask} from "./inputMasks";
import {toast, ToastContainer} from 'react-toastify';
import {CredentialsContext} from "./credentials";

class GoodDetails extends Form {

    static contextType = CredentialsContext;

    constructor(props) {
        super(props);
        const storedGood = this.props.location.state?.good;
        this.auctionEndCountdownIntv = null;
        this.state = {
            good: storedGood,
            autoBidEnabled: "",
            bidAmount: "",
            bidAmountError: "",
            bidUserName: "",
            auctionEndCountdown: 0,
            formClassName: "form position-relative",
        };
    }

    get goodId() {
        return this.props.match.params.goodId;
    }

    handleGoodData(goodData) {
        this.setState({
            good: goodData.good,
            autoBidEnabled: goodData.auto_bid,
            bidUserName: goodData.bid_user_name,
            bidAmount: this.getBidAmount(goodData.good),
        });
    }

    getGood() {
        this.lockForm();
        http(
            `/goods/${this.goodId}`,
        ).then(res => {
            this.handleGoodData(res.data);

            const initAuctionEndCountdown = () => {
                const timeRemaining = new Date(new Date(this.state.good.auction_ends_at) - new Date);
                const auctionEndCountdown = `
                ${timeRemaining.getDay()} days
                ${timeRemaining.getHours()}:${timeRemaining.getMinutes()}:${timeRemaining.getSeconds()}
            `;
                this.setState({
                    auctionEndCountdown,
                });
            };
            initAuctionEndCountdown();
            this.auctionEndCountdownIntv = setInterval(initAuctionEndCountdown, 1000);
            this.unlockForm();
        });
    }

    getBidAmount(good) {
        return (good?.bid || 0) + 1;
    }

    setAutoBid(evt) {
        this.setState({ autoBidEnabled: evt.target.checked });
        http(
       `/goods/${this.state.good.id}/auto-bid`,
            { value: evt.target.checked },
            "POST"
        );
    }

    makeBid() {
        const bid = this.state.bidAmount;
        if (bid <= this.state.good?.bid) {
            return this.setState({
                bidAmountError: "Minimum bid is " + ( this.state.good?.bid + 1 )
            });
        }
        this.lockForm();
        http(
            `/goods/${this.goodId}/make-bid`,
            { bid },
            "POST"
        ).then(res => {
            if (res.data?.bid_user_name === this.context.userName) {
                toast("Bid has been submitted!");
            } else {
                toast(`User ${res.data?.bid_user_name} has made a higher bid than yours!`);
            }
            this.handleGoodData(res.data);
            this.unlockForm();
        });
    }

    onBidAmountChange(evt) {
        this.setState({
            bidAmountError: "",
            bidAmount: numericMask(evt.target.value),
        });
    }

    componentDidMount() {
        this.getGood();
    }

    componentWillUnmount() {
        clearInterval(this.auctionEndCountdownIntv);
    }

    render() {
        return (
            <React.Fragment>
                <table className={this.state.formClassName}>
                    <tbody>
                    <tr>
                        <td>Item name:</td>
                        <td>{this.state.good?.name}</td>
                    </tr>
                    <tr>
                        <td>The auction ends in:</td>
                        <td>{this.state.auctionEndCountdown}</td>
                    </tr>
                    <tr>
                        <td>Current bid:</td>
                        <td>
                            {this.state.good?.bid ? `${this.state.good?.bid} $` : "None"}
                        </td>
                    </tr>
                    <tr>
                        <td>Current bid made by:</td>
                        <td>
                            {this.state.bidUserName || "None"}
                        </td>
                    </tr>
                    <tr>
                        <td>Make a bid:</td>
                        <td>
                            <div>
                                <div className="d-inline-flex flex-column">
                                    <Error errorText={this.state.bidAmountError}>
                                        <input
                                            className="form-control"
                                            value={this.state.bidAmount}
                                            placeholder="Bid amount"
                                            onChange={evt => this.onBidAmountChange(evt)}
                                        />
                                    </Error>
                                </div>
                                <button
                                    className="btn btn-info ml-1"
                                    onClick={() => this.makeBid()}
                                >
                                    Submit Bid
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Activate auto-bidding</td>
                        <td>
                            <input
                                type="checkbox"
                                checked={this.state.autoBidEnabled}
                                onChange={event => this.setAutoBid(event)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <Link to="/">
                                <button className="btn btn-info">Close</button>
                            </Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <ToastContainer/>
            </React.Fragment>
        );
    }
}

export default GoodDetails;
