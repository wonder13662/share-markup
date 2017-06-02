const isOKObj = (obj) => {
    if(undefined === obj || null === obj) {
        return false;
    }
    return true;
}
const isNotOKObj = (obj) => {
    return !isOKObj(obj);
}
const isOKStr = (value) => {
    if(isNotOKObj(value) || '' === value || !isNaN(value)) {
        return false;
    }
    return true;
}
const isNotOKStr = (value) => {
    return !isOKStr(value);
}
const isOKNumber = (value) => {
    if(isNotOKObj(value) || isOKStr(value) || isNaN(value)) {
        return false;
    }
    return true;
}
const isNotOKNumber = (value) => {
    return !isOKNumber(value);
}
const isOKArray = (array) => {
    if(isNotOKObj(array) || 0 === array.length) {
        return false;
    }
    return true;
}
const isNotOKArray = (array) => {
    return !isOKArray(array);
}
const isFunction = (func) => {
    if(isNotOKObj(func)) {
        return false;
    }
    if(typeof func === 'function') {
        return true;
    }
    return false;
}
const isNotFunction = (func) => {
    return !isFunction(func);
}
const isMatched = (value, regex) => {
    if(isNotOKStr(value)) {
        return false;
    }
    if(isNotOKObj(regex)) {
        return false;
    }

    let match = value.match(regex);
    if(isNotOKArray(match)) {
        return false;
    }

    return true;
}
const isNotMatched = (value, regex) => {
    return !isMatched(value, regex);
}
const isMatchedExactLength = (value, regex) => {
    if(isNotMatched(value, regex)){
        return false;
    }

    let match = value.match(regex);
    if(value.length === match.length) {
        return true;
    }
    return false;
}
const isNotMatchedExactLength = (value, regex) => {
    return !isMatchedExactLength(value, regex);
}
const getRepeatCnt = (value, regex) => {
    if(isNotOKStr(value)) {
        return -1;
    }
    if(isNotOKObj(regex)) {
        return -1;
    }

    let match = value.match(regex);
    if(isNotOKArray(match)) {
        return -1;
    }

    return match.length;
}
const hasEnoughCnt = (value, regex, min) => {
    let repeatCnt = getRepeatCnt(value, regex);
    if(repeatCnt < 0 || repeatCnt < min) {
        return false;
    }
    return true;
}
const hasNotEnoughCnt = (value, regex, min) => {
    return !hasEnoughCnt(value, regex, min);
}
const getMatched = (value, regex) => {
    if(isNotOKStr(value)) {
        return '';
    }
    if(isNotOKObj(regex)) {
        return '';
    }

    let match = value.match(regex);
    if(isNotOKArray(match)) {
        return '';
    }

    return match.join('');
}

module.exports = {
    isMatched,
    isNotMatched,
    isMatchedExactLength,
    isNotMatchedExactLength,
    getRepeatCnt,
    hasEnoughCnt,
    hasNotEnoughCnt,
    getMatched,
    isOKNumber,
    isNotOKNumber,
    isOKObj,
    isNotOKObj,
    isOKStr,
    isNotOKStr,
    isFunction,
    isNotFunction,
}