var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceLandmark = (function (_super) {
            __extends(FaceLandmark, _super);
            function FaceLandmark(landmarks) {
                _super.call(this);
            }
            FaceLandmark.prototype.constructByJSON = function (val) {
                faceapi.Global.fetch(this, val);
            };
            FaceLandmark.prototype.getLandmarks = function () {
                return this.landmarks;
            };
            return FaceLandmark;
        })(samchon.protocol.Entity);
        faceapi.FaceLandmark = FaceLandmark;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
