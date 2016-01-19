var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var Eyebrows = (function (_super) {
            __extends(Eyebrows, _super);
            function Eyebrows(landmarks) {
                _super.call(this, landmarks);
                this.left = new faceapi.Eyebrow(this, faceapi.Direction.LEFT);
                this.right = new faceapi.Eyebrow(this, faceapi.Direction.RIGHT);
            }
            Eyebrows.prototype.constructByJSON = function (obj) {
                this.left.constructByJSON(obj);
                this.right.constructByJSON(obj);
            };
            Eyebrows.prototype.getLeft = function () {
                return this.left;
            };
            Eyebrows.prototype.getRight = function () {
                return this.right;
            };
            Eyebrows.prototype.TAG = function () {
                return "eyeBrows";
            };
            Eyebrows.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.left.toXML(), this.right.toXML());
                return xml;
            };
            return Eyebrows;
        })(faceapi.FaceLandmark);
        faceapi.Eyebrows = Eyebrows;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
