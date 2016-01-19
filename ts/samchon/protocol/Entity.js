var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var Entity = (function () {
            function Entity() {
            }
            Entity.prototype.construct = function (xml) {
                var propertyMap = xml.getPropertyMap();
                for (var v_it = propertyMap.begin(); v_it.equals(propertyMap.end()) != true; v_it = v_it.next())
                    if (this.hasOwnProperty(v_it.first) == true && (typeof this[v_it.first] == "number" || typeof this[v_it.first] == "string"))
                        this[v_it.first] = v_it.second;
                for (var e_it = xml.begin(); e_it.equals(xml.end()) != true; e_it = e_it.next()) {
                    if (this.hasOwnProperty(e_it.first) == true
                        && e_it.second.size() == 1
                        && (this[e_it.first] instanceof Entity || this[e_it.first] instanceof protocol.EntityArray)
                        && this[e_it.first] != null) {
                        var entity = this[e_it.first];
                        var e_xml = e_it.second.at(0);
                        if (entity == null)
                            continue;
                        entity.construct(e_xml);
                    }
                }
            };
            Entity.prototype.TAG = function () { return ""; };
            Entity.prototype.key = function () { return ""; };
            Entity.prototype.toXML = function () {
                var xml = new samchon.library.XML();
                xml.setTag(this.TAG());
                for (var key in this)
                    if (typeof key == "string" &&
                        (typeof this[key] == "string" || typeof this[key] == "number")) {
                        xml.setProperty(key, this[key]);
                    }
                return xml;
            };
            return Entity;
        })();
        protocol.Entity = Entity;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
