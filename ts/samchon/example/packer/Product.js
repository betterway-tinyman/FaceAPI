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
            var Product = (function (_super) {
                __extends(Product, _super);
                function Product(name, price, volume, weight) {
                    if (name === void 0) { name = ""; }
                    if (price === void 0) { price = 0; }
                    if (volume === void 0) { volume = 0; }
                    if (weight === void 0) { weight = 0; }
                    _super.call(this);
                    this.name = name;
                    this.price = price;
                    this.volume = volume;
                    this.weight = weight;
                }
                Product.prototype.getName = function () {
                    return this.name;
                };
                Product.prototype.getPrice = function () {
                    return this.price;
                };
                Product.prototype.getVolume = function () {
                    return this.volume;
                };
                Product.prototype.getWeight = function () {
                    return this.weight;
                };
                Product.prototype.TAG = function () {
                    return "product";
                };
                return Product;
            })(samchon.protocol.Entity);
            packer.Product = Product;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
