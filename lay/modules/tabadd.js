layui.define(['jquery','layer', 'element'], function(exports){
    var $ = layui.jquery;
    var element = layui.element();
    var layer = layui.layer;
    var tabadd = function() {};

    tabadd.prototype.add = function (fromeDom) {
        var iLength = fromeDom.children('i').length;
        var title  =  iLength == 1 ? fromeDom.find('cite').text() : fromeDom.text() ;
        element.tabAdd('nav-tab-id', {
            title: title,
            content: title,
            id: fromeDom.attr('data-id')
        })

        return this;
    }

    tabadd.prototype.navTabChange = function (fromeDom) {
        var index = fromeDom.data('id');
        //切换到指定Tab项
        element.tabChange('nav-tab-id', index);
        return this;
    }
var tabadd = new tabadd();
exports('tabadd', tabadd);
});