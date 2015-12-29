/// <reference path='SamchonFramework.ts'/>

/* ============================================================
    BASIC ENTITIES
        - PERSON_GROUP
        - PERSON
        - PICTURE
        - FACE
============================================================ */

class PersonGroup
    extends EntityArray<Person>
{
}

class Person
    extends Entity
{
    protected faceArray: Vector<Face>;

    public constructor()
    {
        super();

        this.faceArray = new Vector<Face>();
    }

    public TAG(): string
    {
        return "person";
    }
}

class Picture 
    extends EntityArray<Face>
{
    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    public constructor() 
    {
        super();
    }
    protected createChild(xml:XML):Face
    {
        return new Face(this);
    }

    /* --------------------------------------------------------
        INTERACTION WITH FACE-API
    -------------------------------------------------------- */
    public detect(): void 
    {
        // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
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

class Face
    extends Point 
{
    protected picture: Picture;
    protected person: Person;

    protected apiUID: string;
    protected width: number;
    protected height: number;

    protected landmarks: FaceLandmakrs;
    protected attributes: FaceAttributes;

    /* --------------------------------------------------------
        CONTRUCTORS
    -------------------------------------------------------- */
    public constructor(picture: Picture)
    {
        super();

        this.picture = picture;
        this.person = null;
        
        this.landmarks = new FaceLandmakrs();
        this.attributes = new FaceAttributes();
    }
    
    public construct(xml: XML): void
    {
        super.construct(xml);
        this.width = xml.getProperty("width");
        this.height = xml.getProperty("height");

        this.landmarks.construct(xml.get(this.landmarks.TAG())[0]);
        this.attributes.construct(xml.get(this.attributes.TAG())[0]);
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
        var xml:XML = super.toXML();
        
        xml.setProperty("width", this.width);
        xml.setProperty("height", this.height);

        xml.push(this.landmarks.toXML());
        xml.push(this.landmarks.toXML());

        return xml;
    }
}

/* ============================================================
    SUB ENTITIES BELONGS TO A FACE
        - FACE_LANDMARKS
        - FACE_ATTRIBUTES
            - FACIAL_HAIR
            - HEAD_POSE
============================================================ */
class FaceLandmakrs 
    extends Entity
{
}

class FaceAttributes 
    extends Entity
{
    protected age: number;
    protected gender: string;
    protected smile: number;

    protected facialHair: FacialHair;
    protected headPose: HeadPose;
}

class FacialHair
    extends Entity
{
    protected mustache: number;
    protected beard: number;
    protected sideburns: number;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor() {
        super();
    }
    public construct(xml: XML): void {
        this.mustache = xml.getProperty("mustache");
        this.beard = xml.getProperty("beard");
        this.sideburns = xml.getProperty("sideburns");
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string {
        return "facialHair";
    }
    public toXML(): XML {
        var xml: XML = super.toXML();

        xml.setProperty("mustache", this.mustache);
        xml.setProperty("beard", this.beard);
        xml.setProperty("sideburns", this.sideburns);

        return xml;
    }
}

class HeadPose
    extends Entity
{
    protected roll: number;
    protected yaw: number;
    protected pitch: number;

    /* --------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------- */
    public constructor()
    {
        super();
    }
    public construct(xml: XML): void
    {
        this.roll = xml.getProperty("roll");
        this.yaw = xml.getProperty("yaw");
        this.pitch = xml.getProperty("pitch");
    }

    /* --------------------------------------------------------
        EXPORTERS
    -------------------------------------------------------- */
    public TAG(): string
    {
        return "headPose";
    }
    public toXML(): XML
    {
        var xml: XML = super.toXML();

        xml.setProperty("roll", this.roll);
        xml.setProperty("yaw", this.yaw);
        xml.setProperty("pitch", this.pitch);

        return xml;
    }
}

class Point 
    extends Entity 
{
    protected x: number;
    protected y: number;

    public constructor()
    {
        super();
    }
    public construct(xml: XML): void
    {
        this.x = xml.getProperty("x");
        this.y = xml.getProperty("y");
    }

    public toXML(): XML
    {
        var xml: XML = super.toXML();

        xml.setProperty("x", this.x);
        xml.setProperty("y", this.y);

        return xml;
    }
}