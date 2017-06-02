import React, { Component } from 'react';
import './Detail.css';
import SideBar from '../SideBar';

class Detail extends Component {

    render() {

        const { children } = this.props;

        return (
            <div className='smu-detail-box'>
                <div className='smu-detail'>
                    <SideBar/>
                    <div className='smu-detail-l'>Detail</div>
                </div>
            </div>
        )
    }
}

export default Detail;