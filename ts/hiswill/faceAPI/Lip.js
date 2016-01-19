var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var Lip = (function (_super) {
            __extends(Lip, _super);
            function Lip(mouth) {
                _super.call(this);
                this.mouth = mouth;
                this.upperTop = new faceapi.Point("upperTop");
                this.upperBottom = new faceapi.Point("upperBottom");
                this.underTop = new faceapi.Point("underTop");
                this.underBottom = new faceapi.Point("underBottom");
            }
            Lip.prototype.constructByJSON = function (obj) {
                this.upperTop.constructByJSON(obj["upperLipTop"]);
                this.upperBottom.constructByJSON(obj["upperLipBottom"]);
                this.underTop.constructByJSON(obj["underLipTop"]);
                this.underBottom.constructByJSON(obj["underLipBottom"]);
            };
            Lip.prototype.getMouth = function () {
                return this.mouth;
            };
            Lip.prototype.getUpperTop = function () {
                return this.upperTop;
            };
            Lip.prototype.getUpperBottom = function () {
                return this.upperBottom;
            };
            Lip.prototype.getUnderTop = function () {
                return this.underTop;
            };
            Lip.prototype.getUnderBottom = function () {
                return this.underBottom;
            };
            Lip.prototype.TAG = function () {
                return "lip";
            };
            Lip.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.upperTop.toXML(), this.upperBottom.toXML(), this.underTop.toXML(), this.underBottom.toXML());
                return xml;
            };
            return Lip;
        })(samchon.protocol.Entity);
        faceapi.Lip = Lip;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
