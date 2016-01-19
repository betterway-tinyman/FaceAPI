var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            if (args.length == 0) {
                this.clear();
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                var array = args[0];
                this.clear();
                this.push.apply(this, array);
            }
            else if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof std.Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                var size = args[0];
                var val = args[1];
                this.assign(size, val);
            }
        }
        List.prototype.assign = function (par1, par2) {
            if (par1 instanceof std.Iterator && par2 instanceof std.Iterator) {
                var begin = par1;
                var end = par2;
                var prev = null;
                var item;
                var it = begin;
                while (true) {
                    item = new ListIterator(this, prev, null, (it != end ? it.value : null));
                    if (prev != null)
                        prev.setNext(item);
                    if (it == begin)
                        this.begin_ = item;
                    else if (it == end) {
                        this.end_ = item;
                        break;
                    }
                    this.size_++;
                    it = it.next();
                }
            }
        };
        List.prototype.clear = function () {
            var it = new ListIterator(this, null, null, null);
            it.setPrev(it);
            it.setNext(it);
            this.begin_ = it;
            this.end_ = it;
            this.size_ = 0;
        };
        List.prototype.begin = function () {
            return this.begin_;
        };
        List.prototype.end = function () {
            return this.end_;
        };
        List.prototype.size = function () {
            return this.size_;
        };
        List.prototype.front = function () {
            return this.begin_.value;
        };
        List.prototype.back = function () {
            return this.end_.prev().value;
        };
        List.prototype.push = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < args.length; i++)
                this.pushBack(args[i]);
            return this.size();
        };
        List.prototype.pushFront = function (val) {
            var item = new ListIterator(this, null, this.begin_, val);
            this.begin_.setPrev(item);
            if (this.size_ == 0) {
                this.end_ = new ListIterator(this, item, item, null);
                item.setNext(this.end_);
            }
            else
                this.end_.setNext(item);
            this.begin_ = item;
            this.size_++;
        };
        List.prototype.pushBack = function (val) {
            var prev = this.end_.prev();
            var item = new ListIterator(this, this.end_.prev(), this.end_, val);
            prev.setNext(item);
            this.end_.setPrev(item);
            if (this.empty() == true) {
                this.begin_ = item;
                item.setPrev(this.end_);
            }
            this.size_++;
        };
        List.prototype.popFront = function () {
            this.erase(this.begin_);
        };
        List.prototype.popBack = function () {
            this.erase(this.end_.prev());
        };
        List.prototype.insert = function (myEnd, begin, end) {
            if (end === void 0) { end = null; }
            if (this != myEnd.getSource())
                throw new std.InvalidArgument("Parametric Iterator is not this Container's own.");
            else if (end != null && begin.getSource() != end.getSource())
                throw new std.InvalidArgument("Parameter begin and end are not from same container.");
            if (end == null)
                end = begin.next();
            var myPrev = myEnd;
            var myLast = myEnd.next();
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next()) {
                var myIt = new ListIterator(this, myPrev, null, it.value);
                myPrev.setNext(myIt);
                if (it == begin && this.empty() == true)
                    this.begin_ = myIt;
                myPrev = myIt;
                size++;
            }
            myPrev.setNext(myLast);
            myLast.setPrev(myPrev);
            this.size_ += size;
            return myPrev;
        };
        List.prototype.erase = function (begin, end) {
            if (end === void 0) { end = null; }
            if (this != begin.getSource() || begin.getSource() != end.getSource())
                throw new std.InvalidArgument("Parametric Iterator is not this Container's own.");
            var prev = begin.prev();
            var next = (end == null)
                ? begin.next()
                : end.next();
            prev.setNext(next);
            next.setPrev(prev);
            var size = 0;
            if (end != null) {
                for (var it = begin; it.equals(end) == false; it = it.next())
                    size++;
            }
            else
                size = 1;
            this.size_ -= size;
            return prev;
        };
        return List;
    })(std.Container);
    std.List = List;
    var ListIterator = (function (_super) {
        __extends(ListIterator, _super);
        function ListIterator(source, prev, next, value) {
            _super.call(this, source);
            this.prev_ = prev;
            this.next_ = next;
            this.value_ = value;
        }
        ListIterator.prototype.setPrev = function (prev) {
            this.prev_ = prev;
        };
        ListIterator.prototype.setNext = function (next) {
            this.next_ = next;
        };
        ListIterator.prototype.equals = function (obj) {
            if (obj instanceof ListIterator == false)
                return false;
            var it = obj;
            return _super.prototype.equals.call(this, obj) == true && this.prev_ == it.prev_ && this.next_ == it.next_;
        };
        ListIterator.prototype.prev = function () {
            return this.prev_;
        };
        ListIterator.prototype.next = function () {
            return this.next_;
        };
        Object.defineProperty(ListIterator.prototype, "value", {
            get: function () {
                return this.value_;
            },
            set: function (val) {
                this.value_ = val;
            },
            enumerable: true,
            configurable: true
        });
        return ListIterator;
    })(std.Iterator);
    std.ListIterator = ListIterator;
})(std || (std = {}));
