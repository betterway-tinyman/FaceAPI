var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var Pupil = (function (_super) {
            __extends(Pupil, _super);
            function Pupil(eye) {
                _super.call(this, "pupil");
                this.eye = eye;
            }
            Pupil.prototype.getEye = function () {
                return this.eye;
            };
            Pupil.prototype.TAG = function () {
                return _super.prototype.TAG.call(this);
            };
            return Pupil;
        })(faceapi.Point);
        faceapi.Pupil = Pupil;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
