var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var ServerConnector = (function () {
            function ServerConnector(parent) {
                this.parent = parent;
                this.str = "";
            }
            ServerConnector.prototype.connect = function (ip, port) {
                if (ip.indexOf("ws://") == -1) {
                    if (ip.indexOf("://") != -1)
                        throw "only websocket is possible";
                    else
                        ip = "ws://" + ip;
                }
                this.socket = new WebSocket(ip + ":" + port);
                this.socket.onopen = this.handleConnect;
                this.socket.onmessage = this.handleReply;
            };
            ServerConnector.prototype.sendData = function (invoke) {
                var xml = invoke.toXML();
                var str = xml.toString();
                this.socket.send(str);
            };
            ServerConnector.prototype.replyData = function (invoke) {
                this.parent.replyData(invoke);
            };
            ServerConnector.prototype.handleConnect = function (event) {
                if (this.onopen == null)
                    return;
                this.onopen.apply([event]);
            };
            ServerConnector.prototype.handleReply = function (event) {
                this.str += event.data;
                var invokeArray;
                var indexPair = null;
                var sizePair = new std.Pair(0, 0);
                var startIndex = 0;
                var endIndex = 0;
                while (true) {
                    var iPair = new std.Pair(this.str.indexOf("<invoke", startIndex), this.str.indexOf("</invoke>", startIndex));
                    if (iPair.first != -1)
                        sizePair.first++;
                    if (iPair.second != -1)
                        sizePair.second++;
                    if (indexPair == null && sizePair.first == 1)
                        indexPair = new std.Pair(iPair.first, -1);
                    if (iPair.first == -1 || iPair.second == -1)
                        break;
                    if (indexPair != null && sizePair.first == sizePair.second) {
                        var start = indexPair.first;
                        var end = indexPair.second + ("</invoke>").length;
                        var xml = new samchon.library.XML(this.str.substring(start, end));
                        var invoke = new protocol.Invoke(xml);
                        invokeArray.push(invoke);
                        endIndex = end;
                        indexPair = null;
                    }
                    startIndex = Math.max(Math.max(iPair.first, iPair.second), 1);
                }
                if (endIndex != 0)
                    this.str = this.str.substr(endIndex);
                for (var i = 0; i < invokeArray.length; i++)
                    this.replyData(invokeArray[i]);
            };
            return ServerConnector;
        })();
        protocol.ServerConnector = ServerConnector;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
