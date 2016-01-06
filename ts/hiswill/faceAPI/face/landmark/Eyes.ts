/// <reference path="../../FaceAPI.ts" />

/// <reference path="FaceLandmark.ts" />
/// <reference path="../../IJSonEntity.ts" />

/// <reference path="Eye.ts" />

namespace hiswill.faceAPI.face.landmark 
{
    export class Eyes
        extends FaceLandmark
    {
        protected landmarks: FaceLandmarks;

        protected left: Eye;
        protected right: Eye;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
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
        public getLeft(): Eye
        {
            return this.left;
        }
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