var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var EventDispatcher = (function () {
            function EventDispatcher(target) {
                if (target === void 0) { target = null; }
                if (target == null)
                    this.target = this;
                else
                    this.target = target;
                this.listeners = new std.UnorderedMap();
            }
            EventDispatcher.prototype.hasEventListener = function (type) {
                return this.listeners.has(type);
            };
            EventDispatcher.prototype.dispatchEvent = function (event) {
                event.target = this.target;
                if (this.listeners.has(event.type) == false)
                    return false;
                var listenerSet = this.listeners.get(event.type);
                for (var it = listenerSet.begin(); it.equals(listenerSet.end()) == false; it = it.next())
                    it.value.apply();
                return true;
            };
            EventDispatcher.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                var listenerSet;
                if (this.listeners.has(type) == false) {
                    listenerSet = new std.UnorderedSet();
                    this.listeners.set(type, listenerSet);
                }
                else
                    listenerSet = this.listeners.get(type);
                listenerSet.insert(new std.Bind(listener, thisArg));
            };
            EventDispatcher.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                if (this.listeners.has(type) == false)
                    return;
                var listenerSet = this.listeners.get(type);
                var bind = new std.Bind(listener, thisArg);
                if (listenerSet.has(bind) == false)
                    return;
                listenerSet.erase(bind);
                if (listenerSet.empty() == true)
                    this.listeners.erase(type);
            };
            return EventDispatcher;
        })();
        library.EventDispatcher = EventDispatcher;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
