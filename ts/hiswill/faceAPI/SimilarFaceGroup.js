var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var SimilarFaceGroup = (function (_super) {
            __extends(SimilarFaceGroup, _super);
            function SimilarFaceGroup(groupArray) {
                _super.call(this, groupArray);
            }
            SimilarFaceGroup.prototype.TAG = function () {
                return "similarFaceGroup";
            };
            return SimilarFaceGroup;
        })(faceapi.FaceGroup);
        faceapi.SimilarFaceGroup = SimilarFaceGroup;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
