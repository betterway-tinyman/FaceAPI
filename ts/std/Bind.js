var std;
(function (std) {
    var Bind = (function () {
        function Bind(func, thisArg) {
            this.func = func;
            this.thisArg = thisArg;
        }
        Bind.prototype.apply = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return this.func.apply(this.thisArg, args);
        };
        Bind.prototype.equals = function (obj) {
            return this.func == obj.func && this.thisArg == obj.thisArg;
        };
        return Bind;
    })();
    std.Bind = Bind;
})(std || (std = {}));
