var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var StringUtil = (function () {
            function StringUtil() {
            }
            StringUtil.tab = function (size) {
                var str = "";
                for (var i = 0; i < size; i++)
                    str += "\t";
                return str;
            };
            StringUtil.htmlTab = function (size) {
                var str = "";
                for (var i = 0; i < size; i++)
                    str += "&nbsp;&nbsp;&nbsp;&nbsp;";
                return str;
            };
            StringUtil.replaceAll = function (str, pairs) {
                if (pairs.length == 0)
                    return str;
                for (var i = 0; i < pairs.length; i++)
                    str = str.split(pairs[i].first).join(pairs[i].second);
                return str;
            };
            return StringUtil;
        })();
        library.StringUtil = StringUtil;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
