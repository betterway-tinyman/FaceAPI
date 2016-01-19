var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var CandidatePersonArray = (function (_super) {
            __extends(CandidatePersonArray, _super);
            function CandidatePersonArray() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
                if (args.length == 1 && args[0] instanceof faceapi.FaceAPI) {
                    this.api = args[0];
                    this.face = null;
                    this.personGroup = null;
                }
                else if (args.length == 2 && args[0] instanceof faceapi.Face && args[1] instanceof faceapi.PersonGroup) {
                    this.face = args[0];
                    this.personGroup = args[1];
                    this.api = this.face.getPicture().getPictureArray().getAPI();
                }
            }
            CandidatePersonArray.prototype.construct = function (xml) {
                this.face = null;
                this.personGroup = null;
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
                if (xml.hasProperty("personGroupID") == true) {
                    var personGroupID = xml.getProperty("personGroupID");
                    var personGroupArray = this.api.getPersonGroupArray();
                    if (personGroupArray.has(personGroupID) == true)
                        this.personGroup = personGroupArray.get(personGroupID);
                }
                _super.prototype.construct.call(this, xml);
            };
            CandidatePersonArray.prototype.constructByJSON = function (data) {
                this.clear();
                var array = data["candidates"];
                for (var i = 0; i < array.length; i++) {
                    var candidatePerson = new faceapi.CandidatePerson(this);
                    candidatePerson.constructByJSON(array[i]);
                    this.push(candidatePerson);
                }
            };
            CandidatePersonArray.prototype.createChild = function (xml) {
                if (xml.hasProperty("personID") == true)
                    return new faceapi.CandidatePerson(this);
                else
                    return null;
            };
            CandidatePersonArray.prototype.getAPI = function () {
                return this.api;
            };
            CandidatePersonArray.prototype.getFace = function () {
                return this.face;
            };
            CandidatePersonArray.prototype.getPersonGroup = function () {
                return this.personGroup;
            };
            CandidatePersonArray.prototype.TAG = function () {
                return "candidatePersonArray";
            };
            CandidatePersonArray.prototype.CHILD_TAG = function () {
                return "candidatePerson";
            };
            CandidatePersonArray.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.face != null)
                    xml.setProperty("faceID", this.face.getID());
                if (this.personGroup != null)
                    xml.setProperty("personGroupID", this.personGroup.getID());
                return xml;
            };
            return CandidatePersonArray;
        })(samchon.protocol.EntityArray);
        faceapi.CandidatePersonArray = CandidatePersonArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
