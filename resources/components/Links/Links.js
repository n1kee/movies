import React from 'react';
import {Link} from "react-router-dom";

class Links extends React.Component {

    render() {
        return (
            <div className="links">
                <span>
                     <Link to={"/likes"}>My likes</Link>
                </span>
                <Link to={"/logout"}>Logout</Link>
            </div>
        );
  }
}

export default Links;
