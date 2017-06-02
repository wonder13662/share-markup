import {    isOKNumber,
            isNotOKNumber,
            isOKStr,
            isNotOKStr,
            isOKObj,
            isNotOKObj, } from './checker'

const getInt = (rawNum) => {
    if(isNotOKNumber(rawNum)) {
        return null;
    }
    return parseInt(Math.round(rawNum));
}
const convertNumStrToNum = (numStr) => {
    if(isNotOKStr(numStr)) {
        return null;
    }
    return Number(numStr);
}
const getNodeLeftAbs = (node) => {

    if(isNotOKObj(node)) {
        return null;
    }

    let bcRect = node.getBoundingClientRect();
    if(isNotOKObj(bcRect)) {
        return null;
    }

    return getInt(bcRect.left);
}
const getNodeWidth = (node) => {
    if(isNotOKObj(node)) {
        return null;
    }

    let bcRect = node.getBoundingClientRect();
    if(isNotOKObj(bcRect)) {
        return null;
    }

    let width = bcRect.width;
    return getInt(width);
}

const getMarginLeft = (node, defaultValue) => {
    if(isNotOKObj(node)) {
        return null;
    }

    let marginLeft = node.style.marginLeft.replace('px','');
    marginLeft = getInt(marginLeft);

    if(isNotOKNumber(marginLeft) && isOKNumber(defaultValue)) {
        return defaultValue;
    }

    return marginLeft;
}

const setMarginLeft = (node, marginLeft) => {
    if(isNotOKObj(node)) {
        return;
    }

    if(isNotOKNumber(marginLeft)) {
        return;
    }

    node.style.marginLeft = marginLeft + 'px';
}

const setLeft = (node, left) => {
    if(isNotOKObj(node)) {
        return;
    }

    if(isNotOKNumber(left)) {
        return;
    }

    node.style.left = left + 'px';
}

const setWidth = (node, width) => {
    if(isNotOKObj(node)) {
        return;
    }

    if(isNotOKNumber(width)) {
        return;
    }

    node.style.width = width + 'px';
}

module.exports = {
    getInt,
    getNodeLeftAbs,
    getNodeWidth,
    getMarginLeft,
    setMarginLeft,
    setLeft,
    setWidth,
}