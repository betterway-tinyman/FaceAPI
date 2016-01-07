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
                var Nose = (function (_super) {
                    __extends(Nose, _super);
                    function Nose(landmarks) {
                        _super.call(this, landmarks);
                        this.tip = new faceAPI.basic.Point("tip");
                        this.leftRoot = new faceAPI.basic.Point("leftRoot");
                        this.rightRoot = new faceAPI.basic.Point("rightRoot");
                        this.leftAlarTop = new faceAPI.basic.Point("leftAlarTop");
                        this.rightAlarTop = new faceAPI.basic.Point("rightAlarTop");
                        this.leftAlarOutTip = new faceAPI.basic.Point("leftAlarOutTip");
                        this.rightAlarOutTip = new faceAPI.basic.Point("rightAlarOutTip");
                    }
                    Nose.prototype.constructByJSON = function (obj) {
                        this.tip.constructByJSON(obj["noseTip"]);
                        this.leftRoot.constructByJSON(obj["noseRootLeft"]);
                        this.rightRoot.constructByJSON(obj["noseRootRight"]);
                        this.leftAlarTop.constructByJSON(obj["noseLeftAlarTop"]);
                        this.rightAlarTop.constructByJSON(obj["noseRightAlarTop"]);
                        this.leftAlarOutTip.constructByJSON(obj["noseLeftAlarOutTip"]);
                        this.rightAlarOutTip.constructByJSON(obj["noseRightAlarOutTip"]);
                    };
                    Nose.prototype.getTip = function () {
                        return this.tip;
                    };
                    Nose.prototype.getLeftRoot = function () {
                        return this.leftRoot;
                    };
                    Nose.prototype.getRightRoot = function () {
                        return this.rightRoot;
                    };
                    Nose.prototype.getLeftAlarTop = function () {
                        return this.leftAlarTop;
                    };
                    Nose.prototype.getRightAlarTop = function () {
                        return this.rightAlarTop;
                    };
                    Nose.prototype.getLeftAlarOutTip = function () {
                        return this.leftAlarOutTip;
                    };
                    Nose.prototype.getRightAlarOutTip = function () {
                        return this.rightAlarOutTip;
                    };
                    Nose.prototype.TAG = function () {
                        return "nose";
                    };
                    Nose.prototype.toXML = function () {
                        var xml = _super.prototype.toXML.call(this);
                        xml.push(this.tip.toXML(), this.leftRoot.toXML(), this.rightRoot.toXML(), this.leftAlarTop.toXML(), this.rightAlarTop.toXML(), this.leftAlarOutTip.toXML(), this.rightAlarOutTip.toXML());
                        return xml;
                    };
                    return Nose;
                })(landmark.FaceLandmark);
                landmark.Nose = Nose;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceAPI.face || (faceAPI.face = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
