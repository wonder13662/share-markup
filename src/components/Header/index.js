import React, { Component } from 'react';
import './Header.css';
import Navtab from '../Navtab';
import SearchBar from '../SearchBar';

class Header extends Component {

    render() {
        return (
            <div className='smu-header'>
                <img className="smu-logo" src="./images/share-markup.png"/>
                <Navtab name="Home"/>
                <SearchBar/>
            </div>
        )
    }
}

export default Header;