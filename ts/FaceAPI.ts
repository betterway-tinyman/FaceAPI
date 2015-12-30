/// <reference path='SamchonFramework.ts'/>

/* ============================================================
    GLOBAL AND ABSTRACTS
        - GLOBAL
        - DIRECTION
        - POINT_ENTITY
        - I_JSON_ENTITY
============================================================ */
class Global
{
    public static get CERTIFICATION_KEY(): string
    {
        return "b072c71311d144388ac2527a5f06ffca";
    }

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
                var json_entity:IJSONEntity = json[key];
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

class Point
    extends Entity
    implements IJSONEntity 
{
    protected tag: string;

    protected x: number;
    protected y: number;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor(tag: string) 
    {
        super();

        this.tag = tag;
    }

    public constructByJSON(val: any): void 
    {
        Global.fetch(this, val);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getX(): number
    {
        return this.x;
    }

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
}

interface IJSONEntity
{
    constructByJSON(val: any): void;
}

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
class PersonGroup
    extends EntityArray<Person>
{

}

class Person
    extends Entity
{
    protected faceArray: Vector<Face>;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 기본 생성자.
     */
    public constructor()
    {
        super();

        this.faceArray = new Vector<Face>();
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "person";
    }
}

class Picture 
    extends EntityArray<Face>
    implements IJSONEntity
{
    protected url: string;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    /**
     * 기본 생성자.
     */
    public constructor() 
    {
        super();
    }
    
    public construct(xml: XML): void
    {
        this.url = xml.getProperty("url");

        super.construct(xml);
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

    protected createChild(xml:XML):Face
    {
        return new Face(this);
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
    public detectFaces(): void 
    {
        this.splice(0, this.length);

        // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
        var apiURL: string = "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true";

        var str: string; // = replyData;
        
        this.constructByJSON(JSON.parse(str));
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
        var xml: XML = super.toXML();
        xml.setProperty("url", this.url);

        return xml;
    }
}

class Face
    extends Point 
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

    protected apiUID: string;
    protected width: number;
    protected height: number;

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
        super("face");

        this.picture = picture;
        this.person = null;
        
        this.landmarks = new FaceLandmarks(this);
        this.attributes = new FaceAttributes(this);
    }
    
    public constructByJSON(obj: any): void
    {
        Global.fetch(this, obj);

        this.x = obj["left"];
        this.y = obj["top"];
    }

    /**
     * <p> 이 얼굴(Face)이 누구인지(Person in PersonGroup) 감지해냄. </p>
     *
     * <ul>
     *  <li> 참고자료:  </li>
     * </ul>
     */
    public identifyPerson(personGroup: PersonGroup): Person
    {
        return null;
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getPicture(): Picture
    {
        return this.picture;
    }
    public getPerson(): Person
    {
        return this.person;
    }

    public getWidth(): number
    {
        return this.width;
    }
    public getHeight(): number
    {
        return this.height;
    }

    public getLandmarks(): FaceLandmarks
    {
        return this.landmarks;
    }
    public getAttributes(): FaceAttributes
    {
        return this.attributes;
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
class FaceLandmarks 
    extends Entity
    implements IJSONEntity
{
    protected face: Face;

    protected eyeBrows: EyeBrows;
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

        this.eyeBrows = new EyeBrows(this);
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
    
    public getEyeBrows(): EyeBrows
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
class EyeBrows
    extends FaceLandmark
{
    protected left: EyeBrow;
    protected right: EyeBrow;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor(landmarks: FaceLandmarks)
    {
        super(landmarks);
        
        this.left = new EyeBrow(this, Direction.LEFT);
        this.right = new EyeBrow(this, Direction.RIGHT);
    }

    public constructByJSON(obj: any): void
    {
        this.left.constructByJSON(obj);
        this.right.constructByJSON(obj);
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getLeft(): EyeBrow
    {
        return this.left;
    }

    public getRight(): EyeBrow
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
}

/**
 * 눈썹.
 *
 * @author 남정호
 */
class EyeBrow 
    extends Entity
    implements IJSONEntity
{
    protected eyeBrows: EyeBrows;
    protected direction: number;

    protected inner: Point;
    protected outer: Point;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor(eyeBrows: EyeBrows, direction: number)
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
            this.inner.constructByJSON(obj["eyeBrowLeftInner"]);
            this.outer.constructByJSON(obj["eyeBrowLeftOuter"]);
        }
        else
        {
            this.inner.constructByJSON(obj["eyeBrowRightInner"]);
            this.outer.constructByJSON(obj["eyeBrowRightOuter"]);
        }
    }

    /* --------------------------------------------------------
        GETTERS
    -------------------------------------------------------- */
    public getEyeBrows(): EyeBrows
    {
        return this.eyeBrows;
    }
    public getOpposite(): EyeBrow
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
        this.left.constructByJSON(obj["mouseLeft"]);
        this.right.constructByJSON(obj["mouseRight"]);
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

        this.facialHair = new FacialHair(this);
        this.headPose = new HeadPose(this);
    }
    
    public constructByJSON(val: any): void 
    {
        Global.fetch(this, val);
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

        this.attributes = attributes;
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