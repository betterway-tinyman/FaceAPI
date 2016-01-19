var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var Eye = (function (_super) {
            __extends(Eye, _super);
            function Eye(eyes, direction) {
                _super.call(this);
                this.eyes = eyes;
                this.direction = direction;
                this.top = new faceapi.Point("top");
                this.bottom = new faceapi.Point("bottom");
                this.inner = new faceapi.Point("inner");
                this.outer = new faceapi.Point("outer");
                this.pupil = new faceapi.Pupil(this);
            }
            Eye.prototype.constructByJSON = function (obj) {
                if (this.direction == faceapi.Direction.LEFT) {
                    this.top.constructByJSON(obj["eyeLeftTop"]);
                    this.bottom.constructByJSON(obj["eyeLeftBottom"]);
                    this.inner.constructByJSON(obj["eyeLeftInner"]);
                    this.outer.constructByJSON(obj["eyeLeftOuter"]);
                    this.pupil.constructByJSON(obj["pupilLeft"]);
                }
                else {
                    this.top.constructByJSON(obj["eyeRightTop"]);
                    this.bottom.constructByJSON(obj["eyeRightBottom"]);
                    this.inner.constructByJSON(obj["eyeRightInner"]);
                    this.outer.constructByJSON(obj["eyeRightOuter"]);
                    this.pupil.constructByJSON(obj["pupilRight"]);
                }
            };
            Eye.prototype.getEyes = function () {
                return this.eyes;
            };
            Eye.prototype.getOpposite = function () {
                if (this.direction == faceapi.Direction.LEFT)
                    return this.eyes.getRight();
                else
                    return this.eyes.getLeft();
            };
            Eye.prototype.getTop = function () {
                return this.top;
            };
            Eye.prototype.getBottom = function () {
                return this.bottom;
            };
            Eye.prototype.getInner = function () {
                return this.inner;
            };
            Eye.prototype.getOuter = function () {
                return this.outer;
            };
            Eye.prototype.getPupil = function () {
                return this.pupil;
            };
            Eye.prototype.TAG = function () {
                if (this.direction == faceapi.Direction.LEFT)
                    return "left";
                else
                    return "right";
            };
            Eye.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.eraseProperty("direction");
                xml.push(this.top.toXML(), this.bottom.toXML(), this.inner.toXML(), this.outer.toXML(), this.pupil.toXML());
                return xml;
            };
            return Eye;
        })(samchon.protocol.Entity);
        faceapi.Eye = Eye;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
