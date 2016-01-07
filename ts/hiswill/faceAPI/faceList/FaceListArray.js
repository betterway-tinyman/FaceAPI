var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceAPI;
    (function (faceAPI) {
        var faceList;
        (function (faceList) {
            var FaceListArray = (function (_super) {
                __extends(FaceListArray, _super);
                function FaceListArray(api) {
                    _super.call(this);
                    this.api = api;
                }
                FaceListArray.prototype.createChild = function (xml) {
                    return new faceList.FaceList(this, xml.getProperty("name"));
                };
                FaceListArray.prototype.getAPI = function () {
                    return this.api;
                };
                FaceListArray.prototype.TAG = function () {
                    return "faceListArray";
                };
                FaceListArray.prototype.CHILD_TAG = function () {
                    return "faceList";
                };
                return FaceListArray;
            })(EntityArray);
            faceList.FaceListArray = FaceListArray;
        })(faceList = faceAPI.faceList || (faceAPI.faceList = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
