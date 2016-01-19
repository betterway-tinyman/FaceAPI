var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var slave;
        (function (slave) {
            var SlaveSystem = (function (_super) {
                __extends(SlaveSystem, _super);
                function SlaveSystem() {
                    _super.call(this);
                }
                SlaveSystem.prototype.replyData = function (invoke) {
                    var history = new protocol.InvokeHistory(invoke);
                    _super.prototype.replyData.call(this, invoke);
                    history.notifyEnd();
                    this.sendData(history.toInvoke());
                };
                return SlaveSystem;
            })(protocol.ExternalSystem);
            slave.SlaveSystem = SlaveSystem;
        })(slave = protocol.slave || (protocol.slave = {}));
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
