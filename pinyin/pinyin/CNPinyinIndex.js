"use strict";
exports.__esModule = true;
var CNPinyinIndex = /** @class */ (function () {
    function CNPinyinIndex(cnPinyin, start, end) {
        this.cnPinyin = cnPinyin;
        this.start = start;
        this.end = end;
    }
    CNPinyinIndex.prototype.toString = function () {
        return this.cnPinyin.toString() + "  start " + this.start + "  end " + this.end;
    };
    return CNPinyinIndex;
}());
exports.CNPinyinIndex = CNPinyinIndex;
