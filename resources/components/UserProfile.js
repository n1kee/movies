import React from 'react';
import {Link} from "react-router-dom";
import Error from "./Error";
import {ToastContainer} from 'react-toastify';
import Component from "./Component";

class UserProfile extends Component {

    state = {
        maxAutoBid: "",
        formClassName: "form curtain",
        maxBidError: "",
    };

    componentDidMount() {
        this.context.updateGlobals({ isLoading: true });
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
