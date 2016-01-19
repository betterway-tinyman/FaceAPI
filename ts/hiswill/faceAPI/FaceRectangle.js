var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceRectangle = (function (_super) {
            __extends(FaceRectangle, _super);
            function FaceRectangle() {
                _super.call(this);
                this.width = 0;
                this.height = 0;
            }
            FaceRectangle.prototype.constructByJSON = function (obj) {
                faceapi.Global.fetch(this, obj);
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
        })(faceapi.Point);
        faceapi.FaceRectangle = FaceRectangle;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
