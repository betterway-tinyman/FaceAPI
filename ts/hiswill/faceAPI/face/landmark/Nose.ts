/// <reference path="../../FaceAPI.ts" />

/// <reference path="FaceLandmark.ts" />

/// <reference path="../../basic/Point.ts" />

namespace hiswill.faceAPI.face.landmark 
{
    export class Nose
        extends FaceLandmark
    {
        protected tip: basic.Point;
    
        protected leftRoot: basic.Point;
        protected rightRoot: basic.Point;
    
        protected leftAlarTop: basic.Point;
        protected rightAlarTop: basic.Point;
    
        protected leftAlarOutTip: basic.Point;
        protected rightAlarOutTip: basic.Point;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public constructor(landmarks: FaceLandmarks)
        {
            super(landmarks);
        
            this.tip = new basic.Point("tip");

            this.leftRoot = new basic.Point("leftRoot");
            this.rightRoot = new basic.Point("rightRoot");
        
            this.leftAlarTop = new basic.Point("leftAlarTop");
            this.rightAlarTop = new basic.Point("rightAlarTop");
        
            this.leftAlarOutTip = new basic.Point("leftAlarOutTip");
            this.rightAlarOutTip = new basic.Point("rightAlarOutTip");
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
        public getTip(): basic.Point
        {
            return this.tip;
        }

        public getLeftRoot(): basic.Point
        {
            return this.leftRoot;
        }
        public getRightRoot(): basic.Point
        {
            return this.rightRoot;
        }

        public getLeftAlarTop(): basic.Point
        {
            return this.leftAlarTop;
        }
        public getRightAlarTop(): basic.Point
        {
            return this.rightAlarTop;
        }

        public getLeftAlarOutTip(): basic.Point
        {
            return this.leftAlarOutTip;
        }
        public getRightAlarOutTip(): basic.Point
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