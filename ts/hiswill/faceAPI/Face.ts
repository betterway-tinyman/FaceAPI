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

namespace hiswill.faceapi 
{
    /**
     * A face entity.
     *
     * @author Jeongho Nam
     */
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
    
        /**
         * @inheritdoc
         */
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

        /**
         * @inheritdoc
         */
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
                personGroup.addEventListener(FaceEvent.TRAIN, this.handleTrain, this);

            personGroup.addEventListener(IdentifyEvent.IDENTIFY, this.handleIdentity, this);
            personGroup.identify(this, maxCandidates);
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
        public findSimilars(faceList: FaceList, maxCandidates: number): void
        {
            faceList.addEventListener(FindSimilarEvent.FIND, this.handleFindSimilar, this);

            faceList.findSimilars(this, maxCandidates);
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
        public findSimilarGroups(faceArray: Array<Face>): void
        {
            var this_ = this;

            var faceReferArray: FaceReferArray = new FaceReferArray();
            var faceIDArray: Array<string> = new Array<string>();

            for (var i: number = 0; i < faceArray.length; i++)
            {
                faceReferArray.push(faceArray[i]);
                faceIDArray.push(faceArray[i].getID());
            }

            var similarFaceGroupArray: SimilarFaceGroupArray = new SimilarFaceGroupArray(faceReferArray);

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/group",
                "POST",

                null,
                {"faceIds": faceIDArray},

                function (data)
                {similarFaceGroupArray.constructByJSON(data);

                    this_.dispatchEvent(new FindSimilarGroupEvent(faceReferArray, similarFaceGroupArray));
                }
            );
        }

        private handleTrain(event: FaceEvent): void
        {   
            this.dispatchEvent(event);
        }
        private handleIdentity(event: IdentifyEvent): void
        {
            this.dispatchEvent(event);
        }
        private handleFindSimilar(event: FindSimilarEvent): void
        {
            this.dispatchEvent(event);
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
        /**
         * @inheritdoc
         */
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
        /**
         * @inheritdoc
         */
        public TAG(): string
        {
            return "face";
        }

        /**
         * @inheritdoc
         */
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

        public toSVG(): samchon.library.XML
        {
            var xml = new samchon.library.XML();
            xml.setTag("rect");
            
            xml.setProperty("x", this.x);
            xml.setProperty("y", this.y);
            xml.setProperty("width", this.width);
            xml.setProperty("height", this.height);

            xml.setProperty("style", "stroke: red; stroke-width: 5; fill: none;");

            return xml;
        }

        public toRect(): fabric.IRect
        {
            var rect = new fabric.Rect
                ({
                    left: this.x, 
                    top: this.y, 
                    width: this.width, 
                    height: this.height
                });

            return rect;
        }
    }
}