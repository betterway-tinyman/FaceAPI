/// <reference path="../FaceAPI.ts" />

/// <reference path="FaceRectangle.ts" />
/// <reference path="../basic/IJSonEntity.ts" />

/// <reference path="landmark/FaceLandmarks.ts" />
/// <reference path="attribute/FaceAttributes.ts" />

/// <reference path="../person/Person.ts" />
/// <reference path="../person/PersonGroup.ts" />
/// <reference path="../result/CandidatePersonArray.ts" />

/// <reference path="../picture/Picture.ts" />

/**
 * A face entity.
 *
 * @author Jeongho Nam
 */
namespace hiswill.faceapi.face 
{
    export class Face
        extends FaceRectangle 
        implements basic.IJSONEntity
    {
        /**
         * A picture contaning the Face.
         */
        protected picture: picture.Picture;
    
        /**
         * Who is owner of the Face.
         */
        protected person: person.Person;

        /**
         * An identifier issued by FaceAPI Server.
         */
        protected id: string;

        /**
         * Landmarks belongs to the Face.
         */
        protected landmarks: landmark.FaceLandmarks;

        /**
         * Attributes about the Face.
         */
        protected attributes: attribute.FaceAttributes;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Constructor from Picture.
         *
         * @param picture A picture that containing the Face.
         */
        public constructor(picture: picture.Picture)
        {
            super();

            this.picture = picture;
            this.person = null;
        
            this.id = "";

            this.landmarks = new landmark.FaceLandmarks(this);
            this.attributes = new attribute.FaceAttributes(this);
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
        public identify(personGroup: person.PersonGroup, maxCandidates: number = 1): result.CandidatePersonArray
        {
            return personGroup.identify(this, maxCandidates);
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
        public equals(face: Face): Pair<boolean, number>
        {
            if (this == face)
                return new Pair<boolean, number>(true, 1.0);

            var pair: Pair<boolean, number> = new Pair<boolean, number>(false, -1.0);

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

                    pair = new Pair<boolean, number>(isIdentical, confidence);
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
        public getPicture(): picture.Picture
        {
            return this.picture;
        }

        /**
         * Get person.
         */
        public getPerson(): person.Person
        {
            return this.person;
        }
    
        /**
         * Get landmarks.
         */
        public getLandmarks(): landmark.FaceLandmarks
        {
            return this.landmarks;
        }

        /**
         * Get attributes.
         */
        public getAttributes(): attribute.FaceAttributes
        {
            return this.attributes;
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
                this.landmarks.toXML(),
                this.attributes.toXML()
            );
        
            return xml;
        }
    }
}