/// <reference path="FaceAPI.ts" />

/// <reference path="FaceLandmark.ts" />

/// <reference path="Eyebrow.ts" />

namespace hiswill.faceapi
{
    /**
     * A FaceLandmark representing eyebrows.
     *
     * @author Jeongho Nam
     */
    export class Eyebrows
        extends FaceLandmark
    {
        /**
         * An Eyebrow on left.
         */
        protected left: Eyebrow;

        /**
         * An Eyebrow on right.
         */
        protected right: Eyebrow;

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
        
            this.left = new Eyebrow(this, Direction.LEFT);
            this.right = new Eyebrow(this, Direction.RIGHT);
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
        public getLeft(): Eyebrow
        {
            return this.left;
        }

        /**
         * Get right.
         */
        public getRight(): Eyebrow
        {
            return this.right;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "eyeBrows";
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