var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
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
            FaceList.prototype.findSimilars = function (face, maxCandidates) {
                var this_ = this;
                var similarFaceArray = new faceapi.SimilarFaceArray(face, this);
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/findsimilars", "POST", {
                    "faceId": face.getID(),
                    "faceListId": this.id,
                    "maxNumOfCandidatesReturned": maxCandidates
                }, null, function (data) {
                    similarFaceArray.constructByJSON(data);
                    this_.dispatchEvent(new faceapi.FindSimilarEvent(this_, face, maxCandidates, similarFaceArray));
                });
            };
            FaceList.prototype.insertToServer = function () {
                if (this.id == "")
                    this.id = faceapi.FaceAPI.issueID("face_list");
                var this_ = this;
                var url = "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id;
                var method = "PUT";
                var params = { "faceListId": this.id };
                var data = {
                    "name": this.name,
                    "userData": ""
                };
                var success = function (data) {
                    this_.dispatchRegisterEvent();
                };
                faceapi.FaceAPI.query(url, method, params, data, success);
            };
            FaceList.prototype.eraseFromServer = function () {
                var this_ = this;
                var url = "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id;
                var method = "DELETE";
                var params = { "faceListId": this.id };
                var func = function (data) {
                    this_.dispatchUnregisterEvent();
                };
                faceapi.FaceAPI.query(url, method, params, null, func);
            };
            FaceList.prototype.insertFaceToServer = function (face) {
                if (this.isRegistered() == false)
                    this.insertToServer();
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces", "POST", {
                    "userData": "",
                    "targetFace": face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight()
                }, {
                    "url": face.getPictureURL()
                }, function (data) {
                    face.setID(data["persistedFaceId"]);
                });
            };
            FaceList.prototype.eraseFaceFromServer = function (face) {
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces/" + face.getID(), "DELETE", {
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
            FaceList.prototype.setName = function (name) {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id, "PATCH", { "faceListId": this.id }, {
                    "name": this.name,
                    "userData": ""
                }, function (data) {
                    this_.name = name;
                });
            };
            FaceList.prototype.TAG = function () {
                return "faceList";
            };
            return FaceList;
        })(faceapi.FacePairArray);
        faceapi.FaceList = FaceList;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
