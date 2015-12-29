/// <reference path='SamchonFramework.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* ============================================================
    BASIC ENTITIES
        - PERSON_GROUP
        - PERSON
        - PICTURE
        - FACE
============================================================ */
var PersonGroup = (function (_super) {
    __extends(PersonGroup, _super);
    function PersonGroup() {
        _super.apply(this, arguments);
    }
    return PersonGroup;
})(EntityArray);
var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        _super.call(this);
        this.faceArray = new Vector();
    }
    Person.prototype.TAG = function () {
        return "person";
    };
    return Person;
})(Entity);
var Picture = (function (_super) {
    __extends(Picture, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    function Picture() {
        _super.call(this);
    }
    Picture.prototype.createChild = function (xml) {
        return new Face(this);
    };
    /* --------------------------------------------------------
        INTERACTION WITH FACE-API
    -------------------------------------------------------- */
    Picture.prototype.detect = function () {
        // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Picture.prototype.TAG = function () {
        return "person";
    };
    Picture.prototype.CHILD_TAG = function () {
        return "face";
    };
    return Picture;
})(EntityArray);
var Face = (function (_super) {
    __extends(Face, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    function Face(picture) {
        _super.call(this);
        this.picture = picture;
        this.person = null;
        this.landmarks = new FaceLandmakrs();
        this.attributes = new FaceAttributes();
    }
    Face.prototype.construct = function (xml) {
        _super.prototype.construct.call(this, xml);
        this.width = xml.getProperty("width");
        this.height = xml.getProperty("height");
        this.landmarks.construct(xml.get(this.landmarks.TAG())[0]);
        this.attributes.construct(xml.get(this.attributes.TAG())[0]);
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Face.prototype.TAG = function () {
        return "face";
    };
    Face.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("width", this.width);
        xml.setProperty("height", this.height);
        xml.push(this.landmarks.toXML());
        xml.push(this.landmarks.toXML());
        return xml;
    };
    return Face;
})(Point);
/* ============================================================
    SUB ENTITIES BELONGS TO A FACE
        - FACE_LANDMARKS
        - FACE_ATTRIBUTES
            - FACIAL_HAIR
            - HEAD_POSE
============================================================ */
var FaceLandmakrs = (function (_super) {
    __extends(FaceLandmakrs, _super);
    function FaceLandmakrs() {
        _super.apply(this, arguments);
    }
    return FaceLandmakrs;
})(Entity);
var FaceAttributes = (function (_super) {
    __extends(FaceAttributes, _super);
    function FaceAttributes() {
        _super.apply(this, arguments);
    }
    return FaceAttributes;
})(Entity);
var FacialHair = (function (_super) {
    __extends(FacialHair, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function FacialHair() {
        _super.call(this);
    }
    FacialHair.prototype.construct = function (xml) {
        this.mustache = xml.getProperty("mustache");
        this.beard = xml.getProperty("beard");
        this.sideburns = xml.getProperty("sideburns");
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    FacialHair.prototype.TAG = function () {
        return "facialHair";
    };
    FacialHair.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("mustache", this.mustache);
        xml.setProperty("beard", this.beard);
        xml.setProperty("sideburns", this.sideburns);
        return xml;
    };
    return FacialHair;
})(Entity);
var HeadPose = (function (_super) {
    __extends(HeadPose, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function HeadPose() {
        _super.call(this);
    }
    HeadPose.prototype.construct = function (xml) {
        this.roll = xml.getProperty("roll");
        this.yaw = xml.getProperty("yaw");
        this.pitch = xml.getProperty("pitch");
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    HeadPose.prototype.TAG = function () {
        return "headPose";
    };
    HeadPose.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("roll", this.roll);
        xml.setProperty("yaw", this.yaw);
        xml.setProperty("pitch", this.pitch);
        return xml;
    };
    return HeadPose;
})(Entity);
var Point = (function (_super) {
    __extends(Point, _super);
    function Point() {
        _super.call(this);
    }
    Point.prototype.construct = function (xml) {
        this.x = xml.getProperty("x");
        this.y = xml.getProperty("y");
    };
    Point.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("x", this.x);
        xml.setProperty("y", this.y);
        return xml;
    };
    return Point;
})(Entity);
//# sourceMappingURL=FaceAPI.js.map