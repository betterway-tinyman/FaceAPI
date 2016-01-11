/// <reference path="FaceAPI.ts" />

/// <reference path="SimilarFace.ts" />
/// <reference path="IJSONEntity.ts" />

/// <reference path="Face.ts" />
/// <reference path="FaceList.ts" />

namespace hiswill.faceapi
{
    export class SimilarFaceArray
        extends EntityArray<SimilarFace>
    {
        /**
         * A facade controller and factory class for Face-API.
         */
        protected api: FaceAPI;

        /**
         * A face who wants to find similars.
         */
        protected face: Face;

        /**
         * A list of candidates' FacePair.
         */
        protected faceList: FaceList;

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
         * Construct from a Face and FaceList. 
         *
         * @param face A face who wants to find similars.
         * @param personGroup A list of candidates' FacePair.
         */
        public constructor(face: Face, faceList: FaceList);

        public constructor(...args: any[])
        {
            super();

            if (args.length == 1 && args[0] instanceof FaceAPI)
            {
                this.api = <FaceAPI>args[0];

                this.face = null;
                this.faceList = null;
            }
            else if (args.length == 2 && args[0] instanceof Face && args[1] instanceof FaceList)
            {
                this.face = <Face>args[0];
                this.faceList = <FaceList>args[1];

                this.api = this.faceList.getListArray().getAPI();
            }
        }

        public construt(xml: XML): void
        {
            
            this.faceList = null;

            // SET FACE
            if (xml.hasProperty("faceID") == true)
            {
                var faceID: string = xml.getProperty("faceID");

                var pictureArray: PictureArray = this.api.getPictureArray();

                for (var i: number = 0; i < pictureArray.length; i++)
                {
                    var picture: Picture = pictureArray[i];

                    if (picture.has(faceID) == true) {
                        this.face = picture.get(faceID);
                        break;
                    }
                }
            }
                      
            // SET FACE_LIST
            if (xml.hasProperty("faceListID") == true)
            {
                var faceListID: string = xml.getProperty("faceListID");

                var faceListArray: FaceListArray = this.api.getFaceListArray();
                if (faceListArray.has(faceListID) == true)
                    this.faceList = faceListArray.get(faceListID);
            }

            // SET CHILDREN
            super.construct(xml);
        }

        public constructByJSON(val: any): void
        {
            this.splice(0, this.length); // CLEAR
            
            var items: Array<Object> = val;

            for (var i: number = 0; i < items.length; i++)
            {
                var similar: SimilarFace = new SimilarFace(this);
                similar.constructByJSON(items[i]);

                this.push(similar);
            }
        }

        protected createChild(xml: XML): SimilarFace
        {
            return new SimilarFace(this);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getAPI(): FaceAPI
        {
            return this.api;
        }

        public getFace(): Face
        {
            return this.face;
        }
        public getFaceList(): FaceList
        {
            return this.faceList;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "similarFaceArray";
        }
        public CHILD_TAG(): string
        {
            return "similarFace";
        }

        public toXML(): XML
        {
            var xml: XML = super.toXML();
            
            if (this.face != null)
                xml.setProperty("faceID", this.face.getID());
            
            if (this.faceList != null)
                xml.setProperty("faceListID", this.faceList.getID());

            return xml;
        }
    }
}