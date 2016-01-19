var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceReferArray = (function (_super) {
            __extends(FaceReferArray, _super);
            function FaceReferArray() {
                _super.call(this);
            }
            FaceReferArray.prototype.construct = function (xml) {
                this.clear();
                if (xml.has(this.CHILD_TAG()) == false)
                    return;
                var xmlList = xml.get(this.CHILD_TAG());
                for (var i = 0; i < xmlList.size(); i++) {
                    var face = this.fetchChild(xmlList.at(i).getProperty("id"));
                    if (face == null)
                        continue;
                    this.push(face);
                }
            };
            FaceReferArray.prototype.fetchChild = function (id) {
                return null;
            };
            FaceReferArray.prototype.TAG = function () {
                return "faceReferArray";
            };
            FaceReferArray.prototype.CHILD_TAG = function () {
                return "faceRefer";
            };
            FaceReferArray.prototype.toXML = function () {
                var xml = new samchon.library.XML();
                xml.setTag(this.TAG());
                for (var i = 0; i < this.size(); i++) {
                    var childXML = new samchon.library.XML();
                    childXML.setTag(this.CHILD_TAG());
                    childXML.setProperty("id", this.at(i).getID());
                }
                return xml;
            };
            return FaceReferArray;
        })(samchon.protocol.EntityArray);
        faceapi.FaceReferArray = FaceReferArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
