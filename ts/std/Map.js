var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.data_ = null;
            this.size_ = 0;
        }
        return Map;
    })(std.PairContainer);
    std.Map = Map;
})(std || (std = {}));
