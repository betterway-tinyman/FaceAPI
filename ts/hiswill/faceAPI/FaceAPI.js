var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceAPI;
    (function (faceAPI) {
        var FaceAPI = (function (_super) {
            __extends(FaceAPI, _super);
            function FaceAPI() {
                _super.call(this);
                this.personGroupArray = new faceAPI.person.PersonGroupArray(this);
                this.faceListArray = new faceAPI.faceList.FaceListArray(this);
                this.pictureArray = new faceAPI.picture.PictureArray(this);
            }
            FaceAPI.prototype.createPersonGroup = function (name) {
                var personGroup = new faceAPI.person.PersonGroup(this.personGroupArray, name);
                this.personGroupArray.push(personGroup);
                return personGroup;
            };
            FaceAPI.prototype.createFaceList = function (name) {
                var faceList = new faceAPI.faceList.FaceList(this.faceListArray, name);
                this.faceListArray.push(faceList);
                return faceList;
            };
            FaceAPI.prototype.createPicture = function (url) {
                var picture = new faceAPI.picture.Picture(this.pictureArray, url);
                this.pictureArray.push(picture);
                return picture;
            };
            FaceAPI.prototype.getPersonGroupArray = function () {
                return this.personGroupArray;
            };
            FaceAPI.prototype.getFaceListArray = function () {
                return this.faceListArray;
            };
            FaceAPI.prototype.getPictureArray = function () {
                return this.pictureArray;
            };
            FaceAPI.prototype.TAG = function () {
                return "faceAPI";
            };
            FaceAPI.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.personGroupArray.toXML(), this.pictureArray.toXML());
                return xml;
            };
            Object.defineProperty(FaceAPI, "CERTIFICATION_KEY", {
                get: function () {
                    return "b072c71311d144388ac2527a5f06ffca";
                },
                enumerable: true,
                configurable: true
            });
            FaceAPI.query = function (url, method, params, data, success) {
                $.ajax({
                    url: url + (params == null ? "" : "?" + $.param(params)),
                    beforeSend: function (xhrObj) {
                        xhrObj.setRequestHeader("Content-Type", "application/json");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", FaceAPI.CERTIFICATION_KEY);
                    },
                    type: method,
                    async: false,
                    data: (data == null) ? "" : JSON.stringify(data),
                    success: function (data) {
                        if (success != null)
                            success.apply(data);
                    }
                });
            };
            FaceAPI.issueID = function (prefix) {
                var date = new Date();
                return prefix + "_hiswill_" + date.toString() + "_" + (++FaceAPI.sequence);
            };
            FaceAPI.main = function () {
                var api = new FaceAPI();
            };
            FaceAPI.sequence = 0;
            return FaceAPI;
        })(Entity);
        faceAPI.FaceAPI = FaceAPI;
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
