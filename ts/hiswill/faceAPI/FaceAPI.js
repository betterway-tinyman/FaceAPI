var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var trace = samchon.trace;
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceAPI = (function (_super) {
            __extends(FaceAPI, _super);
            function FaceAPI() {
                _super.call(this);
                this.personGroupArray = new faceapi.PersonGroupArray(this);
                this.faceListArray = new faceapi.FaceListArray(this);
                this.pictureArray = new faceapi.PictureArray(this);
            }
            FaceAPI.prototype.createPersonGroup = function (name) {
                var personGroup = new faceapi.PersonGroup(this.personGroupArray, name);
                this.personGroupArray.push(personGroup);
                return personGroup;
            };
            FaceAPI.prototype.createFaceList = function (name) {
                var faceList = new faceapi.FaceList(this.faceListArray, name);
                this.faceListArray.push(faceList);
                return faceList;
            };
            FaceAPI.prototype.createPicture = function (url) {
                var picture = new faceapi.Picture(this.pictureArray, url);
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
            FaceAPI.query = function (url, method, params, data, success, async) {
                if (async === void 0) { async = false; }
                $.ajax({
                    url: url + (params == null ? "" : "?" + $.param(params)),
                    beforeSend: function (xhrObj) {
                        xhrObj.setRequestHeader("Content-Type", "application/json");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", FaceAPI.CERTIFICATION_KEY);
                    },
                    type: method,
                    async: async,
                    timeout: 1000,
                    data: (data == null) ? "" : JSON.stringify(data),
                    success: function (data, textStatus, jqXHR) {
                        if (success != null)
                            success.apply(null, [data, textStatus, jqXHR]);
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        trace(JSON.stringify(jqXHR), url);
                    }
                });
            };
            FaceAPI.issueID = function (prefix) {
                return prefix + "_hiswill_" + new Date().getTime() + "_" + (++FaceAPI.sequence);
            };
            FaceAPI.main = function () {
                samchon.trace("FaceAPI::main()");
                var faceAPI = new FaceAPI();
                var picture = faceAPI.createPicture("http://samchon.org/download/group_others2.jpg");
                picture.addEventListener(faceapi.FaceEvent.DETECT, function (event) {
                    samchon.trace("Detected");
                });
                picture.detect();
            };
            FaceAPI.sequence = 0;
            return FaceAPI;
        })(samchon.protocol.Entity);
        faceapi.FaceAPI = FaceAPI;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
