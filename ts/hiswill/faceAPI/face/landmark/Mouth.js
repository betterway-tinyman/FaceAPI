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
                var Mouth = (function (_super) {
                    __extends(Mouth, _super);
                    function Mouth(landmarks) {
                        _super.call(this, landmarks);
                        this.lip = new landmark.Lip(this);
                        this.left = new faceAPI.basic.Point("left");
                        this.right = new faceAPI.basic.Point("right");
                    }
                    Mouth.prototype.constructByJSON = function (obj) {
                        this.lip.constructByJSON(obj);
                        this.left.constructByJSON(obj["mouthLeft"]);
                        this.right.constructByJSON(obj["mouthRight"]);
                    };
                    Mouth.prototype.getLip = function () {
                        return this.lip;
                    };
                    Mouth.prototype.getLeft = function () {
                        return this.left;
                    };
                    Mouth.prototype.getRight = function () {
                        return this.right;
                    };
                    Mouth.prototype.TAG = function () {
                        return "mouth";
                    };
                    Mouth.prototype.toXML = function () {
                        var xml = _super.prototype.toXML.call(this);
                        xml.push(this.lip.toXML(), this.left.toXML(), this.right.toXML());
                        return xml;
                    };
                    return Mouth;
                })(landmark.FaceLandmark);
                landmark.Mouth = Mouth;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceAPI.face || (faceAPI.face = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
