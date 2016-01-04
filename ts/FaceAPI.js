/// <reference path="jquery.d.ts" />
/// <reference path='SamchonFramework.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function main() {
}
/* ============================================================
    GLOBAL AND ABSTRACTS
        - GLOBAL
        - DIRECTION
        - POINT_ENTITY
============================================================ */
/**
 * 전역 클래스.
 *
 * @author 남정호
 */
var Global = (function () {
    function Global() {
    }
    Object.defineProperty(Global, "CERTIFICATION_KEY", {
        /**
         * Face API 의 인증키.
         */
        get: function () {
            return "b072c71311d144388ac2527a5f06ffca";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 엔티티의 멤버를 JSON 객체로부터 구성한다.
     */
    Global.fetch = function (entity, json) {
        for (var key in json) {
            if (typeof key != "string" || entity.hasOwnProperty(key) == false)
                continue;
            if (typeof entity[key] == "number" || typeof entity[key] == "string")
                entity[key] = json[key];
            else if (entity[key] instanceof Entity || entity[key] instanceof EntityArray) {
                var json_entity = entity[key];
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
/**
 * X-Y 좌표 엔티티.
 *
 * @author 남정호
 */
var Point = (function (_super) {
    __extends(Point, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 with XML 태그명.
     */
    function Point(tag) {
        _super.call(this);
        this.tag = tag;
        this.x = 0;
        this.y = 0;
    }
    Point.prototype.constructByJSON = function (val) {
        Global.fetch(this, val);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    /**
     * Get X 좌표.
     */
    Point.prototype.getX = function () {
        return this.x;
    };
    /**
     * Get Y 좌표.
     */
    Point.prototype.getY = function () {
        return this.y;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Point.prototype.TAG = function () {
        return this.tag;
    };
    Point.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.eraseProperty("tag");
        return xml;
    };
    return Point;
})(Entity);
/**
 * Face API의 Facade controller 및 Factory 클래스.
 *
 * @author 남정호
 */
var FaceAPI = (function (_super) {
    __extends(FaceAPI, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 기본 생성자.
     */
    function FaceAPI() {
        _super.call(this);
        this.personGroupArray = new PersonGroupArray(this);
        this.pictureArray = new PictureArray(this);
    }
    /**
     * Factory method of 사람 그룹.
     */
    FaceAPI.prototype.createPersonGroup = function (name) {
        var personGroup = new PersonGroup(this.personGroupArray, name);
        this.personGroupArray.push(personGroup);
        return personGroup;
    };
    /**
     * Factory method of 얼굴 리스트.
     */
    FaceAPI.prototype.createFaceList = function (name) {
        return new FaceList(this, name);
    };
    /**
     * Factory method of 사진.
     */
    FaceAPI.prototype.createPicture = function (url) {
        var picture = new Picture(this.pictureArray, url);
        this.pictureArray.push(picture);
        return picture;
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    /**
     * Get 사람 그룹 리스트.
     */
    FaceAPI.prototype.getPersonGroupArray = function () {
        return this.personGroupArray;
    };
    /**
     * Get 사진 리스트.
     */
    FaceAPI.prototype.getPictureArray = function () {
        return this.pictureArray;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    FaceAPI.prototype.TAG = function () {
        return "faceAPI";
    };
    FaceAPI.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.push(this.personGroupArray.toXML(), this.pictureArray.toXML());
        return xml;
    };
    /* --------------------------------------------------------
        STATIC MEMBERS
    -------------------------------------------------------- */
    FaceAPI.send = function (url, method, params, data, success) {
        $.ajax({
            url: url + "?" + $.param(params),
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: method,
            async: false,
            data: JSON.stringify(data),
            success: function (data) {
                success.apply(data);
            }
        });
    };
    return FaceAPI;
})(Entity);
/**
 * 사람 그룹 리스트 엔티티.
 *
 * @author 남정호
 */
var PersonGroupArray = (function (_super) {
    __extends(PersonGroupArray, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from API.
     */
    function PersonGroupArray(api) {
        _super.call(this);
        this.api = api;
    }
    PersonGroupArray.prototype.createChild = function (xml) {
        return new PersonGroup(this, xml.getProperty("name"));
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    /**
     * Get API.
     */
    PersonGroupArray.prototype.getAPI = function () {
        return this.api;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    PersonGroupArray.prototype.TAG = function () {
        return "personGroupArray";
    };
    PersonGroupArray.prototype.CHILD_TAG = function () {
        return "personGroup";
    };
    return PersonGroupArray;
})(EntityArray);
/**
 * 사진 목록.
 */
var PictureArray = (function (_super) {
    __extends(PictureArray, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from API.
     */
    function PictureArray(api) {
        _super.call(this);
        this.api = api;
    }
    PictureArray.prototype.createChild = function (xml) {
        return new Picture(this, xml.getProperty("url"));
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    PictureArray.prototype.TAG = function () {
        return "pictureArray";
    };
    PictureArray.prototype.CHILD_TAG = function () {
        return "picture";
    };
    return PictureArray;
})(EntityArray);
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
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    function PersonGroup(groupArray, name) {
        if (name === void 0) { name = ""; }
        _super.call(this);
        this.groupArray = groupArray;
        this.id = "";
        this.name = name;
        this.trained = false;
        this.registered = false;
    }
    PersonGroup.prototype.createChild = function (xml) {
        // 어떻게 Person을 찾아낼 지 생각해야 함
        return null;
    };
    /* --------------------------------------------------------
        OPERATORS
    -------------------------------------------------------- */
    PersonGroup.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < items.length; i++)
            this.registerPerson(items[i]);
        return _super.prototype.push.apply(this, items);
    };
    PersonGroup.prototype.splice = function (start, deleteCount) {
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        var i;
        for (i = start; i < Math.min(start + deleteCount, this.length); i++)
            this.erasePerson(this[i]);
        for (i = 0; i < items.length; i++)
            this.registerPerson(items[i]);
        return _super.prototype.splice.apply(this, [start, deleteCount].concat(items));
    };
    PersonGroup.prototype.identify = function (face) {
        if (this.isTrained() == false)
            this.train();
        return null;
    };
    /* --------------------------------------------------------
        INTERACTION WITH FACE API
    -------------------------------------------------------- */
    PersonGroup.prototype.inserToServer = function () {
        // 식별자 번호 발급
        if (this.id == "") {
        }
        // 서버에 등록
        var this_ = this; // jQuery는 this를 인지하지 못함
        $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id,
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "PUT",
            async: false,
            data: JSON.stringify({ "name": this.name }),
            success: function (data) {
                this_.registered = true;
            }
        });
    };
    PersonGroup.prototype.eraseFromServer = function () {
    };
    PersonGroup.prototype.train = function () {
        // 등록을 먼저 수행
        if (this.isRegistered() == false)
            this.inserToServer();
        // 학습 수행
        var this_ = this; // jQuery는 this를 인지하지 못함
        $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id + "/train",
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "POST",
            async: false,
            data: "",
            success: function (data) {
                this_.trained = true;
            }
        });
    };
    PersonGroup.prototype.registerPerson = function (person) {
        if (this.id == "")
            this.inserToServer();
    };
    PersonGroup.prototype.erasePerson = function (person) {
        if (this.has(person) == false)
            return;
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    PersonGroup.prototype.key = function () {
        return this.id;
    };
    PersonGroup.prototype.getGroupArray = function () {
        return this.groupArray;
    };
    PersonGroup.prototype.getID = function () {
        return this.id;
    };
    PersonGroup.prototype.getName = function () {
        return this.name;
    };
    PersonGroup.prototype.isRegistered = function () {
        return this.registered;
        ;
    };
    PersonGroup.prototype.isTrained = function () {
        return this.trained;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    PersonGroup.prototype.TAG = function () {
        return "personGroup";
    };
    PersonGroup.prototype.CHILD_TAG = function () {
        return "person";
    };
    return PersonGroup;
})(EntityArray);
var FaceList = (function (_super) {
    __extends(FaceList, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from API with 이름.
     */
    function FaceList(api, name) {
        if (name === void 0) { name = ""; }
        _super.call(this);
        this.api = api;
        this.id = "";
        this.name = name;
        this.registered = false;
    }
    FaceList.prototype.construct = function (xml) {
        this.id = xml.getProperty("id");
        this.name = xml.getProperty("name");
        if (xml.has(this.CHILD_TAG()) == false)
            return;
        var xmlList = xml.get(this.CHILD_TAG());
        var pictureArray = this.api.getPictureArray();
        for (var i = 0; i < xmlList.length; i++) {
            var faceID = xmlList[i].getProperty("id");
            var pictureURL = xmlList[i].getProperty("pictureURL");
            if (pictureArray.has(pictureURL) == false || pictureArray.get(pictureURL).has(faceID) == false)
                continue;
            this.push(pictureArray.get(pictureURL).get(faceID));
        }
    };
    /* --------------------------------------------------------
        OPERATORS
    -------------------------------------------------------- */
    FaceList.prototype.push = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (this.isRegistered() == false)
            this.inserToServer();
        for (var i = 0; i < args.length; i++)
            this.registerFaceToServer(args[i]);
        return _super.prototype.push.apply(this, args);
    };
    FaceList.prototype.splice = function (start, deleteCount) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var i;
        for (i = start; i < Math.min(start + deleteCount, this.length); i++)
            this.eraseFaceFromServer(this[i]);
        for (i = 0; i < args.length; i++)
            this.registerFaceToServer(args[i]);
        return _super.prototype.splice.apply(this, [start, deleteCount].concat(args));
    };
    /* --------------------------------------------------------
        INTERACTION WITH FACE API
    -------------------------------------------------------- */
    FaceList.prototype.inserToServer = function () {
        // 식별자 번호 발급
        // 서버에 등록
        $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id,
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "PUT",
            async: false,
            data: JSON.stringify({ "name": this.name, "userData": "" }),
            success: function (data) {
                this.registered = true;
            }
        });
    };
    FaceList.prototype.eraseFromServer = function () {
    };
    FaceList.prototype.registerFaceToServer = function (face) {
        if (this.isRegistered() == false)
            this.inserToServer();
        var rectangle = face.getRectangle();
        var params = {
            "faceListId": this.id,
            "userData": "",
            "targetFace": rectangle.getX() + "," + rectangle.getY() + "," + rectangle.getWidth() + "," + rectangle.getHeight()
        };
        $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces?" + $.param(params),
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "POST",
            async: false,
            data: JSON.stringify({ "url": face.getPicture().getURL() }),
            success: function (data) {
                face.setPersistedUID(data["persistedFaceId"]);
            }
        });
    };
    FaceList.prototype.eraseFaceFromServer = function (face) {
        if (this.has(face) == false)
            return;
        var params = {
            "faceListId": this.id,
            "persistedFaceId": face.getPersistedUID()
        };
        $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces/" + face.getPersistedUID() + "?" + $.param(params),
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "DELETE",
            async: false,
            success: function (data) {
                face.setPersistedUID(data["persistedFaceId"]);
            }
        });
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    FaceList.prototype.key = function () {
        return this.id;
    };
    FaceList.prototype.getAPI = function () {
        return this.api;
    };
    FaceList.prototype.getID = function () {
        return this.id;
    };
    FaceList.prototype.getName = function () {
        return this.name;
    };
    FaceList.prototype.isRegistered = function () {
        return this.registered;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    FaceList.prototype.TAG = function () {
        return "faceList";
    };
    FaceList.prototype.CHILD_TAG = function () {
        return "face";
    };
    FaceList.prototype.toXML = function () {
        var xml = new XML();
        xml.setTag(this.TAG());
        xml.setProperty("name", this.name);
        for (var i = 0; i < this.length; i++) {
            var face = new XML();
            face.setTag(this.CHILD_TAG());
            face.setProperty("id", this[i].getUID());
            face.setProperty("pictureURL", this[i].getPicture().getURL());
            xml.push(face);
        }
        return xml;
    };
    return FaceList;
})(EntityArray);
/* ============================================================
    BASIC ENTITIES
        - PERSON
        - PICTURE
        - FACE
============================================================ */
/**
 * 사람 엔티티.
 *
 * @author 남정호
 */
var Person = (function (_super) {
    __extends(Person, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from PersonGroup with 이름
     */
    function Person(group, name) {
        _super.call(this);
        this.group = group;
        this.name = name;
    }
    Person.prototype.construct = function (xml) {
        this.name = xml.getProperty("name");
        if (xml.has(this.CHILD_TAG()) == false)
            return;
        var xmlList = xml.get(this.CHILD_TAG());
        var pictureArray = this.group.getGroupArray().getAPI().getPictureArray();
        for (var i = 0; i < xmlList.length; i++) {
            var faceID = xmlList[i].getProperty("id");
            var pictureURL = xmlList[i].getProperty("pictureURL");
            if (pictureArray.has(pictureURL) == false || pictureArray.get(pictureURL).has(faceID) == false)
                continue;
            this.push(pictureArray.get(pictureURL).get(faceID));
        }
    };
    /* --------------------------------------------------------
        INTERACTION WITH FACE API
    -------------------------------------------------------- */
    Person.prototype.registerFace = function (face) {
    };
    Person.prototype.eraseFace = function (index) {
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Person.prototype.key = function () {
        return this.name;
    };
    Person.prototype.getGroup = function () {
        return this.group;
    };
    Person.prototype.getName = function () {
        return this.name;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Person.prototype.TAG = function () {
        return "person";
    };
    Person.prototype.CHILD_TAG = function () {
        return "face";
    };
    Person.prototype.toXML = function () {
        var xml = new XML();
        xml.setTag(this.TAG());
        xml.setProperty("name", this.name);
        for (var i = 0; i < this.length; i++) {
            var face = new XML();
            face.setTag(this.CHILD_TAG());
            face.setProperty("id", this[i].getUID());
            face.setProperty("pictureURL", this[i].getPicture().getURL());
            xml.push(face);
        }
        return xml;
    };
    return Person;
})(EntityArray);
/**
 * <p> 사진 엔티티. </p>
 *
 * <ul>
 *  <li> 한 장의 사진에 여럿의 얼굴이 들어있다. </li>
 *  <li> 한 장의 사진은 여럿의 사람을 참조한다. </li>
 * </ul>
 *
 * @author 남정호
 */
var Picture = (function (_super) {
    __extends(Picture, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 기본 생성자.
     */
    function Picture(pictureArray, url) {
        if (url === void 0) { url = ""; }
        _super.call(this);
        this.pictureArray = pictureArray;
        this.url = url;
    }
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
        GETTERS
    -------------------------------------------------------- */
    Picture.prototype.key = function () {
        return this.url;
    };
    Picture.prototype.getPictureArray = function () {
        return this.pictureArray;
    };
    Picture.prototype.getURL = function () {
        return this.url;
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
    Picture.prototype.detect = function () {
        this.splice(0, this.length);
        // AJAX의 람다 함수는 this가 좀 이상하다. 
        // this의 참조를 미리 복제해 둘 것
        var this_ = this;
        // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
        FaceAPI.send("https://api.projectoxford.ai/face/v1.0/detect", "POST", {
            "returnFaceId": "true",
            "returnFaceLandmarks": "true",
            "returnFaceAttributes": "age,gender,smile,facialHair,headPose",
        }, { "url": this.url }, function (data) {
            this_.constructByJSON(data);
        });
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
/**
 * 얼굴 엔티티.
 */
var Face = (function (_super) {
    __extends(Face, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from Picture.
     */
    function Face(picture) {
        _super.call(this);
        this.picture = picture;
        this.person = null;
        this.uid = "";
        this.rectangle = new FaceRectangle(this);
        this.landmarks = new FaceLandmarks(this);
        this.attributes = new FaceAttributes(this);
    }
    Face.prototype.construct = function (xml) {
        _super.prototype.construct.call(this, xml);
        this.person = null;
        if (xml.has("person") == false)
            return;
        var person = xml.get("person")[0];
        var personName = person.getProperty("name");
        var personGroupID = person.getProperty("groupID");
    };
    Face.prototype.constructByJSON = function (obj) {
        trace(JSON.stringify(obj));
        this.uid = obj["faceId"];
        this.rectangle.constructByJSON(obj["faceRectangle"]);
        this.landmarks.constructByJSON(obj["faceLandmarks"]);
        this.attributes.constructByJSON(obj["faceAttributes"]);
    };
    /* --------------------------------------------------------
        COMPARES
    -------------------------------------------------------- */
    /**
     * <p> 이 얼굴(Face)이 누구인지(Person in PersonGroup) 감지해냄. </p>
     *
     * <ul>
     *  <li> 참고자료:  </li>
     * </ul>
     */
    Face.prototype.identify = function (personGroup) {
        return personGroup.identify(this);
    };
    Face.prototype.finds = function (personGroup) {
    };
    /**
     * 두 얼굴이 같은 사람인 지 검사한다.
     *
     * <ul>
     *  <li> 참고자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523a/console </li>
     * </ul>
     *
     * @return 같은 사람인 지 (true, false) &amp; 유사도 (0.0 ~ 1.0)
     */
    Face.prototype.equals = function (face) {
        // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
        var apiURL = "https://api.projectoxford.ai/face/v1.0/verify";
        $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/verify",
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            async: false,
            data: JSON.stringify({ "faceId1": this.uid, "faceId2": face.uid }),
            success: function (data) {
                var isIdentical = data["isIdentical"];
                var confidence = data["confidental"];
                return new Pair(isIdentical, confidence);
            }
        });
        return new Pair(false, 0.0);
    };
    /* --------------------------------------------------------
        GETTERS & SETTERS
    -------------------------------------------------------- */
    Face.prototype.key = function () {
        return this.uid;
    };
    Face.prototype.getUID = function () {
        return this.uid;
    };
    Face.prototype.getPersistedUID = function () {
        return this.persistedUID;
    };
    Face.prototype.getPicture = function () {
        return this.picture;
    };
    Face.prototype.getPerson = function () {
        return this.person;
    };
    Face.prototype.getRectangle = function () {
        return this.rectangle;
    };
    Face.prototype.getLandmarks = function () {
        return this.landmarks;
    };
    Face.prototype.getAttributes = function () {
        return this.attributes;
    };
    Face.prototype.setPersistedUID = function (uid) {
        this.persistedUID = uid;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Face.prototype.TAG = function () {
        return "face";
    };
    Face.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.push(this.rectangle.toXML(), this.landmarks.toXML(), this.attributes.toXML());
        return xml;
    };
    return Face;
})(Entity);
/* ============================================================
    SUB EN0TITIES BELONGS TO A FACE
        - FACE_RECTANGLE
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
var FaceRectangle = (function (_super) {
    __extends(FaceRectangle, _super);
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    function FaceRectangle(face) {
        _super.call(this, "rectangle");
        this.face = face;
        this.width = 0;
        this.height = 0;
    }
    FaceRectangle.prototype.constructByJSON = function (obj) {
        Global.fetch(this, obj);
        this.x = obj["left"];
        this.y = obj["top"];
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    FaceRectangle.prototype.getFace = function () {
        return this.face;
    };
    FaceRectangle.prototype.getWidth = function () {
        return this.width;
    };
    FaceRectangle.prototype.getHeight = function () {
        return this.height;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    FaceRectangle.prototype.TAG = function () {
        return _super.prototype.TAG.call(this);
    };
    return FaceRectangle;
})(Point);
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
        this.eyeBrows = new Eyebrows(this);
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
    FaceLandmarks.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.push(this.eyeBrows.toXML(), this.eyes.toXML(), this.nose.toXML(), this.mouth.toXML());
        return xml;
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
var Eyebrows = (function (_super) {
    __extends(Eyebrows, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function Eyebrows(landmarks) {
        _super.call(this, landmarks);
        this.left = new Eyebrow(this, Direction.LEFT);
        this.right = new Eyebrow(this, Direction.RIGHT);
    }
    Eyebrows.prototype.constructByJSON = function (obj) {
        this.left.constructByJSON(obj);
        this.right.constructByJSON(obj);
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Eyebrows.prototype.getLeft = function () {
        return this.left;
    };
    Eyebrows.prototype.getRight = function () {
        return this.right;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Eyebrows.prototype.TAG = function () {
        return "eyeBrows";
    };
    Eyebrows.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.push(this.left.toXML(), this.right.toXML());
        return xml;
    };
    return Eyebrows;
})(FaceLandmark);
/**
 * 눈썹.
 *
 * @author 남정호
 */
var Eyebrow = (function (_super) {
    __extends(Eyebrow, _super);
    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    function Eyebrow(eyeBrows, direction) {
        _super.call(this);
        this.eyeBrows = eyeBrows;
        this.direction = direction;
        this.inner = new Point("inner");
        this.outer = new Point("outer");
    }
    Eyebrow.prototype.constructByJSON = function (obj) {
        if (this.direction == Direction.LEFT) {
            this.inner.constructByJSON(obj["eyebrowLeftInner"]);
            this.outer.constructByJSON(obj["eyebrowLeftOuter"]);
        }
        else {
            this.inner.constructByJSON(obj["eyebrowRightInner"]);
            this.outer.constructByJSON(obj["eyebrowRightOuter"]);
        }
    };
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    Eyebrow.prototype.getEyeBrows = function () {
        return this.eyeBrows;
    };
    Eyebrow.prototype.getOpposite = function () {
        if (this.direction == Direction.LEFT)
            return this.eyeBrows.getRight();
        else
            return this.eyeBrows.getLeft();
    };
    Eyebrow.prototype.getInner = function () {
        return this.inner;
    };
    Eyebrow.prototype.getOuter = function () {
        return this.outer;
    };
    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    Eyebrow.prototype.TAG = function () {
        if (this.direction == Direction.LEFT)
            return "left";
        else
            return "right";
    };
    Eyebrow.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.eraseProperty("direction");
        xml.push(this.inner.toXML(), this.outer.toXML());
        return xml;
    };
    return Eyebrow;
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
    Eyes.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.push(this.left.toXML(), this.right.toXML());
        return xml;
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
    Eye.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.eraseProperty("direction");
        xml.push(this.top.toXML(), this.bottom.toXML(), this.inner.toXML(), this.outer.toXML(), this.pupil.toXML());
        return xml;
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
    Nose.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.push(this.tip.toXML(), this.leftRoot.toXML(), this.rightRoot.toXML(), this.leftAlarTop.toXML(), this.rightAlarTop.toXML(), this.leftAlarOutTip.toXML(), this.rightAlarOutTip.toXML());
        return xml;
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
        this.left.constructByJSON(obj["mouthLeft"]);
        this.right.constructByJSON(obj["mouthRight"]);
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
    Mouth.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.push(this.lip.toXML(), this.left.toXML(), this.right.toXML());
        return xml;
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
    Lip.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.push(this.upperTop.toXML(), this.upperBottom.toXML(), this.underTop.toXML(), this.underBottom.toXML());
        return xml;
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
        this.age = 0;
        this.gender = "";
        this.smile = 0;
        this.facialHair = new FacialHair(this);
        this.headPose = new HeadPose(this);
    }
    FaceAttributes.prototype.constructByJSON = function (obj) {
        Global.fetch(this, obj);
        /*this.facialHair.constructByJSON(obj["facialHair"]);
        this.headPose.constructByJSON(obj["headPose"]);*/
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
    FaceAttributes.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.push(this.facialHair.toXML(), this.headPose.toXML());
        return xml;
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
        this.mustache = 0;
        this.beard = 0;
        this.sideburns = 0;
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
        this.roll = 0;
        this.yaw = 0;
        this.pitch = 0;
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