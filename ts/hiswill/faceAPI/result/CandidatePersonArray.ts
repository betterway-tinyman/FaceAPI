/// <reference path="../FaceAPI.ts" />

/// <reference path="CandidatePerson.ts" />
/// <referench path="../basic/IJSONEntity.ts" />

/// <reference path="../face/Face.ts" />

namespace hiswill.faceapi.result
{
    export class CandidatePersonArray
        extends EntityArray<CandidatePerson>
        implements basic.IJSONEntity
    {
        protected api: FaceAPI;
        protected face: face.Face;
        protected personGroup: person.PersonGroup;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public constructor(api: FaceAPI, face: face.Face = null, personGroup: person.PersonGroup = null)
        {
            super();

            this.api = api;
            this.face = face;
            this.personGroup = personGroup;
        }

        public construct(xml: XML): void
        {
            this.face = null;
            this.personGroup = null;

            // SET FACE
            if (xml.hasProperty("faceID") == true)
            {
                var faceID: string = xml.getProperty("faceID");

                var pictureArray: picture.PictureArray = this.api.getPictureArray();

                for (var i: number = 0; i < pictureArray.length; i++) 
                {
                    var picture: picture.Picture = pictureArray[i];

                    if (picture.has(faceID) == true) 
                    {
                        this.face = picture.get(faceID);
                        break;
                    }
                }
            }

            // SET PERSON_GROUP
            if (xml.hasProperty("personGroupID") == true)
            {
                var personGroupID: string = xml.getProperty("personGroupID");

                var personGroupArray: person.PersonGroupArray = this.api.getPersonGroupArray();
                if (personGroupArray.has(personGroupID) == true)
                    this.personGroup = personGroupArray.get(personGroupID);
            }

            // SET CHILDREN
            super.construct(xml);
        }

        public constructByJSON(data: any): void
        {
            this.splice(0, this.length); // CLEAR

            var array: Array<any> = data["candidates"];

            for (var i: number = 0; i < array.length; i++)
            {
                var candidatePerson: CandidatePerson = new CandidatePerson(this);
                candidatePerson.constructByJSON(array[i]);

                this.push(candidatePerson);
            }
        }

        protected createChild(xml: XML): CandidatePerson
        {
            if (xml.hasProperty("personID") == true)
                return new CandidatePerson(this);
            else
                return null;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getAPI(): FaceAPI
        {
            return this.api;
        }
        public getFace(): face.Face
        {
            return this.face;
        }
        public getPersonGroup(): person.PersonGroup
        {
            return this.personGroup;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "candidatePersonArray";
        }
        public CHILD_TAG(): string
        {
            return "candidatePerson";
        }

        public toXML(): XML
        {
            var xml: XML = super.toXML();

            if (this.face != null)
                xml.setProperty("faceID", this.face.getID());
            
            if (this.personGroup != null)
                xml.setProperty("personGroupID", this.personGroup.getID());

            return xml;
        }
    }
}