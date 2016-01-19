var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var EntityArray = (function (_super) {
            __extends(EntityArray, _super);
            function EntityArray() {
                _super.call(this);
            }
            EntityArray.prototype.construct = function (xml) {
                this.clear();
                var propertyMap = xml.getPropertyMap();
                for (var v_it = propertyMap.begin(); v_it.equals(propertyMap.end()) != true; v_it = v_it.next())
                    if (this.hasOwnProperty(v_it.first) == true
                        && (typeof this[v_it.first] == "number" || typeof this[v_it.first] == "string")
                        && v_it.first != "length") {
                        this[v_it.first] = v_it.second;
                    }
                for (var e_it = xml.begin(); e_it.equals(xml.end()) != true; e_it = e_it.next()) {
                    if (this.hasOwnProperty(e_it.first) == true
                        && e_it.first != this.CHILD_TAG()
                        && e_it.second.size() == 1
                        && (this[e_it.first] instanceof protocol.Entity || this[e_it.first] instanceof EntityArray)
                        && this[e_it.first] != null) {
                        var entity = this[e_it.first];
                        var e_xml = e_it.second.at(0);
                        if (entity == null)
                            continue;
                        entity.construct(e_xml);
                    }
                }
                if (xml.has(this.CHILD_TAG()) == false)
                    return;
                var xmlList = xml.get(this.CHILD_TAG());
                for (var i = 0; i < xmlList.size(); i++) {
                    var child = this.createChild(xmlList.at(i));
                    if (child == null)
                        continue;
                    child.construct(xmlList.at(i));
                    this.push(child);
                }
            };
            EntityArray.prototype.createChild = function (xml) {
                return null;
            };
            EntityArray.prototype.key = function () {
                return "";
            };
            EntityArray.prototype.has = function (key) {
                var i;
                if (key instanceof protocol.Entity || key instanceof EntityArray) {
                    for (i = 0; i < this.size(); i++)
                        if (this.at(i) == key)
                            return true;
                }
                else {
                    for (var i = 0; i < this.size(); i++)
                        if (this.at(i).key() == key)
                            return true;
                }
                return false;
            };
            EntityArray.prototype.get = function (key) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).key() == key)
                        return this.at(i);
                throw Error("out of range");
            };
            EntityArray.prototype.TAG = function () { return ""; };
            EntityArray.prototype.CHILD_TAG = function () { return ""; };
            EntityArray.prototype.toXML = function () {
                var xml = new samchon.library.XML();
                xml.setTag(this.TAG());
                for (var key in this)
                    if (typeof key == "string" && key != "length"
                        && (typeof this[key] == "string" || typeof this[key] == "number")) {
                        xml.setProperty(key, this[key]);
                    }
                for (var i = 0; i < this.size(); i++)
                    xml.push(this.at(i).toXML());
                return xml;
            };
            return EntityArray;
        })(std.Vector);
        protocol.EntityArray = EntityArray;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
