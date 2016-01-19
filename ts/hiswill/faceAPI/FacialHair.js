var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FacialHair = (function (_super) {
            __extends(FacialHair, _super);
            function FacialHair(attributes) {
                _super.call(this, attributes);
                this.mustache = 0;
                this.beard = 0;
                this.sideburns = 0;
            }
            FacialHair.prototype.getMustache = function () {
                return this.mustache;
            };
            FacialHair.prototype.getBeard = function () {
                return this.beard;
            };
            FacialHair.prototype.getSideburns = function () {
                return this.sideburns;
            };
            FacialHair.prototype.TAG = function () {
                return "facialHair";
            };
            return FacialHair;
        })(faceapi.FaceAttribute);
        faceapi.FacialHair = FacialHair;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
