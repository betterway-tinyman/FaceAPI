var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var ExternalSystemArray = (function (_super) {
            __extends(ExternalSystemArray, _super);
            function ExternalSystemArray() {
                _super.call(this);
            }
            ExternalSystemArray.prototype.start = function () {
                for (var i = 0; i < this.size(); i++)
                    this.at(i).start();
            };
            ExternalSystemArray.prototype.hasRole = function (key) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).has(key) == true)
                        return true;
                return false;
            };
            ExternalSystemArray.prototype.getRole = function (key) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).has(key) == true)
                        return this.at(i).get(key);
                throw Error("out of range");
            };
            ExternalSystemArray.prototype.sendData = function (invoke) {
                var listener = invoke.getListener();
                for (var i = 0; i < this.size(); i++)
                    for (var j = 0; j < this.at(i).size(); j++)
                        if (this.at(i).at(j).hasSendListener(listener) == true)
                            this.at(i).sendData(invoke);
            };
            ExternalSystemArray.prototype.replyData = function (invoke) {
                invoke.apply(this);
            };
            ExternalSystemArray.prototype.TAG = function () {
                return "systemArray";
            };
            ExternalSystemArray.prototype.CHILD_TAG = function () {
                return "system";
            };
            return ExternalSystemArray;
        })(protocol.EntityArray);
        protocol.ExternalSystemArray = ExternalSystemArray;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
