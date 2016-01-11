/// <reference path="FaceAPI.ts" />

/// <reference path="IJSonEntity.ts" />

/// <reference path='FaceAttributes.ts' />

namespace hiswill.faceapi 
{
    /**
     * An abstract entity representing an attribute data belongs to a face.
     *
     * @author Jeongho Nam
     */
    export class FaceAttribute
        extends Entity
        implements IJSONEntity
    {
        /**
         * A group and parent of the FaceAttribute.
         */
        protected attributes: FaceAttributes;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * Contruct from a FaceAttributes 
         *
         * @param attributes A group and parent of the FaceAttribute.
         */
        public constructor(attributes: FaceAttributes)
        {
            super();

            this.attributes = attributes;
        }

        public constructByJSON(val: any): void 
        {
            Global.fetch(this, val);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get attributes.
         */
        public getAttributes(): FaceAttributes
        {
            return this.attributes;
        }
    }
}