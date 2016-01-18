/// <reference path="FaceAPI.ts" />

/// <reference path="FaceRectangle.ts" />
/// <reference path="IJSonEntity.ts" />

/// <reference path="FaceLandmarks.ts" />
/// <reference path="FaceAttributes.ts" />

/// <reference path="Person.ts" />
/// <reference path="PersonGroup.ts" />
/// <reference path="FaceList.ts" />

/// <reference path="CandidatePersonArray.ts" />
/// <reference path="SimilarFaceGroupArray.ts" />

/// <reference path="Picture.ts" />

/**
 * A face entity.
 *
 * @author Jeongho Nam
 */
namespace hiswill.faceapi 
{
    export class Face
        extends FaceRectangle 
        implements IJSONEntity,
                   samchon.library.IEventDispatcher
    {
        /**
         * A picture contaning the Face.
         */
        protected picture: Picture;
    
        /**
         * Who is owner of the Face.
         */
        protected person: Person;

        /**
         * An identifier issued by FaceAPI Server.
         */
        protected id: string;

        /**
         * Landmarks belongs to the Face.
         */
        protected landmarks: FaceLandmarks;

        /**
         * Attributes about the Face.
         */
        protected attributes: FaceAttributes;

        /**
         * A chain instance of takeing responsibility of event dispatching.
         */
        protected eventDispatcher: samchon.library.EventDispatcher;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Constructor from a Picture.
         *
         * @param picture A picture that containing the Face.
         */
        public constructor(picture: Picture)
        {
            super();

            this.picture = picture;
            this.person = null;
        
            this.id = "";

            this.landmarks = new FaceLandmarks(this);
            this.attributes = new FaceAttributes(this);

            this.eventDispatcher = new samchon.library.EventDispatcher(this);
        }
    
        public construct(xml: samchon.library.XML): void
        {
            super.construct(xml);

            this.person = null;

            if (xml.has("person") == false)
                return;

            var person: samchon.library.XML = xml.get("person").at(0);
            var personName: string = person.getProperty("name");
            var personGroupID: string = person.getProperty("groupID");
        }

        public constructByJSON(obj: any): void
        {
            this.id = obj["faceId"];
        
            super.constructByJSON(obj["faceRectangle"]);
            this.landmarks.constructByJSON(obj["faceLandmarks"]);
            this.attributes.constructByJSON(obj["faceAttributes"]);
        }

        /* --------------------------------------------------------
            COMPARES
        -------------------------------------------------------- */
        /**
         * <p> Identify the Face is whom (Person, from a PersonGroup). </p>
         *
         * <p> You've to execute PersonGroup.train() method, asynchronous method dispatching 
         * "complete" Event when the training was completed, before running the identify() method. </p>
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
         * </ul>
         *
         * @param personGroup A PersonGroup, candidates of the owner.
         * @param maxCandidates Permitted number of candidates to return.
         *
         * @return Candidates of the owner with conformaility degrees.
         */
        public identify(personGroup: PersonGroup, maxCandidates: number = 1): void
        {
            if (personGroup.isTrained() == false)
                personGroup.addEventListener(FaceEvent.TRAIN, this.dispatchTrainEvent, this);

            personGroup.addEventListener(IdentifyEvent.IDENTIFY, this.dispatchIdentityEvent, this);

            personGroup.identify(this, maxCandidates);
        }

        private dispatchTrainEvent(event: FaceEvent): void
        {   
            this.dispatchEvent(event);
        }
        private dispatchIdentityEvent(event: IdentifyEvent): void
        {
            this.dispatchEvent(event);
        }

        /**
         * Find similar faces in the FaceList from a Face.
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395237 </li>
         * </ul>
         * 
         * @param faceList Candidate faces.
         * @param maxCandidates Maximum number of candidates to be retured.
         *
         * @return Similar faces being looked similar.
         */
        public findSimilar(faceList: FaceList, maxCandidates: number): SimilarFaceArray
        {
            return faceList.findSimilar(this, maxCandidates);
        }

        /**
         * <p> Divide candidate faces into groups based on face similarity. </p> 
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395238 </li>
         * </ul>
         *
         * @param faces Candidate faces.
         * @return Grouped faces by similarity.
         */
        public static group(...faces: Face[]): SimilarFaceGroupArray
        {
            var faceArray: FaceReferArray = new FaceReferArray();
            var faceIDArray: Array<string> = new Array<string>();

            for (var i: number = 0; i < faces.length; i++)
            {
                faceArray.push(faces[i]);
                faceIDArray.push(faces[i].getID());
            }

            var similarFaceGroupArray: SimilarFaceGroupArray = new SimilarFaceGroupArray(faceArray);

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/group",
                "POST",

                null,
                {"faceIds": faceIDArray},

                function (data)
                {
                    similarFaceGroupArray.constructByJSON(data);
                }
            );

            return similarFaceGroupArray;
        }

        /**
         * Test whether two Faces are owned by a same Person.
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523a/console </li>
         * </ul>
         * 
         * @param face Target Face to compare with.
         * @return A pair of flag (whether two Faces are from a same person) and confidence (conformality degree).
         */
        public equals(face: Face): std.Pair<boolean, number>
        {
            if (this == face)
                return new std.Pair<boolean, number>(true, 1.0);

            var pair: std.Pair<boolean, number> = new std.Pair<boolean, number>(false, -1.0);

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/verify",
                "POST",

                null,
                { "faceId1": this.id, "faceId2": face.id },

                function (data) 
                {
                    var isIdentical: boolean = data["isIdentical"];
                    var confidence: number = data["confidence"];

                    pair = new std.Pair<boolean, number>(isIdentical, confidence);
                }
            );

            return pair;
        }

        /* --------------------------------------------------------
            GETTERS & SETTERS
        -------------------------------------------------------- */
        public key(): any
        {
            return this.id;
        }

        /**
         * Get id.
         */
        public getID(): string
        {
            return this.id;
        }
    
        /**
         * Get picture.
         */
        public getPicture(): Picture
        {
            return this.picture;
        }

        /**
         * Get person.
         */
        public getPerson(): Person
        {
            return this.person;
        }
    
        /**
         * Get landmarks.
         */
        public getLandmarks(): FaceLandmarks
        {
            return this.landmarks;
        }

        /**
         * Get attributes.
         */
        public getAttributes(): FaceAttributes
        {
            return this.attributes;
        }

        /* --------------------------------------------------------
            METHODS OF EVENT_DISPATCHER
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public hasEventListener(type: string): boolean
        {
            return this.eventDispatcher.hasEventListener(type);
        }

        /**
         * @inheritdoc
         */
        public dispatchEvent(event: Event): boolean
        {
            return this.eventDispatcher.dispatchEvent(event);
        }

        /**
         * @inheritdoc
         */
        public addEventListener(type: string, listener: EventListener, thisArg: Object = null): void
        {
            this.eventDispatcher.addEventListener(type, listener, thisArg);
        }

        /**
         * @inheritdoc
         */
        public removeEventListener(type: string, listener: EventListener, thisArg: Object = null): void
        {
            this.removeEventListener(type, listener, thisArg);
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "face";
        }

        public toXML(): samchon.library.XML
        {
            var xml: samchon.library.XML = super.toXML();
            xml.push
            (
                this.landmarks.toXML(),
                this.attributes.toXML()
            );
        
            return xml;
        }

        public toRectangle(): fabric.IRect
        {
            return new fabric.Rect();
        }
    }
}