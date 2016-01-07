var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceAPI;
    (function (faceAPI) {
        var face;
        (function (face_1) {
            var FacePairArray = (function (_super) {
                __extends(FacePairArray, _super);
                function FacePairArray(name) {
                    if (name === void 0) { name = ""; }
                    _super.call(this);
                    this.id = "";
                    this.name = name;
                    this.registered = false;
                }
                FacePairArray.prototype.createChild = function (xml) {
                    return new face_1.FacePair(this);
                };
                FacePairArray.prototype.push = function () {
                    var items = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        items[_i - 0] = arguments[_i];
                    }
                    if (this.isRegistered() == false)
                        this.insertToServer();
                    for (var i = 0; i < items.length; i++) {
                        if (items[i] instanceof face_1.FacePair == false) {
                            var pair = new face_1.FacePair(this);
                            if (items[i] instanceof face_1.Face)
                                pair.setFile(items[i]);
                            else
                                pair.setRectangle(items[i]);
                            items[i] = pair;
                        }
                        items[i].insertToServer();
                    }
                    return this.length;
                };
                FacePairArray.prototype.splice = function (start, end) {
                    var items = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        items[_i - 2] = arguments[_i];
                    }
                    for (var i = start; i < Math.min(start + end, this.length); i++)
                        this[i].eraseFromServer();
                    var output = _super.prototype.splice.call(this, start, end);
                    this.push.apply(this, items);
                    return output;
                };
                FacePairArray.prototype.insertToServer = function () {
                };
                FacePairArray.prototype.eraseFromServer = function () {
                    this.registered = false;
                };
                FacePairArray.prototype.setNameInServer = function (name) {
                };
                FacePairArray.prototype.insertFaceToServer = function (face) {
                };
                FacePairArray.prototype.eraseFaceFromServer = function (face) {
                    face.setID("");
                };
                FacePairArray.prototype.key = function () {
                    return this.id;
                };
                FacePairArray.prototype.getFaceAPI = function () {
                    return null;
                };
                FacePairArray.prototype.getID = function () {
                    return this.id;
                };
                FacePairArray.prototype.getName = function () {
                    return this.name;
                };
                FacePairArray.prototype.isRegistered = function () {
                    return this.registered;
                };
                FacePairArray.prototype.setName = function (name) {
                    this.setNameInServer(name);
                    this.name = name;
                };
                FacePairArray.prototype.CHILD_TAG = function () {
                    return "facePair";
                };
                return FacePairArray;
            })(EntityArray);
            face_1.FacePairArray = FacePairArray;
        })(face = faceAPI.face || (faceAPI.face = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
