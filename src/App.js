import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

import About from './containers/About';
import Home from './containers/Home';
import Topics from './containers/Topics';
import Login from './containers/Login';
import Detail from './containers/Detail';

/*
*
* @ Referer : http://localhost/SVN/share-markup/project/smu-module/smu-input.html
*
*/

const App = () => (
    <Router>
        <div>
            <Header/>
            <Content>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
                <Route path="/login" component={Login}/>
                <Route path="/detail" component={Detail}/>
            </Content>
            <Footer/>
        </div>
    </Router>
)

export default App