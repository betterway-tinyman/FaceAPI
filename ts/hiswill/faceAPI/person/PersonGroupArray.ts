/// <reference path="../FaceAPI.ts" />

/// <reference path="PersonGroup.ts" />

namespace hiswill.faceapi.person 
{
    /**
     * 사람 그룹 리스트 엔티티.
     *
     * @author 남정호
     */
    export class PersonGroupArray
        extends EntityArray<PersonGroup>
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

        protected createChild(xml: XML): PersonGroup
        {
            return new PersonGroup(this, xml.getProperty("name"));
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
            return "personGroupArray";
        }
        public CHILD_TAG(): string
        {
            return "personGroup";
        }
    }
}