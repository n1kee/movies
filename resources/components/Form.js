import './App/App.css';
import React from 'react';

class Form extends React.Component {
    lockForm() {
        this.setState({
            formClassName: `${this.state.formClassName} curtain`,
        });
    }

    unlockForm() {
        this.setState({
            formClassName: this.state.formClassName
                .replace("curtain", ""),
        });
    }
}

export default Form;
