var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceAPI;
    (function (faceAPI) {
        var basic;
        (function (basic) {
            var Point = (function (_super) {
                __extends(Point, _super);
                function Point(tag) {
                    if (tag === void 0) { tag = ""; }
                    _super.call(this);
                    this.tag = tag;
                    this.x = 0;
                    this.y = 0;
                }
                Point.prototype.constructByJSON = function (val) {
                    faceAPI.Global.fetch(this, val);
                };
                Point.prototype.getX = function () {
                    return this.x;
                };
                Point.prototype.getY = function () {
                    return this.y;
                };
                Point.prototype.TAG = function () {
                    return this.tag;
                };
                Point.prototype.toXML = function () {
                    var xml = _super.prototype.toXML.call(this);
                    xml.eraseProperty("tag");
                    return xml;
                };
                return Point;
            })(Entity);
            basic.Point = Point;
        })(basic = faceAPI.basic || (faceAPI.basic = {}));
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
