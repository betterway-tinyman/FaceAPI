var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
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
                return new faceapi.FacePair(this);
            };
            FacePairArray.prototype.insertFaceToServer = function (face) {
                throw new std.AbstractMethodError("FacePair::insertFaceToServer() has to be overriden.");
            };
            FacePairArray.prototype.eraseFaceFromServer = function (face) {
                throw new std.AbstractMethodError("FacePair::eraseFaceFromServer() has to be overriden.");
            };
            FacePairArray.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var position = args[0];
                if (args.length == 2 && args[1] instanceof faceapi.FaceRectangle) {
                    var rectangle = args[1];
                    return _super.prototype.insert.call(this, position, this.deductFacePair(rectangle));
                }
                else if (args.length == 3 && args[1] instanceof std.Iterator && args[2] instanceof std.Iterator) {
                    var begin = args[1];
                    var end = args[2];
                    var myChildren = new std.List();
                    for (var it = begin; it.equals(end) == false; it = it.next())
                        myChildren.pushBack(this.deductFacePair(it.value));
                    return _super.prototype.insert.call(this, position, myChildren.begin(), myChildren.end());
                }
                else
                    throw new std.InvalidArgument("invalid parameter(s).");
            };
            FacePairArray.prototype.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                var newItems = new Array();
                for (var i = 0; i < items.length; i++)
                    newItems.push(this.deductFacePair(items[i]));
                return _super.prototype.push.apply(this, newItems);
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
                this.name = name;
            };
            FacePairArray.prototype.deductFacePair = function (rectangle) {
                var facePair;
                if (rectangle instanceof faceapi.FacePair)
                    facePair = rectangle;
                else {
                    facePair = new faceapi.FacePair(this);
                    facePair.setRectangle(rectangle);
                    if (rectangle instanceof faceapi.Face)
                        facePair.setFile(rectangle);
                }
                return facePair;
            };
            FacePairArray.prototype.CHILD_TAG = function () {
                return "facePair";
            };
            return FacePairArray;
        })(faceapi.AsyncEntityArray);
        faceapi.FacePairArray = FacePairArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
