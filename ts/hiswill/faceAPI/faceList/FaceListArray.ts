/// <reference path="../FaceAPI.ts" />

/// <reference path="FaceList.ts" />

namespace hiswill.faceapi.facelist
{
    export class FaceListArray
        extends EntityArray<FaceList>
    {
        /**
         * 상위 API 클래스.
         */
        protected api: FaceAPI;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * 생성자 from API.
         */
        constructor(api: FaceAPI)
        {
            super();

            this.api = api;
        }

        protected createChild(xml: XML): FaceList
        {
            return new FaceList(this, xml.getProperty("name"));
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get API.
         */
        public getAPI(): FaceAPI
        {
            return this.api;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "faceListArray";
        }
        public CHILD_TAG(): string
        {
            return "faceList";
        }
    }
}