var id2 = "616fab207a6a2a0c96533a7c"
var id1 = "616fabdc7a6a2a0c96533a7d"
let getNum = function(str) {
    let retval = "";
    let ilen = str.length;
    for (let i = 0; i < str.length; i++) {
        retval += str.charCodeAt(i)
    }
    return retval;
}
let uniqueCombo = function(id1, id2) {
    let iNum1 = getNum(id1);
    let iNum2 = getNum(id2);
    let retval = "";
    if (iNum1 > iNum2) {
        retval = iNum2 + "" + iNum1;
    } else {
        retval = iNum1 + "" + iNum2;
    }
    return retval;
}
console.log(uniqueCombo(id1, id2));