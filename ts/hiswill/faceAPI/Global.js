var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var Global = (function () {
            function Global() {
            }
            Global.fetch = function (entity, json) {
                for (var key in json) {
                    if (typeof key != "string" || entity.hasOwnProperty(key) == false)
                        continue;
                    if (typeof entity[key] == "number" || typeof entity[key] == "string")
                        entity[key] = json[key];
                    else if (entity[key] instanceof samchon.protocol.Entity || entity[key] instanceof samchon.protocol.EntityArray) {
                        var json_entity = entity[key];
                        json_entity.constructByJSON(json[key]);
                    }
                }
            };
            return Global;
        })();
        faceapi.Global = Global;
        var Direction = (function () {
            function Direction() {
            }
            Object.defineProperty(Direction, "LEFT", {
                get: function () { return 1; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Direction, "RIGHT", {
                get: function () { return 2; },
                enumerable: true,
                configurable: true
            });
            ;
            return Direction;
        })();
        faceapi.Direction = Direction;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
