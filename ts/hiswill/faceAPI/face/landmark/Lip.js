var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceAPI;
    (function (faceAPI) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
                var Lip = (function (_super) {
                    __extends(Lip, _super);
                    function Lip(mouth) {
                        _super.call(this);
                        this.mouth = mouth;
                        this.upperTop = new faceAPI.basic.Point("upperTop");
                        this.upperBottom = new faceAPI.basic.Point("upperBottom");
                        this.underTop = new faceAPI.basic.Point("underTop");
                        this.underBottom = new faceAPI.basic.Point("underBottom");
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
                })(Entity);
                landmark.Lip = Lip;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceAPI.face || (faceAPI.face = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
