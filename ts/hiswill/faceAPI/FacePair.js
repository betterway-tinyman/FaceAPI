var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FacePair = (function (_super) {
            __extends(FacePair, _super);
            function FacePair(pairArray) {
                _super.call(this);
                this.pairArray = pairArray;
                this.id = "";
                this.pictureURL = "";
                this.face = null;
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
                this.registered = false;
            }
            FacePair.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                if (xml.hasProperty("faceID") == true) {
                    var pictureURL = xml.getProperty("pictureURL");
                    var faceID = xml.getProperty("faceID");
                    var pictureArray = this.pairArray.getFaceAPI().getPictureArray();
                    if (pictureArray.hasURL(pictureURL) == true && pictureArray.getByURL(pictureURL).has(faceID) == true)
                        this.face = pictureArray.getByURL(pictureURL).get(faceID);
                }
                else
                    this.face = null;
            };
            FacePair.prototype.insertToServer = function () {
                this.pairArray.insertFaceToServer(this);
            };
            FacePair.prototype.eraseFromServer = function () {
                this.pairArray.eraseFaceFromServer(this);
                this.registered = false;
            };
            FacePair.prototype.setFile = function (face) {
                this.face = face;
                this.pictureURL = face.getPicture().getURL();
                this.setRectangle(face);
            };
            FacePair.prototype.setRectangle = function (rectangle) {
                this.x = rectangle.getX();
                this.y = rectangle.getY();
                this.width = rectangle.getWidth();
                this.height = rectangle.getHeight();
            };
            FacePair.prototype.setID = function (id) {
                this.id = id;
                this.registered = (id != "");
            };
            FacePair.prototype.key = function () {
                return this.id;
            };
            FacePair.prototype.getPairArray = function () {
                return this.pairArray;
            };
            FacePair.prototype.getFace = function () {
                return this.face;
            };
            FacePair.prototype.getID = function () {
                return this.id;
            };
            FacePair.prototype.getPictureURL = function () {
                return this.pictureURL;
            };
            FacePair.prototype.isRegistered = function () {
                return this.registered;
            };
            FacePair.prototype.hasEventListener = function (type) {
                return this.eventDispatcher.hasEventListener(type);
            };
            FacePair.prototype.dispatchEvent = function (event) {
                return this.eventDispatcher.dispatchEvent(event);
            };
            FacePair.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.eventDispatcher.addEventListener(type, listener, thisArg);
            };
            FacePair.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.removeEventListener(type, listener, thisArg);
            };
            FacePair.prototype.TAG = function () {
                return "facePair";
            };
            FacePair.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.face != null)
                    xml.setProperty("faceID", this.face.getID());
                return xml;
            };
            return FacePair;
        })(faceapi.FaceRectangle);
        faceapi.FacePair = FacePair;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
