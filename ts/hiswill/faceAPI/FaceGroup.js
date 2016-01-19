var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceGroup = (function (_super) {
            __extends(FaceGroup, _super);
            function FaceGroup(groupArray) {
                _super.call(this);
                this.groupArray = groupArray;
            }
            FaceGroup.prototype.constructByJSON = function (val) {
                this.clear();
                var idArray = val;
                for (var i = 0; i < idArray.length; i++) {
                    var id = idArray[i];
                    var face = this.fetchChild(id);
                    if (face == null)
                        continue;
                    this.push(face);
                }
            };
            FaceGroup.prototype.fetchChild = function (id) {
                var faceArray = this.groupArray.getFaceArray();
                if (faceArray.has(id) == true)
                    return faceArray.get(id);
                var api = this.groupArray.getAPI();
                if (api == null)
                    return null;
                var pictureArray = api.getPictureArray();
                for (var i = 0; i < pictureArray.size(); i++)
                    if (pictureArray.at(i).has(id) == true)
                        return pictureArray.at(i).get(id);
                return null;
            };
            FaceGroup.prototype.getGroupArray = function () {
                return this.groupArray;
            };
            return FaceGroup;
        })(faceapi.FaceReferArray);
        faceapi.FaceGroup = FaceGroup;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
