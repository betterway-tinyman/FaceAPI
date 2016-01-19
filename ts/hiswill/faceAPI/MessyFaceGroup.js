var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var MessyFaceGroup = (function (_super) {
            __extends(MessyFaceGroup, _super);
            function MessyFaceGroup(groupArray) {
                _super.call(this, groupArray);
            }
            MessyFaceGroup.prototype.TAG = function () {
                return "messyFaceGroup";
            };
            return MessyFaceGroup;
        })(faceapi.FaceGroup);
        faceapi.MessyFaceGroup = MessyFaceGroup;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
