var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var XMLList = (function (_super) {
            __extends(XMLList, _super);
            function XMLList() {
                _super.call(this);
            }
            XMLList.prototype.toString = function (level) {
                if (level === void 0) { level = 0; }
                var str = "";
                for (var i = 0; i < this.size(); i++)
                    str += this.at(i).toString(level) + "\n";
                return str;
            };
            XMLList.prototype.toHTML = function (level) {
                if (level === void 0) { level = 0; }
                var str = "";
                for (var i = 0; i < this.size(); i++)
                    str += this.at(i).toHTML(level) + "<br>\n";
                return str;
            };
            return XMLList;
        })(std.Vector);
        library.XMLList = XMLList;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
