var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var UnorderedMap = (function (_super) {
        __extends(UnorderedMap, _super);
        function UnorderedMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.data_ = new std.Vector();
        }
        UnorderedMap.prototype.assign = function (begin, end) {
        };
        UnorderedMap.prototype.clear = function () {
            this.data_.clear();
        };
        UnorderedMap.prototype.data = function () {
            return this.data_;
        };
        UnorderedMap.prototype.size = function () {
            return this.data_.size();
        };
        UnorderedMap.prototype.find = function (key) {
            var i;
            if (key.hasOwnProperty("equals") == true) {
                for (i = 0; i < this.data_.size(); i++)
                    if (this.data_.at(i).first["equals"](key) == true)
                        return new UnorderedMapIterator(this, i);
            }
            else {
                for (i = 0; i < this.data_.size(); i++)
                    if (this.data_.at(i).first == key)
                        return new UnorderedMapIterator(this, i);
            }
            return this.end();
        };
        UnorderedMap.prototype.has = function (key) {
            return !this.find(key).equals(this.end());
        };
        UnorderedMap.prototype.get = function (key) {
            return this.find(key).second;
        };
        UnorderedMap.prototype.begin = function () {
            if (this.size() == 0)
                return this.end();
            return new UnorderedMapIterator(this, 0);
        };
        UnorderedMap.prototype.end = function () {
            return new UnorderedMapIterator(this, -1);
        };
        UnorderedMap.prototype.insert = function (myEnd, begin, end) {
            if (end === void 0) { end = null; }
            return null;
        };
        UnorderedMap.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        UnorderedMap.prototype.set = function (key, value) {
            for (var i = 0; i < this.data_.size(); i++)
                if (this.data_.at(i).first == key) {
                    this.data_.at(i).second = value;
                    return;
                }
            this.data_.push(new std.Pair(key, value));
        };
        UnorderedMap.prototype.pop = function (key) {
            for (var i = 0; i < this.data_.size(); i++)
                if (this.data_.at(i).first == key)
                    return this.data_.splice(i, 1)[0].second;
            throw Error("out of range");
        };
        UnorderedMap.prototype.equals = function (obj) {
            if (this.size() != obj.size())
                return false;
            for (var i = 0; i < this.data_.size(); i++)
                if (this.data_.at(i).equals(obj.data_.at(i)) == false)
                    return false;
            return true;
        };
        UnorderedMap.prototype.toString = function () {
            var str = "{";
            for (var i = 0; i < this.data_.size(); i++) {
                var pair = this.data_.at(i);
                var key = "\"" + pair.first + "\"";
                var value = (typeof pair.second == "string")
                    ? "\"" + pair.second + "\""
                    : String(pair.second);
                str += "{\"key\": " + key + ": value: " + value + "}";
            }
            str += "}";
            return str;
        };
        return UnorderedMap;
    })(std.PairContainer);
    std.UnorderedMap = UnorderedMap;
    var UnorderedMapIterator = (function (_super) {
        __extends(UnorderedMapIterator, _super);
        function UnorderedMapIterator(source, index) {
            _super.call(this, source);
            if (index != -1 && index < source.size())
                this.index = index;
            else
                this.index = -1;
        }
        Object.defineProperty(UnorderedMapIterator.prototype, "map", {
            get: function () {
                return (this.source);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnorderedMapIterator.prototype, "first", {
            get: function () {
                return this.map.data().at(this.index).first;
            },
            set: function (key) {
                this.map.data().at(this.index).first = key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnorderedMapIterator.prototype, "second", {
            get: function () {
                return this.map.data().at(this.index).second;
            },
            set: function (val) {
                this.map.data().at(this.index).second = val;
            },
            enumerable: true,
            configurable: true
        });
        UnorderedMapIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.index == obj.index;
        };
        UnorderedMapIterator.prototype.prev = function () {
            if (this.index - 1 < 0)
                return this.map.end();
            else
                return new UnorderedMapIterator(this.map, this.index - 1);
        };
        UnorderedMapIterator.prototype.next = function () {
            if (this.index + 1 >= this.map.size())
                return this.map.end();
            else
                return new UnorderedMapIterator(this.map, this.index + 1);
        };
        return UnorderedMapIterator;
    })(std.PairIterator);
    std.UnorderedMapIterator = UnorderedMapIterator;
})(std || (std = {}));
