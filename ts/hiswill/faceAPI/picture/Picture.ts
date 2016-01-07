/// <reference path="../FaceAPI.ts" />

/// <reference path="../face/Face.ts" />
/// <reference path="../basic/IJSONEntity.ts" />

/// <reference path="PictureArray.ts" />

namespace hiswill.faceAPI.picture
{
    /**
     * <p> 사진 엔티티. </p>
     *
     * <ul>
     *  <li> 한 장의 사진에 여럿의 얼굴이 들어있다. </li>
     *  <li> 한 장의 사진은 여럿의 사람을 참조한다. </li>
     * </ul>
     *
     * @author 남정호
     */
    export class Picture 
        extends EntityArray<face.Face>
        implements basic.IJSONEntity
    {
        protected pictureArray: PictureArray;

        /**
         * 그림이 저장된 URL.
         */
        protected url: string;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * 기본 생성자.
         */
        public constructor(pictureArray: PictureArray, url: string = "") 
        {
            super();

            this.pictureArray = pictureArray;
            this.url = url;
        }
    
        public constructByJSON(val: any): void
        {
            var array: Array<any> = val;

            for (var i: number = 0; i < array.length; i++)
            {
                var face: face.Face = new faceAPI.face.Face(this);
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
    
        public getPictureArray(): PictureArray
        {
            return this.pictureArray;
        }
        public getURL(): string
        {
            return this.url;
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE-API
        -------------------------------------------------------- */
        /**
         * <p> 사진 속 얼굴들을 감지해낸다. </p>
         *
         * <ul>
         *  <li> 참고자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236 </li>
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