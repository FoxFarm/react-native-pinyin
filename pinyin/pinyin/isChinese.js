"use strict";
exports.__esModule = true;
var chineseRange = [
    [0x4e00, 0x9fff],
    [0x3400, 0x4dbf],
    [0x20000, 0x2a6df],
    [0x2a700, 0x2b73f],
    [0x2b740, 0x2b81f],
    [0x2b820, 0x2ceaf],
    [0xf900, 0xfaff],
    [0x3300, 0x33ff],
    [0xfe30, 0xfe4f],
    [0xf900, 0xfaff],
    [0x2f800, 0x2fa1f],
];
function isChinese(str) {
    var charCode;
    var flag;
    var range;
    for (var i = 0; i < str.length;) {
        charCode = str.codePointAt(i);
        flag = false;
        for (var j = 0; j < chineseRange.length; j++) {
            range = chineseRange[j];
            if (charCode >= range[0] && charCode <= range[1]) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            return false;
        }
        if (charCode <= 0xffff) {
            i++;
        }
        else {
            i += 2;
        }
    }
    return true;
}
exports.isChinese = isChinese;
;
