import React from 'react';
import {Link} from "react-router-dom";
import {CredentialsContext} from "../credentials";

class Links extends React.Component {

    static contextType = CredentialsContext;

    render() {
        if (!this.context.userName) return null;
        return (
            <div className="links">
                <span>
                    Logged in as <Link to={"/profile"}>{this.context.userName}</Link>
                </span>
                <Link to={"/logout"}>Logout</Link>
            </div>
        );
  }
}

export default Links;
