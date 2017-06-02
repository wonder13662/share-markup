import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {

    render() {

        return (
            <div className="smu-searchbar">
                <div className="smu-search-box">
                    <form className="search-form">
                        <div className="search-input-box">
                            <input className="search-input" placeholder="Find markup"/>
                        </div>
                        <button className="search-btn">
                            <img src="./images/magnifier_w.svg"/>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchBar;