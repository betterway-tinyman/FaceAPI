var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var AsyncEntityArray = (function (_super) {
            __extends(AsyncEntityArray, _super);
            function AsyncEntityArray() {
                _super.call(this);
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
                this.queueingList = new std.List();
                this.registered = false;
            }
            AsyncEntityArray.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var position = args[0];
                var index = position.getIndex();
                var prevSize = this.size();
                var res = _super.prototype.insert.apply(this, args);
                var insertedSize = this.size() - prevSize;
                for (var i = index; i < index + insertedSize; i++)
                    this.inserted(new std.VectorIterator(this, i));
            };
            AsyncEntityArray.prototype.inserted = function (it) {
                var child = it.value;
                child.addEventListener(faceapi.FaceEvent.REGISTER, this.handleRegisteredChild, this);
                if (this.registered == false || this.queueingList.empty() == false)
                    this.queueingList.pushBack(child);
                else
                    child.insertToServer();
            };
            AsyncEntityArray.prototype.erased = function (it) {
                var child = it.value;
                if (child.isRegistered() == false) {
                    for (var q_it = this.queueingList.begin(); q_it.equals(this.queueingList.end()) == false; q_it = q_it.next())
                        if (q_it.value == child) {
                            this.queueingList.erase(q_it);
                            break;
                        }
                }
                else
                    it.value.eraseFromServer();
            };
            AsyncEntityArray.prototype.dispatchRegisterEvent = function () {
                this.registered = true;
                if (this.queueingList.empty() == false)
                    this.queueingList.front().insertToServer();
                this.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.REGISTER));
            };
            AsyncEntityArray.prototype.dispatchUnregisterEvent = function () {
                this.registered = false;
                this.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.UNREGISTER));
            };
            AsyncEntityArray.prototype.handleRegisteredChild = function (event) {
                var child = event.target;
                child.removeEventListener(faceapi.FaceEvent.REGISTER, this.handleRegisteredChild, this);
                this.queueingList.popFront();
                if (this.queueingList.empty() == false)
                    this.queueingList.front().insertToServer();
            };
            AsyncEntityArray.prototype.isRegistered = function () {
                return this.registered && this.queueingList.empty() == true;
            };
            AsyncEntityArray.prototype.insertToServer = function () {
                throw new std.AbstractMethodError("insertToServer is not overriden.");
            };
            AsyncEntityArray.prototype.eraseFromServer = function () {
                throw new std.AbstractMethodError("insertToServer is not overriden.");
            };
            AsyncEntityArray.prototype.hasEventListener = function (type) {
                return this.eventDispatcher.hasEventListener(type);
            };
            AsyncEntityArray.prototype.dispatchEvent = function (event) {
                return this.eventDispatcher.dispatchEvent(event);
            };
            AsyncEntityArray.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.eventDispatcher.addEventListener(type, listener, thisArg);
            };
            AsyncEntityArray.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.removeEventListener(type, listener, thisArg);
            };
            return AsyncEntityArray;
        })(samchon.protocol.EntityArray);
        faceapi.AsyncEntityArray = AsyncEntityArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
