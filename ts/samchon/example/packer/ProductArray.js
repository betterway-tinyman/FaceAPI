var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var packer;
        (function (packer) {
            var ProductArray = (function (_super) {
                __extends(ProductArray, _super);
                function ProductArray() {
                    _super.call(this);
                }
                ProductArray.prototype.createChild = function (xml) {
                    return new packer.Product();
                };
                ProductArray.prototype.TAG = function () {
                    return "productArray";
                };
                ProductArray.prototype.CHILD_TAG = function () {
                    return "product";
                };
                return ProductArray;
            })(samchon.protocol.EntityArray);
            packer.ProductArray = ProductArray;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
