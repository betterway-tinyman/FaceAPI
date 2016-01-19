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
            var WrapperArray = (function (_super) {
                __extends(WrapperArray, _super);
                function WrapperArray(sample) {
                    if (sample === void 0) { sample = null; }
                    _super.call(this);
                    this.sample = sample;
                    this.reserved = new Array();
                }
                WrapperArray.prototype.construct = function (xml) {
                    _super.prototype.construct.call(this, xml);
                    this.sample = new packer.Wrapper();
                    this.sample.construct(xml);
                };
                WrapperArray.prototype.createChild = function (xml) {
                    return new packer.Wrapper();
                };
                WrapperArray.prototype.tryInsert = function (product) {
                    if (product.getVolume() > this.sample.getVolume() ||
                        product.getWeight() > this.sample.getWeight()) {
                        return false;
                    }
                    this.reserved.push(product);
                    return true;
                };
                WrapperArray.prototype.optimize = function () {
                    if (this.reserved.length == 0)
                        return;
                    var factorial = new samchon.library.FactorialGenerator(this.reserved.length);
                    var minWrapperArray;
                    for (var i = 0; i < factorial.size(); i++) {
                        var wrapperArray = new WrapperArray(this.sample);
                        var row = factorial.at(i);
                        for (var j = 0; j < row.length; j++) {
                            var product = this.reserved[row[j]];
                            if (wrapperArray.size() == 0 ||
                                wrapperArray.at(wrapperArray.size() - 1).tryInsert(product) == false) {
                                var wrapper = new packer.Wrapper(this.sample);
                                wrapper.tryInsert(product);
                                wrapperArray.push(wrapper);
                            }
                        }
                        if (minWrapperArray == null ||
                            wrapperArray.calcPrice() < minWrapperArray.calcPrice()) {
                            minWrapperArray = wrapperArray;
                        }
                    }
                    this.splice(0, this.size());
                    for (var i = 0; i < minWrapperArray.size(); i++)
                        this.push(minWrapperArray.at(i));
                };
                WrapperArray.prototype.calcPrice = function () {
                    return this.sample.getPrice() * this.size();
                };
                WrapperArray.prototype.getSample = function () {
                    return this.sample;
                };
                WrapperArray.prototype.TAG = function () {
                    return "wrapperArray";
                };
                WrapperArray.prototype.CHILD_TAG = function () {
                    return "wrapper";
                };
                WrapperArray.prototype.toXML = function () {
                    var xml = _super.prototype.toXML.call(this);
                    xml.addAllProperties(this.sample.toXML());
                    return xml;
                };
                return WrapperArray;
            })(samchon.protocol.EntityArray);
            packer.WrapperArray = WrapperArray;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
