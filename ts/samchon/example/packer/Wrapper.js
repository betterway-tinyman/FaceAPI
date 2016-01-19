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
            var Wrapper = (function (_super) {
                __extends(Wrapper, _super);
                function Wrapper() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    _super.call(this);
                    if (args.length == 1 && args[0] instanceof Wrapper) {
                        var wrapper = args[0];
                        this.name = wrapper.name;
                        this.price = wrapper.price;
                        this.volume = wrapper.volume;
                        this.weight = wrapper.weight;
                    }
                    else if (args.length == 4) {
                        this.name = args[0];
                        this.price = args[1];
                        this.volume = args[2];
                        this.weight = args[3];
                    }
                }
                Wrapper.prototype.createChild = function (xml) {
                    return new packer.Product();
                };
                Wrapper.prototype.tryInsert = function (product) {
                    var volume = 0;
                    var weight = 0;
                    for (var i = 0; i < this.size(); i++) {
                        volume += this.at(i).getVolume();
                        weight += this.at(i).getWeight();
                    }
                    if (product.getVolume() + volume > this.volume ||
                        product.getWeight() + weight > this.weight) {
                        return false;
                    }
                    this.push(product);
                    return true;
                };
                Wrapper.prototype.getName = function () {
                    return this.name;
                };
                Wrapper.prototype.getPrice = function () {
                    return this.price;
                };
                Wrapper.prototype.getVolume = function () {
                    return this.volume;
                };
                Wrapper.prototype.getWeight = function () {
                    return this.weight;
                };
                Wrapper.prototype.TAG = function () {
                    return "wrapper";
                };
                return Wrapper;
            })(packer.ProductArray);
            packer.Wrapper = Wrapper;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
