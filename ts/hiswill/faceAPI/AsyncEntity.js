var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var AsyncEntity = (function (_super) {
            __extends(AsyncEntity, _super);
            function AsyncEntity() {
                _super.call(this);
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
                this.registered = false;
            }
            AsyncEntity.prototype.isRegistered = function () {
                return this.registered;
            };
            AsyncEntity.prototype.insertToServer = function () {
                throw new std.AbstractMethodError("AsynEntity::insertToServer() is not overriden.");
            };
            AsyncEntity.prototype.eraseFromServer = function () {
                throw new std.AbstractMethodError("AsyncEntity::EraseFromServer() is not overriden.");
            };
            AsyncEntity.prototype.dispatchRegisterEvent = function () {
                this.registered = true;
                this.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.REGISTER));
            };
            AsyncEntity.prototype.dispatchUnregisterEvent = function () {
                this.registered = false;
                this.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.UNREGISTER));
            };
            AsyncEntity.prototype.hasEventListener = function (type) {
                return this.eventDispatcher.hasEventListener(type);
            };
            AsyncEntity.prototype.dispatchEvent = function (event) {
                return this.eventDispatcher.dispatchEvent(event);
            };
            AsyncEntity.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.eventDispatcher.addEventListener(type, listener, thisArg);
            };
            AsyncEntity.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.removeEventListener(type, listener, thisArg);
            };
            return AsyncEntity;
        })(samchon.protocol.Entity);
        faceapi.AsyncEntity = AsyncEntity;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
