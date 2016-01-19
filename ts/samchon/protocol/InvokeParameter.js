var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var InvokeParameter = (function (_super) {
            __extends(InvokeParameter, _super);
            function InvokeParameter() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
            }
            InvokeParameter.prototype.construct = function (xml) {
            };
            InvokeParameter.prototype.key = function () {
                return this.name;
            };
            InvokeParameter.prototype.getName = function () {
                return this.name;
            };
            InvokeParameter.prototype.getType = function () {
                return this.type;
            };
            InvokeParameter.prototype.getValue = function () {
                return this.value;
            };
            InvokeParameter.prototype.TAG = function () {
                return "parameter";
            };
            InvokeParameter.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.name != "")
                    xml.setProperty("name", this.name);
                xml.setProperty("type", this.type);
                xml.setProperty("value", this.value);
                return xml;
            };
            return InvokeParameter;
        })(protocol.Entity);
        protocol.InvokeParameter = InvokeParameter;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
