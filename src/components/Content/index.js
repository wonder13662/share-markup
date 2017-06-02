import React, { Component } from 'react';
import './Content.css';

class Content extends Component {

    render() {

        const { children } = this.props;

        return (
            <div>{children}</div>
        )
    }
}

export default Content;