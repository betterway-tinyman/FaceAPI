var samchon;
(function (samchon) {
    function trace() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var str = "";
        var replacerArray = [
            new std.Pair("&", "&amp;"),
            new std.Pair("<", "&lt;"),
            new std.Pair(">", "&gt;"),
            new std.Pair("\n", "<br>"),
            new std.Pair("\t", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        ];
        for (var i = 0; i < args.length; i++) {
            var item = String(args[i]);
            item = samchon.library.StringUtil.replaceAll(item, replacerArray);
            if (i == 0)
                str += item;
            else
                str += ", " + item;
        }
        document.write("<p>" + str + "</p>");
    }
    samchon.trace = trace;
})(samchon || (samchon = {}));
