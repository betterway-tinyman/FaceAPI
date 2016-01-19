var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceEvent = (function (_super) {
            __extends(FaceEvent, _super);
            function FaceEvent(type) {
                _super.call(this, type);
            }
            Object.defineProperty(FaceEvent, "REGISTER", {
                get: function () { return "register"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FaceEvent, "UNREGISTER", {
                get: function () { return "unregister"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FaceEvent, "DETECT", {
                get: function () { return "detect"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FaceEvent, "TRAIN", {
                get: function () { return "train"; },
                enumerable: true,
                configurable: true
            });
            return FaceEvent;
        })(Event);
        faceapi.FaceEvent = FaceEvent;
        var IdentifyEvent = (function (_super) {
            __extends(IdentifyEvent, _super);
            function IdentifyEvent(personGroup, face, maxCandidates, candidates) {
                _super.call(this, IdentifyEvent.IDENTIFY);
                this.face_ = face;
                this.personGroup_ = personGroup;
                this.maxCandidates_ = maxCandidates;
                this.candidates_ = candidates;
            }
            Object.defineProperty(IdentifyEvent, "IDENTIFY", {
                get: function () { return "identify"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IdentifyEvent.prototype, "personGroup", {
                get: function () {
                    return this.personGroup_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IdentifyEvent.prototype, "face", {
                get: function () {
                    return this.face_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IdentifyEvent.prototype, "maxCandidates", {
                get: function () {
                    return this.maxCandidates_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IdentifyEvent.prototype, "candidates", {
                get: function () {
                    return this.candidates_;
                },
                enumerable: true,
                configurable: true
            });
            return IdentifyEvent;
        })(FaceEvent);
        faceapi.IdentifyEvent = IdentifyEvent;
        var FindSimilarEvent = (function (_super) {
            __extends(FindSimilarEvent, _super);
            function FindSimilarEvent(faceList, face, maxCandidates, similars) {
                _super.call(this, FindSimilarEvent.FIND);
                this.faceList_ = faceList;
                this.face_ = face;
                this.maxCandidates_ = maxCandidates;
                this.similars_ = similars;
            }
            Object.defineProperty(FindSimilarEvent, "FIND", {
                get: function () { return "find_similar"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarEvent.prototype, "faceList", {
                get: function () {
                    return this.faceList_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarEvent.prototype, "face", {
                get: function () {
                    return this.face_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarEvent.prototype, "maxCandidates", {
                get: function () {
                    return this.maxCandidates_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarEvent.prototype, "similars", {
                get: function () {
                    return this.similars_;
                },
                enumerable: true,
                configurable: true
            });
            return FindSimilarEvent;
        })(FaceEvent);
        faceapi.FindSimilarEvent = FindSimilarEvent;
        var FindSimilarGroupEvent = (function (_super) {
            __extends(FindSimilarGroupEvent, _super);
            function FindSimilarGroupEvent(faceArray, similarGroups) {
                _super.call(this, FindSimilarGroupEvent.FIND);
                this.similarGroups_ = similarGroups;
            }
            Object.defineProperty(FindSimilarGroupEvent, "FIND", {
                get: function () { return "find_similar_group"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarGroupEvent.prototype, "faceArray", {
                get: function () {
                    return this.faceArray_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarGroupEvent.prototype, "similarGroups", {
                get: function () {
                    return this.similarGroups_;
                },
                enumerable: true,
                configurable: true
            });
            return FindSimilarGroupEvent;
        })(FaceEvent);
        faceapi.FindSimilarGroupEvent = FindSimilarGroupEvent;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
