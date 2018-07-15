"use strict";
exports.__esModule = true;
var CNPinyin_1 = require("./CNPinyin");
import pinyinfunc from "../pinyin";

var DEF_CHAR = '#';
var CNPinyinFactory = /** @class */ (function () {
    function CNPinyinFactory() {
        this.SURNAMES = new Map();
    }

    /**
     * 转换拼音, 考虑在子线程中运行
     * @param tList
     * @param <T>
     * @return
     */
    CNPinyinFactory.prototype.createCNPinyinList = function (tList) {
        if (tList != null && !(tList.length === 0)) {
            var cnPinyinArrayList = new Array();
            for (var i = 0; i < tList.length; i++) {
                var pinyin = this.createCNPinyin(tList[i]);
                if (pinyin != null) {
                    cnPinyinArrayList.push(pinyin);
                }
            }
            return cnPinyinArrayList;
        }
        return null;
    };
    CNPinyinFactory.prototype.createCNPinyin = function (t) {
        if (t == null || t.chinese() == null)
            return null;
        var chinese = t.chinese().trim();
        if (chinese != null && chinese.length == 0)
            return null;
        var cnPinyin = new CNPinyin_1.CNPinyin(t);
        var chars = chinese.split('');
        var charPinyins = [];
        var stringBuilder = "";
        var pinyinsTotalLength = 0;
        for (var i = 0; i < chars.length; i++) {
            var c = chars[i];
            var pinyin = this.charToPinyin(chars[i], i);
            charPinyins[i] = pinyin;
            if (pinyin.length > 0) {
                stringBuilder += (pinyin.charAt(0));
            }
            else {
                stringBuilder += (c);
            }
            pinyinsTotalLength += pinyin.length;
        }
        cnPinyin.pinyins = charPinyins;
        cnPinyin.firstChar = this.getFirstChar(charPinyins);
        cnPinyin.firstChars = stringBuilder.toString();
        cnPinyin.pinyinsTotalLength = pinyinsTotalLength;
        return cnPinyin;
    };
    /**
     *
     * @param c
     * @param index
     * @return
     */
    CNPinyinFactory.prototype.charToPinyin = function (c, index) {
        if (index === 0) {
            var pinyin_1 = this.SURNAMES.get(c);
            if (pinyin_1 != null) {
                return pinyin_1;
            }
        }
        var pinyin = pinyinfunc.letter(c);
        if (pinyin == null) {
            pinyin = String(c);
        }
        return pinyin;
    };
    /**
     * 拼音首个字母
     * @param pinyins
     * @return
     */
    CNPinyinFactory.prototype.getFirstChar = function (pinyins) {
        if (pinyins != null && pinyins.length > 0) {
            var firstPinying = pinyins[0];
            if (firstPinying.length > 0) {
                return this.charToUpperCase(firstPinying.charAt(0));
            }
        }
        return DEF_CHAR;
    };
    /**
     * 字符转大写
     * @param c
     * @return
     */
    CNPinyinFactory.prototype.charToUpperCase = function (c) {
        c = c.toUpperCase();
        return c;
    };
    return CNPinyinFactory;
}());
exports.CNPinyinFactory = CNPinyinFactory;
