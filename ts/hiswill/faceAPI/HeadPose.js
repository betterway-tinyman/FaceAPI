var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var HeadPose = (function (_super) {
            __extends(HeadPose, _super);
            function HeadPose(attributes) {
                _super.call(this, attributes);
                this.roll = 0;
                this.yaw = 0;
                this.pitch = 0;
            }
            HeadPose.prototype.getRoll = function () {
                return this.roll;
            };
            HeadPose.prototype.getPitch = function () {
                return this.pitch;
            };
            HeadPose.prototype.getYaw = function () {
                return this.yaw;
            };
            HeadPose.prototype.TAG = function () {
                return "headPose";
            };
            return HeadPose;
        })(faceapi.FaceAttribute);
        faceapi.HeadPose = HeadPose;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
