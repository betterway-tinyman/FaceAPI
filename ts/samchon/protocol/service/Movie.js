var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var service;
        (function (service) {
            var Movie = (function () {
                function Movie() {
                }
                Movie.prototype.replyData = function (invoke) {
                    invoke.apply(this) == false;
                };
                Movie.prototype.sendData = function (invoke) {
                    this.application.sendData(invoke);
                };
                return Movie;
            })();
            service.Movie = Movie;
        })(service = protocol.service || (protocol.service = {}));
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
