var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var Face = (function (_super) {
            __extends(Face, _super);
            function Face(picture) {
                _super.call(this);
                this.picture = picture;
                this.person = null;
                this.id = "";
                this.landmarks = new faceapi.FaceLandmarks(this);
                this.attributes = new faceapi.FaceAttributes(this);
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
            }
            Face.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                this.person = null;
                if (xml.has("person") == false)
                    return;
                var person = xml.get("person").at(0);
                var personName = person.getProperty("name");
                var personGroupID = person.getProperty("groupID");
            };
            Face.prototype.constructByJSON = function (obj) {
                this.id = obj["faceId"];
                _super.prototype.constructByJSON.call(this, obj["faceRectangle"]);
                this.landmarks.constructByJSON(obj["faceLandmarks"]);
                this.attributes.constructByJSON(obj["faceAttributes"]);
            };
            Face.prototype.identify = function (personGroup, maxCandidates) {
                if (maxCandidates === void 0) { maxCandidates = 1; }
                if (personGroup.isTrained() == false)
                    personGroup.addEventListener(faceapi.FaceEvent.TRAIN, this.dispatchTrainEvent, this);
                personGroup.addEventListener(faceapi.IdentifyEvent.IDENTIFY, this.dispatchIdentityEvent, this);
                personGroup.identify(this, maxCandidates);
            };
            Face.prototype.findSimilars = function (faceList, maxCandidates) {
                faceList.addEventListener(faceapi.FindSimilarEvent.FIND, this.dispatchFindSimilarEvent, this);
                faceList.findSimilars(this, maxCandidates);
            };
            Face.prototype.findSimilarGroups = function (faceAarray) {
                var this_ = this;
                var faceArray = new faceapi.FaceReferArray();
                var faceIDArray = new Array();
                for (var i = 0; i < faceArray.length; i++) {
                    faceArray.push(faceArray[i]);
                    faceIDArray.push(faceArray[i].getID());
                }
                var similarFaceGroupArray = new faceapi.SimilarFaceGroupArray(faceArray);
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/group", "POST", null, { "faceIds": faceIDArray }, function (data) {
                    similarFaceGroupArray.constructByJSON(data);
                    this_.dispatchEvent(new faceapi.FindSimilarGroupEvent(faceArray, similarFaceGroupArray));
                });
            };
            Face.prototype.dispatchTrainEvent = function (event) {
                this.dispatchEvent(event);
            };
            Face.prototype.dispatchIdentityEvent = function (event) {
                this.dispatchEvent(event);
            };
            Face.prototype.dispatchFindSimilarEvent = function (event) {
                this.dispatchEvent(event);
            };
            Face.prototype.equals = function (face) {
                if (this == face)
                    return new std.Pair(true, 1.0);
                var pair = new std.Pair(false, -1.0);
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/verify", "POST", null, { "faceId1": this.id, "faceId2": face.id }, function (data) {
                    var isIdentical = data["isIdentical"];
                    var confidence = data["confidence"];
                    pair = new std.Pair(isIdentical, confidence);
                });
                return pair;
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
            Face.prototype.hasEventListener = function (type) {
                return this.eventDispatcher.hasEventListener(type);
            };
            Face.prototype.dispatchEvent = function (event) {
                return this.eventDispatcher.dispatchEvent(event);
            };
            Face.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.eventDispatcher.addEventListener(type, listener, thisArg);
            };
            Face.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.removeEventListener(type, listener, thisArg);
            };
            Face.prototype.TAG = function () {
                return "face";
            };
            Face.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.landmarks.toXML(), this.attributes.toXML());
                return xml;
            };
            Face.prototype.toRectangle = function () {
                return new fabric.Rect();
            };
            return Face;
        })(faceapi.FaceRectangle);
        faceapi.Face = Face;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
