import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    render() {

        return (
            <div className="smu-footer">
                <div className="block">
                    <div className="title">
                        Need Help?
                    </div>
                    <div className="content">
                        <ul>
                            <li>AAA</li>
                            <li>BBB</li>
                            <li>CCC</li>
                        </ul>
                    </div>
                </div>
                <div className="block">
                    <div className="title">
                        About Share-Markup
                    </div>
                    <div className="content center">
                        <ul>
                            <li>AAA</li>
                            <li>BBB</li>
                            <li>CCC</li>
                        </ul>
                    </div>
                </div>
                <div className="block">
                    <div className="title">
                        Service Policy
                    </div>
                    <div className="content">
                        <ul>
                            <li>AAA</li>
                            <li>BBB</li>
                            <li>CCC</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;