var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceAPI;
    (function (faceAPI) {
        var picture;
        (function (picture) {
            var Picture = (function (_super) {
                __extends(Picture, _super);
                function Picture(pictureArray, url) {
                    if (url === void 0) { url = ""; }
                    _super.call(this);
                    this.pictureArray = pictureArray;
                    this.url = url;
                }
                Picture.prototype.constructByJSON = function (val) {
                    var array = val;
                    for (var i = 0; i < array.length; i++) {
                        var face = new faceAPI.face.Face(this);
                        face.constructByJSON(array[i]);
                        this.push(face);
                    }
                };
                Picture.prototype.createChild = function (xml) {
                    return new faceAPI.face.Face(this);
                };
                Picture.prototype.key = function () {
                    return this.url;
                };
                Picture.prototype.getPictureArray = function () {
                    return this.pictureArray;
                };
                Picture.prototype.getURL = function () {
                    return this.url;
                };
                Picture.prototype.detect = function () {
                    this.splice(0, this.length);
                    var this_ = this;
                    faceAPI.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/detect", "POST", {
                        "returnFaceId": "true",
                        "returnFaceLandmarks": "true",
                        "returnFaceAttributes": "age,gender,smile,facialHair,headPose",
                    }, { "url": this.url }, function (data) {
                        this_.constructByJSON(data);
                    });
                };
                Picture.prototype.TAG = function () {
                    return "person";
                };
                Picture.prototype.CHILD_TAG = function () {
                    return "face";
                };
                return Picture;
            })(EntityArray);
            picture.Picture = Picture;
        })(picture = faceAPI.picture || (faceAPI.picture = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
