var samchon;
(function (samchon) {
    var Global = (function () {
        function Global() {
        }
        return Global;
    })();
    samchon.Global = Global;
})(samchon || (samchon = {}));
var uid_ = 0;
Object.prototype["__getUID"] = function () {
    if (this.hasOwnProperty("uid__") == true)
        return this["uid__"];
    else {
        this["uid__"] = ++uid_;
        return this["uid__"];
    }
};
