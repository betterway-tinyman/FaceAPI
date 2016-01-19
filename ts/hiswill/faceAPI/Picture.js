var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var Picture = (function (_super) {
            __extends(Picture, _super);
            function Picture(pictureArray, url) {
                if (url === void 0) { url = ""; }
                _super.call(this);
                this.pictureArray = pictureArray;
                this.url = url;
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
            }
            Picture.prototype.constructByJSON = function (val) {
                this.clear();
                var array = val;
                for (var i = 0; i < array.length; i++) {
                    var face = new faceapi.Face(this);
                    face.constructByJSON(array[i]);
                    this.push(face);
                }
            };
            Picture.prototype.createChild = function (xml) {
                return new faceapi.Face(this);
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
                trace("url", this.url);
            };
            Picture.prototype.hasEventListener = function (type) {
                return this.eventDispatcher.hasEventListener(type);
            };
            Picture.prototype.dispatchEvent = function (event) {
                return this.eventDispatcher.dispatchEvent(event);
            };
            Picture.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.eventDispatcher.addEventListener(type, listener, thisArg);
            };
            Picture.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.removeEventListener(type, listener, thisArg);
            };
            Picture.prototype.TAG = function () {
                return "person";
            };
            Picture.prototype.CHILD_TAG = function () {
                return "face";
            };
            return Picture;
        })(samchon.protocol.EntityArray);
        faceapi.Picture = Picture;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
