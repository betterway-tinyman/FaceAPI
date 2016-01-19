var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var Vector = (function (_super) {
        __extends(Vector, _super);
        function Vector() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            if (args.length == 0) {
            }
            if (args.length == 1 && args[0] instanceof Array) {
                var array = args[0];
                this.push.apply(this, array);
            }
            else if (args.length == 1 && typeof args[0] == "number") {
                var size = args[0];
                this.length = size;
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                var size = args[0];
                var val = args[1];
                this.assign(size, val);
            }
            else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof std.Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
        }
        Vector.prototype.assign = function (first, second) {
            this.clear();
            if (first instanceof std.Iterator && second instanceof std.Iterator) {
                var begin = first;
                var end = second;
                for (var it = begin; it.equals(end) == false; it = it.next())
                    this.push(it.value);
            }
            else if (typeof first == "number") {
                var size = first;
                var val = second;
                this.length = size;
                for (var i = 0; i < size; i++)
                    this[i] = val;
            }
        };
        Vector.prototype.clear = function () {
            this.splice(0, this.length);
        };
        Vector.prototype.begin = function () {
            if (this.size() == 0)
                return this.end();
            else
                return new VectorIterator(this, 0);
        };
        Vector.prototype.end = function () {
            return new VectorIterator(this, -1);
        };
        Vector.prototype.size = function () {
            return this.length;
        };
        Vector.prototype.empty = function () {
            return this.length != 0;
        };
        Vector.prototype.at = function (index) {
            if (index < this.size())
                return this[index];
            else
                throw new std.OutOfRange("Target index is greater than Vector's size.");
        };
        Vector.prototype.front = function () {
            return this[0];
        };
        Vector.prototype.back = function () {
            return this[this.length - 1];
        };
        Vector.prototype.pushBack = function (element) {
            this.push(element);
        };
        Vector.prototype.set = function (index, val) {
            if (index > this.length)
                throw new std.OutOfRange("Target index is greater than Vector's size.");
            var prev = this[index];
            this[index] = val;
            return prev;
        };
        Vector.prototype.popBack = function () {
            this.splice(this.length - 1, 1);
        };
        Vector.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var position = args[0];
            if (args.length == 2 && args[1] instanceof std.Iterator == false) {
                var val = args[1];
                return this.insert(position, 1, val);
            }
            else if (args.length == 3 && typeof args[1] == "number") {
                var size = args[1];
                var val = args[2];
                var spliced = this.splice(position.getIndex());
                var inserts = [];
                for (var i = 0; i < size; i++)
                    inserts.push(val);
                this.push.apply(this, spliced);
                this.push.apply(this, inserts);
                return new VectorIterator(this, position.getIndex() + inserts.length);
            }
            else if (args.length == 3 && args[1] instanceof std.Iterator && args[2] instanceof std.Iterator) {
                var myEnd = args[0];
                var begin = args[1];
                var end = args[2];
                var spliced = this.splice(position.getIndex());
                var inserts = [];
                for (var it = begin; it.equals(end) == false; it = it.next())
                    inserts.push(it.value);
                this.push.apply(this, spliced);
                this.push.apply(this, inserts);
                return new VectorIterator(this, myEnd.getIndex() + inserts.length);
            }
            else
                throw new std.InvalidArgument("invalid parameters.");
        };
        Vector.prototype.erase = function (begin, end) {
            if (end === void 0) { end = null; }
            var startIndex = begin.getIndex();
            if (end == null)
                this.splice(startIndex, 1);
            else
                this.splice(startIndex, end.getIndex() - startIndex);
            return new VectorIterator(this, startIndex);
        };
        return Vector;
    })(Array);
    std.Vector = Vector;
    ;
    var VectorIterator = (function (_super) {
        __extends(VectorIterator, _super);
        function VectorIterator(source, index) {
            _super.call(this, source);
            this.index = index;
        }
        Object.defineProperty(VectorIterator.prototype, "vector", {
            get: function () {
                return this.source;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VectorIterator.prototype, "value", {
            get: function () {
                return this.vector.at(this.index);
            },
            set: function (val) {
                this.vector.set(this.index, val);
            },
            enumerable: true,
            configurable: true
        });
        VectorIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.index == obj.index;
        };
        VectorIterator.prototype.getIndex = function () {
            return this.index;
        };
        VectorIterator.prototype.prev = function () {
            if (this.index <= 0)
                return this.source.end();
            else
                return new VectorIterator(this.source, this.index - 1);
        };
        VectorIterator.prototype.next = function () {
            if (this.index >= this.source.size() - 1)
                return this.source.end();
            else
                return new VectorIterator(this.source, this.index + 1);
        };
        return VectorIterator;
    })(std.Iterator);
    std.VectorIterator = VectorIterator;
})(std || (std = {}));
