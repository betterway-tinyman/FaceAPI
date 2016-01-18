/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="CandidatePerson.ts" />
/// <referench path="IJSONEntity.ts" />

/// <reference path="Face.ts" />

namespace hiswill.faceapi
{
    /**
     * <p> An array and parent of CandidatePerson. </p>
     *
     * <ul>
     *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    export class CandidatePersonArray
        extends samchon.protocol.EntityArray<CandidatePerson>
        implements IJSONEntity
    {
        /**
         * A facade controller and factory class for Face-API.
         */
        protected api: FaceAPI;
        
        /**
         * A face who wanted to find its owner.
         */
        protected face: Face;
        
        /**
         * A group of Person, candidates of owner.
         */
        protected personGroup: PersonGroup;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a FaceAPI.
         *
         * @param api A facade controller and factory class for Face-API.
         */
        public constructor(api: FaceAPI);

        /**
         * Construct from a Face and PersonGroup. 
         *
         * @param face A face who wanted to find its owner.
         * @param personGroup A group of Person, candidates of owner.
         */
        public constructor(face: Face, personGroup: PersonGroup);

        
        public constructor(...args: any[])
        {
            super();

            if (args.length == 1 && args[0] instanceof FaceAPI)
            {
                this.api = <FaceAPI>args[0];

                this.face = null;
                this.personGroup = null;
            }
            else if (args.length == 2 && args[0] instanceof Face && args[1] instanceof PersonGroup)
            {
                this.face = <Face>args[0];
                this.personGroup = <PersonGroup>args[1];

                this.api = this.face.getPicture().getPictureArray().getAPI();
            }
        }

        public construct(xml: samchon.library.XML): void
        {
            this.face = null;
            this.personGroup = null;

            // SET FACE
            if (xml.hasProperty("faceID") == true)
            {
                var faceID: string = xml.getProperty("faceID");

                var pictureArray: PictureArray = this.api.getPictureArray();

                for (var i: number = 0; i < pictureArray.size(); i++) 
                {
                    var picture: Picture = pictureArray.at(i);

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

                var personGroupArray: PersonGroupArray = this.api.getPersonGroupArray();
                if (personGroupArray.has(personGroupID) == true)
                    this.personGroup = personGroupArray.get(personGroupID);
            }

            // SET CHILDREN
            super.construct(xml);
        }

        public constructByJSON(data: any): void
        {
            this.clear();

            var array: Array<any> = data["candidates"];

            for (var i: number = 0; i < array.length; i++)
            {
                var candidatePerson: CandidatePerson = new CandidatePerson(this);
                candidatePerson.constructByJSON(array[i]);

                this.push(candidatePerson);
            }
        }

        protected createChild(xml: samchon.library.XML): CandidatePerson
        {
            if (xml.hasProperty("personID") == true)
                return new CandidatePerson(this);
            else
                return null;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get api.
         */
        public getAPI(): FaceAPI
        {
            return this.api;
        }

        /**
         * Get face.
         */
        public getFace(): Face
        {
            return this.face;
        }
        
        /**
         * Get personGroup.
         */
        public getPersonGroup(): PersonGroup
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

        public toXML(): samchon.library.XML
        {
            var xml: samchon.library.XML = super.toXML();

            if (this.face != null)
                xml.setProperty("faceID", this.face.getID());
            
            if (this.personGroup != null)
                xml.setProperty("personGroupID", this.personGroup.getID());

            return xml;
        }
    }
}