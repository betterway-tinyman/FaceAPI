/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="PersonGroup.ts" />

namespace hiswill.faceapi 
{
    /**
     * An array and parent of PersonGroup entities.
     *
     * @author Jeongho Nam
     */
    export class PersonGroupArray
        extends AsyncEntityParent<PersonGroup>
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

        /**
         * @inheritdoc
         */
        protected createChild(xml: samchon.library.XML): PersonGroup
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
        /**
         * @inheritdoc
         */
        public TAG(): string
        {
            return "personGroupArray";
        }

        /**
         * @inheritdoc
         */
        public CHILD_TAG(): string
        {
            return "personGroup";
        }
    }
}