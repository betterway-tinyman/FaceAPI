/// <reference path="../FaceAPI.ts" />

/// <reference path="../face/FacePairArray.ts" />

namespace hiswill.faceAPI.faceList
{
    export class FaceList
        extends FacePairArray
    {
        /**
         * 상위 API 클래스.
         */
        protected listArray: FaceListArray;

        /**
         * 식별자 ID.
         */
        protected id: string;
    
        /**
         * 얼굴 리스트의 이름.
         */
        protected name: string;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * 생성자 from API with 이름.
         */ 
        public constructor(listArray: FaceListArray, name: string = "")
        {
            super();

            this.listArray = listArray;

            this.id = "";
            this.name = name;

            this.registered = false;
        }

        public construct(xml: XML): void 
        {
            this.id = xml.getProperty("id");
            this.name = xml.getProperty("name");

            if (xml.has(this.CHILD_TAG()) == false)
                return;

            var xmlList: XMLList = xml.get(this.CHILD_TAG());
            var pictureArray: picture.PictureArray = this.listArray.getAPI().getPictureArray();

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
        /**
         * 현재의 FaceList를 Face API 서버에 등록.
         *
         * <ul>
         *  <li> 참고 자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524b </li>
         * </ul>
         */
        public insertToServer(): void
        {
            // 식별자 번호 발급
            if (this.id == "")
                this.id = FaceAPI.issueID("face_list");

            var this_: FaceList = this;

            // 서버에 등록
            var url: string = "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id;
            var method: string = "PUT";
        
            var params: Object = {"faceListId": this.id};
            var data: Object = 
            {
                "name": this.name,
                "userData": ""
            };

            var success: Function = function(data)
            {
                this_.registered = true;
            }

            // 전송
            FaceAPI.query(url, method, params, data, success);
        }

        /**
         * 현재의 FaceList를 서버에서 지운다.
         *
         * <ul>
         *  <li> 참고 자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524b </li>
         * </ul>
         */
        public eraseFromServer(): void
        {
            // 준비
            var url: string = "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id;
            var method: string = "DELETE";
            var params: Object = { "faceListId": this.id };
        
            // 전송
            FaceAPI.query(url, method, params, null, null);

            this.registered = false;
        }

        /**
         * 새 Face가 현재 FaceList에 추가되었음을 Face API 서버에 알린다.
         *
         * <ul>
         *  <li> 참고 자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395250 </li>
         * </ul>
         */
        public insertFaceToServer(face: FacePair): void
        {
            if (this.isRegistered() == false)
                this.insertToServer();

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces",
                "POST",

                {
                    "faceListId": this.id,
                    "userData": "",
                    "targetFace": face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight()
                },
                {
                    "url": face.getPictureURL()
                },

                function (data)
                {
                    // SOMETHING TO DO
                }
            );
        }

        /**
         * 특정 Face가 현재의 FaceList로부터 제거되었음을 Face API 서버에 알린다.
         *
         * <ul>
         *  <li> 참고 자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395251 </li>
         * </ul>
         */
        public eraseFaceFromServer(face: FacePair): void
        {
            if (this.has(face) == false)
                return;

            var params: Object =
            {
                "faceListId": this.id,
                "persistedFaceId": face.getID()
            };

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces/" + face.getID(),
                "DELETE",

                {
                    "faceListId": this.id,
                    "persistedFaceId": face.getID()
                },
                null,

                function data() 
                {
                    // SOMETHING TO DO
                }
            );
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public key(): any
        {
            return this.id;
        }

        public getAPI(): FaceAPI
        {
            return this.listArray.getAPI();
        }
        public getListArray(): FaceListArray
        {
            return this.listArray;
        }

        public getID(): string
        {
            return this.id;
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
            return "faceList";
        }
    }
}