/// <reference path="jquery.d.ts" />
/// <reference path='SamchonFramework.ts' />

function main(): void
{
    
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
class Global
{
    /**
     * Face API 의 인증키.
     */
    public static get CERTIFICATION_KEY(): string
    {
        return "b072c71311d144388ac2527a5f06ffca";
    }

    /**
     * 엔티티의 멤버를 JSON 객체로부터 구성한다.
     */
    public static fetch(entity: IEntity, json: Object): void
    {
        for (var key in json)
        {
            if (typeof key != "string" || entity.hasOwnProperty(key) == false)
                continue;

            if (typeof entity[key] == "number" || typeof entity[key] == "string")
                entity[key] = json[key];
            else if (entity[key] instanceof Entity || entity[key] instanceof EntityArray)
            {
                var json_entity: IJSONEntity = <IJSONEntity>entity[key];
                json_entity.constructByJSON(json[key]);
            }
        }
    }
}

class Direction 
{
    public static get LEFT(): number { return 1 };
    public static get RIGHT(): number { return 2 };
}

/**
 * X-Y 좌표 엔티티.
 *
 * @author 남정호
 */
class Point
    extends Entity
    implements IJSONEntity 
{
    /**
     * XML 태그명.
     */
    protected tag: string;

    /**
     * X 좌표.
     */
    protected x: number;

    /**
     * Y 좌표.
     */
    protected y: number;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 with XML 태그명.
     */
    public constructor(tag: string) 
    {
        super();

        this.tag = tag;
        this.x = 0;
        this.y = 0;
    }
    
    public constructByJSON(val: any): void 
    {
        Global.fetch(this, val);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    /**
     * Get X 좌표.
     */
    public getX(): number
    {
        return this.x;
    }

    /**
     * Get Y 좌표.
     */
    public getY(): number
    {
        return this.y;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string 
    {
        return this.tag;
    }

    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.eraseProperty("tag");

        return xml;
    }
}

/* ============================================================
    ROOT ENTITIES
        - I_JSON_ENTITY
        - FACE_API
            - PERSON_GROUP_ARRAY
            - FACE_LIST_ARRAY
            - PICTURE_ARRAY
============================================================ */
/**
 * JSON을 통하여 멤버가 구성되는 엔티티를 위한 인터페이스.
 *
 * @author 남정호
 */
interface IJSONEntity
{
    /**
     * JSON 개체를 통해 멤버를 구성.
     */
    constructByJSON(val: any): void;
}

/**
 * Face API의 Facade controller 및 Factory 클래스.
 *
 * @author 남정호
 */
class FaceAPI
    extends Entity 
{
    /**
     * 사람 그룹 리스트.
     */
    protected personGroupArray: PersonGroupArray;

    /**
     * 사진 리스트.
     */
    protected pictureArray: PictureArray;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 기본 생성자.
     */
    public constructor() 
    {
        super();

        this.personGroupArray = new PersonGroupArray(this);
        this.pictureArray = new PictureArray(this);
    }

    /**
     * Factory method of 사람 그룹.
     */
    public createPersonGroup(name: string): PersonGroup 
    {
        var personGroup: PersonGroup = new PersonGroup(this.personGroupArray, name);
        this.personGroupArray.push(personGroup);

        return personGroup;
    }

    /**
     * Factory method of 얼굴 리스트.
     */
    public createFaceList(name: string): FaceList 
    {
        return new FaceList(this, name);
    }

    /**
     * Factory method of 사진.
     */
    public createPicture(url: string): Picture 
    {
        var picture: Picture = new Picture(this.pictureArray, url);
        this.pictureArray.push(picture);

        return picture;
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    /**
     * Get 사람 그룹 리스트.
     */
    public getPersonGroupArray(): PersonGroupArray
    {
        return this.personGroupArray;
    }
    
    /**
     * Get 사진 리스트.
     */
    public getPictureArray(): PictureArray 
    {
        return this.pictureArray;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string 
    {
        return "faceAPI";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.push
        (
            this.personGroupArray.toXML(),
            this.pictureArray.toXML()
        );

        return xml;
    }

    /* --------------------------------------------------------
        STATIC MEMBERS
    -------------------------------------------------------- */
    public static send(url: string, method:string, params: Object, data: Object, success:Function): void
    {
        $.ajax
        ({
            url: url + "?" + $.param(params),
            beforeSend: function (xhrObj) 
            {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: method,
            async: false,

            data: JSON.stringify(data),
            success: function (data)
            {
                success.apply(data);
            }
        });
    }
}

/**
 * 사람 그룹 리스트 엔티티.
 *
 * @author 남정호
 */
class PersonGroupArray
    extends EntityArray<PersonGroup>
{
    /**
     * 상위 API 클래스.
     */
    protected api: FaceAPI;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from API.
     */
    constructor(api: FaceAPI)
    {
        super();

        this.api = api;
    }

    protected createChild(xml: XML): PersonGroup
    {
        return new PersonGroup(this, xml.getProperty("name"));
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    /**
     * Get API.
     */
    public getAPI(): FaceAPI
    {
        return this.api;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "personGroupArray";
    }
    public CHILD_TAG(): string
    {
        return "personGroup";
    }
}

/**
 * 사진 목록.
 */
class PictureArray
    extends EntityArray<Picture>
{
    protected api: FaceAPI;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from API.
     */
    public constructor(api: FaceAPI)
    {
        super();

        this.api = api;
    }

    protected createChild(xml: XML): Picture
    {
        return new Picture(this, xml.getProperty("url"));
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "pictureArray";
    }
    public CHILD_TAG(): string
    {
        return "picture";
    }
}

/* ============================================================
    GROUP ENTITIES
        - PERSON_GROUP
        - FACE_LIST

        - PICTURE_ARRAY
        - FACE_ARRAY
============================================================ */
interface IGroup
{
    isRegistered(): boolean;

    inserToServer(): void;
    eraseFromServer(): void;
}

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
class PersonGroup
    extends EntityArray<Person>
    implements IGroup
{
    protected groupArray: PersonGroupArray;

    protected id: string;
    protected name: string;

    protected registered: boolean;
    protected trained: boolean;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    public constructor(groupArray: PersonGroupArray, name: string = "")
    {
        super();

        this.groupArray = groupArray;
        this.id = "";
        this.name = name;

        this.trained = false;
        this.registered = false;
    }
    
    protected createChild(xml: XML): Person
    {
        // 어떻게 Person을 찾아낼 지 생각해야 함
        return null;
    }

    /* --------------------------------------------------------
        OPERATORS
    -------------------------------------------------------- */
    public push(...items: Person[]): number 
    {
        for (var i: number = 0; i < items.length; i++)
            this.registerPerson(items[i]);

        return super.push(...items);
    }

    public splice(start: number, deleteCount?: number, ...items: Person[]): Person[] 
    {
        var i: number;

        for (i = start; i < Math.min(start + deleteCount, this.length); i++)
            this.erasePerson(this[i]);

        for (i = 0; i < items.length; i++)
            this.registerPerson(items[i]);

        return super.splice(start, deleteCount, ...items);
    }

    public identify(face: Face): Person
    {
        if (this.isTrained() == false)
            this.train();

        return null;
    }

    /* --------------------------------------------------------
        INTERACTION WITH FACE API
    -------------------------------------------------------- */
    public inserToServer(): void
    {
        // 식별자 번호 발급
        if (this.id == "")
        {

        }

        // 서버에 등록
        var this_: PersonGroup = this; // jQuery는 this를 인지하지 못함
        
        $.ajax
        ({
            url: "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id,
            beforeSend: function (xhrObj) 
            {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "PUT",
            async: false,

            data: JSON.stringify({"name": this.name}),
            success: function (data)
            {
                this_.registered = true;
            }
        });
    }

    public eraseFromServer(): void
    {

    }

    public train(): void
    {
        // 등록을 먼저 수행
        if (this.isRegistered() == false)
            this.inserToServer();

        // 학습 수행
        var this_: PersonGroup = this; // jQuery는 this를 인지하지 못함
        
        $.ajax
        ({
            url: "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id + "/train",
            beforeSend: function (xhrObj) 
            {
               // Request headers
               xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "POST",
            async: false,

            data: "",
            success: function (data) 
            {
                this_.trained = true;
            }
        });
    }

    protected registerPerson(person: Person): void
    {
        if (this.id == "")
            this.inserToServer();
    }
    protected erasePerson(person: Person): void
    {
        if (this.has(person) == false)
            return;
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public key(): any
    {
        return this.id;
    }

    public getGroupArray(): PersonGroupArray
    {
        return this.groupArray;
    }

    public getID(): string
    {
        return this.id;
    }
    public getName(): string
    {
        return this.name;
    }

    public isRegistered(): boolean
    {
        return this.registered;;
    }
    public isTrained(): boolean
    {
        return this.trained;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "personGroup";
    }
    public CHILD_TAG(): string
    {
        return "person";
    }
}

class FaceList
    extends EntityArray<Face>
    implements IGroup
{
    /**
     * 상위 API 클래스.
     */
    protected api: FaceAPI;

    /**
     * 식별자 ID.
     */
    protected id: string;
    
    /**
     * 얼굴 리스트의 이름.
     */
    protected name: string;

    /**
     * API Server에 등록되었는 지 여부.
     */
    protected registered: boolean;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from API with 이름.
     */ 
    public constructor(api: FaceAPI, name: string = "")
    {
        super();

        this.api = api;

        this.id = "";
        this.name = name;

        this.registered = false;
    }

    public construct(xml: XML): void 
    {
        this.id = xml.getProperty("id");
        this.name = xml.getProperty("name");

        if (xml.has(this.CHILD_TAG()) == false)
            return;

        var xmlList: XMLList = xml.get(this.CHILD_TAG());
        var pictureArray: PictureArray = this.api.getPictureArray();

        for (var i: number = 0; i < xmlList.length; i++)
        {
            var faceID: string = xmlList[i].getProperty("id");
            var pictureURL: string = xmlList[i].getProperty("pictureURL");

            if (pictureArray.has(pictureURL) == false || pictureArray.get(pictureURL).has(faceID) == false)
                continue;

            this.push(pictureArray.get(pictureURL).get(faceID));
        }
    }

    /* --------------------------------------------------------
        OPERATORS
    -------------------------------------------------------- */
    public push(...args: Face[]): number 
    {
        if (this.isRegistered() == false)
            this.inserToServer();

        for (var i: number = 0; i < args.length; i++)
            this.registerFaceToServer(args[i]);

        return super.push(...args);
    }

    public splice(start: number, deleteCount?: number, ...args: Face[]): Face[] 
    {
        var i: number;

        for (i = start; i < Math.min(start + deleteCount, this.length); i++)
            this.eraseFaceFromServer(this[i]);

        for (i = 0; i < args.length; i++)
            this.registerFaceToServer(args[i]);

        return super.splice(start, deleteCount, ...args);
    }

    /* --------------------------------------------------------
        INTERACTION WITH FACE API
    -------------------------------------------------------- */
    public inserToServer(): void
    {
        // 식별자 번호 발급

        // 서버에 등록
        $.ajax
        ({
            url: "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id,
            beforeSend: function (xhrObj) 
            {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "PUT",
            async: false,

            data: JSON.stringify({ "name": this.name, "userData": ""}),
            success: function (data) 
            {
                this.registered = true;
            }
        });
    }

    public eraseFromServer(): void
    {
    }

    protected registerFaceToServer(face: Face): void
    {
        if (this.isRegistered() == false)
            this.inserToServer();

        var rectangle: FaceRectangle = face.getRectangle();
        var params: Object =
        {
            "faceListId": this.id,
            "userData": "",
            "targetFace": rectangle.getX() + "," + rectangle.getY() + "," + rectangle.getWidth() + "," + rectangle.getHeight()
        };

        $.ajax
        ({
            url: "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces?" + $.param(params),
            beforeSend: function (xhrObj) 
            {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "POST",
            async: false,

            data: JSON.stringify({ "url": face.getPicture().getURL() }),
            success: function (data) 
            {
                face.setPersistedUID(data["persistedFaceId"]);
            }
        });
    }

    protected eraseFaceFromServer(face: Face): void
    {
        if (this.has(face) == false)
            return;

        var params: Object =
        {
            "faceListId": this.id,
            "persistedFaceId": face.getPersistedUID()
        };

        $.ajax
        ({
            url: "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces/" + face.getPersistedUID() + "?" + $.param(params),
            beforeSend: function (xhrObj) 
            {
                // Request headers
               xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
            },
            type: "DELETE",
            async: false,
                
            success: function (data) 
            {
                face.setPersistedUID(data["persistedFaceId"]);
            }
        });
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public key(): any
    {
        return this.id;
    }

    public getAPI(): FaceAPI
    {
        return this.api;
    }

    public getID(): string
    {
        return this.id;
    }
    public getName(): string
    {
        return this.name;
    }

    public isRegistered(): boolean
    {
        return this.registered;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "faceList";
    }
    public CHILD_TAG(): string
    {
        return "face";
    }

    public toXML(): XML
    {
        var xml: XML = new XML();
        xml.setTag(this.TAG());

        xml.setProperty("name", this.name);
        for (var i: number = 0; i < this.length; i++)
        {
            var face: XML = new XML();
            face.setTag(this.CHILD_TAG());
            
            face.setProperty("id", this[i].getUID());
            face.setProperty("pictureURL", this[i].getPicture().getURL());

            xml.push(face);
        }

        return xml;
    }
}

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
class Person
    extends EntityArray<Face>
{
    protected group: PersonGroup;

    protected name: string;
    
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from PersonGroup with 이름
     */
    public constructor(group: PersonGroup, name: string)
    {
        super();

        this.group = group;
        this.name = name;
    }

    public construct(xml: XML): void
    {
        this.name = xml.getProperty("name");

        if (xml.has(this.CHILD_TAG()) == false)
            return;
        
        var xmlList: XMLList = xml.get(this.CHILD_TAG());
        var pictureArray: PictureArray = this.group.getGroupArray().getAPI().getPictureArray();

        for (var i: number = 0; i < xmlList.length; i++)
        {
            var faceID: string = xmlList[i].getProperty("id");
            var pictureURL: string = xmlList[i].getProperty("pictureURL");

            if (pictureArray.has(pictureURL) == false || pictureArray.get(pictureURL).has(faceID) == false)
                continue;

            this.push(pictureArray.get(pictureURL).get(faceID));
        }
    }

    /* --------------------------------------------------------
        INTERACTION WITH FACE API
    -------------------------------------------------------- */
    protected registerFace(face: Face): void
    {
        
    }

    protected eraseFace(index: number): void
    {

    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public key(): any
    {
        return this.name;
    }

    public getGroup(): PersonGroup
    {
        return this.group;
    }
    public getName(): string
    {
        return this.name;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "person";
    }
    public CHILD_TAG(): string
    {
        return "face";
    }

    public toXML(): XML
    {
        var xml: XML = new XML();
        xml.setTag(this.TAG());

        xml.setProperty("name", this.name);
        for (var i: number = 0; i < this.length; i++)
        {
            var face: XML = new XML();
            face.setTag(this.CHILD_TAG());
            
            face.setProperty("id", this[i].getUID());
            face.setProperty("pictureURL", this[i].getPicture().getURL());

            xml.push(face);
        }

        return xml;
    }
}

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
class Picture 
    extends EntityArray<Face>
    implements IJSONEntity
{
    protected pictureArray: PictureArray;

    /**
     * 그림이 저장된 URL.
     */
    protected url: string;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 기본 생성자.
     */
    public constructor(pictureArray: PictureArray, url: string = "") 
    {
        super();

        this.pictureArray = pictureArray;
        this.url = url;
    }
    
    public constructByJSON(val: any): void
    {
        var array: Array<any> = val;

        for (var i: number = 0; i < array.length; i++)
        {
            var face: Face = new Face(this);
            face.constructByJSON(array[i]);

            this.push(face);
        }
    }

    protected createChild(xml:XML): Face
    {
        return new Face(this);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public key(): any
    {
        return this.url;
    }
    
    public getPictureArray(): PictureArray
    {
        return this.pictureArray;
    }
    public getURL(): string
    {
        return this.url;
    }

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
    public detect(): void 
    {
        this.splice(0, this.length);

        // AJAX의 람다 함수는 this가 좀 이상하다. 
        // this의 참조를 미리 복제해 둘 것
        var this_ = this;

        // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
        FaceAPI.send
        (
            "https://api.projectoxford.ai/face/v1.0/detect", "POST", 
            {
                "returnFaceId": "true",
                "returnFaceLandmarks": "true",
                "returnFaceAttributes": "age,gender,smile,facialHair,headPose",
            }, 
            { "url": this.url }, 
            function (data) 
            {
                this_.constructByJSON(data);
            }
        );
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string 
    {
        return "person";
    }
    public CHILD_TAG(): string
    {
        return "face";
    }
}

/**
 * 얼굴 엔티티.
 */
class Face
    extends Entity 
    implements IJSONEntity
{
    /**
     * 해당 Face가 찍혀있는 Picture.
     */
    protected picture: Picture;
    
    /**
     * 현재의 Face은 누구(Person)의 것인가.
     */
    protected person: Person;

    /**
     * FaceAPI에서 발급해준 식별자 번호.
     */
    protected uid: string;

    protected persistedUID: string;

    protected rectangle: FaceRectangle;
    protected landmarks: FaceLandmarks;
    protected attributes: FaceAttributes;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 생성자 from Picture.
     */
    public constructor(picture: Picture)
    {
        super();

        this.picture = picture;
        this.person = null;
        
        this.uid = "";
        
        this.rectangle = new FaceRectangle(this);
        this.landmarks = new FaceLandmarks(this);
        this.attributes = new FaceAttributes(this);
    }
    
    public construct(xml: XML): void
    {
        super.construct(xml);

        this.person = null;

        if (xml.has("person") == false)
            return;

        var person: XML = xml.get("person")[0];
        var personName: string = person.getProperty("name");
        var personGroupID: string = person.getProperty("groupID");


    }

    public constructByJSON(obj: any): void
    {
        trace(JSON.stringify(obj));

        this.uid = obj["faceId"];
        
        this.rectangle.constructByJSON(obj["faceRectangle"]);
        this.landmarks.constructByJSON(obj["faceLandmarks"]);
        this.attributes.constructByJSON(obj["faceAttributes"]);
    }

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
    public identify(personGroup: PersonGroup): Person
    {
        return personGroup.identify(this);
    }

    public finds(personGroup: PersonGroup): any //Array<Person, number>
    {
    }

    /**
     * 두 얼굴이 같은 사람인 지 검사한다.
     *
     * <ul>
     *  <li> 참고자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523a/console </li>
     * </ul>
     * 
     * @return 같은 사람인 지 (true, false) &amp; 유사도 (0.0 ~ 1.0)
     */
    public equals(face: Face): Pair<boolean, number>
    {
        // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
        var apiURL: string = "https://api.projectoxford.ai/face/v1.0/verify";

        $.ajax
        (
            {
                url: "https://api.projectoxford.ai/face/v1.0/verify",
                beforeSend: function (xhrObj) 
                {
                    // Request headers
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Global.CERTIFICATION_KEY);
                },
                async: false,

                data: JSON.stringify({"faceId1": this.uid, "faceId2": face.uid}),
                success: function (data)
                {
                    var isIdentical: boolean = data["isIdentical"];
                    var confidence: number = data["confidental"];

                    return new Pair<boolean, number>(isIdentical, confidence);
                }
            }
        );

        return new Pair<boolean, number>(false, 0.0);
    }

    /* --------------------------------------------------------
        GETTERS & SETTERS
    -------------------------------------------------------- */
    public key(): any
    {
        return this.uid;
    }

    public getUID(): string
    {
        return this.uid;
    }
    public getPersistedUID(): string
    {
        return this.persistedUID;
    }
    
    public getPicture(): Picture
    {
        return this.picture;
    }
    public getPerson(): Person
    {
        return this.person;
    }
    
    public getRectangle(): FaceRectangle
    {
        return this.rectangle;
    }
    public getLandmarks(): FaceLandmarks
    {
        return this.landmarks;
    }
    public getAttributes(): FaceAttributes
    {
        return this.attributes;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 }

    public setPersistedUID(uid: string): void
    {
        this.persistedUID = uid;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "face";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.push
        (
            this.rectangle.toXML(),
            this.landmarks.toXML(),
            this.attributes.toXML()
        );
        
        return xml;
    }
}

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
class FaceRectangle
    extends Point
    implements IJSONEntity
{
    protected face: Face;

    protected width: number;
    protected height: number;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    public constructor(face: Face)
    {
        super("rectangle");
        this.face = face;

        this.width = 0;
        this.height = 0;
    }

    public constructByJSON(obj: any): void
    {
        Global.fetch(this, obj);
        this.x = obj["left"];
        this.y = obj["top"];
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getFace(): Face
    {
        return this.face;
    }
    
    public getWidth(): number
    {
        return this.width;
    }
    public getHeight(): number
    {
        return this.height;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return super.TAG();
    }
}

/* ============================================================
    LANDMARKS
============================================================ */
/**
 * 얼굴의 주요 요소 엔티티.
 *
 * @author 남정호
 */
class FaceLandmarks 
    extends Entity
    implements IJSONEntity
{
    protected face: Face;

    protected eyeBrows: Eyebrows;
    protected eyes: Eyes;
    protected nose: Nose;
    protected mouth: Mouth;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    public constructor(face: Face)
    {
        super();
        this.face = face;

        this.eyeBrows = new Eyebrows(this);
        this.eyes = new Eyes(this);
        this.nose = new Nose(this);
        this.mouth = new Mouth(this);
    }

    public constructByJSON(obj: any): void
    {
        this.eyeBrows.constructByJSON(obj);
        this.eyes.constructByJSON(obj);
        this.nose.constructByJSON(obj);
        this.mouth.constructByJSON(obj);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getFace(): Face
    {
        return this.face;
    }
    
    public getEyeBrows(): Eyebrows
    {
        return this.eyeBrows;
    }
    public getEyes(): Eyes
    {
        return this.eyes;
    }
    public getNose(): Nose
    {
        return this.nose;
    }
    public getMouth(): Mouth
    {
        return this.mouth;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "landmarks";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.push
        (
            this.eyeBrows.toXML(),
            this.eyes.toXML(),
            this.nose.toXML(),
            this.mouth.toXML()
        );

        return xml;
    }
}

class FaceLandmark
    extends Entity
    implements IJSONEntity
{
    protected landmarks: FaceLandmarks;

    public constructor(landmarks: FaceLandmarks)
    {
        super();
    }

    public constructByJSON(val: any): void
    {
        Global.fetch(this, val);
    }

    public getLandmarks(): FaceLandmarks
    {
        return this.landmarks;
    }
}

/**
 * 눈썹 둘.
 */
class Eyebrows
    extends FaceLandmark
{
    protected left: Eyebrow;
    protected right: Eyebrow;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor(landmarks: FaceLandmarks)
    {
        super(landmarks);
        
        this.left = new Eyebrow(this, Direction.LEFT);
        this.right = new Eyebrow(this, Direction.RIGHT);
    }

    public constructByJSON(obj: any): void
    {
        this.left.constructByJSON(obj);
        this.right.constructByJSON(obj);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getLeft(): Eyebrow
    {
        return this.left;
    }

    public getRight(): Eyebrow
    {
        return this.right;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "eyeBrows";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.push
        (
            this.left.toXML(),
            this.right.toXML()
        );

        return xml;
    }
}

/**
 * 눈썹.
 *
 * @author 남정호
 */
class Eyebrow 
    extends Entity
    implements IJSONEntity
{
    protected eyeBrows: Eyebrows;
    protected direction: number;

    protected inner: Point;
    protected outer: Point;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor(eyeBrows: Eyebrows, direction: number)
    {
        super();

        this.eyeBrows = eyeBrows;
        this.direction = direction;

        this.inner = new Point("inner");
        this.outer = new Point("outer");
    }

    public constructByJSON(obj: any): void 
    {
        if (this.direction == Direction.LEFT)
        {
            this.inner.constructByJSON(obj["eyebrowLeftInner"]);
            this.outer.constructByJSON(obj["eyebrowLeftOuter"]);
        }
        else
        {
            this.inner.constructByJSON(obj["eyebrowRightInner"]);
            this.outer.constructByJSON(obj["eyebrowRightOuter"]);
        }
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getEyeBrows(): Eyebrows
    {
        return this.eyeBrows;
    }
    public getOpposite(): Eyebrow
    {
        if (this.direction == Direction.LEFT)
            return this.eyeBrows.getRight();
        else
            return this.eyeBrows.getLeft();
    }

    public getInner(): Point
    {
        return this.inner;
    }
    public getOuter(): Point
    {
        return this.outer;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        if (this.direction == Direction.LEFT)
            return "left";
        else
            return "right";
    }
    public toXML(): XML 
    {
        var xml: XML = super.toXML();
        xml.eraseProperty("direction");

        xml.push
        (
            this.inner.toXML(),
            this.outer.toXML()
        );

        return xml;
    }
}

class Eyes
    extends FaceLandmark
{
    protected landmarks: FaceLandmarks;

    protected left: Eye;
    protected right: Eye;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor(landmarks: FaceLandmarks)
    {
        super(landmarks);
        
        this.left = new Eye(this, Direction.LEFT);
        this.right = new Eye(this, Direction.RIGHT);
    }
    
    public constructByJSON(obj: any): void
    {
        this.left.constructByJSON(obj);
        this.right.constructByJSON(obj);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getLeft(): Eye
    {
        return this.left;
    }
    public getRight(): Eye
    {
        return this.right;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "eyes";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.push
        (
            this.left.toXML(),
            this.right.toXML()
        );

        return xml;
    }
}

class Eye 
    extends Entity
    implements IJSONEntity
{
    protected eyes: Eyes;
    protected direction: number;

    protected top: Point;
    protected bottom: Point;
    protected inner: Point;
    protected outer: Point;

    protected pupil: Pupil;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor(eyes: Eyes, direction: number)
    {
        super();

        this.eyes = eyes;
        this.direction = direction;

        this.top = new Point("top");
        this.bottom = new Point("bottom");
        this.inner = new Point("inner");
        this.outer = new Point("outer");

        this.pupil = new Pupil(this);
    }

    public constructByJSON(obj: any): void 
    {
        if (this.direction == Direction.LEFT)
        {
            this.top.constructByJSON(obj["eyeLeftTop"]);
            this.bottom.constructByJSON(obj["eyeLeftBottom"]);
            this.inner.constructByJSON(obj["eyeLeftInner"]);
            this.outer.constructByJSON(obj["eyeLeftOuter"]);

            this.pupil.constructByJSON(obj["pupilLeft"]);
        }
        else
        {
            this.top.constructByJSON(obj["eyeRightTop"]);
            this.bottom.constructByJSON(obj["eyeRightBottom"]);
            this.inner.constructByJSON(obj["eyeRightInner"]);
            this.outer.constructByJSON(obj["eyeRightOuter"]);

            this.pupil.constructByJSON(obj["pupilRight"]);
        }
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getEyes(): Eyes
    {
        return this.eyes;
    }
    public getOpposite(): Eye
    {
        if (this.direction == Direction.LEFT)
            return this.eyes.getRight();
        else
            return this.eyes.getLeft();
    }

    public getTop(): Point
    {
        return this.top;
    }
    public getBottom(): Point 
    {
        return this.bottom;
    }
    public getInner(): Point 
    {
        return this.inner;
    }
    public getOuter(): Point 
    {
        return this.outer;
    }

    public getPupil(): Pupil
    {
        return this.pupil;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        if (this.direction == Direction.LEFT)
            return "left";
        else
            return "right";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.eraseProperty("direction");

        xml.push
        (
            this.top.toXML(),
            this.bottom.toXML(),
            this.inner.toXML(),
            this.outer.toXML(),
            this.pupil.toXML()
        );

        return xml;
    }
}

/**
 * 눈동자.
 *
 * @author 남정호
 */
class Pupil
    extends Point
{
    protected eye: Eye;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    public constructor(eye: Eye)
    {
        super("pupil");

        this.eye = eye;
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getEye(): Eye
    {
        return this.eye;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return super.TAG();
    }
}

class Nose
    extends FaceLandmark
{
    protected tip: Point;
    
    protected leftRoot: Point;
    protected rightRoot: Point;
    
    protected leftAlarTop: Point;
    protected rightAlarTop: Point;
    
    protected leftAlarOutTip: Point;
    protected rightAlarOutTip: Point;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    public constructor(landmarks: FaceLandmarks)
    {
        super(landmarks);
        
        this.tip = new Point("tip");

        this.leftRoot = new Point("leftRoot");
        this.rightRoot = new Point("rightRoot");
        
        this.leftAlarTop = new Point("leftAlarTop");
        this.rightAlarTop = new Point("rightAlarTop");
        
        this.leftAlarOutTip = new Point("leftAlarOutTip");
        this.rightAlarOutTip = new Point("rightAlarOutTip");
    }

    public constructByJSON(obj: any): void
    {
        this.tip.constructByJSON(obj["noseTip"]);

        this.leftRoot.constructByJSON(obj["noseRootLeft"]);
        this.rightRoot.constructByJSON(obj["noseRootRight"]);

        this.leftAlarTop.constructByJSON(obj["noseLeftAlarTop"]);
        this.rightAlarTop.constructByJSON(obj["noseRightAlarTop"]);

        this.leftAlarOutTip.constructByJSON(obj["noseLeftAlarOutTip"]);
        this.rightAlarOutTip.constructByJSON(obj["noseRightAlarOutTip"]);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getTip(): Point
    {
        return this.tip;
    }

    public getLeftRoot(): Point
    {
        return this.leftRoot;
    }
    public getRightRoot(): Point
    {
        return this.rightRoot;
    }

    public getLeftAlarTop(): Point
    {
        return this.leftAlarTop;
    }
    public getRightAlarTop(): Point
    {
        return this.rightAlarTop;
    }

    public getLeftAlarOutTip(): Point
    {
        return this.leftAlarOutTip;
    }
    public getRightAlarOutTip(): Point
    {
        return this.rightAlarOutTip;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "nose";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.push
        (
            this.tip.toXML(),
            this.leftRoot.toXML(),
            this.rightRoot.toXML(),
            this.leftAlarTop.toXML(),
            this.rightAlarTop.toXML(),
            this.leftAlarOutTip.toXML(),
            this.rightAlarOutTip.toXML()
        );

        return xml;
    }
}

class Mouth
    extends FaceLandmark
{
    protected lip: Lip;
    protected left: Point;
    protected right: Point;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    public constructor(landmarks: FaceLandmarks)
    {
        super(landmarks);
        
        this.lip = new Lip(this);
        this.left = new Point("left");
        this.right = new Point("right");
    }

    public constructByJSON(obj: any): void
    {
        this.lip.constructByJSON(obj);
        
        this.left.constructByJSON(obj["mouthLeft"]);
        this.right.constructByJSON(obj["mouthRight"]);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getLip(): Lip
    {
        return this.lip;
    }
    public getLeft(): Point
    {
        return this.left;
    }
    public getRight(): Point
    {
        return this.right;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "mouth";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.push
        (
            this.lip.toXML(),
            this.left.toXML(),
            this.right.toXML()
        );
        
        return xml;
    }
}

class Lip
    extends Entity
    implements IJSONEntity
{
    protected mouth: Mouth;

    protected upperTop: Point;
    protected upperBottom: Point;
    
    protected underTop: Point;
    protected underBottom: Point;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    public constructor(mouth: Mouth)
    {
        super();
        this.mouth = mouth;

        this.upperTop = new Point("upperTop");
        this.upperBottom = new Point("upperBottom");
        
        this.underTop = new Point("underTop");
        this.underBottom = new Point("underBottom");
    }

    public constructByJSON(obj: any): void
    {
        this.upperTop.constructByJSON(obj["upperLipTop"]);
        this.upperBottom.constructByJSON(obj["upperLipBottom"]);

        this.underTop.constructByJSON(obj["underLipTop"]);
        this.underBottom.constructByJSON(obj["underLipBottom"]);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getMouth(): Mouth
    {
        return this.mouth;
    }
    
    public getUpperTop(): Point
    {
        return this.upperTop;
    }
    public getUpperBottom(): Point
    {
        return this.upperBottom;
    }

    public getUnderTop(): Point
    {
        return this.underTop;
    }
    public getUnderBottom(): Point
    {
        return this.underBottom;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "lip";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.push
        (
            this.upperTop.toXML(),
            this.upperBottom.toXML(),
            this.underTop.toXML(),
            this.underBottom.toXML()
        );

        return xml;
    }
}

/* ============================================================
    ATTRIBUTES
============================================================ */
class FaceAttributes
    extends Entity
    implements IJSONEntity 
{
    protected face: Face;

    protected age: number;
    protected gender: string;
    protected smile: number;

    protected facialHair: FacialHair;
    protected headPose: HeadPose;

    /* --------------------------------------------------------
        CONSTRUCTOR
    -------------------------------------------------------- */
    public constructor(face: Face) 
    {
        super();
        this.face = face;

        this.age = 0;
        this.gender = "";
        this.smile = 0;

        this.facialHair = new FacialHair(this);
        this.headPose = new HeadPose(this);
    }
    
    public constructByJSON(obj: any): void 
    {
        Global.fetch(this, obj);

        /*this.facialHair.constructByJSON(obj["facialHair"]);
        this.headPose.constructByJSON(obj["headPose"]);*/
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getFace(): Face
    {
        return this.face;
    }

    public getAge(): number
    {
        return this.age;
    }
    public getGender(): string
    {
        return this.gender;
    }
    public getSmile(): number
    {
        return this.smile;
    }

    public getFacialHair(): FacialHair
    {
        return this.facialHair;
    }
    public getHeadPose(): HeadPose
    {
        return this.headPose;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string 
    {
        return "attributes";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();
        xml.push
        (
            this.facialHair.toXML(),
            this.headPose.toXML()
        );

        return xml;
    }
}

class FaceAttribute
    extends Entity
    implements IJSONEntity
{
    protected attributes: FaceAttributes;

    public constructor(attributes: FaceAttributes)
    {
        super();

        this.attributes = attributes;
    }

    public constructByJSON(val: any): void 
    {
        Global.fetch(this, val);
    }
}

class FacialHair
    extends FaceAttribute
{
    protected mustache: number;
    protected beard: number;
    protected sideburns: number;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor(attributes: FaceAttributes) 
    {
        super(attributes);

        this.mustache = 0;
        this.beard = 0;
        this.sideburns = 0;
    }
    
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getMustache(): number
    {
        return this.mustache;
    }
    public getBeard(): number
    {
        return this.beard;
    }
    public getSideburns(): number
    {
        return this.sideburns;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string 
    {
        return "facialHair";
    }
}

class HeadPose
    extends FaceAttribute
{
    protected roll: number;
    protected yaw: number;
    protected pitch: number;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor(attributes: FaceAttributes)
    {
        super(attributes);

        this.roll = 0;
        this.yaw = 0;
        this.pitch = 0;
    }
    
    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getRoll(): number
    {
        return this.roll;
    }
    public getYaw(): number
    {
        return this.yaw;
    }
    public getPitch(): number
    {
        return this.pitch;
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "headPose";
    }
}