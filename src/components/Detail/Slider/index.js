import React, { Component } from 'react';
import './Slider.css';
import {    isNotOKObj,
            isOKObj,
            isOKNumber,
            isNotOKNumber,
            isNotFunction,} from '../../../util/checker';
import {    getInt,
            getNodeLeftAbs,
            getNodeWidth,
            getMarginLeft,
            setMarginLeft,
            setLeft,
            setWidth,} from '../../../util/converter';

class Slider extends Component {

    constructor(props) {
        super(props);

        this.onMouseMoveHandleR = this.onMouseMoveHandleR.bind(this);
        this.onMouseDownHandleR = this.onMouseDownHandleR.bind(this);
        this.onMouseUpHandleR = this.onMouseUpHandleR.bind(this);

        this.onMouseMoveHandleL = this.onMouseMoveHandleL.bind(this);
        this.onMouseDownHandleL = this.onMouseDownHandleL.bind(this);
        this.onMouseUpHandleL = this.onMouseUpHandleL.bind(this)

        this.setSlider = this.setSlider.bind(this);
        this.setHandleR = this.setHandleR.bind(this);
        this.setHandleL = this.setHandleL.bind(this);
    }

    componentDidMount() {
        // wonder.jung
        this.updateHandleWithProp();
        // this.setTrackFocus();
    }

    getSliderTrackWidthNoHandleWidth() {

        if(isNotOKNumber(this.sliderWidth)) {
            return -1;
        }
        if(isNotOKNumber(this.handleWidth)) {
            return -1;
        }

        return this.sliderWidth - this.handleWidth;
    }


    // sliderEle, max, min, head, tail, step, prefix, callback, scope
    updateValue(valueNew, valueMax) {

        if(isNotOKNumber(valueNew)) {
            return;
        }
        if(isNotOKNumber(valueMax)) {
            return;
        }

        let { min, max, step } = this.props;
        if(isNotOKNumber(min)) {
            min = 0;
        }
        if(isNotOKNumber(max)) {
            max = 100;
        }
        if(isNotOKNumber(step)) {
            step = 1;
        }

        let valueNext = Math.round(((max - min)*valueNew/valueMax)/step)*step + min;
        if(this.value === valueNext) {
            // 이전값과 동일하다면 중단.
            return;
        }
        this.value = valueNext;

        // 슬라이더 하단에 값 표시 라벨을 업데이트
        this.updateValueTag();

        // 사용자 정의 콜백으로 업데이트 된 값을 전달
        let { callback } = this.props;
        if(isNotFunction(callback)) {
            return;
        }
        callback(this.value);

    }
    updateValueTag() {
        // TODO
    }
    setTrackFocus() {

        if(isNotOKObj(this.handleL)) {
            return;
        }
        if(isNotOKObj(this.handleR)) {
            return;
        }

        let marginLeftHandleL = getMarginLeft(this.handleL, 0);
        let marginLeftHandleR = getMarginLeft(this.handleR, 0);

        // update trackSelected
        let trackLeft = marginLeftHandleL;
        let trackWidth = marginLeftHandleR - marginLeftHandleL;

        setLeft(this.trackSelected,trackLeft);
        setWidth(this.trackSelected,trackWidth);

    }
    updateHandleWithProp() {

        if(isNotOKNumber(this.sliderLeft)) {
            return;
        }
        if(isNotOKNumber(this.sliderWidth)) {
            return;
        }

        let { right, left } = this.props;
        if(isOKNumber(right) && isOKObj(this.handleR)) {
            let mouseXPosHR = this.sliderLeft + getInt(this.sliderWidth * (right / this.sliderWidth));
            this.updateHandle(mouseXPosHR, this.handleR);
        }
        if(isOKNumber(left) && isOKObj(this.handleL)) {
            let mouseXPosHL = this.sliderLeft + getInt(this.sliderWidth * (left / this.sliderWidth));
            this.updateHandle(mouseXPosHL, this.handleL);
        }
    }
    updateHandle(mouseXPos, nodeHandle) {
        if(isNotOKNumber(mouseXPos)) {
            return;
        }
        if(isNotOKObj(nodeHandle)) {
            return;
        }

        let offsetXPos = mouseXPos - this.sliderLeft - this.handleWidthHalf;

        // 핸들의 이동 위치를 구함.
        let valueNew = offsetXPos;
        let valueMax = this.getSliderTrackWidthNoHandleWidth();
        let marginLeftNextHandle = getMarginLeft(nodeHandle,0);
        // 핸들 위치 이동의 공통 처리.
        if(valueNew <= 0) {
            // 최소값 지남. 최소값으로 지정
            valueNew = 0;
        } else if(valueMax < valueNew) {
            // 최대값 지남. 최대값으로 지정
            valueNew = valueMax;
        } // end if

        // 왼쪽, 오른쪽 핸들별 구분 처리.
        // 1. 왼쪽 핸들은 오른쪽 핸들을 넘어갈 수 없다.
        // 2. 오른쪽 핸들은 왼쪽 핸들을 넘어갈 수 없다.
        if(this.handleR === nodeHandle) {
            // 유저는 오른쪽 핸들을 옮김
            let marginLeftHandleL = getMarginLeft(this.handleL,0);
            if(valueNew < marginLeftHandleL) {
                // 왼쪽 핸들보다 왼쪽. 왼쪽 핸들 Xpos 값으로 지정
                valueNew = marginLeftHandleL;
            }
        } else if(this.handleL === nodeHandle) {
            // 유저는 왼쪽 핸들을 옮김
            let marginLeftHandleR = getMarginLeft(this.handleR,0);
            if(marginLeftHandleR < valueNew) {
                // 오른쪽 핸들보다 오른쪽. 오른쪽 핸들 Xpos 값으로 지정
                valueNew = marginLeftHandleR;
            }
        }

        setMarginLeft(nodeHandle, valueNew);

        this.updateValue(valueNew, valueMax);

        this.setTrackFocus();

    }
    onMouseMoveHandleR(e) {
        this.updateHandle(e.pageX, this.handleR);
    }
    onMouseDownHandleR(e) {
        document.removeEventListener('mousemove',this.onMouseMoveHandleR);
        document.addEventListener('mousemove',this.onMouseMoveHandleR);

        // 핸들 바깥에서 mouseup 이벤트 처리
        document.removeEventListener('mouseup',this.onMouseUpHandleR);
        document.addEventListener('mouseup',this.onMouseUpHandleR);
    }
    onMouseUpHandleR(e) {
        // remove all events on document node
        document.removeEventListener('mousemove',this.onMouseMoveHandleR);
        document.removeEventListener('mouseup',this.onMouseUpHandleR);
    }

    onMouseMoveHandleL(e) {
        this.updateHandle(e.pageX, this.handleL);
    }
    onMouseDownHandleL(e) {
        document.removeEventListener('mousemove',this.onMouseMoveHandleL);
        document.addEventListener('mousemove',this.onMouseMoveHandleL);

        // 핸들 바깥에서 mouseup 이벤트 처리
        document.removeEventListener('mouseup',this.onMouseUpHandleL);
        document.addEventListener('mouseup',this.onMouseUpHandleL);

    }
    onMouseUpHandleL(e) {
        // remove all events on document node
        document.removeEventListener('mousemove',this.onMouseMoveHandleL);
        document.removeEventListener('mouseup',this.onMouseUpHandleL);
    }

    setSlider(node) {
        if(isNotOKObj(node)) {
            return;
        }

        this.slider = node;
        this.sliderLeft = getNodeLeftAbs(this.slider);
        this.sliderWidth = getNodeWidth(this.slider);
    }

    setHandleR(node) {
        if(isNotOKObj(node)) {
            return;
        }

        this.handleR = node;
        if(isNotOKNumber(this.handleWidth)) {
            this.handleWidth = getNodeWidth(this.handleR);
            this.handleWidthHalf = getInt(this.handleWidth/2);
        }
    }

    setHandleL(node) {
        if(isNotOKObj(node)) {
            return;
        }

        this.handleL = node;
        if(isNotOKNumber(this.handleWidth)) {
            this.handleWidth = getNodeWidth(this.handleR);
            this.handleWidthHalf = getInt(this.handleWidth/2);
        }
    }

    render() {
        return (
            <div>
                <div    className="smu-slider-mini smu-slider-box-inner sum-unselectable"
                        ref={(node) => { this.setSlider(node); }}>
                    <div    className="smu-slider-mini smu-slider-box-inner-handle right sum-unselectable"
                            ref={(node) => { this.setHandleR(node); }}
                            onMouseUp={(e) => this.onMouseUpHandleR(e)}
                            onMouseDown={(e) => this.onMouseDownHandleR(e)}></div>
                    <div    className="smu-slider-mini smu-slider-box-inner-handle left smu-hide sum-unselectable"
                            ref={(node) => { this.setHandleL(node); }}
                            onMouseUp={(e) => this.onMouseUpHandleL(e)}
                            onMouseDown={(e) => this.onMouseDownHandleL(e)}></div>
                    <div    className="smu-slider-mini smu-slider-box-inner-track sum-unselectable"
                            ref={(node) => { this.track = node; }}></div>
                    <div    className="smu-slider-mini smu-slider-box-inner-track selected sum-unselectable"
                            ref={(node) => { this.trackSelected = node; }}></div>
                </div>
            </div>
        )
    }
}

export default Slider;

class SliderMini extends Component {
    render() {
        return (
            <div>
                <Slider {...this.props}/>
            </div>
        )
    }
};

module.exports = {
    SliderMini,
}