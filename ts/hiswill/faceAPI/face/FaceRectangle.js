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
            var FaceRectangle = (function (_super) {
                __extends(FaceRectangle, _super);
                function FaceRectangle() {
                    _super.call(this);
                    this.width = 0;
                    this.height = 0;
                }
                FaceRectangle.prototype.constructByJSON = function (obj) {
                    faceAPI.Global.fetch(this, obj);
                    this.x = obj["left"];
                    this.y = obj["top"];
                };
                FaceRectangle.prototype.getWidth = function () {
                    return this.width;
                };
                FaceRectangle.prototype.getHeight = function () {
                    return this.height;
                };
                return FaceRectangle;
            })(faceAPI.basic.Point);
            face.FaceRectangle = FaceRectangle;
        })(face = faceAPI.face || (faceAPI.face = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
