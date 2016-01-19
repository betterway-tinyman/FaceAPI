var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var Container = (function () {
        function Container() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
        }
        Container.prototype.assign = function (begin, end) {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        Container.prototype.clear = function () {
            this.erase(this.begin(), this.end());
        };
        Container.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        Container.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        Container.prototype.begin = function () {
            if (this.size() == 0)
                return this.end();
            else
                throw new std.AbstractMethodError("Have to be overriden.");
        };
        Container.prototype.end = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        Container.prototype.size = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        Container.prototype.empty = function () {
            return this.size() == 0;
        };
        return Container;
    })();
    std.Container = Container;
    var PairContainer = (function (_super) {
        __extends(PairContainer, _super);
        function PairContainer() {
            _super.call(this);
        }
        PairContainer.prototype.assign = function (begin, end) {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.clear = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.size = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.begin = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.end = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.find = function (key) {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.has = function (key) {
            return !this.find(key).equals(this.end());
        };
        PairContainer.prototype.get = function (key) {
            return this.find(key).second;
        };
        PairContainer.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        return PairContainer;
    })(Container);
    std.PairContainer = PairContainer;
})(std || (std = {}));
