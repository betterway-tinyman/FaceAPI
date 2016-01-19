var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var PersonGroupArray = (function (_super) {
            __extends(PersonGroupArray, _super);
            function PersonGroupArray(api) {
                _super.call(this);
                this.api = api;
            }
            PersonGroupArray.prototype.createChild = function (xml) {
                return new faceapi.PersonGroup(this, xml.getProperty("name"));
            };
            PersonGroupArray.prototype.getAPI = function () {
                return this.api;
            };
            PersonGroupArray.prototype.TAG = function () {
                return "personGroupArray";
            };
            PersonGroupArray.prototype.CHILD_TAG = function () {
                return "personGroup";
            };
            return PersonGroupArray;
        })(samchon.protocol.EntityArray);
        faceapi.PersonGroupArray = PersonGroupArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
