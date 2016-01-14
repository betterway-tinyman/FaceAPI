/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/EntityArray.ts" />
/// <reference path="FaceList.ts" />

namespace hiswill.faceapi
{
    /**
     * An array and parent of FaceList entities.
     *
     * @author Jeongho Nam
     */
    export class FaceListArray
        extends protocol.EntityArray<FaceList>
    {
        /**
         * A facade controller and factory class for Face-API.
         */
        protected api: FaceAPI;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a FaceAPI.
         *
         * @param api A facade controller and factory class for Face-API.
         */
        constructor(api: FaceAPI)
        {
            super();

            this.api = api;
        }

        protected createChild(xml: library.XML): FaceList
        {
            return new FaceList(this, xml.getProperty("name"));
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get api.
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