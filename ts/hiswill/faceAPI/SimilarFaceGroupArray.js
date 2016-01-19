var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var SimilarFaceGroupArray = (function (_super) {
            __extends(SimilarFaceGroupArray, _super);
            function SimilarFaceGroupArray(obj) {
                _super.call(this);
                this.messyGroup = new faceapi.MessyFaceGroup(this);
                if (obj instanceof faceapi.FaceAPI) {
                    this.api = obj;
                    this.faceArray = new faceapi.FaceReferArray();
                }
                else {
                    this.faceArray = obj;
                    if (this.faceArray.size() == 0)
                        this.api = null;
                    else
                        this.api = this.faceArray.at(0).getPicture().getPictureArray().getAPI();
                }
            }
            SimilarFaceGroupArray.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                this.messyGroup.construct(xml.get(this.messyGroup.TAG()).at(0));
                for (var i = 0; i < this.size(); i++)
                    for (var j = 0; j < this.at(i).size(); j++)
                        this.faceArray.push(this.at(i).at(j));
                for (i = 0; i < this.messyGroup.size(); i++)
                    this.faceArray.push(this.messyGroup.at(i));
                if (this.faceArray.size() == 0)
                    this.api = null;
                else
                    this.api = this.faceArray.at(i).getPicture().getPictureArray().getAPI();
            };
            SimilarFaceGroupArray.prototype.constructByJSON = function (data) {
                this.clear();
                var similarGroupArray = data["groups"];
                var messyGroup = data["messyGroup"];
                for (var i = 0; i < similarGroupArray.length; i++) {
                    var similarGroup = new faceapi.SimilarFaceGroup(this);
                    similarGroup.constructByJSON(similarGroupArray);
                    this.push(similarGroup);
                }
                this.messyGroup.constructByJSON(messyGroup);
            };
            SimilarFaceGroupArray.prototype.createChild = function (xml) {
                return new faceapi.SimilarFaceGroup(this);
            };
            SimilarFaceGroupArray.prototype.getAPI = function () {
                if (this.api == null && this.faceArray.size() != 0)
                    this.api = this.faceArray.at(0).getPicture().getPictureArray().getAPI();
                return this.api;
            };
            SimilarFaceGroupArray.prototype.getFaceArray = function () {
                return this.faceArray;
            };
            SimilarFaceGroupArray.prototype.getMessyGroup = function () {
                return this.messyGroup;
            };
            SimilarFaceGroupArray.prototype.TAG = function () {
                return "similarFaceGroupArray";
            };
            SimilarFaceGroupArray.prototype.CHILD_TAG = function () {
                return "similarFaceGroup";
            };
            SimilarFaceGroupArray.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.messyGroup.toXML());
                return xml;
            };
            return SimilarFaceGroupArray;
        })(samchon.protocol.EntityArray);
        faceapi.SimilarFaceGroupArray = SimilarFaceGroupArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
