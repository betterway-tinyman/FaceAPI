var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceAPI;
    (function (faceAPI) {
        var person;
        (function (person) {
            var Person = (function (_super) {
                __extends(Person, _super);
                function Person(group, name) {
                    if (name === void 0) { name = ""; }
                    _super.call(this);
                    this.group = group;
                    this.name = name;
                }
                Person.prototype.insertToServer = function () {
                    if (this.isRegistered() == false)
                        this.insertToServer();
                    var this_ = this;
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons", "POST", { "personGroupId": this.group.getID() }, { "name": this.name, "userData": "" }, function (data) {
                        this_.id = data["personId"];
                        this_.registered = true;
                    });
                };
                Person.prototype.eraseFromServer = function () {
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id, "DELETE", {
                        "personGroupId": this.group.getID(),
                        "personId": this.id
                    }, null, function (data) {
                    });
                    this.id = "";
                    _super.prototype.eraseFromServer.call(this);
                };
                Person.prototype.setNameInServer = function (name) {
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id, "PATCH", {
                        "personGroupId": this.group.getID(),
                        "personId": this.id
                    }, {
                        "name": this.name,
                        "userData": ""
                    }, null);
                };
                Person.prototype.insertFaceToServer = function (face) {
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces", "POST", {
                        "personGroupId": this.group.getID(),
                        "personId": this.id,
                        "targetFace": "targetFace=" + face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight(),
                        "userData": ""
                    }, {
                        "url": face.getPictureURL()
                    }, function (data) {
                        face.setID(data["persistedFaceId"]);
                    });
                };
                Person.prototype.eraseFaceFromServer = function (face) {
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces/" + face.getID(), "DELETE", {
                        "personGroupId": this.group.getID(),
                        "personId": this.id,
                        "persistedFaceId": face.getID()
                    }, null, null);
                    _super.prototype.eraseFaceFromServer.call(this, face);
                };
                Person.prototype.getGroup = function () {
                    return this.group;
                };
                Person.prototype.TAG = function () {
                    return "person";
                };
                return Person;
            })(faceAPI.face.FacePairArray);
            person.Person = Person;
        })(person = faceAPI.person || (faceAPI.person = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
