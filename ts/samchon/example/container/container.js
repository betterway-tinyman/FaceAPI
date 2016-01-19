var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var container;
        (function (container) {
            function main() {
                var list = new std.UnorderedSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                samchon.trace("#" + list.size());
                for (var it = list.begin(); it.equals(list.end()) == false; it = it.next())
                    samchon.trace(it.value);
            }
            container.main = main;
        })(container = example.container || (example.container = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
