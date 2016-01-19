var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var Invoke = (function (_super) {
            __extends(Invoke, _super);
            function Invoke() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
            }
            Invoke.prototype.construct = function (xml) {
                this.listener = xml.getProperty("listener");
                _super.prototype.construct.call(this, xml);
            };
            Invoke.prototype.createChild = function (xml) {
                return new protocol.InvokeParameter();
            };
            Invoke.prototype.getListener = function () {
                return this.listener;
            };
            Invoke.prototype.getArguments = function () {
                var args = [];
                for (var i = 0; i < this.size(); i++)
                    args.push(this[i].getValue());
                return args;
            };
            Invoke.prototype.apply = function (obj) {
                if (!(this.listener in obj && obj[this.listener] instanceof Function))
                    return false;
                var func = obj[this.listener];
                var args = this.getArguments();
                func.apply(obj, args);
                return true;
            };
            Invoke.prototype.TAG = function () {
                return "invoke";
            };
            Invoke.prototype.CHILD_TAG = function () {
                return "parameter";
            };
            return Invoke;
        })(protocol.EntityArray);
        protocol.Invoke = Invoke;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
