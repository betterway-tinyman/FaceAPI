/// <reference path="FaceAPI.ts" />

/// <reference path="FaceLandmark.ts" />

/// <reference path="Lip.ts" />
/// <reference path="Point.ts" />

namespace hiswill.faceapi
{
    /**
     * A FaceLandmark representing a mouth.
     */
    export class Mouth
        extends FaceLandmark
    {
        /**
         * A lip that the Mouth is contaning in.
         */
        protected lip: Lip;

        /**
         * Left position.
         */
        protected left: Point;

        /**
         * Right position.
         */
        protected right: Point;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a FaceLandmarks. 
         *
         * @param landmarks A group and parent of the FaceLandmark.
         */
        public constructor(landmarks: FaceLandmarks)
        {
            super(landmarks);
        
            this.lip = new Lip(this);
            this.left = new Point("left");
            this.right = new Point("right");
        }

        public constructByJSON(obj: any): void
        {
            this.lip.constructByJSON(obj);
        
            this.left.constructByJSON(obj["mouthLeft"]);
            this.right.constructByJSON(obj["mouthRight"]);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get lip.
         */
        public getLip(): Lip
        {
            return this.lip;
        }

        /**
         * Get left.
         */
        public getLeft(): Point
        {
            return this.left;
        }
        
        /**
         * Get right.
         */
        public getRight(): Point
        {
            return this.right;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "mouth";
        }

        public toXML(): XML
        {
            var xml: XML = super.toXML();
            xml.push
            (
                this.lip.toXML(),
                this.left.toXML(),
                this.right.toXML()
            );
        
            return xml;
        }
    }
}