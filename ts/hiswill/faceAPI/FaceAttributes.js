var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceAttributes = (function (_super) {
            __extends(FaceAttributes, _super);
            function FaceAttributes(face) {
                _super.call(this);
                this.face = face;
                this.age = 0;
                this.gender = "";
                this.smile = 0;
                this.facialHair = new faceapi.FacialHair(this);
                this.headPose = new faceapi.HeadPose(this);
            }
            FaceAttributes.prototype.constructByJSON = function (obj) {
                faceapi.Global.fetch(this, obj);
            };
            FaceAttributes.prototype.getFace = function () {
                return this.face;
            };
            FaceAttributes.prototype.getAge = function () {
                return this.age;
            };
            FaceAttributes.prototype.getGender = function () {
                return this.gender;
            };
            FaceAttributes.prototype.getSmile = function () {
                return this.smile;
            };
            FaceAttributes.prototype.getFacialHair = function () {
                return this.facialHair;
            };
            FaceAttributes.prototype.getHeadPose = function () {
                return this.headPose;
            };
            FaceAttributes.prototype.TAG = function () {
                return "attributes";
            };
            FaceAttributes.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.facialHair.toXML(), this.headPose.toXML());
                return xml;
            };
            return FaceAttributes;
        })(samchon.protocol.Entity);
        faceapi.FaceAttributes = FaceAttributes;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
