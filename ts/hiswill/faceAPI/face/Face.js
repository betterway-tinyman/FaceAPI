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
        (function (face_1) {
            var Face = (function (_super) {
                __extends(Face, _super);
                function Face(picture) {
                    _super.call(this);
                    this.picture = picture;
                    this.person = null;
                    this.id = "";
                    this.landmarks = new face_1.landmark.FaceLandmarks(this);
                    this.attributes = new face_1.attribute.FaceAttributes(this);
                }
                Face.prototype.construct = function (xml) {
                    _super.prototype.construct.call(this, xml);
                    this.person = null;
                    if (xml.has("person") == false)
                        return;
                    var person = xml.get("person")[0];
                    var personName = person.getProperty("name");
                    var personGroupID = person.getProperty("groupID");
                };
                Face.prototype.constructByJSON = function (obj) {
                    trace(JSON.stringify(obj));
                    this.id = obj["faceId"];
                    _super.prototype.constructByJSON.call(this, obj["faceRectangle"]);
                    this.landmarks.constructByJSON(obj["faceLandmarks"]);
                    this.attributes.constructByJSON(obj["faceAttributes"]);
                };
                Face.prototype.identify = function (personGroup, maxCandidates) {
                    if (maxCandidates === void 0) { maxCandidates = 1; }
                    return personGroup.identify(this, maxCandidates);
                };
                Face.prototype.equals = function (face) {
                    if (this == face)
                        return new Pair(true, 1.0);
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/verify", "POST", null, { "faceId1": this.id, "faceId2": face.id }, function (data) {
                        var isIdentical = data["isIdentical"];
                        var confidence = data["confidental"];
                        return new Pair(isIdentical, confidence);
                    });
                    return new Pair(false, -1.0);
                };
                Face.prototype.key = function () {
                    return this.id;
                };
                Face.prototype.getID = function () {
                    return this.id;
                };
                Face.prototype.getPicture = function () {
                    return this.picture;
                };
                Face.prototype.getPerson = function () {
                    return this.person;
                };
                Face.prototype.getLandmarks = function () {
                    return this.landmarks;
                };
                Face.prototype.getAttributes = function () {
                    return this.attributes;
                };
                Face.prototype.TAG = function () {
                    return "face";
                };
                Face.prototype.toXML = function () {
                    var xml = _super.prototype.toXML.call(this);
                    xml.push(this.landmarks.toXML(), this.attributes.toXML());
                    return xml;
                };
                return Face;
            })(face_1.FaceRectangle);
            face_1.Face = Face;
        })(face = faceAPI.face || (faceAPI.face = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
