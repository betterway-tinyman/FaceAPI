/// <reference path="../FaceAPI.ts" />

/// <reference path="../face/FacePairArray.ts" />

/// <reference path="PersonGroup.ts" />

namespace hiswill.faceAPI.person 
{
    /**
     * 사람 엔티티.
     *
     * @author 남정호
     */
    export class Person
        extends face.FacePairArray
    {
        protected group: PersonGroup;
    
        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * 생성자 from PersonGroup with 이름
         */
        public constructor(group: PersonGroup, name: string = "")
        {
            super();

            this.group = group;
            this.name = name;
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE API
        -------------------------------------------------------- */
        public insertToServer(): void
        {
            if (this.isRegistered() == false)
                this.insertToServer();

            var this_ = this;

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons",
                "POST",

                {"personGroupId": this.group.getID()},
                {"name": this.name, "userData": ""},

                function (data)
                {
                    this_.id = data["personId"];
                    this_.registered = true;
                }
            );
        }
        public eraseFromServer(): void
        {
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id,
                "DELETE",

                {
                    "personGroupId": this.group.getID(),
                    "personId": this.id
                },
                null,

                function (data)
                {
                    // NOTHING TO DO ESPECIALLY
                }
            );

            this.id = "";
            super.eraseFromServer();
        }

        protected setNameInServer(name: string): void
        {
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

                null
            );
        }

        public insertFaceToServer(face: face.FacePair): void
        {
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces",
                "POST",

                {
                    "personGroupId": this.group.getID(),
                    "personId": this.id,
                    "targetFace": "targetFace=" + face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight(),
                    "userData": ""
                },
                {
                    "url": face.getPictureURL()
                },

                function (data): void
                {
                    face.setID( data["persistedFaceId"] );
                }
            );
        }
        public eraseFaceFromServer(face: face.FacePair): void
        {
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

                null
            );

            super.eraseFaceFromServer(face);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getGroup(): PersonGroup
        {
            return this.group;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "person";
        }
    }
}