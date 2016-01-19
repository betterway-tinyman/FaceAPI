var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var service;
        (function (service) {
            var Application = (function () {
                function Application(movie, ip, port) {
                    this.movie = movie;
                    this.socket = new protocol.ServerConnector(this);
                    this.socket.onopen = this.handleConnect;
                    this.socket.connect(ip, port);
                }
                Application.prototype.handleConnect = function (event) {
                };
                Application.prototype.replyData = function (invoke) {
                    if (invoke.apply(this) == false)
                        this.movie.sendData(invoke);
                };
                Application.prototype.sendData = function (invoke) {
                    this.socket.sendData(invoke);
                };
                return Application;
            })();
            service.Application = Application;
        })(service = protocol.service || (protocol.service = {}));
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
