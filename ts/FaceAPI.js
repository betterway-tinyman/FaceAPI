/// <reference path='SamchonFramework.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* ============================================================
    GLOBAL AND ABSTRACTS
        - GLOBAL
        - DIRECTION
        - POINT_ENTITY
        - I_JSON_ENTITY
============================================================ */
var Global = (function () {
    function Global() {
    }
    Object.defineProperty(Global, "CERTIFICATION_KEY", {
        get: function () {
            return "b072c71311d144388ac2527a5f06ffca";
        },
        enumerable: true,
        configurable: true
    });
    Global.fetch = function (entity, json) {
        for (var key in json) {
            if (typeof key != "string" || entity.hasOwnProperty(key) == false)
                continue;
            if (typeof entity[key] == "number" || typeof entity[key] == "string")
                entity[key] = json[key];
            else if (entity[key] instanceof Entity || entity[key] instanceof EntityArray) {
                var json_entity = json[key];
                json_entity.constructByJSON(json[key]);
            }
        }
    };
    return Global;
})();
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
var Point = (function (_super) {
    __extends(Point, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function Point(tag) {
        _super.call(this);
        this.tag = tag;
    }
    Point.prototype.constructByJSON = function (val) {
        Global.fetch(this, val);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Point.prototype.getX = function () {
        return this.x;
    };
    Point.prototype.getY = function () {
        return this.y;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Point.prototype.TAG = function () {
        return this.tag;
    };
    return Point;
})(Entity);
/* ============================================================
    BASIC ENTITIES
        - PERSON_GROUP
        - PERSON
        - PICTURE
        - FACE
============================================================ */
/**
 * <p> Person의 집합. </p>
 *
 * <p> Face가 누구(Person)의 얼굴인지 식별하고자 한다면 반드시 구성해야 할 집합이다. </p>
 *
 * <p> 참고자료
 * <ul>
 *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244 </li>
 *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395249 </li>
 * </ul>
 *
 * @author 남정호
 */
var PersonGroup = (function (_super) {
    __extends(PersonGroup, _super);
    function PersonGroup() {
        _super.apply(this, arguments);
    }
    return PersonGroup;
})(EntityArray);
var Person = (function (_super) {
    __extends(Person, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 기본 생성자.
     */
    function Person() {
        _super.call(this);
        this.faceArray = new Vector();
    }
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
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
    /**
     * 기본 생성자.
     */
    function Picture() {
        _super.call(this);
    }
    Picture.prototype.construct = function (xml) {
        this.url = xml.getProperty("url");
        _super.prototype.construct.call(this, xml);
    };
    Picture.prototype.constructByJSON = function (val) {
        var array = val;
        for (var i = 0; i < array.length; i++) {
            var face = new Face(this);
            face.constructByJSON(array[i]);
            this.push(face);
        }
    };
    Picture.prototype.createChild = function (xml) {
        return new Face(this);
    };
    /* --------------------------------------------------------
        INTERACTION WITH FACE-API
    -------------------------------------------------------- */
    /**
     * <p> 사진 속 얼굴들을 감지해낸다. </p>
     *
     * <ul>
     *  <li> 참고자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236 </li>
     * </ul>
     */
    Picture.prototype.detectFaces = function () {
        this.splice(0, this.length);
        // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
        var apiURL = "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true";
        var str; // = replyData;
        this.constructByJSON(JSON.parse(str));
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
    Picture.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("url", this.url);
        return xml;
    };
    return Picture;
})(EntityArray);
var Face = (function (_super) {
    __extends(Face, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from Picture.
     */
    function Face(picture) {
        _super.call(this, "face");
        this.picture = picture;
        this.person = null;
        this.landmarks = new FaceLandmarks(this);
        this.attributes = new FaceAttributes(this);
    }
    Face.prototype.constructByJSON = function (obj) {
        Global.fetch(this, obj);
        this.x = obj["left"];
        this.y = obj["top"];
    };
    /**
     * <p> 이 얼굴(Face)이 누구인지(Person in PersonGroup) 감지해냄. </p>
     *
     * <ul>
     *  <li> 참고자료:  </li>
     * </ul>
     */
    Face.prototype.identifyPerson = function (personGroup) {
        return null;
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Face.prototype.getPicture = function () {
        return this.picture;
    };
    Face.prototype.getPerson = function () {
        return this.person;
    };
    Face.prototype.getWidth = function () {
        return this.width;
    };
    Face.prototype.getHeight = function () {
        return this.height;
    };
    Face.prototype.getLandmarks = function () {
        return this.landmarks;
    };
    Face.prototype.getAttributes = function () {
        return this.attributes;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Face.prototype.TAG = function () {
        return _super.prototype.TAG.call(this);
    };
    return Face;
})(Point);
/* ============================================================
    SUB EN0TITIES BELONGS TO A FACE
        - FACE_LANDMARKS
            - EYE_BROW
            - EYE
                - PUPIL
            - NOSE
            - MOUTH
                - LIP
        - FACE_ATTRIBUTES
            - FACIAL_HAIR
            - HEAD_POSE
============================================================ */
/* ============================================================
    LANDMARKS
============================================================ */
/**
 * 얼굴의 주요 요소 엔티티.
 *
 * @author 남정호
 */
var FaceLandmarks = (function (_super) {
    __extends(FaceLandmarks, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    function FaceLandmarks(face) {
        _super.call(this);
        this.face = face;
        this.eyeBrows = new EyeBrows(this);
        this.eyes = new Eyes(this);
        this.nose = new Nose(this);
        this.mouth = new Mouth(this);
    }
    FaceLandmarks.prototype.constructByJSON = function (obj) {
        this.eyeBrows.constructByJSON(obj);
        this.eyes.constructByJSON(obj);
        this.nose.constructByJSON(obj);
        this.mouth.constructByJSON(obj);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    FaceLandmarks.prototype.getFace = function () {
        return this.face;
    };
    FaceLandmarks.prototype.getEyeBrows = function () {
        return this.eyeBrows;
    };
    FaceLandmarks.prototype.getEyes = function () {
        return this.eyes;
    };
    FaceLandmarks.prototype.getNose = function () {
        return this.nose;
    };
    FaceLandmarks.prototype.getMouth = function () {
        return this.mouth;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    FaceLandmarks.prototype.TAG = function () {
        return "landmarks";
    };
    return FaceLandmarks;
})(Entity);
var FaceLandmark = (function (_super) {
    __extends(FaceLandmark, _super);
    function FaceLandmark(landmarks) {
        _super.call(this);
    }
    FaceLandmark.prototype.constructByJSON = function (val) {
        Global.fetch(this, val);
    };
    FaceLandmark.prototype.getLandmarks = function () {
        return this.landmarks;
    };
    return FaceLandmark;
})(Entity);
/**
 * 눈썹 둘.
 */
var EyeBrows = (function (_super) {
    __extends(EyeBrows, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function EyeBrows(landmarks) {
        _super.call(this, landmarks);
        this.left = new EyeBrow(this, Direction.LEFT);
        this.right = new EyeBrow(this, Direction.RIGHT);
    }
    EyeBrows.prototype.constructByJSON = function (obj) {
        this.left.constructByJSON(obj);
        this.right.constructByJSON(obj);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    EyeBrows.prototype.getLeft = function () {
        return this.left;
    };
    EyeBrows.prototype.getRight = function () {
        return this.right;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    EyeBrows.prototype.TAG = function () {
        return "eyeBrows";
    };
    return EyeBrows;
})(FaceLandmark);
/**
 * 눈썹.
 *
 * @author 남정호
 */
var EyeBrow = (function (_super) {
    __extends(EyeBrow, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function EyeBrow(eyeBrows, direction) {
        _super.call(this);
        this.eyeBrows = eyeBrows;
        this.direction = direction;
        this.inner = new Point("inner");
        this.outer = new Point("outer");
    }
    EyeBrow.prototype.constructByJSON = function (obj) {
        if (this.direction == Direction.LEFT) {
            this.inner.constructByJSON(obj["eyeBrowLeftInner"]);
            this.outer.constructByJSON(obj["eyeBrowLeftOuter"]);
        }
        else {
            this.inner.constructByJSON(obj["eyeBrowRightInner"]);
            this.outer.constructByJSON(obj["eyeBrowRightOuter"]);
        }
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    EyeBrow.prototype.getEyeBrows = function () {
        return this.eyeBrows;
    };
    EyeBrow.prototype.getOpposite = function () {
        if (this.direction == Direction.LEFT)
            return this.eyeBrows.getRight();
        else
            return this.eyeBrows.getLeft();
    };
    EyeBrow.prototype.getInner = function () {
        return this.inner;
    };
    EyeBrow.prototype.getOuter = function () {
        return this.outer;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    EyeBrow.prototype.TAG = function () {
        if (this.direction == Direction.LEFT)
            return "left";
        else
            return "right";
    };
    return EyeBrow;
})(Entity);
var Eyes = (function (_super) {
    __extends(Eyes, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function Eyes(landmarks) {
        _super.call(this, landmarks);
        this.left = new Eye(this, Direction.LEFT);
        this.right = new Eye(this, Direction.RIGHT);
    }
    Eyes.prototype.constructByJSON = function (obj) {
        this.left.constructByJSON(obj);
        this.right.constructByJSON(obj);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Eyes.prototype.getLeft = function () {
        return this.left;
    };
    Eyes.prototype.getRight = function () {
        return this.right;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Eyes.prototype.TAG = function () {
        return "eyes";
    };
    return Eyes;
})(FaceLandmark);
var Eye = (function (_super) {
    __extends(Eye, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function Eye(eyes, direction) {
        _super.call(this);
        this.eyes = eyes;
        this.direction = direction;
        this.top = new Point("top");
        this.bottom = new Point("bottom");
        this.inner = new Point("inner");
        this.outer = new Point("outer");
        this.pupil = new Pupil(this);
    }
    Eye.prototype.constructByJSON = function (obj) {
        if (this.direction == Direction.LEFT) {
            this.top.constructByJSON(obj["eyeLeftTop"]);
            this.bottom.constructByJSON(obj["eyeLeftBottom"]);
            this.inner.constructByJSON(obj["eyeLeftInner"]);
            this.outer.constructByJSON(obj["eyeLeftOuter"]);
            this.pupil.constructByJSON(obj["pupilLeft"]);
        }
        else {
            this.top.constructByJSON(obj["eyeRightTop"]);
            this.bottom.constructByJSON(obj["eyeRightBottom"]);
            this.inner.constructByJSON(obj["eyeRightInner"]);
            this.outer.constructByJSON(obj["eyeRightOuter"]);
            this.pupil.constructByJSON(obj["pupilRight"]);
        }
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Eye.prototype.getEyes = function () {
        return this.eyes;
    };
    Eye.prototype.getOpposite = function () {
        if (this.direction == Direction.LEFT)
            return this.eyes.getRight();
        else
            return this.eyes.getLeft();
    };
    Eye.prototype.getTop = function () {
        return this.top;
    };
    Eye.prototype.getBottom = function () {
        return this.bottom;
    };
    Eye.prototype.getInner = function () {
        return this.inner;
    };
    Eye.prototype.getOuter = function () {
        return this.outer;
    };
    Eye.prototype.getPupil = function () {
        return this.pupil;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Eye.prototype.TAG = function () {
        if (this.direction == Direction.LEFT)
            return "left";
        else
            return "right";
    };
    return Eye;
})(Entity);
/**
 * 눈동자.
 *
 * @author 남정호
 */
var Pupil = (function (_super) {
    __extends(Pupil, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    function Pupil(eye) {
        _super.call(this, "pupil");
        this.eye = eye;
    }
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Pupil.prototype.getEye = function () {
        return this.eye;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Pupil.prototype.TAG = function () {
        return _super.prototype.TAG.call(this);
    };
    return Pupil;
})(Point);
var Nose = (function (_super) {
    __extends(Nose, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    function Nose(landmarks) {
        _super.call(this, landmarks);
        this.tip = new Point("tip");
        this.leftRoot = new Point("leftRoot");
        this.rightRoot = new Point("rightRoot");
        this.leftAlarTop = new Point("leftAlarTop");
        this.rightAlarTop = new Point("rightAlarTop");
        this.leftAlarOutTip = new Point("leftAlarOutTip");
        this.rightAlarOutTip = new Point("rightAlarOutTip");
    }
    Nose.prototype.constructByJSON = function (obj) {
        this.tip.constructByJSON(obj["noseTip"]);
        this.leftRoot.constructByJSON(obj["noseRootLeft"]);
        this.rightRoot.constructByJSON(obj["noseRootRight"]);
        this.leftAlarTop.constructByJSON(obj["noseLeftAlarTop"]);
        this.rightAlarTop.constructByJSON(obj["noseRightAlarTop"]);
        this.leftAlarOutTip.constructByJSON(obj["noseLeftAlarOutTip"]);
        this.rightAlarOutTip.constructByJSON(obj["noseRightAlarOutTip"]);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Nose.prototype.getTip = function () {
        return this.tip;
    };
    Nose.prototype.getLeftRoot = function () {
        return this.leftRoot;
    };
    Nose.prototype.getRightRoot = function () {
        return this.rightRoot;
    };
    Nose.prototype.getLeftAlarTop = function () {
        return this.leftAlarTop;
    };
    Nose.prototype.getRightAlarTop = function () {
        return this.rightAlarTop;
    };
    Nose.prototype.getLeftAlarOutTip = function () {
        return this.leftAlarOutTip;
    };
    Nose.prototype.getRightAlarOutTip = function () {
        return this.rightAlarOutTip;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Nose.prototype.TAG = function () {
        return "nose";
    };
    return Nose;
})(FaceLandmark);
var Mouth = (function (_super) {
    __extends(Mouth, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    function Mouth(landmarks) {
        _super.call(this, landmarks);
        this.lip = new Lip(this);
        this.left = new Point("left");
        this.right = new Point("right");
    }
    Mouth.prototype.constructByJSON = function (obj) {
        this.lip.constructByJSON(obj);
        this.left.constructByJSON(obj["mouseLeft"]);
        this.right.constructByJSON(obj["mouseRight"]);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Mouth.prototype.getLip = function () {
        return this.lip;
    };
    Mouth.prototype.getLeft = function () {
        return this.left;
    };
    Mouth.prototype.getRight = function () {
        return this.right;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Mouth.prototype.TAG = function () {
        return "mouth";
    };
    return Mouth;
})(FaceLandmark);
var Lip = (function (_super) {
    __extends(Lip, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    function Lip(mouth) {
        _super.call(this);
        this.mouth = mouth;
        this.upperTop = new Point("upperTop");
        this.upperBottom = new Point("upperBottom");
        this.underTop = new Point("underTop");
        this.underBottom = new Point("underBottom");
    }
    Lip.prototype.constructByJSON = function (obj) {
        this.upperTop.constructByJSON(obj["upperLipTop"]);
        this.upperBottom.constructByJSON(obj["upperLipBottom"]);
        this.underTop.constructByJSON(obj["underLipTop"]);
        this.underBottom.constructByJSON(obj["underLipBottom"]);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Lip.prototype.getMouth = function () {
        return this.mouth;
    };
    Lip.prototype.getUpperTop = function () {
        return this.upperTop;
    };
    Lip.prototype.getUpperBottom = function () {
        return this.upperBottom;
    };
    Lip.prototype.getUnderTop = function () {
        return this.underTop;
    };
    Lip.prototype.getUnderBottom = function () {
        return this.underBottom;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Lip.prototype.TAG = function () {
        return "lip";
    };
    return Lip;
})(Entity);
/* ============================================================
    ATTRIBUTES
============================================================ */
var FaceAttributes = (function (_super) {
    __extends(FaceAttributes, _super);
    /* --------------------------------------------------------
        CONSTRUCTOR
    -------------------------------------------------------- */
    function FaceAttributes(face) {
        _super.call(this);
        this.face = face;
        this.facialHair = new FacialHair(this);
        this.headPose = new HeadPose(this);
    }
    FaceAttributes.prototype.constructByJSON = function (val) {
        Global.fetch(this, val);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    FaceAttributes.prototype.getFace = function () {
        return this.face;
    };
    FaceAttributes.prototype.getAge = function () {
        return this.age;
    };
    FaceAttributes.prototype.getGender = function () {
        return this.gender;
    };
    FaceAttributes.prototype.getSmile = function () {
        return this.smile;
    };
    FaceAttributes.prototype.getFacialHair = function () {
        return this.facialHair;
    };
    FaceAttributes.prototype.getHeadPose = function () {
        return this.headPose;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    FaceAttributes.prototype.TAG = function () {
        return "attributes";
    };
    return FaceAttributes;
})(Entity);
var FaceAttribute = (function (_super) {
    __extends(FaceAttribute, _super);
    function FaceAttribute(attributes) {
        _super.call(this);
        this.attributes = attributes;
    }
    FaceAttribute.prototype.constructByJSON = function (val) {
        Global.fetch(this, val);
    };
    return FaceAttribute;
})(Entity);
var FacialHair = (function (_super) {
    __extends(FacialHair, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function FacialHair(attributes) {
        _super.call(this, attributes);
    }
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    FacialHair.prototype.getMustache = function () {
        return this.mustache;
    };
    FacialHair.prototype.getBeard = function () {
        return this.beard;
    };
    FacialHair.prototype.getSideburns = function () {
        return this.sideburns;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    FacialHair.prototype.TAG = function () {
        return "facialHair";
    };
    return FacialHair;
})(FaceAttribute);
var HeadPose = (function (_super) {
    __extends(HeadPose, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function HeadPose(attributes) {
        _super.call(this, attributes);
        this.attributes = attributes;
    }
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    HeadPose.prototype.getRoll = function () {
        return this.roll;
    };
    HeadPose.prototype.getYaw = function () {
        return this.yaw;
    };
    HeadPose.prototype.getPitch = function () {
        return this.pitch;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    HeadPose.prototype.TAG = function () {
        return "headPose";
    };
    return HeadPose;
})(FaceAttribute);
//# sourceMappingURL=FaceAPI.js.map