"use strict";
exports.__esModule = true;
var DEF_CHAR = '#';
var CNPinyin = /** @class */ (function () {
    function CNPinyin(data) {
        this.data = data;
    }
    //     CNPinyin(T data) {
    // }
    CNPinyin.prototype.getFirstChar = function () {
        return this.firstChar;
    };
    // toString():string {
    //     StringBuilder sb = new StringBuilder().append("--firstChar--").append(this.firstChar).append("--pinyins:");
    //     for (String str : this.pinyins
    // )
    //     {
    //         sb.append(str);
    //     }
    //     return sb.toString();
    // }
    CNPinyin.prototype.compareValue = function () {
        if (this.firstChar === DEF_CHAR) {
            return 'Z' + 1;
        }
        return this.firstChar;
    };
    /**
     * 如果整数等于参数，则返回0。

     如果整数是小于参数则返回-1。

     如果该整数大于参数则返回1。
     * @param {CNPinyin<T extends CN>} tcnPinyin
     * @returns {number}
     */
    CNPinyin.prototype.compareTo = function (tcnPinyin) {
        var compare = this.compareValue() - tcnPinyin.compareValue();
        if (compare === 0) {
            var chinese1 = this.data.chinese();
            var chinese2 = tcnPinyin.data.chinese();
            return chinese1.localeCompare(chinese2);
        }
        return compare;
    };
    return CNPinyin;
}());
exports.CNPinyin = CNPinyin;
