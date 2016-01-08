/// <reference path="../../FaceAPI.ts" />

/// <reference path="FaceLandmark.ts" />

/// <reference path="../../basic/Point.ts" />

namespace hiswill.faceapi.face.landmark 
{
    /**
     * A FaceLandmark representing a nose.
     *
     * @author Jeongho Nam
     */
    export class Nose
        extends FaceLandmark
    {
        /**
         * Position of nose tip.
         */
        protected tip: basic.Point;
    
        /**
         * Position of left root.
         */
        protected leftRoot: basic.Point;

        /**
         * Position of right root.
         */
        protected rightRoot: basic.Point;
    
        /**
         * Position of left alar top.
         */
        protected leftAlarTop: basic.Point;

        /**
         * Poistion of right alar top.
         */
        protected rightAlarTop: basic.Point;
    
        /**
         * Position of left alar out tip.
         */
        protected leftAlarOutTip: basic.Point;

        /**
         * Position of right alar out tip.
         */
        protected rightAlarOutTip: basic.Point;

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
        /**
         * Get tip.
         */
        public getTip(): basic.Point
        {
            return this.tip;
        }

        /**
         * Get leftRoot.
         */
        public getLeftRoot(): basic.Point
        {
            return this.leftRoot;
        }

        /**
         * Get rightRoot.
         */
        public getRightRoot(): basic.Point
        {
            return this.rightRoot;
        }

        /**
         * Get leftAlarTop.
         */
        public getLeftAlarTop(): basic.Point
        {
            return this.leftAlarTop;
        }

        /**
         * Get rightAlarTop.
         */
        public getRightAlarTop(): basic.Point
        {
            return this.rightAlarTop;
        }

        /**
         * Get letAlarOutTip.
         */
        public getLeftAlarOutTip(): basic.Point
        {
            return this.leftAlarOutTip;
        }

        /**
         * Get rightAlarOutTip.
         */
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