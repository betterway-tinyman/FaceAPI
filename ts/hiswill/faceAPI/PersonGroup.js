var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var PersonGroup = (function (_super) {
            __extends(PersonGroup, _super);
            function PersonGroup(groupArray, name) {
                if (name === void 0) { name = ""; }
                _super.call(this);
                this.groupArray = groupArray;
                this.id = "";
                this.name = name;
                this.registered = false;
                this.trained = false;
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
            }
            PersonGroup.prototype.createChild = function (xml) {
                return new faceapi.Person(this, xml.getProperty("name"));
            };
            PersonGroup.prototype.train = function () {
                if (this.isRegistered() == false)
                    throw new std.LogicError("Must be registered on server.");
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id + "/train", "POST", null, null, function (data) {
                    setTimeout(PersonGroup.checkTrainStatus, 50, this_);
                });
            };
            PersonGroup.checkTrainStatus = function (this_) {
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this_.id + "/training", "GET", null, null, function (data) {
                    var status = data["status"];
                    trace("on progress", status);
                    if (status == "succeeded") {
                        this_.trained = true;
                        this_.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.TRAIN));
                    }
                    else if (status == "failed") {
                        var errorEvent = new ErrorEvent();
                        errorEvent.message = data["message"];
                        this_.dispatchEvent(errorEvent);
                    }
                    else {
                        setTimeout(PersonGroup.checkTrainStatus, 50, this_);
                    }
                });
            };
            PersonGroup.prototype.identify = function (face, maxCandidates) {
                if (maxCandidates === void 0) { maxCandidates = 1; }
                if (this.isTrained() == false)
                    throw new std.LogicError("Must be trained as a pre-process.");
                var this_ = this;
                var candidatePersonArray = new faceapi.CandidatePersonArray(face, this);
                trace("PersonGroup::identify", this.id, face.getID(), maxCandidates);
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/identify", "POST", null, {
                    "personGroupId": this.id,
                    "faceIds": [face.getID()],
                    "maxNumOfCandidatesReturned": maxCandidates
                }, function (data) {
                    candidatePersonArray.constructByJSON(data);
                    this_.dispatchEvent(new faceapi.IdentifyEvent(this_, face, maxCandidates, candidatePersonArray));
                });
            };
            PersonGroup.prototype.insertToServer = function () {
                if (this.id == "")
                    this.id = faceapi.FaceAPI.issueID("person_group");
                var this_ = this;
                trace("PersonGroup::insertToServer");
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "PUT", null, { "name": this.name, "userData": "" }, function (data) {
                    this_.registered = true;
                    this_.dispatchRegisterEvent();
                });
            };
            PersonGroup.prototype.eraseFromServer = function () {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "DELETE", { "personGroupId": this.id }, null, function (data) {
                    this_.trained = false;
                    this_.registered = false;
                    this_.dispatchUnregisterEvent();
                });
            };
            PersonGroup.prototype.key = function () {
                return this.id;
            };
            PersonGroup.prototype.getGroupArray = function () {
                return this.groupArray;
            };
            PersonGroup.prototype.getID = function () {
                return this.id;
            };
            PersonGroup.prototype.getName = function () {
                return this.name;
            };
            PersonGroup.prototype.isRegistered = function () {
                return this.registered;
                ;
            };
            PersonGroup.prototype.isTrained = function () {
                return this.trained;
            };
            PersonGroup.prototype.setName = function (name) {
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "PATCH", null, { "name": name, "userData": "" }, null);
                this.name = name;
            };
            PersonGroup.prototype.TAG = function () {
                return "personGroup";
            };
            PersonGroup.prototype.CHILD_TAG = function () {
                return "person";
            };
            return PersonGroup;
        })(faceapi.AsyncEntityArray);
        faceapi.PersonGroup = PersonGroup;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
