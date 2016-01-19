var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var UnorderedSet = (function (_super) {
        __extends(UnorderedSet, _super);
        function UnorderedSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.data_ = new std.Vector();
            if (args.length == 1 && args[0] instanceof Array) {
                var array = args[0];
                this.data_ = new std.Vector(array);
            }
            else if (args.length == 1 && (args[0] instanceof std.Vector || args[1] instanceof std.Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
        }
        UnorderedSet.prototype.assign = function (begin, end) {
            this.data_.assign(begin, end);
        };
        UnorderedSet.prototype.clear = function () {
            this.data_.clear();
        };
        UnorderedSet.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1) {
                var key = args[0];
                if (this.has(key) == true)
                    return new std.Pair(this.find(key), false);
                else {
                    this.data_.push(key);
                    return new std.Pair(this.end().prev(), true);
                }
            }
            else if (args.length == 2) {
                var position = args[0];
                var key = args[1];
                if (this.has(key) == true)
                    return new std.Pair(this.find(key), false);
                else {
                    var index = position.getIndex();
                    this.data_.insert(this.data_.begin().advance(index), key);
                    return new std.Pair(new UnorderedSetIterator(this, index + 1), true);
                }
            }
            else if (args.length == 3) {
                var position = args[0];
                var begin = args[1];
                var end = args[2];
                var index = position.getIndex();
                var inserted = 0;
                for (var it = begin; it.equals(end) == false; it = it.next()) {
                    if (this.has(it.value) == true)
                        continue;
                    this.data_.pushBack(it.value);
                    inserted++;
                }
                return;
                new std.Pair(new UnorderedSetIterator(this, index + inserted), (inserted != 0));
            }
        };
        ;
        UnorderedSet.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1 && args[0] instanceof std.Iterator == false) {
                var key = args[0];
                if (this.has(key) == true)
                    this.erase(this.find(key));
                return this.size();
            }
            else if (args.length == 1 && args[0] instanceof std.Iterator) {
                var it = args[0];
                var index = it.getIndex();
                this.data_.splice(index);
                return new UnorderedSetIterator(this, index);
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.data_.splice(begin.getIndex(), end.getIndex() - begin.getIndex());
                return new UnorderedSetIterator(this, begin.getIndex());
            }
        };
        UnorderedSet.prototype.begin = function () {
            if (this.empty() == true)
                return this.end();
            else
                return new UnorderedSetIterator(this, 0);
        };
        UnorderedSet.prototype.end = function () {
            return new UnorderedSetIterator(this, -1);
        };
        UnorderedSet.prototype.find = function (key) {
            var i;
            if (key.hasOwnProperty("equals") == true) {
                for (i = 0; i < this.data_.size(); i++)
                    if (this.data_.at(i)["equals"](key) == true)
                        return new UnorderedSetIterator(this, i);
            }
            else {
                for (i = 0; i < this.data_.size(); i++)
                    if (this.data_.at(i) == key)
                        return new UnorderedSetIterator(this, i);
            }
            return this.end();
        };
        UnorderedSet.prototype.data = function () {
            return this.data_;
        };
        UnorderedSet.prototype.size = function () {
            return this.data_.size();
        };
        UnorderedSet.prototype.has = function (key) {
            return !this.find(key).equals(this.end());
        };
        UnorderedSet.prototype.equals = function (obj) {
            if (this.size() != obj.size())
                return false;
            for (var i = 0; i < this.data_.size(); i++)
                if (this.data_.at(i) != obj.data_.at(i))
                    return false;
            return true;
        };
        return UnorderedSet;
    })(std.Container);
    std.UnorderedSet = UnorderedSet;
    var UnorderedSetIterator = (function (_super) {
        __extends(UnorderedSetIterator, _super);
        function UnorderedSetIterator(source, index) {
            _super.call(this, source);
            this.index = index;
        }
        Object.defineProperty(UnorderedSetIterator.prototype, "value", {
            get: function () {
                return this.set.data().at(this.index);
            },
            set: function (key) {
                this.set.data().set(this.index, key);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnorderedSetIterator.prototype, "set", {
            get: function () {
                return this.source;
            },
            enumerable: true,
            configurable: true
        });
        UnorderedSetIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.index == obj.index;
        };
        UnorderedSetIterator.prototype.getIndex = function () {
            return this.index;
        };
        UnorderedSetIterator.prototype.prev = function () {
            if (this.index == 0)
                return this.set.end();
            else
                return new UnorderedSetIterator(this.set, this.index - 1);
        };
        UnorderedSetIterator.prototype.next = function () {
            if (this.index >= this.set.data().size() - 1)
                return this.set.end();
            else
                return new UnorderedSetIterator(this.set, this.index + 1);
        };
        return UnorderedSetIterator;
    })(std.Iterator);
    std.UnorderedSetIterator = UnorderedSetIterator;
})(std || (std = {}));
