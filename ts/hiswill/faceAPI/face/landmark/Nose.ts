/// <reference path="../../FaceAPI.ts" />

/// <reference path="FaceLandmark.ts" />

/// <reference path="../../Point.ts" />

namespace hiswill.faceAPI.face.landmark 
{
    export class Nose
        extends FaceLandmark
    {
        protected tip: Point;
    
        protected leftRoot: Point;
        protected rightRoot: Point;
    
        protected leftAlarTop: Point;
        protected rightAlarTop: Point;
    
        protected leftAlarOutTip: Point;
        protected rightAlarOutTip: Point;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public constructor(landmarks: FaceLandmarks)
        {
            super(landmarks);
        
            this.tip = new Point("tip");

            this.leftRoot = new Point("leftRoot");
            this.rightRoot = new Point("rightRoot");
        
            this.leftAlarTop = new Point("leftAlarTop");
            this.rightAlarTop = new Point("rightAlarTop");
        
            this.leftAlarOutTip = new Point("leftAlarOutTip");
            this.rightAlarOutTip = new Point("rightAlarOutTip");
        }

        public constructByJSON(obj: any): void
        {
            this.tip.constructByJSON(obj["noseTip"]);

            this.leftRoot.constructByJSON(obj["noseRootLeft"]);
            this.rightRoot.constructByJSON(obj["noseRootRight"]);

            this.leftAlarTop.constructByJSON(obj["noseLeftAlarTop"]);
            this.rightAlarTop.constructByJSON(obj["noseRightAlarTop"]);

            this.leftAlarOutTip.constructByJSON(obj["noseLeftAlarOutTip"]);
            this.rightAlarOutTip.constructByJSON(obj["noseRightAlarOutTip"]);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getTip(): Point
        {
            return this.tip;
        }

        public getLeftRoot(): Point
        {
            return this.leftRoot;
        }
        public getRightRoot(): Point
        {
            return this.rightRoot;
        }

        public getLeftAlarTop(): Point
        {
            return this.leftAlarTop;
        }
        public getRightAlarTop(): Point
        {
            return this.rightAlarTop;
        }

        public getLeftAlarOutTip(): Point
        {
            return this.leftAlarOutTip;
        }
        public getRightAlarOutTip(): Point
        {
            return this.rightAlarOutTip;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "nose";
        }
        public toXML(): XML
        {
            var xml: XML = super.toXML();
            xml.push
            (
                this.tip.toXML(),
                this.leftRoot.toXML(),
                this.rightRoot.toXML(),
                this.leftAlarTop.toXML(),
                this.rightAlarTop.toXML(),
                this.leftAlarOutTip.toXML(),
                this.rightAlarOutTip.toXML()
            );

            return xml;
        }
    }
}