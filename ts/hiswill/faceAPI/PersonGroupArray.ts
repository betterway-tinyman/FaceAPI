/// <reference path="FaceAPI.ts" />

/// <reference path="PersonGroup.ts" />

namespace hiswill.faceapi 
{
    /**
     * An array and parent of PersonGroup entities.
     *
     * @author Jeongho Nam
     */
    export class PersonGroupArray
        extends EntityArray<PersonGroup>
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

        protected createChild(xml: XML): PersonGroup
        {
            return new PersonGroup(this, xml.getProperty("name"));
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
            return "personGroupArray";
        }
        public CHILD_TAG(): string
        {
            return "personGroup";
        }
    }
}