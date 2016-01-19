var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var ExternalSystemRole = (function (_super) {
            __extends(ExternalSystemRole, _super);
            function ExternalSystemRole(system) {
                _super.call(this);
                this.system = system;
                this.sendListeners = new std.UnorderedSet();
            }
            ExternalSystemRole.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
            };
            ExternalSystemRole.prototype.getName = function () {
                return this.name;
            };
            ExternalSystemRole.prototype.hasSendListener = function (key) {
                return this.sendListeners.has(key);
            };
            ExternalSystemRole.prototype.sendData = function (invoke) {
                this.system.sendData(invoke);
            };
            ExternalSystemRole.prototype.replyData = function (invoke) {
                invoke.apply(this);
            };
            ExternalSystemRole.prototype.TAG = function () {
                return "role";
            };
            ExternalSystemRole.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                return xml;
            };
            return ExternalSystemRole;
        })(protocol.Entity);
        protocol.ExternalSystemRole = ExternalSystemRole;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
