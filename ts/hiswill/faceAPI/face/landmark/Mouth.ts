/// <reference path="../../FaceAPI.ts" />

/// <reference path='FaceLandmark.ts' />

/// <reference path='Lip.ts' />
/// <reference path='../../basic/Point.ts' />

namespace hiswill.faceapi.face.landmark 
{
    export class Mouth
        extends FaceLandmark
    {
        protected lip: Lip;
        protected left: basic.Point;
        protected right: basic.Point;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public constructor(landmarks: FaceLandmarks)
        {
            super(landmarks);
        
            this.lip = new Lip(this);
            this.left = new basic.Point("left");
            this.right = new basic.Point("right");
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
        public getLeft(): basic.Point
        {
            return this.left;
        }
        public getRight(): basic.Point
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