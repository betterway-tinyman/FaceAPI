var std;
(function (std) {
    var Pair = (function () {
        function Pair(first, second) {
            this.first = first;
            this.second = second;
        }
        Pair.prototype.equals = function (obj) {
            var first;
            var second;
            if (this.first.hasOwnProperty("equals") && this.first["equals"] instanceof Function)
                first = this.first["equals"](obj.first);
            else
                first = this.first == obj.first;
            if (this.second.hasOwnProperty("equals") && this.second["equals"] instanceof Function)
                second = this.second["equals"](obj.second);
            else
                second = this.second == obj.second;
            return first == true && second == true;
        };
        Pair.prototype.toString = function () {
            return "{first: " + this.first + ", second: " + this.second + "}";
        };
        return Pair;
    })();
    std.Pair = Pair;
})(std || (std = {}));
