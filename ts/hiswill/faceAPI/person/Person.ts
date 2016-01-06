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
        extends FacePairArray
    {
        protected group: PersonGroup;

        protected name: string;
    
        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * 생성자 from PersonGroup with 이름
         */
        public constructor(group: PersonGroup, name: string)
        {
            super();

            this.group = group;
            this.name = name;
        }

        public construct(xml: XML): void
        {
            this.name = xml.getProperty("name");

            if (xml.has(this.CHILD_TAG()) == false)
                return;
        
            var xmlList: XMLList = xml.get(this.CHILD_TAG());
            var pictureArray: picture.PictureArray = this.group.getGroupArray().getAPI().getPictureArray();

            for (var i: number = 0; i < xmlList.length; i++)
            {
                var faceID: string = xmlList[i].getProperty("id");
                var pictureURL: string = xmlList[i].getProperty("pictureURL");

                if (pictureArray.has(pictureURL) == false || pictureArray.get(pictureURL).has(faceID) == false)
                    continue;

                this.push(pictureArray.get(pictureURL).get(faceID));
            }
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE API
        -------------------------------------------------------- */
        public insertToServer(): void
        {
        
        }
        public eraseFromServer(): void
        {
        
        }

        public insertFaceToServer(face: FacePair): void
        {

        }
        public eraseFaceFromServer(face: FacePair): void
        {

        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public key(): any
        {
            return this.name;
        }

        public getGroup(): PersonGroup
        {
            return this.group;
        }
        public getName(): string
        {
            return this.name;
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