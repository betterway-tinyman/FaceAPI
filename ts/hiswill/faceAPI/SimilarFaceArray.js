var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var SimilarFaceArray = (function (_super) {
            __extends(SimilarFaceArray, _super);
            function SimilarFaceArray() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
                if (args.length == 1 && args[0] instanceof faceapi.FaceAPI) {
                    this.api = args[0];
                    this.face = null;
                    this.faceList = null;
                }
                else if (args.length == 2 && args[0] instanceof faceapi.Face && args[1] instanceof faceapi.FaceList) {
                    this.face = args[0];
                    this.faceList = args[1];
                    this.api = this.faceList.getListArray().getAPI();
                }
            }
            SimilarFaceArray.prototype.construt = function (xml) {
                this.faceList = null;
                if (xml.hasProperty("faceID") == true) {
                    var faceID = xml.getProperty("faceID");
                    var pictureArray = this.api.getPictureArray();
                    for (var i = 0; i < pictureArray.size(); i++) {
                        var picture = pictureArray.at(i);
                        if (picture.has(faceID) == true) {
                            this.face = picture.get(faceID);
                            break;
                        }
                    }
                }
                if (xml.hasProperty("faceListID") == true) {
                    var faceListID = xml.getProperty("faceListID");
                    var faceListArray = this.api.getFaceListArray();
                    if (faceListArray.has(faceListID) == true)
                        this.faceList = faceListArray.get(faceListID);
                }
                _super.prototype.construct.call(this, xml);
            };
            SimilarFaceArray.prototype.constructByJSON = function (val) {
                this.clear();
                var items = val;
                for (var i = 0; i < items.length; i++) {
                    var similar = new faceapi.SimilarFace(this);
                    similar.constructByJSON(items[i]);
                    this.push(similar);
                }
            };
            SimilarFaceArray.prototype.createChild = function (xml) {
                return new faceapi.SimilarFace(this);
            };
            SimilarFaceArray.prototype.getAPI = function () {
                return this.api;
            };
            SimilarFaceArray.prototype.getFace = function () {
                return this.face;
            };
            SimilarFaceArray.prototype.getFaceList = function () {
                return this.faceList;
            };
            SimilarFaceArray.prototype.TAG = function () {
                return "similarFaceArray";
            };
            SimilarFaceArray.prototype.CHILD_TAG = function () {
                return "similarFace";
            };
            SimilarFaceArray.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.face != null)
                    xml.setProperty("faceID", this.face.getID());
                if (this.faceList != null)
                    xml.setProperty("faceListID", this.faceList.getID());
                return xml;
            };
            return SimilarFaceArray;
        })(samchon.protocol.EntityArray);
        faceapi.SimilarFaceArray = SimilarFaceArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
