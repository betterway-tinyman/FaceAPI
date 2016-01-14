/// <reference path="FaceAPI.ts" />

/// <reference path="FaceLandmark.ts" />

/// <reference path="Eye.ts" />

namespace hiswill.faceapi
{
    /**
     * A FaceLandmark representing eyes.
     *
     * @author Jeongho Nam
     */
    export class Eyes
        extends FaceLandmark
    {
        /**
         * An eye on left.
         */
        protected left: Eye;

        /**
         * An eye on right.
         */
        protected right: Eye;

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
            super(landmarks);
        
            this.left = new Eye(this, Direction.LEFT);
            this.right = new Eye(this, Direction.RIGHT);
        }
    
        public constructByJSON(obj: any): void
        {
            this.left.constructByJSON(obj);
            this.right.constructByJSON(obj);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get left.
         */
        public getLeft(): Eye
        {
            return this.left;
        }

        /**
         * Get right.
         */
        public getRight(): Eye
        {
            return this.right;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "eyes";
        }

        public toXML(): library.XML
        {
            var xml: library.XML = super.toXML();
            xml.push
            (
                this.left.toXML(),
                this.right.toXML()
            );

            return xml;
        }
    }
}