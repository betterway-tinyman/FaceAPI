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
        (function (packer_1) {
            var Packer = (function (_super) {
                __extends(Packer, _super);
                function Packer(obj) {
                    if (obj === void 0) { obj = null; }
                    _super.call(this);
                    if (obj == null) {
                        this.productArray = new packer_1.ProductArray();
                        return;
                    }
                    if (obj instanceof packer_1.ProductArray) {
                        this.productArray = obj;
                    }
                    else if (obj instanceof Packer) {
                        var packer = obj;
                        this.productArray = packer.productArray;
                        for (var i = 0; i < packer.size(); i++)
                            this.push(new packer_1.WrapperArray(packer.at(i).getSample()));
                    }
                    else
                        throw "invalid argument";
                }
                Packer.prototype.createChild = function (xml) {
                    return new packer_1.WrapperArray();
                };
                Packer.prototype.optimize = function (start, size) {
                    if (start === void 0) { start = 0; }
                    if (size === void 0) { size = -1; }
                    if (this.size() == 0 || this.productArray.size() == 0)
                        return;
                    var caseGenerator = new samchon.library.CombinedPermutationGenerator(this.size(), this.productArray.size());
                    var minPacker = null;
                    if (size == -1 || start + size > caseGenerator.size())
                        size = caseGenerator.size() - start;
                    for (var i = start; i < start + size; i++) {
                        var packer = new Packer(this);
                        var row = caseGenerator.at(i);
                        var validity = true;
                        for (var j = 0; j < row.length; j++) {
                            var product = this.productArray.at(j);
                            var wrapperArray = packer.at(row[j]);
                            if (wrapperArray.tryInsert(product) == false) {
                                validity = false;
                                break;
                            }
                        }
                        if (validity == false)
                            continue;
                        for (var j = 0; j < packer.size(); j++)
                            packer.at(j).optimize();
                        if (minPacker == null || packer.calcPrice() < minPacker.calcPrice())
                            minPacker = packer;
                    }
                    this.splice(0, this.size());
                    for (var i = 0; i < minPacker.size(); i++)
                        this.push(minPacker.at(i));
                };
                Packer.prototype.calcPrice = function () {
                    var price = 0;
                    for (var i = 0; i < this.size(); i++)
                        price += this.at(i).calcPrice();
                    return price;
                };
                Packer.prototype.TAG = function () {
                    return "packer";
                };
                Packer.prototype.CHILD_TAG = function () {
                    return "wrapperArray";
                };
                Packer.main = function () {
                    var productArray = new packer_1.ProductArray();
                    productArray.push(new packer_1.Product("Eraser", 500, 10, 70), new packer_1.Product("Pencil", 400, 30, 35), new packer_1.Product("Pencil", 400, 30, 35), new packer_1.Product("Pencil", 400, 30, 35), new packer_1.Product("Book", 8000, 150, 300), new packer_1.Product("Book", 8000, 150, 300), new packer_1.Product("Drink", 1000, 75, 250), new packer_1.Product("Umbrella", 4000, 200, 1000), new packer_1.Product("Notebook-PC", 800000, 150, 850), new packer_1.Product("Tablet-PC", 600000, 120, 450));
                    var packer = new Packer(productArray);
                    packer.push(new packer_1.WrapperArray(new packer_1.Wrapper("Large", 100, 200, 1000)), new packer_1.WrapperArray(new packer_1.Wrapper("Medium", 70, 150, 500)), new packer_1.WrapperArray(new packer_1.Wrapper("Small", 50, 100, 250)));
                    packer.optimize();
                    samchon.trace(packer.toXML().toString());
                };
                return Packer;
            })(samchon.protocol.EntityArray);
            packer_1.Packer = Packer;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
