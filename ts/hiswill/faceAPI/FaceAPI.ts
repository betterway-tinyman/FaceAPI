/// <reference path="../../SamchonFramework.ts" />
/// <reference path="../../jquery.d.ts" />

/// <reference path="person/PersonGroupArray.ts" />
/// <reference path="faceList/FaceListArray.ts" />
/// <reference path="picture/PictureArray.ts" />

/* ============================================================
    ROOT ENTITIES
        - FACE_API
============================================================ */
namespace hiswill.faceAPI
{
    /**
     * Face API의 Facade controller 및 Factory 클래스.
     *
     * @author 남정호
     */
    export class FaceAPI
        extends Entity 
    {
        /**
         * 사람 그룹 리스트.
         */
        protected personGroupArray: person.PersonGroupArray;

        /**
         * 얼굴 리스트의 리스트.
         */
        protected faceListArray: faceList.FaceListArray;

        /**
         * 사진 리스트.
         */
        protected pictureArray: picture.PictureArray;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * 기본 생성자.
         */
        public constructor() 
        {
            super();

            this.personGroupArray = new person.PersonGroupArray(this);
            this.faceListArray = new faceList.FaceListArray(this);
            this.pictureArray = new picture.PictureArray(this);
        }

        /**
         * Factory method of 사람 그룹.
         */
        public createPersonGroup(name: string): person.PersonGroup 
        {
            var personGroup: person.PersonGroup = new person.PersonGroup(this.personGroupArray, name);
            this.personGroupArray.push(personGroup);

            return personGroup;
        }

        /**
         * Factory method of 얼굴 리스트.
         */
        public createFaceList(name: string): faceList.FaceList 
        {
            var faceList: faceList.FaceList = new faceAPI.faceList.FaceList(this.faceListArray, name);
            this.faceListArray.push(faceList);

            return faceList;
        }

        /**
         * Factory method of 사진.
         */
        public createPicture(url: string): picture.Picture 
        {
            var picture: picture.Picture = new faceAPI.picture.Picture(this.pictureArray, url);
            this.pictureArray.push(picture);

            return picture;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get 사람 그룹 리스트.
         */
        public getPersonGroupArray(): person.PersonGroupArray
        {
            return this.personGroupArray;
        }

        /**
         * Get 얼굴 리스트의 리스트.
         */
        public getFaceListArray(): faceList.FaceListArray
        {
            return this.faceListArray;
        }
    
        /**
         * Get 사진 리스트.
         */
        public getPictureArray(): picture.PictureArray 
        {
            return this.pictureArray;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string 
        {
            return "faceAPI";
        }
        public toXML(): XML
        {
            var xml: XML = super.toXML();
            xml.push
            (
                this.personGroupArray.toXML(),
                this.pictureArray.toXML()
            );

            return xml;
        }

        /* --------------------------------------------------------
            STATIC MEMBERS
        -------------------------------------------------------- */
        /**
         * Face API 의 인증키.
         */
        private static get CERTIFICATION_KEY(): string 
        {
            return "b072c71311d144388ac2527a5f06ffca";
        }

        /**
         * Face API 서버에 질의문을 전송함.
         *
         * @param url 질의문을 보낼 HTTPS 주소
         * @param method GET, POST 등
         * @param params 선행으로 보낼 파라미터
         * @param data 후행으로 보낼 데이터
         * @param success 질의 성공시, reply 데이터에 대하여 수행할 함수
         */
        public static query(url: string, method:string, params: Object, data: Object, success:Function): void
        {
            $.ajax
            ({
                url: url + "?" + $.param(params),
                beforeSend: function (xhrObj) 
                {
                    // Request headers
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", FaceAPI.CERTIFICATION_KEY);
                },
                type: method,
                async: false,

                data: JSON.stringify(data),
                success: function (data)
                {
                    success.apply(data);
                }
            });
        }

        private static sequence: number = 0;

        public static issueID(prefix: string): string
        {
            var date: Date = new Date();
        
            return prefix + "_hiswill_" + date.toString() + "_" + (++FaceAPI.sequence);
        }

        public static main()
        {
            var api: FaceAPI = new FaceAPI();

            // WHAT TO DO
        }
    }
}