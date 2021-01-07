import React from 'react';

class Error extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div>{this.props?.children}</div>
                <div className="float-left">
                    <span className="error position-absolute">
                        {this.props?.errorText}
                    </span>
                </div>
            </React.Fragment>
        );
    }
}

export default Error;
