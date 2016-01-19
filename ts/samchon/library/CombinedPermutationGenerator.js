var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var CombinedPermutationGenerator = (function (_super) {
            __extends(CombinedPermutationGenerator, _super);
            function CombinedPermutationGenerator(n, r) {
                _super.call(this, n, r);
                this.size_ = Math.pow(n, r);
                this.dividerArray = new Array();
                for (var i = 0; i < r; i++) {
                    var x = r - (i + 1);
                    var val = Math.pow(n, x);
                    this.dividerArray.push(val);
                }
            }
            CombinedPermutationGenerator.prototype.at = function (index) {
                var row = new Array();
                for (var i = 0; i < this.r_; i++) {
                    var val = Math.floor(index / this.dividerArray[i]) % this.n_;
                    row.push(val);
                }
                return row;
            };
            return CombinedPermutationGenerator;
        })(library.CaseGenerator);
        library.CombinedPermutationGenerator = CombinedPermutationGenerator;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
