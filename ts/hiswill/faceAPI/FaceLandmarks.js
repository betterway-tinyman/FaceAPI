var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceLandmarks = (function (_super) {
            __extends(FaceLandmarks, _super);
            function FaceLandmarks(face) {
                _super.call(this);
                this.face = face;
                this.eyeBrows = new faceapi.Eyebrows(this);
                this.eyes = new faceapi.Eyes(this);
                this.nose = new faceapi.Nose(this);
                this.mouth = new faceapi.Mouth(this);
            }
            FaceLandmarks.prototype.constructByJSON = function (obj) {
                this.eyeBrows.constructByJSON(obj);
                this.eyes.constructByJSON(obj);
                this.nose.constructByJSON(obj);
                this.mouth.constructByJSON(obj);
            };
            FaceLandmarks.prototype.getFace = function () {
                return this.face;
            };
            FaceLandmarks.prototype.getEyeBrows = function () {
                return this.eyeBrows;
            };
            FaceLandmarks.prototype.getEyes = function () {
                return this.eyes;
            };
            FaceLandmarks.prototype.getNose = function () {
                return this.nose;
            };
            FaceLandmarks.prototype.getMouth = function () {
                return this.mouth;
            };
            FaceLandmarks.prototype.TAG = function () {
                return "landmarks";
            };
            FaceLandmarks.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.eyeBrows.toXML(), this.eyes.toXML(), this.nose.toXML(), this.mouth.toXML());
                return xml;
            };
            return FaceLandmarks;
        })(samchon.protocol.Entity);
        faceapi.FaceLandmarks = FaceLandmarks;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
