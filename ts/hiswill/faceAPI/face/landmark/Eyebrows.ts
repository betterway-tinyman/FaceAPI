/// <reference path="../../FaceAPI.ts" />

/// <reference path="FaceLandmark.ts" />

/// <reference path="Eyebrow.ts" />

namespace hiswill.faceapi.face.landmark 
{
    /**
     * 눈썹 둘.
     */
    export class Eyebrows
        extends FaceLandmark
    {
        protected left: Eyebrow;
        protected right: Eyebrow;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
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
        public getLeft(): Eyebrow
        {
            return this.left;
        }

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
        public toXML(): XML
        {
            var xml: XML = super.toXML();
            xml.push
            (
                this.left.toXML(),
                this.right.toXML()
            );

            return xml;
        }
    }
}