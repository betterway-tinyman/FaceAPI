var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceAPI;
    (function (faceAPI) {
        var faceList;
        (function (faceList) {
            var FaceList = (function (_super) {
                __extends(FaceList, _super);
                function FaceList(listArray, name) {
                    if (name === void 0) { name = ""; }
                    _super.call(this, name);
                    this.listArray = listArray;
                    this.id = "";
                    this.name = name;
                    this.registered = false;
                }
                FaceList.prototype.insertToServer = function () {
                    if (this.id == "")
                        this.id = faceAPI.FaceAPI.issueID("face_list");
                    var this_ = this;
                    var url = "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id;
                    var method = "PUT";
                    var params = { "faceListId": this.id };
                    var data = {
                        "name": this.name,
                        "userData": ""
                    };
                    var success = function (data) {
                        this_.registered = true;
                    };
                    faceAPI.FaceAPI.query(url, method, params, data, success);
                };
                FaceList.prototype.eraseFromServer = function () {
                    var url = "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id;
                    var method = "DELETE";
                    var params = { "faceListId": this.id };
                    faceAPI.FaceAPI.query(url, method, params, null, null);
                    _super.prototype.eraseFromServer.call(this);
                };
                FaceList.prototype.setNameInServer = function (name) {
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id, "PATCH", { "faceListId": this.id }, {
                        "name": this.name,
                        "userData": ""
                    }, null);
                };
                FaceList.prototype.insertFaceToServer = function (face) {
                    if (this.isRegistered() == false)
                        this.insertToServer();
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces", "POST", {
                        "faceListId": this.id,
                        "userData": "",
                        "targetFace": "targetFace=" + face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight()
                    }, {
                        "url": face.getPictureURL()
                    }, function (data) {
                        face.setID(data["persistedFaceId"]);
                    });
                };
                FaceList.prototype.eraseFaceFromServer = function (face) {
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces/" + face.getID(), "DELETE", {
                        "faceListId": this.id,
                        "persistedFaceId": face.getID()
                    }, null, null);
                    _super.prototype.eraseFaceFromServer.call(this, face);
                };
                FaceList.prototype.getAPI = function () {
                    return this.listArray.getAPI();
                };
                FaceList.prototype.getListArray = function () {
                    return this.listArray;
                };
                FaceList.prototype.TAG = function () {
                    return "faceList";
                };
                return FaceList;
            })(faceAPI.face.FacePairArray);
            faceList.FaceList = FaceList;
        })(faceList = faceAPI.faceList || (faceAPI.faceList = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
