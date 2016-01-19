var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var Set = (function (_super) {
        __extends(Set, _super);
        function Set() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.data_ = null;
        }
        Set.prototype.assign = function (begin, end) {
        };
        Set.prototype.clear = function () {
            this.data_ = null;
        };
        Set.prototype.begin = function () {
            if (this.data_ == null)
                return this.end();
            var node = this.data_;
            while (node.getLeftChild() != null)
                node = node.getLeftChild();
            return new SetIterator(this, node);
        };
        Set.prototype.end = function () {
            return new SetIterator(this, null);
        };
        Set.prototype.data = function () {
            return this.data_;
        };
        Set.prototype.size = function () {
            if (this.data_ == null)
                return 0;
            else
                return this.data_.size();
        };
        Set.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        Set.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        return Set;
    })(std.Container);
    std.Set = Set;
    var SetIterator = (function (_super) {
        __extends(SetIterator, _super);
        function SetIterator(source, node) {
            _super.call(this, source);
            this.node = node;
        }
        Object.defineProperty(SetIterator.prototype, "set", {
            get: function () { return this.source; },
            enumerable: true,
            configurable: true
        });
        SetIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.node == obj.node;
        };
        Object.defineProperty(SetIterator.prototype, "value", {
            get: function () {
                return this.node.getValue();
            },
            set: function (val) {
                this.node.setValue(val);
            },
            enumerable: true,
            configurable: true
        });
        SetIterator.prototype.prev = function () {
            if (this.node == null)
                return new SetIterator(this.set, this.set.data().back());
            else
                return new SetIterator(this.set, this.node.prev());
        };
        SetIterator.prototype.next = function () {
            if (this.node == null)
                return new SetIterator(this.set, this.set.data().front());
            return new SetIterator(this.set, this.node.next());
        };
        return SetIterator;
    })(std.Iterator);
    std.SetIterator = SetIterator;
})(std || (std = {}));
