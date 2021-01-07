import React from 'react';
import http from "./http";
import {Link} from "react-router-dom";
import Error from "./Error";
import {numericMask} from "./inputMasks";
import {toast, ToastContainer} from 'react-toastify';

class UserProfile extends React.Component {

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
