import React from 'react';
import http from "./http";
import {Link} from "react-router-dom";
import Error from "./Error";
import Form from "./Form";
import {numericMask} from "./inputMasks";
import { ToastContainer, toast } from 'react-toastify';

class UserProfile extends Form {

    constructor(props) {
        super(props);
        this.state = {
            maxAutoBid: "",
            formClassName: "form curtain",
            maxBidError: "",
        };
    }

    getMaxBidChange() {
        http(`/users/current-user/max-auto-bid`)
            .then(res => this.setState({
                maxAutoBid: res.data,
                formClassName: this.state.formClassName
                    .replace("curtain", ""),
            }));
    }

    onMaxBidChange(evt) {
        this.setState({ maxAutoBid: numericMask(evt.target.value) });
    }

    onMaxBidSave() {
        http(`/users/current-user/max-auto-bid`, {
            max_auto_bid: this.state.maxAutoBid,
        }, "POST")
            .then(() => toast("Saved!"));
    }

    componentDidMount() {
        this.getMaxBidChange();
    }

    render() {
        return (
            <React.Fragment>
                <table className={this.state.formClassName}>
                    <tbody>
                        <tr>
                            <td>Maximum bid amount:</td>
                            <td className="text-nowrap">
                                <div className="d-inline-block">
                                    <Error errorText={this.state.maxBidErrors}>
                                        <input
                                            pattern="[0-9]*"
                                            className="form-control"
                                            value={this.state.maxAutoBid}
                                            onChange={evt => this.onMaxBidChange(evt)}
                                        />
                                    </Error>
                                </div>

                                <button
                                    className="ml-1 btn btn-info"
                                    onClick={() => this.onMaxBidSave()}
                                >Save</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Link to="/"><button className="btn btn-info">Close</button></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ToastContainer />
            </React.Fragment>
    );}
}

export default UserProfile;
