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
                })(faceAPI.basic.Point);
                landmark.Pupil = Pupil;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceAPI.face || (faceAPI.face = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
