import React, { Component } from 'react';
import {    getMatched,
            isNotMatchedExactLength,
            isOKObj,
            isOKNumber,
            isOKStr,
            isNotOKStr } from '../../../util/checker';
import './Input.css';

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            warning:'',
            success:'',
            userInput:'',
        }
    }

    isNotOKInput(userInput, isOnBlur=false) {
        return !this.isOKInput(userInput, isOnBlur);
    }

    isOKInput(userInput, isOnBlur=false) {
        if(isNotOKStr(userInput)) {
            return false;
        }

        let { min,max,regexExactLength,callback } = this.props;
        let length = userInput.length;

        // 1. 최소 길이 검사 - onBlur 시에만 검사.
        if(isOnBlur && isOKNumber(min) && length < min) {
            console.log('최소 길이보다 짧습니다.');
            this.setState({
                warning:'최소 길이보다 짧습니다.',
                success:'',
            });
            return false;
        }

        // 2. 최대 길이 검사
        if(isOKNumber(max) && max < length) {
            console.log('최대 길이보다 깁니다.');
            this.setState({
                warning:'최대 길이보다 깁니다.',
                success:'',
                userInput:userInput.slice(0, max),
            });
            return false;
        }

        // 3. 정규표현식 검사
        if(isOKObj(regexExactLength) && isNotMatchedExactLength(userInput, regexExactLength)) {
            console.log('허용되지 않는 문자가 있습니다.');
            this.setState({
                warning:'허용되지 않는 문자가 있습니다.',
                success:'',
                userInput:getMatched(userInput, regexExactLength),
            });
            return false;
        }

        // 4. 사용자 검사
        let msg = callback(userInput);
        if(isOnBlur && isOKStr(msg)) {
            console.log('4. 사용자 검사');
            this.setState({
                warning:msg,
            });
            return false;
        }

        return true;
    }

    onBlur(e) {
        let userInput = e.target.value;
        if(isNotOKStr(userInput)) {
            return;
        }

        if(this.isNotOKInput(userInput, true)) {
            return;
        }

        this.setState({
            warning:'',
            success:'',
            userInput:userInput,
        });
    }

    onChange(e) {
        let userInput = e.target.value;
        if(isNotOKStr(userInput)) {
            return;
        }

        if(this.isNotOKInput(userInput, false)) {
            return;
        }

        this.setState({
            warning:'',
            success:'',
            userInput:userInput,
        });
    }

    setClassNameSuccess() {

        let { guideSize } = this.props;
        let { success } = this.state;

        let className = 'guide smu-success smu-hide';
        if(isOKStr(success)) {
            className = 'guide smu-success';
        }
        if('small' === guideSize) {
            className += ' small';
        }

        return className;
    }

    setMsgSuccess() {
        let { success } = this.state;
        if(isOKStr(success)) {
            return success;
        }
        return '성공시 메시지';
    }

    setClassNameWarning() {
        let { guideSize } = this.props;
        let { warning } = this.state;

        let className = 'guide smu-warning smu-hide';
        if(isOKStr(warning)) {
            className = 'guide smu-warning';
        }
        if('small' === guideSize) {
            className += ' small';
        }

        return className;
    }

    setMsgWarning() {
        let { warning } = this.state;
        if(isOKStr(warning)) {
            return warning;
        }
        return '경고시 메시지';
    }

    setUserInput() {
        let { userInput } = this.state;

        console.log('setUserInput / userInput : ',userInput);

        return userInput;
    }

    render() {
        return (
            <label className="smu-input-label" for="label-name" id="name">
                <div className="smu-input-label-text-box">
                    <div className="smu-input-label-text">이름</div>
                    <div className={this.setClassNameSuccess()}>{this.setMsgSuccess()}</div>
                    <div className={this.setClassNameWarning()}>{this.setMsgWarning()}</div>
                </div>
                <input className="smu-input" type="text" name="label-name" id="label-name" placeholder="이름" value={this.setUserInput()} onChange={(e) => this.onChange(e)} onBlur={(e) => this.onBlur(e)}/>
            </label>
        )
    }
};

export default Input;

class InputMini extends Component {
    render() {
        return (
            <div>
                <Input guideSize="small" {...this.props}/>
            </div>
        )
    }
};

module.exports = {
    InputMini,
}