/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />

/// <reference path="FaceLandmarks.ts" />

namespace hiswill.faceapi
{
    /**
     * An abstract entity representing a landmark of a face with its position and size.
     *
     * @author Jeongho Nam
     */
    export class FaceLandmark
        extends samchon.protocol.Entity
        implements IJSONEntity
    {
        /**
         * A group and parent of the FaceLandmark.
         */
        protected landmarks: FaceLandmarks;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a FaceLandmarks. 
         *
         * @param landmarks A group and parent of the FaceLandmark.
         */
        public constructor(landmarks: FaceLandmarks)
        {
            super();
        }

        public constructByJSON(val: any): void
        {
            Global.fetch(this, val);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get landmarks.
         */
        public getLandmarks(): FaceLandmarks
        {
            return this.landmarks;
        }
    }
}