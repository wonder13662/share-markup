import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navtab.css';

class Navtab extends Component {

    constructor(props) {
        super(props);

        let name = '';
        if( undefined !== props.name &&
            null !== props.name &&
            '' !== props.name ) {
            name = props.name;
        }

        this.state = {
            name,
        }
    }

    isSelected(name) {

        let nameSelected = this.state.name;

        if( undefined !== name &&
            null !== name &&
            nameSelected === name) {

            return 'tab selected';
        } // end if
        return 'tab';
    }

    updateLinkSelected(e) {
        this.setState({
            name:e.target.innerHTML,
        });
    }

    render() {

        const list = [
            {
                link:'/',
                name:'Home'
            },
            {
                link:'/about',
                name:'About'
            },
            {
                link:'/login',
                name:'Login'
            }
        ];

        return (
            <div className='smu-navtab'>
                <ul className="list">
                    {list.map((element) => {
                        return (
                            <li className={this.isSelected(element.name)} key={element.name}>
                                <Link to={element.link} onClick={(e) => this.updateLinkSelected(e)}>{element.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
}

export default Navtab;