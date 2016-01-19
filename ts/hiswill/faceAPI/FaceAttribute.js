var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceAttribute = (function (_super) {
            __extends(FaceAttribute, _super);
            function FaceAttribute(attributes) {
                _super.call(this);
                this.attributes = attributes;
            }
            FaceAttribute.prototype.constructByJSON = function (val) {
                faceapi.Global.fetch(this, val);
            };
            FaceAttribute.prototype.getAttributes = function () {
                return this.attributes;
            };
            return FaceAttribute;
        })(samchon.protocol.Entity);
        faceapi.FaceAttribute = FaceAttribute;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
