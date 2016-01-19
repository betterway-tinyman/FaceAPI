var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var CandidatePerson = (function (_super) {
            __extends(CandidatePerson, _super);
            function CandidatePerson(personArray) {
                _super.call(this);
                this.personArray = personArray;
            }
            CandidatePerson.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                this.person = null;
                if (xml.hasProperty("personID") == false)
                    return;
                var personID = xml.getProperty("personID");
                var personGroup = this.personArray.getPersonGroup();
                if (personGroup != null && personGroup.has(personID) == true)
                    this.person = personGroup.get(personID);
            };
            CandidatePerson.prototype.constructByJSON = function (obj) {
                faceapi.Global.fetch(this, obj);
                var personGroup = this.personArray.getPersonGroup();
                var personID = obj["personId"];
                if (personGroup != null && personGroup.has(personID) == true)
                    this.person = personGroup.get(personID);
                else
                    this.person = null;
            };
            CandidatePerson.prototype.getPersonArray = function () {
                return this.personArray;
            };
            CandidatePerson.prototype.getPerson = function () {
                return this.person;
            };
            CandidatePerson.prototype.getConfidence = function () {
                return this.confidence;
            };
            CandidatePerson.prototype.TAG = function () {
                return "candidatePerson";
            };
            CandidatePerson.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.person != null)
                    xml.setProperty("personID", this.person.getID());
                return xml;
            };
            return CandidatePerson;
        })(samchon.protocol.Entity);
        faceapi.CandidatePerson = CandidatePerson;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
