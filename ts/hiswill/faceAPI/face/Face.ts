/// <reference path="../FaceAPI.ts" />

/// <reference path="FaceRectangle.ts" />
/// <reference path="../basic/IJSonEntity.ts" />

/// <reference path="landmark/FaceLandmarks.ts" />
/// <reference path="attribute/FaceAttributes.ts" />

/// <reference path="../picture/Picture.ts" />
/// <reference path="../person/Person.ts" />
/// <reference path="../person/PersonGroup.ts" />

/**
 * 얼굴 엔티티.
 */
namespace hiswill.faceAPI.face 
{
    export class Face
        extends FaceRectangle 
        implements basic.IJSONEntity
    {
        /**
         * 해당 Face가 찍혀있는 Picture.
         */
        protected picture: picture.Picture;
    
        /**
         * 현재의 Face은 누구(Person)의 것인가.
         */
        protected person: person.Person;

        /**
         * FaceAPI에서 발급해준 식별자 번호.
         */
        protected id: string;

        protected landmarks: landmark.FaceLandmarks;

        protected attributes: attribute.FaceAttributes;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * 생성자 from Picture.
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
         * <p> 이 얼굴(Face)이 누구인지(Person in PersonGroup) 감지해냄. </p>
         *
         * <ul>
         *  <li> 참고자료:  </li>
         * </ul>
         */
        public identify(personGroup: person.PersonGroup, maxCandidates: number = 1): Array<Pair<person.Person, number>>
        {
            return personGroup.identify(this, maxCandidates);
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
            if (this == face)
                return new Pair<boolean, number>(true, 1.0);

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/verify",
                "POST",

                null,
                { "faceId1": this.id, "faceId2": face.id },

                function (data) 
                {
                    var isIdentical: boolean = data["isIdentical"];
                    var confidence: number = data["confidental"];

                    return new Pair<boolean, number>(isIdentical, confidence);
                }
            );

            return new Pair<boolean, number>(false, -1.0);
        }

        /* --------------------------------------------------------
            GETTERS & SETTERS
        -------------------------------------------------------- */
        public key(): any
        {
            return this.id;
        }

        public getID(): string
        {
            return this.id;
        }
    
        public getPicture(): picture.Picture
        {
            return this.picture;
        }
        public getPerson(): person.Person
        {
            return this.person;
        }
    
        public getLandmarks(): landmark.FaceLandmarks
        {
            return this.landmarks;
        }
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