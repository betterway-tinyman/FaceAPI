var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function trace() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var str = "";
    var replacerArray = [
        new Pair("&", "&amp;"),
        new Pair("<", "&lt;"),
        new Pair(">", "&gt;"),
        new Pair("\n", "<br>"),
        new Pair("\t", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
    ];
    for (var i = 0; i < args.length; i++) {
        var item = String(args[i]);
        item = StringUtil.replaceAll(item, replacerArray);
        if (i == 0)
            str += item;
        else
            str += ", " + item;
    }
    document.write("<p>" + str + "</p>");
}
var Pair = (function () {
    function Pair(first, second) {
        this.first = first;
        this.second = second;
    }
    Pair.prototype.equals = function (obj) {
        var first;
        var second;
        if (this.first.hasOwnProperty("equals") && this.first["equals"] instanceof Function)
            first = this.first["equals"](obj.first);
        else
            first = this.first == obj.first;
        if (this.second.hasOwnProperty("equals") && this.second["equals"] instanceof Function)
            second = this.second["equals"](obj.second);
        else
            second = this.second == obj.second;
        return first == true && second == true;
    };
    Pair.prototype.toString = function () {
        return "{first: " + this.first + ", second: " + this.second + "}";
    };
    return Pair;
})();
var Vector = (function () {
    function Vector() {
    }
    Vector.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return 0;
    };
    Vector.prototype.pop = function () { return null; };
    Vector.prototype.concat = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return [];
    };
    Vector.prototype.join = function (separator) { return ""; };
    Vector.prototype.reverse = function () { return []; };
    Vector.prototype.shift = function () { return null; };
    Vector.prototype.slice = function (start, end) { return []; };
    Vector.prototype.sort = function (compareFn) { return []; };
    Vector.prototype.splice = function (start, deleteCount) {
        if (deleteCount === void 0) { deleteCount = 1; }
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        return [];
    };
    Vector.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return 0;
    };
    Vector.prototype.indexOf = function (searchElement, fromIndex) { return 0; };
    Vector.prototype.lastIndexOf = function (searchElement, fromIndex) { return 0; };
    Vector.prototype.every = function (callbackfn, thisArg) { return false; };
    Vector.prototype.some = function (callbackfn, thisArg) { return false; };
    Vector.prototype.forEach = function (callbackfn, thisArg) { };
    Vector.prototype.map = function (callbackfn, thisArg) { return []; };
    Vector.prototype.filter = function (callbackfn, thisArg) { return []; };
    Vector.prototype.reduce = function (callbackfn, initialValue) { return null; };
    Vector.prototype.reduceRight = function (callbackfn, initialValue) { return null; };
    Vector.prototype.toString = function () { return ""; };
    Vector.prototype.toLocaleString = function () { return ""; };
    return Vector;
})();
Vector.prototype = new Array();
var Set = (function () {
    function Set() {
        this.data_ = new Vector();
    }
    Set.prototype.insert = function (key) {
        if (this.has(key) == true)
            return;
        this.data_.push(key);
    };
    Set.prototype.erase = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i] == key) {
                this.data_.splice(i, 1);
                return;
            }
        throw Error("out of range");
    };
    Set.prototype.clear = function () {
        this.data_ = new Vector();
    };
    Set.prototype.data = function () {
        return this.data_;
    };
    Set.prototype.size = function () {
        return this.data.length;
    };
    Set.prototype.has = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i] == key)
                return true;
        return false;
    };
    Set.prototype.equals = function (obj) {
        if (this.size() != obj.size())
            return false;
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i] != obj.data_[i])
                return false;
        return true;
    };
    Set.prototype.begin = function () {
        if (this.data_.length == 0)
            return this.end();
        else
            return new SetIterator(this, 0);
    };
    Set.prototype.end = function () {
        return new SetIterator(this, -1);
    };
    return Set;
})();
var SetIterator = (function () {
    function SetIterator(set_, index) {
        this.set_ = set_;
        this.index = index;
    }
    SetIterator.prototype.value = function () {
        return this.set_.data()[this.index];
    };
    SetIterator.prototype.equals = function (obj) {
        return (this.set_ == obj.set_ && this.index == obj.index);
    };
    SetIterator.prototype.prev = function () {
        if (this.index == 0)
            return this.set_.end();
        else
            return new SetIterator(this.set_, this.index - 1);
    };
    SetIterator.prototype.next = function () {
        if (this.index >= this.set_.size())
            return this.set_.end();
        else
            return new SetIterator(this.set_, this.index + 1);
    };
    return SetIterator;
})();
var Map = (function () {
    function Map() {
        this.data_ = new Vector();
    }
    Map.prototype.data = function () {
        return this.data_;
    };
    Map.prototype.size = function () {
        return this.data_.length;
    };
    Map.prototype.find = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key)
                return new MapIterator(this, i);
        return this.end();
    };
    Map.prototype.has = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key)
                return true;
        return false;
    };
    Map.prototype.get = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key)
                return this.data_[i].second;
        throw Error("out of range");
    };
    Map.prototype.begin = function () {
        if (this.size() == 0)
            return this.end();
        return new MapIterator(this, 0);
    };
    Map.prototype.end = function () {
        return new MapIterator(this, -1);
    };
    Map.prototype.set = function (key, value) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key) {
                this.data_[i].second = value;
                return;
            }
        this.data_.push(new Pair(key, value));
    };
    Map.prototype.erase = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key) {
                this.data_.splice(i, 1);
                return;
            }
        throw Error("out of range");
    };
    Map.prototype.clear = function () {
        this.data_ = new Vector();
    };
    Map.prototype.equals = function (obj) {
        if (this.size() != obj.size())
            return false;
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].equals(obj.data_[i]) == false)
                return false;
        return true;
    };
    Map.prototype.toString = function () {
        var str = "{";
        for (var i = 0; i < this.data_.length; i++) {
            var pair = this.data_[i];
            var key = "\"" + pair.first + "\"";
            var value = (typeof pair.second == "string")
                ? "\"" + pair.second + "\""
                : String(pair.second);
            str += "{\"key\": " + key + ": value: " + value + "}";
        }
        str += "}";
        return str;
    };
    return Map;
})();
var MapIterator = (function () {
    function MapIterator(map, index) {
        this.map = map;
        if (index != -1 && index < map.size())
            this.index = index;
        else
            this.index = -1;
    }
    Object.defineProperty(MapIterator.prototype, "first", {
        get: function () {
            return this.map.data()[this.index].first;
        },
        set: function (key) {
            this.map.data()[this.index].first = key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapIterator.prototype, "second", {
        get: function () {
            return this.map.data()[this.index].second;
        },
        set: function (val) {
            this.map.data()[this.index].second = val;
        },
        enumerable: true,
        configurable: true
    });
    MapIterator.prototype.equals = function (obj) {
        return (this.map == obj.map && this.index == obj.index);
    };
    MapIterator.prototype.prev = function () {
        if (this.index - 1 < 0)
            return this.map.end();
        else
            return new MapIterator(this.map, this.index - 1);
    };
    MapIterator.prototype.next = function () {
        if (this.index + 1 >= this.map.size())
            return this.map.end();
        else
            return new MapIterator(this.map, this.index + 1);
    };
    return MapIterator;
})();
var Dictionary = (function (_super) {
    __extends(Dictionary, _super);
    function Dictionary() {
        _super.call(this);
    }
    return Dictionary;
})(Map);
var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.tab = function (size) {
        var str = "";
        for (var i = 0; i < size; i++)
            str += "\t";
        return str;
    };
    StringUtil.htmlTab = function (size) {
        var str = "";
        for (var i = 0; i < size; i++)
            str += "&nbsp;&nbsp;&nbsp;&nbsp;";
        return str;
    };
    StringUtil.replaceAll = function (str, pairs) {
        if (pairs.length == 0)
            return str;
        for (var i = 0; i < pairs.length; i++)
            str = str.split(pairs[i].first).join(pairs[i].second);
        return str;
    };
    return StringUtil;
})();
var XML = (function (_super) {
    __extends(XML, _super);
    function XML(str) {
        if (str === void 0) { str = ""; }
        _super.call(this);
        this.properties = new Dictionary();
        this.value = "";
        if (str.indexOf("<") == -1)
            return;
        var start;
        var end;
        if ((start = str.indexOf("<?xml")) != -1) {
            end = str.indexOf("?>", start);
            if (end != -1)
                str = str.substr(end + 2);
        }
        while ((start = str.indexOf("<!--")) != -1) {
            end = str.indexOf("-->", start);
            if (end != -1)
                break;
            str = str.substr(0, start) + str.substr(end + 3);
        }
        this.construct(str);
    }
    XML.prototype.construct = function (str) {
        this.parseTag(str);
        this.parseProperty(str);
        var res = this.parseValue(str);
        if (res.second == true)
            this.parseChildren(res.first);
    };
    XML.prototype.parseTag = function (str) {
        var start = str.indexOf("<") + 1;
        var end = this.calcMinIndex(str.indexOf(" ", start), str.indexOf("\r\n", start), str.indexOf("\n", start), str.indexOf("\t", start), str.indexOf(">", start), str.indexOf("/", start));
        if (start == 0 || end == -1)
            return;
        this.tag = str.substring(start, end);
    };
    XML.prototype.parseProperty = function (str) {
        var start = str.indexOf("<" + this.tag) + this.tag.length + 1;
        var end = this.calcMinIndex(str.lastIndexOf("/"), str.indexOf(">", start));
        if (start == -1 || end == -1 || start >= end)
            return;
        var line = str.substring(start, end);
        if (line.indexOf("=") == -1)
            return;
        var label;
        var value;
        var helpers = new Array();
        var inQuote = false;
        var quoteType;
        var equal;
        for (var i = 0; i < line.length; i++) {
            if (inQuote == false && (line.charAt(i) == "'" || line.charAt(i) == "\"")) {
                inQuote = true;
                start = i;
                if (line.charAt(i) == "'")
                    quoteType = 1;
                else if (line.charAt(i) == "\"")
                    quoteType = 2;
            }
            else if (inQuote == true &&
                ((quoteType == 1 && line.charAt(i) == "'") ||
                    (quoteType == 2 && line.charAt(i) == "\""))) {
                helpers.push({ "type": quoteType, "start": start, "end": i });
                inQuote = false;
            }
        }
        for (var i = 0; i < helpers.length; i++) {
            var quote = helpers[i];
            if (i == 0) {
                equal = line.indexOf("=");
                label = line.substring(0, equal).trim();
            }
            else {
                equal = line.indexOf("=", helpers[i - 1]["end"] + 1);
                label = line.substring(helpers[i - 1]["end"] + 1, equal).trim();
            }
            value = line.substring(helpers[i]["start"] + 1, helpers[i]["end"]);
            this.setProperty(label, XML.decodeProperty(value));
        }
    };
    XML.prototype.parseValue = function (str) {
        var end_slash = str.lastIndexOf("/");
        var end_block = str.indexOf(">");
        if (end_slash < end_block || end_slash + 1 == str.lastIndexOf("<")) {
            this.value = "";
            return new Pair(str, false);
        }
        var start = end_block + 1;
        var end = str.lastIndexOf("<");
        str = str.substring(start, end);
        if (str.indexOf("<") == -1)
            this.value = XML.decodeValue(str.trim());
        else
            this.value = "";
        return new Pair(str, true);
    };
    XML.prototype.parseChildren = function (str) {
        if (str.indexOf("<") == -1)
            return;
        var start = str.indexOf("<");
        var end = str.lastIndexOf(">") + 1;
        str = str.substring(start, end);
        var blockStart = 0;
        var blockEnd = 0;
        start = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == "<" && str.substr(i, 2) != "</")
                blockStart++;
            else if (str.substr(i, 2) == "/>" || str.substr(i, 2) == "</")
                blockEnd++;
            if (blockStart >= 1 && blockStart == blockEnd) {
                end = str.indexOf(">", i);
                var xmlList;
                var xml = new XML();
                xml.construct(str.substring(start, end + 1));
                if (this.has(xml.tag) == true)
                    xmlList = this.get(xml.tag);
                else {
                    xmlList = new XMLList();
                    this.set(xml.tag, xmlList);
                }
                xmlList.push(xml);
                i = end;
                start = end + 1;
                blockStart = 0;
                blockEnd = 0;
            }
        }
    };
    XML.prototype.getTag = function () {
        return this.tag;
    };
    XML.prototype.getValue = function () {
        return this.value;
    };
    XML.prototype.hasProperty = function (key) {
        return this.properties.has(key);
    };
    XML.prototype.getProperty = function (key) {
        return this.properties.get(key);
    };
    XML.prototype.getPropertyMap = function () {
        return this.properties;
    };
    XML.prototype.setTag = function (str) {
        this.tag = str;
    };
    XML.prototype.setValue = function (str) {
        this.value = str;
    };
    XML.prototype.setProperty = function (key, value) {
        this.properties.set(key, value);
    };
    XML.prototype.eraseProperty = function (key) {
        if (this.properties.has(key) == false)
            throw Error("out of range");
        else
            this.properties.erase(key);
    };
    XML.prototype.push = function () {
        var xmlArray = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            xmlArray[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < xmlArray.length; i++) {
            var xml = xmlArray[i];
            if (this.has(xml.tag) == true)
                this.get(xml.tag).push(xml);
            else {
                var xmlList = new XMLList();
                xmlList.push(xml);
                this.set(xml.tag, xmlList);
            }
        }
    };
    XML.prototype.addAllProperties = function (xml) {
        for (var it = xml.properties.begin(); it.equals(xml.properties.end()) == false; it = it.next())
            this.setProperty(it.first, it.second);
    };
    XML.prototype.clearProperties = function () {
        this.properties = new Dictionary();
    };
    XML.prototype.calcMinIndex = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var min = args[0];
        for (var i = 1; i < args.length; i++) {
            if (args[i] == -1)
                continue;
            if (min == -1 || args[i] < min)
                min = args[i];
        }
        return min;
    };
    XML.decodeValue = function (str) {
        var pairs = [
            new Pair("&amp;", "&"),
            new Pair("&lt;", "<"),
            new Pair("&gt;", ">")
        ];
        return StringUtil.replaceAll(str, pairs);
    };
    XML.encodeValue = function (str) {
        var pairs = [
            new Pair("&", "&amp;"),
            new Pair("<", "&lt;"),
            new Pair(">", "&gt;")
        ];
        return StringUtil.replaceAll(str, pairs);
    };
    XML.decodeProperty = function (str) {
        var pairs = [
            new Pair("&amp;", "&"),
            new Pair("&lt;", "<"),
            new Pair("&gt;", ">"),
            new Pair("&quot;", "\""),
            new Pair("&apos;", "'"),
            new Pair("&#x9;", "\t"),
            new Pair("&#xA;", "\n"),
            new Pair("&#xD;", "\r"),
        ];
        return StringUtil.replaceAll(str, pairs);
    };
    XML.encodeProperty = function (str) {
        var pairs = [
            new Pair("&", "&amp;"),
            new Pair("<", "&lt;"),
            new Pair(">", "&gt;"),
            new Pair("\"", "&quot;"),
            new Pair("'", "&apos;"),
            new Pair("\t", "&#x9;"),
            new Pair("\n", "&#xA;"),
            new Pair("\r", "&#xD;"),
        ];
        return StringUtil.replaceAll(str, pairs);
    };
    XML.prototype.toString = function (level) {
        if (level === void 0) { level = 0; }
        var str = StringUtil.tab(level) + "<" + this.tag;
        var childrenString = "";
        for (var p_it = this.properties.begin(); p_it.equals(this.properties.end()) == false; p_it = p_it.next())
            str += " " + p_it.first + "=\"" + XML.encodeProperty(String(p_it.second)) + "\"";
        if (this.size() == 0) {
            if (this.value != "")
                str += ">" + XML.encodeValue(String(this.value)) + "</" + this.tag + ">";
            else
                str += " />";
        }
        else {
            str += ">\n";
            for (var x_it = this.begin(); x_it.equals(this.end()) == false; x_it = x_it.next())
                str += x_it.second.toString(level + 1);
            str += StringUtil.tab(level) + "</" + this.tag + ">";
        }
        return str;
    };
    XML.prototype.toHTML = function (level) {
        if (level === void 0) { level = 0; }
        var str = StringUtil.htmlTab(level) + "&lt;" + this.tag;
        var childrenString = "";
        for (var p_it = this.properties.begin(); p_it.equals(this.properties.end()) == false; p_it = p_it.next())
            str += " " + p_it.first + "=&quot;" + XML.encodeProperty(String(p_it.second)) + "&quot;";
        if (this.size() == 0) {
            if (this.value != "")
                str += "&gt;" + XML.encodeValue(String(this.value)) + "</" + this.tag + ">";
            else
                str += " /&gt;";
        }
        else {
            str += "&gt;<br>\n";
            for (var x_it = this.begin(); x_it.equals(this.end()) == false; x_it = x_it.next())
                str += x_it.second.toHTML(level + 1);
            str += StringUtil.htmlTab(level) + "&lt;/" + this.tag + "&gt;";
        }
        return str;
    };
    return XML;
})(Dictionary);
var XMLList = (function (_super) {
    __extends(XMLList, _super);
    function XMLList() {
        _super.call(this);
    }
    XMLList.prototype.toString = function (level) {
        if (level === void 0) { level = 0; }
        var str = "";
        for (var i = 0; i < this.length; i++)
            str += this[i].toString(level) + "\n";
        return str;
    };
    XMLList.prototype.toHTML = function (level) {
        if (level === void 0) { level = 0; }
        var str = "";
        for (var i = 0; i < this.length; i++)
            str += this[i].toHTML(level) + "<br>\n";
        return str;
    };
    return XMLList;
})(Vector);
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
        return null;
    };
    return CaseGenerator;
})();
var CombinedPermutationGenerator = (function (_super) {
    __extends(CombinedPermutationGenerator, _super);
    function CombinedPermutationGenerator(n, r) {
        _super.call(this, n, r);
        this.size_ = Math.pow(n, r);
        this.dividerArray = new Vector();
        for (var i = 0; i < r; i++) {
            var x = r - (i + 1);
            var val = Math.pow(n, x);
            this.dividerArray.push(val);
        }
    }
    CombinedPermutationGenerator.prototype.at = function (index) {
        var row = new Vector();
        for (var i = 0; i < this.r_; i++) {
            var val = Math.floor(index / this.dividerArray[i]) % this.n_;
            row.push(val);
        }
        return row;
    };
    return CombinedPermutationGenerator;
})(CaseGenerator);
var PermuationGenerator = (function (_super) {
    __extends(PermuationGenerator, _super);
    function PermuationGenerator(n, r) {
        _super.call(this, n, r);
        this.size_ = n;
        for (var i = n - 1; i > n - r; i--)
            this.size_ *= i;
    }
    PermuationGenerator.prototype.at = function (index) {
        var atoms = new Vector();
        for (var i = 0; i < this.n_; i++)
            atoms.push(i);
        var row = new Vector();
        for (var i = 0; i < this.r_; i++) {
            var item = index % atoms.length;
            index = Math.floor(index / atoms.length);
            row.push(atoms[item]);
            atoms.splice(item, 1);
        }
        return row;
    };
    return PermuationGenerator;
})(CaseGenerator);
var FactorialGenerator = (function (_super) {
    __extends(FactorialGenerator, _super);
    function FactorialGenerator(n) {
        _super.call(this, n, n);
    }
    return FactorialGenerator;
})(PermuationGenerator);
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
        var sizePair = new Pair(0, 0);
        var startIndex = 0;
        var endIndex = 0;
        while (true) {
            var iPair = new Pair(this.str.indexOf("<invoke", startIndex), this.str.indexOf("</invoke>", startIndex));
            if (iPair.first != -1)
                sizePair.first++;
            if (iPair.second != -1)
                sizePair.second++;
            if (indexPair == null && sizePair.first == 1)
                indexPair = new Pair(iPair.first, -1);
            if (iPair.first == -1 || iPair.second == -1)
                break;
            if (indexPair != null && sizePair.first == sizePair.second) {
                var start = indexPair.first;
                var end = indexPair.second + ("</invoke>").length;
                var xml = new XML(this.str.substring(start, end));
                var invoke = new Invoke(xml);
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
                && e_it.second.length == 1
                && (this[e_it.first] instanceof Entity || this[e_it.first] instanceof EntityArray)
                && this[e_it.first] != null) {
                var entity = this[e_it.first];
                var e_xml = e_it.second[0];
                if (entity == null)
                    continue;
                entity.construct(e_xml);
            }
        }
    };
    Entity.prototype.TAG = function () { return ""; };
    Entity.prototype.key = function () { return ""; };
    Entity.prototype.toXML = function () {
        var xml = new XML();
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
var EntityArray = (function (_super) {
    __extends(EntityArray, _super);
    function EntityArray() {
        _super.call(this);
    }
    EntityArray.prototype.construct = function (xml) {
        this.splice(0, this.length);
        var propertyMap = xml.getPropertyMap();
        for (var v_it = propertyMap.begin(); v_it.equals(propertyMap.end()) != true; v_it = v_it.next())
            if (this.hasOwnProperty(v_it.first) == true
                && (typeof this[v_it.first] == "number" || typeof this[v_it.first] == "string")
                && v_it.first != "length") {
                trace(v_it.first);
                this[v_it.first] = v_it.second;
            }
        for (var e_it = xml.begin(); e_it.equals(xml.end()) != true; e_it = e_it.next()) {
            if (this.hasOwnProperty(e_it.first) == true
                && e_it.first != this.CHILD_TAG()
                && e_it.second.length == 1
                && (this[e_it.first] instanceof Entity || this[e_it.first] instanceof EntityArray)
                && this[e_it.first] != null) {
                var entity = this[e_it.first];
                var e_xml = e_it.second[0];
                if (entity == null)
                    continue;
                entity.construct(e_xml);
            }
        }
        if (xml.has(this.CHILD_TAG()) == false)
            return;
        var xmlList = xml.get(this.CHILD_TAG());
        for (var i = 0; i < xmlList.length; i++) {
            var child = this.createChild(xmlList[i]);
            if (child == null)
                continue;
            child.construct(xmlList[i]);
            this.push(child);
        }
    };
    EntityArray.prototype.createChild = function (xml) {
        return null;
    };
    EntityArray.prototype.set = function (key, entity) {
        this.push(entity);
    };
    EntityArray.prototype.erase = function (key) {
        for (var i = this.length - 1; i >= 0; i--)
            if (this[i].key() == key)
                this.splice(i, 1);
    };
    EntityArray.prototype.key = function () {
        return "";
    };
    EntityArray.prototype.has = function (key) {
        var i;
        if (key instanceof Entity || key instanceof EntityArray) {
            for (i = 0; i < this.length; i++)
                if (this[i] == key)
                    return true;
        }
        else {
            for (var i = 0; i < this.length; i++)
                if (this[i].key() == key)
                    return true;
        }
        return false;
    };
    EntityArray.prototype.get = function (key) {
        for (var i = 0; i < this.length; i++)
            if (this[i].key() == key)
                return this[i];
        throw Error("out of range");
    };
    EntityArray.prototype.TAG = function () { return ""; };
    EntityArray.prototype.CHILD_TAG = function () { return ""; };
    EntityArray.prototype.toXML = function () {
        var xml = new XML();
        xml.setTag(this.TAG());
        for (var key in this)
            if (typeof key == "string" && key != "length"
                && (typeof this[key] == "string" || typeof this[key] == "number")) {
                xml.setProperty(key, this[key]);
            }
        for (var i = 0; i < this.length; i++)
            xml.push(this[i].toXML());
        return xml;
    };
    return EntityArray;
})(Vector);
var Invoke = (function (_super) {
    __extends(Invoke, _super);
    function Invoke() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        _super.call(this);
        if (args.length == 1) {
            var val = args[0];
            if (typeof val == "string")
                this.listener = val;
            else if (val instanceof XML) {
                var xml = val;
                this.construct(xml);
            }
        }
        else {
            this.listener = args[0];
            for (var i = 1; i < args.length; i++) {
                var value = args[i];
                var parameter = new InvokeParameter("", value);
                this.push(parameter);
            }
        }
    }
    Invoke.prototype.construct = function (xml) {
        _super.prototype.construct.call(this, xml);
        this.listener = xml.getProperty("listener");
    };
    Invoke.prototype.getListener = function () {
        return this.listener;
    };
    Invoke.prototype.getArguments = function () {
        var args = [];
        for (var i = 0; i < this.length; i++)
            args.push(this[i].getValue());
        return args;
    };
    Invoke.prototype.apply = function (obj) {
        if (!(this.listener in obj && obj[this.listener] instanceof Function))
            return false;
        var func = obj[this.listener];
        var args = this.getArguments();
        func.apply(obj, args);
        return true;
    };
    Invoke.prototype.TAG = function () {
        return "invoke";
    };
    Invoke.prototype.CHILD_TAG = function () {
        return "parameter";
    };
    Invoke.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("listener", this.listener);
        return xml;
    };
    return Invoke;
})(EntityArray);
var InvokeParameter = (function (_super) {
    __extends(InvokeParameter, _super);
    function InvokeParameter() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        _super.call(this);
        if (args.length == 1 && args[0] instanceof XML) {
            this.construct(args[0]);
        }
        else if (args.length == 2) {
            this.name = args[0];
            var value = args[1];
            if (value instanceof Entity || value instanceof EntityArray) {
                this.type = "XML";
                this.value = value.toXML();
            }
            else if (value instanceof XML) {
                this.type = "XML";
                this.value = value;
            }
            else if (typeof value == "number" || typeof value == "string") {
                this.type = typeof value;
                this.value = value;
            }
            else {
                this.type = "unknown";
                this.value = value;
            }
        }
        else if (args.length == 3) {
            this.name = args[0];
            this.type = args[1];
            this.value = args[2];
        }
    }
    InvokeParameter.prototype.construct = function (xml) {
        this.name = xml.hasProperty("name") ? xml.getProperty("name") : "";
        this.type = xml.getProperty("type");
        if (this.type == "XML")
            this.value = xml.begin().second[0];
        else
            this.value = xml.getValue();
    };
    InvokeParameter.prototype.key = function () {
        return this.name;
    };
    InvokeParameter.prototype.getName = function () {
        return this.name;
    };
    InvokeParameter.prototype.getType = function () {
        return this.type;
    };
    InvokeParameter.prototype.getValue = function () {
        return this.value;
    };
    InvokeParameter.prototype.TAG = function () {
        return "parameter";
    };
    InvokeParameter.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        if (this.name != "")
            xml.setProperty("name", this.name);
        xml.setProperty("type", this.type);
        if (this.type == "XML") {
            var xmlList = new XMLList();
            xmlList.push(this.value);
            xml.set(this.value.tag, xmlList);
        }
        else
            xml.setValue(this.value);
        return xml;
    };
    return InvokeParameter;
})(Entity);
var Application = (function () {
    function Application(movie, ip, port) {
        this.movie = movie;
        this.socket = new ServerConnector(this);
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
var SubMovie = (function () {
    function SubMovie() {
    }
    SubMovie.prototype.replyData = function (invoke) {
        invoke.apply(this);
    };
    SubMovie.prototype.sendData = function (invoke) {
        this.parent.sendData(invoke);
    };
    return SubMovie;
})();
var ExternalSystemArray = (function (_super) {
    __extends(ExternalSystemArray, _super);
    function ExternalSystemArray() {
        _super.call(this);
    }
    ExternalSystemArray.prototype.start = function () {
        for (var i = 0; i < this.length; i++)
            this[i].start();
    };
    ExternalSystemArray.prototype.hasRole = function (key) {
        for (var i = 0; i < this.length; i++)
            if (this[i].has(key) == true)
                return true;
        return false;
    };
    ExternalSystemArray.prototype.getRole = function (key) {
        for (var i = 0; i < this.length; i++)
            if (this[i].has(key) == true)
                return this[i].get(key);
        throw Error("out of range");
    };
    ExternalSystemArray.prototype.sendData = function (invoke) {
        var listener = invoke.getListener();
        for (var i = 0; i < this.length; i++)
            for (var j = 0; j < this[i].length; j++)
                if (this[i][j].hasSendListener(listener) == true)
                    this[i].sendData(invoke);
    };
    ExternalSystemArray.prototype.replyData = function (invoke) {
        invoke.apply(this);
    };
    ExternalSystemArray.prototype.TAG = function () {
        return "systemArray";
    };
    ExternalSystemArray.prototype.CHILD_TAG = function () {
        return "system";
    };
    return ExternalSystemArray;
})(EntityArray);
var ExternalSystem = (function (_super) {
    __extends(ExternalSystem, _super);
    function ExternalSystem() {
        _super.call(this);
        this.driver = null;
    }
    ExternalSystem.prototype.construct = function (xml) {
        _super.prototype.construct.call(this, xml);
        this.name = xml.getProperty("name");
        this.ip = xml.getProperty("ip");
        this.port = xml.getProperty("port");
    };
    ExternalSystem.prototype.start = function () {
        if (this.driver != null)
            return;
        this.driver = new ServerConnector(this);
        this.driver.connect(this.ip, this.port);
    };
    ExternalSystem.prototype.key = function () {
        return this.name;
    };
    ExternalSystem.prototype.getName = function () {
        return this.name;
    };
    ExternalSystem.prototype.getIP = function () {
        return this.ip;
    };
    ExternalSystem.prototype.getPort = function () {
        return this.port;
    };
    ExternalSystem.prototype.sendData = function (invoke) {
        this.driver.sendData(invoke);
    };
    ExternalSystem.prototype.replyData = function (invoke) {
        invoke.apply(this);
        for (var i = 0; i < this.length; i++)
            this[i].replyData(invoke);
    };
    ExternalSystem.prototype.TAG = function () {
        return "system";
    };
    ExternalSystem.prototype.CHILD_TAG = function () {
        return "role";
    };
    ExternalSystem.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("name", this.name);
        xml.setProperty("ip", this.ip);
        xml.setProperty("port", this.port);
        return xml;
    };
    return ExternalSystem;
})(EntityArray);
var ExternalSystemRole = (function (_super) {
    __extends(ExternalSystemRole, _super);
    function ExternalSystemRole(system) {
        _super.call(this);
        this.system = system;
        this.sendListeners = new Set();
    }
    ExternalSystemRole.prototype.construct = function (xml) {
        this.name = xml.getProperty("name");
    };
    ExternalSystemRole.prototype.getName = function () {
        return this.name;
    };
    ExternalSystemRole.prototype.hasSendListener = function (key) {
        return this.sendListeners.has(key);
    };
    ExternalSystemRole.prototype.sendData = function (invoke) {
        this.system.sendData(invoke);
    };
    ExternalSystemRole.prototype.replyData = function (invoke) {
        invoke.apply(this);
    };
    ExternalSystemRole.prototype.TAG = function () {
        return "role";
    };
    ExternalSystemRole.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("name", this.name);
        return xml;
    };
    return ExternalSystemRole;
})(Entity);
var SlaveSystem = (function (_super) {
    __extends(SlaveSystem, _super);
    function SlaveSystem() {
        _super.call(this);
    }
    SlaveSystem.prototype.replyData = function (invoke) {
        var history = new InvokeHistory(invoke);
        _super.prototype.replyData.call(this, invoke);
        history.notifyEnd();
        this.sendData(history.toInvoke());
    };
    return SlaveSystem;
})(ExternalSystem);
var InvokeHistory = (function (_super) {
    __extends(InvokeHistory, _super);
    function InvokeHistory(invoke) {
        _super.call(this);
        this.uid = invoke.get("invoke_history_uid").getValue();
        this.listener = invoke.getListener();
        this.startTime = new Date();
        invoke.erase("invoke_history_uid");
    }
    InvokeHistory.prototype.notifyEnd = function () {
        this.endTime = new Date();
    };
    InvokeHistory.prototype.TAG = function () { return "invokeHistory"; };
    InvokeHistory.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("uid", this.uid);
        xml.setProperty("listener", this.listener);
        xml.setProperty("startTime", this.startTime.getTime() * Math.pow(10.0, 6));
        xml.setProperty("endTime", this.endTime.getTime() * Math.pow(10.0, 6));
        return xml;
    };
    InvokeHistory.prototype.toInvoke = function () {
        return new Invoke("reportInvokeHistory", this.toXML());
    };
    return InvokeHistory;
})(Entity);
var Product = (function (_super) {
    __extends(Product, _super);
    function Product(name, price, volume, weight) {
        if (name === void 0) { name = ""; }
        if (price === void 0) { price = 0; }
        if (volume === void 0) { volume = 0; }
        if (weight === void 0) { weight = 0; }
        _super.call(this);
        this.name = name;
        this.price = price;
        this.volume = volume;
        this.weight = weight;
    }
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getPrice = function () {
        return this.price;
    };
    Product.prototype.getVolume = function () {
        return this.volume;
    };
    Product.prototype.getWeight = function () {
        return this.weight;
    };
    Product.prototype.TAG = function () {
        return "product";
    };
    return Product;
})(Entity);
var ProductArray = (function (_super) {
    __extends(ProductArray, _super);
    function ProductArray() {
        _super.call(this);
    }
    ProductArray.prototype.createChild = function (xml) {
        return new Product();
    };
    ProductArray.prototype.TAG = function () {
        return "productArray";
    };
    ProductArray.prototype.CHILD_TAG = function () {
        return "product";
    };
    return ProductArray;
})(EntityArray);
var Wrapper = (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        _super.call(this);
        if (args.length == 1 && args[0] instanceof Wrapper) {
            var wrapper = args[0];
            this.name = wrapper.name;
            this.price = wrapper.price;
            this.volume = wrapper.volume;
            this.weight = wrapper.weight;
        }
        else if (args.length == 4) {
            this.name = args[0];
            this.price = args[1];
            this.volume = args[2];
            this.weight = args[3];
        }
    }
    Wrapper.prototype.createChild = function (xml) {
        return new Product();
    };
    Wrapper.prototype.tryInsert = function (product) {
        var volume = 0;
        var weight = 0;
        for (var i = 0; i < this.length; i++) {
            volume += this[i].getVolume();
            weight += this[i].getWeight();
        }
        if (product.getVolume() + volume > this.volume ||
            product.getWeight() + weight > this.weight) {
            return false;
        }
        this.push(product);
        return true;
    };
    Wrapper.prototype.getName = function () {
        return this.name;
    };
    Wrapper.prototype.getPrice = function () {
        return this.price;
    };
    Wrapper.prototype.getVolume = function () {
        return this.volume;
    };
    Wrapper.prototype.getWeight = function () {
        return this.weight;
    };
    Wrapper.prototype.TAG = function () {
        return "wrapper";
    };
    return Wrapper;
})(ProductArray);
var WrapperArray = (function (_super) {
    __extends(WrapperArray, _super);
    function WrapperArray(sample) {
        if (sample === void 0) { sample = null; }
        _super.call(this);
        this.sample = sample;
        this.reserved = new Vector();
    }
    WrapperArray.prototype.construct = function (xml) {
        _super.prototype.construct.call(this, xml);
        this.sample = new Wrapper();
        this.sample.construct(xml);
    };
    WrapperArray.prototype.createChild = function (xml) {
        return new Wrapper();
    };
    WrapperArray.prototype.tryInsert = function (product) {
        if (product.getVolume() > this.sample.getVolume() ||
            product.getWeight() > this.sample.getWeight()) {
            return false;
        }
        this.reserved.push(product);
        return true;
    };
    WrapperArray.prototype.optimize = function () {
        if (this.reserved.length == 0)
            return;
        var factorial = new FactorialGenerator(this.reserved.length);
        var minWrapperArray;
        for (var i = 0; i < factorial.size(); i++) {
            var wrapperArray = new WrapperArray(this.sample);
            var row = factorial.at(i);
            for (var j = 0; j < row.length; j++) {
                var product = this.reserved[row[j]];
                if (wrapperArray.length == 0 ||
                    wrapperArray[wrapperArray.length - 1].tryInsert(product) == false) {
                    var wrapper = new Wrapper(this.sample);
                    wrapper.tryInsert(product);
                    wrapperArray.push(wrapper);
                }
            }
            if (minWrapperArray == null ||
                wrapperArray.calcPrice() < minWrapperArray.calcPrice()) {
                minWrapperArray = wrapperArray;
            }
        }
        this.splice(0, this.length);
        for (var i = 0; i < minWrapperArray.length; i++)
            this.push(minWrapperArray[i]);
    };
    WrapperArray.prototype.calcPrice = function () {
        return this.sample.getPrice() * this.length;
    };
    WrapperArray.prototype.getSample = function () {
        return this.sample;
    };
    WrapperArray.prototype.TAG = function () {
        return "wrapperArray";
    };
    WrapperArray.prototype.CHILD_TAG = function () {
        return "wrapper";
    };
    WrapperArray.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.addAllProperties(this.sample.toXML());
        return xml;
    };
    return WrapperArray;
})(EntityArray);
var Packer = (function (_super) {
    __extends(Packer, _super);
    function Packer(obj) {
        if (obj === void 0) { obj = null; }
        _super.call(this);
        if (obj == null) {
            this.productArray = new ProductArray();
            return;
        }
        if (obj instanceof ProductArray) {
            this.productArray = obj;
        }
        else if (obj instanceof Packer) {
            var packer = obj;
            this.productArray = packer.productArray;
            for (var i = 0; i < packer.length; i++)
                this.push(new WrapperArray(packer[i].getSample()));
        }
        else
            throw "invalid argument";
    }
    Packer.prototype.createChild = function (xml) {
        return new WrapperArray();
    };
    Packer.prototype.optimize = function (start, size) {
        if (start === void 0) { start = 0; }
        if (size === void 0) { size = -1; }
        if (this.length == 0 || this.productArray.length == 0)
            return;
        var caseGenerator = new CombinedPermutationGenerator(this.length, this.productArray.length);
        var minPacker = null;
        if (size == -1 || start + size > caseGenerator.size())
            size = caseGenerator.size() - start;
        for (var i = start; i < start + size; i++) {
            var packer = new Packer(this);
            var row = caseGenerator.at(i);
            var validity = true;
            for (var j = 0; j < row.length; j++) {
                var product = this.productArray[j];
                var wrapperArray = packer[row[j]];
                if (wrapperArray.tryInsert(product) == false) {
                    validity = false;
                    break;
                }
            }
            if (validity == false)
                continue;
            for (var j = 0; j < packer.length; j++)
                packer[j].optimize();
            if (minPacker == null || packer.calcPrice() < minPacker.calcPrice())
                minPacker = packer;
        }
        this.splice(0, this.length);
        for (var i = 0; i < minPacker.length; i++)
            this.push(minPacker[i]);
    };
    Packer.prototype.calcPrice = function () {
        var price = 0;
        for (var i = 0; i < this.length; i++)
            price += this[i].calcPrice();
        return price;
    };
    Packer.prototype.TAG = function () {
        return "packer";
    };
    Packer.prototype.CHILD_TAG = function () {
        return "wrapperArray";
    };
    return Packer;
})(EntityArray);
var PackerSlaveSystem = (function (_super) {
    __extends(PackerSlaveSystem, _super);
    function PackerSlaveSystem(ip, port) {
        _super.call(this);
        this.ip = ip;
        this.port = port;
    }
    PackerSlaveSystem.prototype.optimize = function (xml, start, size) {
        var packer = new Packer();
        packer.construct(xml);
        packer.optimize(start, size);
        trace("optimize number of " + size + " cases from #" + start);
        trace(packer.toXML().toHTML());
        this.sendData(new Invoke("replyOptimization", packer));
    };
    return PackerSlaveSystem;
})(SlaveSystem);
