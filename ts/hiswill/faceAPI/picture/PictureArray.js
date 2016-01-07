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
            var PictureArray = (function (_super) {
                __extends(PictureArray, _super);
                function PictureArray(api) {
                    _super.call(this);
                    this.api = api;
                }
                PictureArray.prototype.createChild = function (xml) {
                    return new picture.Picture(this, xml.getProperty("url"));
                };
                PictureArray.prototype.hasURL = function (url) {
                    for (var i = 0; i < this.length; i++)
                        if (this[i].getURL() == url)
                            return true;
                    return false;
                };
                PictureArray.prototype.getByURL = function (url) {
                    for (var i = 0; i < this.length; i++)
                        if (this[i].getURL() == url)
                            return this[i];
                    throw Error("out of range");
                };
                PictureArray.prototype.TAG = function () {
                    return "pictureArray";
                };
                PictureArray.prototype.CHILD_TAG = function () {
                    return "picture";
                };
                return PictureArray;
            })(EntityArray);
            picture.PictureArray = PictureArray;
        })(picture = faceAPI.picture || (faceAPI.picture = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
