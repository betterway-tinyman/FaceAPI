var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var SimilarFace = (function (_super) {
            __extends(SimilarFace, _super);
            function SimilarFace(faceArray) {
                _super.call(this);
                this.faceArray = faceArray;
            }
            SimilarFace.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                this.facePair = null;
                if (xml.hasProperty("facePairID") == false)
                    return;
                var facePairID = xml.getProperty("facePairID");
                var faceList = this.faceArray.getFaceList();
                if (faceList != null && faceList.has(facePairID) == true)
                    this.facePair = faceList.get(facePairID);
            };
            SimilarFace.prototype.constructByJSON = function (data) {
                faceapi.Global.fetch(this, data);
                var facePairID = data["persistedFaceId"];
                var faceList = this.faceArray.getFaceList();
                if (faceList != null && faceList.has(facePairID) == true)
                    this.facePair = faceList.get(facePairID);
                else
                    this.facePair = null;
            };
            SimilarFace.prototype.getFaceArray = function () {
                return this.faceArray;
            };
            SimilarFace.prototype.getFacePair = function () {
                return this.facePair;
            };
            SimilarFace.prototype.getConfidence = function () {
                return this.confidence;
            };
            SimilarFace.prototype.TAG = function () {
                return "similarFace";
            };
            SimilarFace.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.facePair != null)
                    xml.setProperty("facePairID", this.facePair.getID());
                return xml;
            };
            return SimilarFace;
        })(samchon.protocol.Entity);
        faceapi.SimilarFace = SimilarFace;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
