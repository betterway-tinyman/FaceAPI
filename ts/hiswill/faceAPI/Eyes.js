var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var Eyes = (function (_super) {
            __extends(Eyes, _super);
            function Eyes(landmarks) {
                _super.call(this, landmarks);
                this.left = new faceapi.Eye(this, faceapi.Direction.LEFT);
                this.right = new faceapi.Eye(this, faceapi.Direction.RIGHT);
            }
            Eyes.prototype.constructByJSON = function (obj) {
                this.left.constructByJSON(obj);
                this.right.constructByJSON(obj);
            };
            Eyes.prototype.getLeft = function () {
                return this.left;
            };
            Eyes.prototype.getRight = function () {
                return this.right;
            };
            Eyes.prototype.TAG = function () {
                return "eyes";
            };
            Eyes.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.left.toXML(), this.right.toXML());
                return xml;
            };
            return Eyes;
        })(faceapi.FaceLandmark);
        faceapi.Eyes = Eyes;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
