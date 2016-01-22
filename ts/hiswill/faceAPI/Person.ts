/// <reference path="FaceAPI.ts" />

/// <reference path="FacePairArray.ts" />

/// <reference path="PersonGroup.ts" />

namespace hiswill.faceapi 
{
    /**
     * <p> A FacePairArray for representing a person. </p>
     *
     * <p> References </p>
     * <ul>
     *  <li> Creating a Person: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523c </li>
     *  <li> Identify: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
     * </ul>
     *
     * @author Jeongho Nam
     * @inheritdoc
     */
    export class Person
        extends FacePairArray
    {
        /**
         * A group of Person instances.
         */
        protected group: PersonGroup;
    
        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a PersonGroup and name.
         *
         * @param group A group of Person instances.
         * @param name A name representing the Person.
         */
        public constructor(group: PersonGroup, name: string = "")
        {
            super();

            this.group = group;
            this.name = name;
        }

        /**
         * @inheritdoc
         */
        public hasAsyncParent(): boolean
        {
            return true;
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE API
        -------------------------------------------------------- */
        /**
         * Insert the FaceList to the Face-API server.
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523c </li>
         * </ul>
         */
        public register(): void
        {
            samchon.trace("Person::insertToServer", this.name, this.group.getID());

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons",
                "POST",

                null,
                {"name": this.name, "userData": ""},

                new std.Bind<Function, Person>(this.handleRegister, this)
            );
        }

        /**
         * Remove the FaceList from the Face-API server.
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523d </li>
         * </ul>
         */
        public unregister(): void
        {
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id,
                "DELETE",

                {
                    "personGroupId": this.group.getID(),
                    "personId": this.id
                },
                null
            );

            this.handleUnregister();
        }

        /**
         * @inheritdoc
         */
        protected handleRegister(data: any): void
        {
            samchon.trace("Person::handleRegister");

            if (data != null)
                this.id = data["personId"];

            this.group["trained"] = false;

            super.handleRegister(data);
        }

        /**
         * @inheritdoc
         */
        protected handleUnregister(): void
        {
            this.group["trained"] = false;

            super.handleUnregister();
        }
        
        /**
         * Insert a child FacePair instance to the Face-API server
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523b </li>
         * </ul>
         */
        public registerFace(face: FacePair): void
        {
            var this_ = this;

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces",
                "POST",

                {
                    "personGroupId": this.group.getID(),
                    "personId": this.id,
                    "targetFace": face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight(),
                    "userData": ""
                },
                {
                    "url": face.getPictureURL()
                },

                function (data): void
                {
                    samchon.trace("A FacePair is registered in a Person");

                    this.group["trained"] = false;
                    
                    face.setID( data["persistedFaceId"] );
                    face.dispatchEvent(new FaceEvent(FaceEvent.REGISTER));
                }
            );
        }

        /**
         * Remove a child FacePair instance from the Face-API server.
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523e </li>
         * </ul>
         */
        public unregisterFace(face: FacePair): void
        {
            var this_ = this;

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces/" + face.getID(),
                "DELETE",

                {
                    "personGroupId": this.group.getID(),
                    "personId": this.id,
                    "persistedFaceId": face.getID()
                },
                null,

                function (data): void
                {
                    this.group["trained"] = false;

                    face.setID("");

                    face.dispatchEvent(new FaceEvent(FaceEvent.UNREGISTER));
                }
            );
        }

        /* --------------------------------------------------------
            GETTERS & SETTERS
        -------------------------------------------------------- */
        /**
         * Get group.
         */
        public getGroup(): PersonGroup
        {
            return this.group;
        }

        /**
         * Set name and notify it to the Face-API server. 
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395242 </li>
         * </ul>
         *
         * @param name New name.
         */
        public setName(name: string): void
        {
            var this_ = this;

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id,
                "PATCH",

                { 
                    "personGroupId": this.group.getID(),
                    "personId": this.id
                },
                {
                    "name": this.name,
                    "userData": ""
                },

                function (data)
                {
                    this_.name = name;
                }, false
            );
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public TAG(): string
        {
            return "person";
        }
    }
}