var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var PictureArray = (function (_super) {
            __extends(PictureArray, _super);
            function PictureArray(api) {
                _super.call(this);
                this.api = api;
            }
            PictureArray.prototype.createChild = function (xml) {
                return new faceapi.Picture(this, xml.getProperty("url"));
            };
            PictureArray.prototype.getAPI = function () {
                return this.api;
            };
            PictureArray.prototype.hasURL = function (url) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).getURL() == url)
                        return true;
                return false;
            };
            PictureArray.prototype.getByURL = function (url) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).getURL() == url)
                        return this.at(i);
                throw Error("out of range");
            };
            PictureArray.prototype.TAG = function () {
                return "pictureArray";
            };
            PictureArray.prototype.CHILD_TAG = function () {
                return "picture";
            };
            return PictureArray;
        })(samchon.protocol.EntityArray);
        faceapi.PictureArray = PictureArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
