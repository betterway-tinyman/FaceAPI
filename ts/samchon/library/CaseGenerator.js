var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var CaseGenerator = (function () {
            function CaseGenerator(n, r) {
                this.n_ = n;
                this.r_ = r;
            }
            CaseGenerator.prototype.size = function () {
                return this.size_;
            };
            CaseGenerator.prototype.n = function () {
                return this.n_;
            };
            CaseGenerator.prototype.r = function () {
                return this.r_;
            };
            CaseGenerator.prototype.at = function (index) {
                throw new std.AbstractMethodError("Don't create CaseGenerator directly.");
            };
            return CaseGenerator;
        })();
        library.CaseGenerator = CaseGenerator;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
