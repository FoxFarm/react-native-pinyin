# react-native-pinyin
#使用方式：
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
建立一个js作为转化值，以及后期调用，其中的name是固定的，可以添加其他的参数，
比如：this.id等等
然后：list是数据来源
   for (let i = 0; i < c.length; i++) {
            list.push(new SearchResultData(c[i]));
        }
        this.arrayList = new CNPinyinFactory().createCNPinyinList(list);
进行一次转化，获取到arrayList，这个是经过转化的拼音等组合体，

最终的模糊搜索的结果依靠key去进行判断，获取的arrResult是经过算法计算以及筛选
  this.arrResult = (new CNPinyinIndexFactory().indexList(this.arrayList, key))

