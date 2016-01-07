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
            var attribute;
            (function (attribute) {
                var FaceAttribute = (function (_super) {
                    __extends(FaceAttribute, _super);
                    function FaceAttribute(attributes) {
                        _super.call(this);
                        this.attributes = attributes;
                    }
                    FaceAttribute.prototype.constructByJSON = function (val) {
                        faceAPI.Global.fetch(this, val);
                    };
                    return FaceAttribute;
                })(Entity);
                attribute.FaceAttribute = FaceAttribute;
            })(attribute = face.attribute || (face.attribute = {}));
        })(face = faceAPI.face || (faceAPI.face = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
