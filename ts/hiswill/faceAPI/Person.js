var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var Person = (function (_super) {
            __extends(Person, _super);
            function Person(group, name) {
                if (name === void 0) { name = ""; }
                _super.call(this);
                this.group = group;
                this.name = name;
            }
            Person.prototype.insertToServer = function () {
                if (this.group.isRegistered() == false)
                    this.group.insertToServer();
                var this_ = this;
                trace("Person::insertToServer", this.name, this.group.getID());
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons", "POST", null, { "name": this.name, "userData": "" }, function (data) {
                    this_.id = data["personId"];
                    this_.dispatchRegisterEvent();
                });
            };
            Person.prototype.eraseFromServer = function () {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id, "DELETE", {
                    "personGroupId": this.group.getID(),
                    "personId": this.id
                }, null, function (data) {
                    this_.id = "";
                    this_.dispatchUnregisterEvent();
                });
            };
            Person.prototype.insertFaceToServer = function (face) {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces", "POST", {
                    "personGroupId": this.group.getID(),
                    "personId": this.id,
                    "targetFace": face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight(),
                    "userData": ""
                }, {
                    "url": face.getPictureURL()
                }, function (data) {
                    face.setID(data["persistedFaceId"]);
                    face.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.REGISTER));
                });
            };
            Person.prototype.eraseFaceFromServer = function (face) {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces/" + face.getID(), "DELETE", {
                    "personGroupId": this.group.getID(),
                    "personId": this.id,
                    "persistedFaceId": face.getID()
                }, null, function (data) {
                    face.setID("");
                    face.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.UNREGISTER));
                });
            };
            Person.prototype.getGroup = function () {
                return this.group;
            };
            Person.prototype.setName = function (name) {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id, "PATCH", {
                    "personGroupId": this.group.getID(),
                    "personId": this.id
                }, {
                    "name": this.name,
                    "userData": ""
                }, function (data) {
                    this_.name = name;
                }, false);
            };
            Person.prototype.TAG = function () {
                return "person";
            };
            return Person;
        })(faceapi.FacePairArray);
        faceapi.Person = Person;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
