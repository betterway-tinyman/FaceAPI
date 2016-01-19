var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var Iterator = (function () {
        function Iterator(source) {
            this.source = source;
        }
        Iterator.prototype.prev = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        Iterator.prototype.next = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        Iterator.prototype.advance = function (n) {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        Iterator.prototype.equals = function (obj) {
            return this.source == obj.source;
        };
        Iterator.prototype.getSource = function () {
            return this.source;
        };
        Object.defineProperty(Iterator.prototype, "value", {
            get: function () {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            set: function (val) {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            enumerable: true,
            configurable: true
        });
        return Iterator;
    })();
    std.Iterator = Iterator;
    var PairIterator = (function (_super) {
        __extends(PairIterator, _super);
        function PairIterator(source) {
            _super.call(this, source);
        }
        PairIterator.prototype.prev = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairIterator.prototype.next = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairIterator.prototype.equals = function (obj) {
            return this.source == obj.source;
        };
        Object.defineProperty(PairIterator.prototype, "first", {
            get: function () {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            set: function (val) {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PairIterator.prototype, "second", {
            get: function () {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            set: function (val) {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            enumerable: true,
            configurable: true
        });
        return PairIterator;
    })(Iterator);
    std.PairIterator = PairIterator;
})(std || (std = {}));
