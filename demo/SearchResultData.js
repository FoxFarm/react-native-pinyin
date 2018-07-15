"use strict";
exports.__esModule = true;
var SearchResultData = /** @class */ (function () {
    function SearchResultData(list) {
        if (list != null) {
            this.name = list;
        }
    }
    SearchResultData.prototype.chinese = function () {
        return this.name;
    };
    return SearchResultData;
}());
exports.SearchResultData = SearchResultData;
