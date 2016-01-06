/// <reference path="../../FaceAPI.ts" />

/// <reference path='FaceLandmark.ts' />

/// <reference path='Lip.ts' />
/// <reference path='../../Point.ts' />

namespace hiswill.faceAPI.face.landmark 
{
    export class Mouth
        extends FaceLandmark
    {
        protected lip: Lip;
        protected left: Point;
        protected right: Point;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
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
        public getLip(): Lip
        {
            return this.lip;
        }
        public getLeft(): Point
        {
            return this.left;
        }
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