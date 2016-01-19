var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var entity;
        (function (entity) {
            function main() {
                var str = "<memberList>\n" +
                    "   <member id='abcd' name='ABCD' />\n" +
                    "   <member id='efgh' name='EFGH' />\n" +
                    "</memberList>";
                var xml = new samchon.library.XML(str);
                samchon.trace(xml.toString());
                samchon.trace(new samchon.library.XML(xml.toString()).toString());
            }
            entity.main = main;
        })(entity = example.entity || (example.entity = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
