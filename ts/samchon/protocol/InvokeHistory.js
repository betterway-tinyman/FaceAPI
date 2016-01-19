var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var InvokeHistory = (function (_super) {
            __extends(InvokeHistory, _super);
            function InvokeHistory(invoke) {
                _super.call(this);
                this.uid = invoke.get("invoke_history_uid").getValue();
                this.listener = invoke.getListener();
                this.startTime = new Date();
            }
            InvokeHistory.prototype.notifyEnd = function () {
                this.endTime = new Date();
            };
            InvokeHistory.prototype.TAG = function () {
                return "invokeHistory";
            };
            InvokeHistory.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.setProperty("startTime", this.startTime.getTime() * Math.pow(10.0, 6));
                xml.setProperty("endTime", this.endTime.getTime() * Math.pow(10.0, 6));
                return xml;
            };
            InvokeHistory.prototype.toInvoke = function () {
                return null;
            };
            return InvokeHistory;
        })(protocol.Entity);
        protocol.InvokeHistory = InvokeHistory;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
