var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var ExternalSystem = (function (_super) {
            __extends(ExternalSystem, _super);
            function ExternalSystem() {
                _super.call(this);
                this.driver = null;
            }
            ExternalSystem.prototype.start = function () {
                if (this.driver != null)
                    return;
                this.driver = new protocol.ServerConnector(this);
                this.driver.connect(this.ip, this.port);
            };
            ExternalSystem.prototype.key = function () {
                return this.name;
            };
            ExternalSystem.prototype.getName = function () {
                return this.name;
            };
            ExternalSystem.prototype.getIP = function () {
                return this.ip;
            };
            ExternalSystem.prototype.getPort = function () {
                return this.port;
            };
            ExternalSystem.prototype.sendData = function (invoke) {
                this.driver.sendData(invoke);
            };
            ExternalSystem.prototype.replyData = function (invoke) {
                invoke.apply(this);
                for (var i = 0; i < this.size(); i++)
                    this[i].replyData(invoke);
            };
            ExternalSystem.prototype.TAG = function () {
                return "system";
            };
            ExternalSystem.prototype.CHILD_TAG = function () {
                return "role";
            };
            return ExternalSystem;
        })(protocol.EntityArray);
        protocol.ExternalSystem = ExternalSystem;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
