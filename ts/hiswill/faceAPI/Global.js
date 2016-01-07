var hiswill;
(function (hiswill) {
    var faceAPI;
    (function (faceAPI) {
        var Global = (function () {
            function Global() {
            }
            Global.fetch = function (entity, json) {
                for (var key in json) {
                    if (typeof key != "string" || entity.hasOwnProperty(key) == false)
                        continue;
                    if (typeof entity[key] == "number" || typeof entity[key] == "string")
                        entity[key] = json[key];
                    else if (entity[key] instanceof Entity || entity[key] instanceof EntityArray) {
                        var json_entity = entity[key];
                        json_entity.constructByJSON(json[key]);
                    }
                }
            };
            return Global;
        })();
        faceAPI.Global = Global;
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
        faceAPI.Direction = Direction;
    })(faceAPI = hiswill.faceAPI || (hiswill.faceAPI = {}));
})(hiswill || (hiswill = {}));
