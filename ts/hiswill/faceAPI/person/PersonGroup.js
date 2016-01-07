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
            var PersonGroup = (function (_super) {
                __extends(PersonGroup, _super);
                function PersonGroup(groupArray, name) {
                    if (name === void 0) { name = ""; }
                    _super.call(this);
                    this.groupArray = groupArray;
                    this.id = "";
                    this.name = name;
                    this.trained = false;
                    this.registered = false;
                }
                PersonGroup.prototype.createChild = function (xml) {
                    return new person.Person(this, xml.getProperty("name"));
                };
                PersonGroup.prototype.push = function () {
                    var items = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        items[_i - 0] = arguments[_i];
                    }
                    if (this.isRegistered() == false)
                        this.insertToServer();
                    for (var i = 0; i < items.length; i++)
                        items[i].insertToServer();
                    return _super.prototype.push.apply(this, items);
                };
                PersonGroup.prototype.splice = function (start, deleteCount) {
                    var items = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        items[_i - 2] = arguments[_i];
                    }
                    var i;
                    for (i = start; i < Math.min(start + deleteCount, this.length); i++)
                        items[i].eraseFromServer();
                    for (i = 0; i < items.length; i++)
                        items[i].insertToServer();
                    return _super.prototype.splice.apply(this, [start, deleteCount].concat(items));
                };
                PersonGroup.prototype.train = function () {
                    if (this.isRegistered() == false)
                        this.insertToServer();
                    var this_ = this;
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id + "/train", "POST", { "personGroupId": this.id }, null, function (data) {
                        this_.trained = true;
                    });
                };
                PersonGroup.prototype.identify = function (face, maxCandidates) {
                    if (maxCandidates === void 0) { maxCandidates = 1; }
                    if (this.isTrained() == false)
                        this.train();
                    var this_ = this;
                    var personArray = new Array();
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/identify", "POST", null, {
                        "personGroupId": this.id,
                        "faceIds": [face.getID()],
                        "maxNumOfCandidatesReturned": maxCandidates
                    }, function (args) {
                        var data = args[0];
                        var faces = data["candidates"];
                        for (var i = 0; i < faces.length; i++) {
                            var personID = faces[i]["personId"];
                            var confidence = faces[i]["confidence"];
                            if (this_.has(personID) == false)
                                continue;
                            var pair = new Pair(this_.get(personID), confidence);
                            personArray.push(pair);
                        }
                    });
                    return personArray;
                };
                PersonGroup.prototype.insertToServer = function () {
                    if (this.id == "")
                        this.id = faceAPI.FaceAPI.issueID("person_group");
                    var this_ = this;
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "PUT", { "personGroupId": this.id }, { "name": this.name, "userData": "" }, function (data) {
                        this_.registered = true;
                    });
                };
                PersonGroup.prototype.eraseFromServer = function () {
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "DELETE", { "personGroupId": this.id }, null, null);
                    this.trained = false;
                    this.registered = false;
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
                PersonGroup.prototype.TAG = function () {
                    return "personGroup";
                };
                PersonGroup.prototype.CHILD_TAG = function () {
                    return "person";
                };
                return PersonGroup;
            })(EntityArray);
            person.PersonGroup = PersonGroup;
        })(person = faceAPI.person || (faceAPI.person = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
