var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var FactorialGenerator = (function (_super) {
            __extends(FactorialGenerator, _super);
            function FactorialGenerator(n) {
                _super.call(this, n, n);
            }
            return FactorialGenerator;
        })(library.PermuationGenerator);
        library.FactorialGenerator = FactorialGenerator;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
