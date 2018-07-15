"use strict";
exports.__esModule = true;
var CNPinyinIndex_1 = require("./CNPinyinIndex");
var isChinese_1 = require("./isChinese");
var CNPinyinIndexFactory = /** @class */ (function () {
    function CNPinyinIndexFactory() {
    }
    /**
     * 转换搜索拼音集合, 考虑在子线程中运行
     * @param cnPinyinList
     * @param keyword
     * @return
     */
    /**
     * 进行算法改造
     * @param cnPinyinList
     * @param keyword
     * @param <T>
     * @return
     */
    CNPinyinIndexFactory.prototype.indexList = function (cnPinyinList, keyword) {
        var cnPinyinIndexArrayList = new Array();
        if (cnPinyinList === undefined || cnPinyinList == null) {
            return;
        }
        for (var i = 0; i < cnPinyinList.length; i++) {
            var index = this.index(cnPinyinList[i], keyword);
            if (index != null) {
                cnPinyinIndexArrayList.push(index);
            }
        }
        return cnPinyinIndexArrayList;
    };
    /**
     * 匹配拼音
     * @param cnPinyin
     * @return null代表没有匹配
     */
    CNPinyinIndexFactory.prototype.index = function (cnPinyin, keyword) {
        if (keyword == undefined || keyword.length == 0) {
            return null;
        }
        var cnPinyinIndex = this.matcherChinese(cnPinyin, keyword);
        if (this.isContainChinese(keyword)) { //包含中文只匹配原字符
            return cnPinyinIndex;
        }
        if (cnPinyinIndex == null) {
            cnPinyinIndex = this.matcherFirst(cnPinyin, keyword);
            if (cnPinyinIndex == null) {
                cnPinyinIndex = this.matchersPinyins(cnPinyin, keyword);
            }
        }
        return cnPinyinIndex;
    };
    /**
     * 匹配中文
     * @param cnPinyin
     * @param keyword
     * @return
     */
    CNPinyinIndexFactory.prototype.matcherChinese = function (cnPinyin, keyword) {
        if (keyword.length <= cnPinyin.data.chinese().length) {
            var len = this.haveChiense(keyword, cnPinyin.data.chinese());
            if (len >= 0) {
                return new CNPinyinIndex_1.CNPinyinIndex(cnPinyin, len, len + keyword.length);
            }
        }
        return null;
    };
    /**
     * 判断是否有中问题
     * @param {string} str
     * @returns {boolean}
     * @constructor
     */
    CNPinyinIndexFactory.prototype.haveChiense = function (str, name) {
        var content = name.search(str);
        if (content >= 0) {
            return content;
        }
        else {
            return -1;
        }
    };
    /**
     * 匹配首字母
     * @param cnPinyin
     * @param keyword
     * @return
     */
    CNPinyinIndexFactory.prototype.matcherFirst = function (cnPinyin, keyword) {
        if (keyword.length <= cnPinyin.pinyins.length) {
            var matcher = this.haveLetter(keyword, cnPinyin.firstChars);
            if (matcher >= 0) {
                return new CNPinyinIndex_1.CNPinyinIndex(cnPinyin, matcher, matcher + keyword.length);
            }
        }
        return null;
    };
    CNPinyinIndexFactory.prototype.haveLetter = function (str, name) {
        var strUp = str.toLocaleLowerCase();
        var lowname = name.toLocaleLowerCase();
        var content = lowname.search(str);
        var contentUp = lowname.search(strUp);
        console.log("haveLetter" + str + "keyword" + name);
        if (content >= 0 || contentUp >= 0) {
            if (content >= 0)
                return content;
            else {
                return contentUp;
            }
        }
        else {
            return -1;
        }
    };
    /**
     * 所有拼音匹配
     * @param cnPinyin
     * @param keyword
     * @return
     */
    CNPinyinIndexFactory.prototype.matchersPinyins = function (cnPinyin, keyword) {
        if (keyword.length > cnPinyin.pinyinsTotalLength)
            return null;
        var start = -1;
        var end = -1;
        for (var i = 0; i < cnPinyin.pinyins.length; i++) {
            var pat = cnPinyin.pinyins[i];
            if (pat.length >= keyword.length) { //首个位置索引
                var matcher = this.haveLetter(keyword, pat);
                if (matcher == 0) {
                    start = i;
                    end = i + 1;
                    break;
                }
            }
            else {
                var matcher = this.haveLetter(pat, keyword);
                if (matcher == 0) { //全拼匹配第一个必须在0位置
                    start = i;
                    var left = keyword.substring(0, matcher) + keyword.substring(matcher + pat.length, keyword.length);
                    end = this.end(cnPinyin.pinyins, left, ++i);
                    break;
                }
            }
        }
        if (start >= 0 && end >= start) {
            return new CNPinyinIndex_1.CNPinyinIndex(cnPinyin, start, end);
        }
        return null;
    };
    /**
     * 根据匹配字符递归查找下一结束位置
     * @param pinyinGroup
     * @param pattern
     * @param index
     * @return -1 匹配失败
     */
    CNPinyinIndexFactory.prototype.end = function (pinyinGroup, pattern, index) {
        if (index < pinyinGroup.length) {
            var pinyin = pinyinGroup[index];
            if (pinyin.length >= pattern.length) { //首个位置索引
                var matcher = this.haveLetter(pattern, pinyin);
                if (matcher == 0) {
                    return index + 1;
                }
            }
            else {
                var matcher = this.haveLetter(pinyin, pattern);
                if (matcher == 0) { //全拼匹配第一个必须在0位置
                    var left = pattern.substring(0, matcher) + pattern.substring(pinyin.length, pattern.length);
                    return this.end(pinyinGroup, left, index + 1);
                }
            }
        }
        return -1;
    };
    /**
     * 判断是否包含中文
     * @param {string} str
     * @returns {boolean}
     */
    CNPinyinIndexFactory.prototype.isContainChinese = function (str) {
        // let p = Pattern.compile("[\u4e00-\u9fa5]");
        // let m = p.matcher(str);
        return isChinese_1.isChinese(str);
    };
    return CNPinyinIndexFactory;
}());
exports.CNPinyinIndexFactory = CNPinyinIndexFactory;
