/// <reference path="../FaceAPI.ts" />

/// <reference path="../face/Face.ts" />
/// <reference path="../basic/IJSONEntity.ts" />

/// <reference path="PictureArray.ts" />

namespace hiswill.faceapi.picture
{
    /**
     * <p> A picture entity who containing Face entities. </p>
     *
     * @author Jeongho Nam
     */
    export class Picture 
        extends EntityArray<face.Face>
        implements basic.IJSONEntity
    {
        /**
         * An array and parent of Picture entities.
         */
        protected pictureArray: PictureArray;

        /**
         * An url-address the (physical) picture is placed in.
         */
        protected url: string;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from an PictureArray and url. 
         *
         * @param pictureArray An array and parent of Picture entities.
         * @param url An url-address the (physical) picture is placed in.
         */
        public constructor(pictureArray: PictureArray, url: string = "") 
        {
            super();

            this.pictureArray = pictureArray;
            this.url = url;
        }
    
        public constructByJSON(val: any): void
        {
            this.splice(0, this.length); // CLEAR

            var array: Array<any> = val;

            for (var i: number = 0; i < array.length; i++)
            {
                var face: face.Face = new faceapi.face.Face(this);
                face.constructByJSON(array[i]);

                this.push(face);
            }
        }

        protected createChild(xml:XML): face.Face
        {
            return new face.Face(this);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public key(): any
        {
            return this.url;
        }
    
        /**
         * Get pictureArray.
         */
        public getPictureArray(): PictureArray
        {
            return this.pictureArray;
        }

        /**
         * Get url.
         */
        public getURL(): string
        {
            return this.url;
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE-API
        -------------------------------------------------------- */
        /**
         * <p> Detect Face(s) in the Picture. </p>
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236 </li>
         * </ul>
         */
        public detect(): void 
        {
            // REMOVE ALL
            this.splice(0, this.length);

            var this_ = this;

            // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/detect", "POST", 
                {
                    "returnFaceId": "true",
                    "returnFaceLandmarks": "true",
                    "returnFaceAttributes": "age,gender,smile,facialHair,headPose",
                }, 

                { "url": this.url }, 

                function (data) 
                {
                    this_.constructByJSON(data);
                }
            );
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string 
        {
            return "person";
        }
        public CHILD_TAG(): string
        {
            return "face";
        }
    }
}