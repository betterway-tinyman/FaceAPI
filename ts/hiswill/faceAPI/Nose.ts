/// <reference path="FaceAPI.ts" />

/// <reference path="FaceLandmark.ts" />

/// <reference path="Point.ts" />

namespace hiswill.faceapi
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
        protected tip: Point;
    
        /**
         * Position of left root.
         */
        protected leftRoot: Point;

        /**
         * Position of right root.
         */
        protected rightRoot: Point;
    
        /**
         * Position of left alar top.
         */
        protected leftAlarTop: Point;

        /**
         * Poistion of right alar top.
         */
        protected rightAlarTop: Point;
    
        /**
         * Position of left alar out tip.
         */
        protected leftAlarOutTip: Point;

        /**
         * Position of right alar out tip.
         */
        protected rightAlarOutTip: Point;

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
        /**
         * Get tip.
         */
        public getTip(): Point
        {
            return this.tip;
        }

        /**
         * Get leftRoot.
         */
        public getLeftRoot(): Point
        {
            return this.leftRoot;
        }

        /**
         * Get rightRoot.
         */
        public getRightRoot(): Point
        {
            return this.rightRoot;
        }

        /**
         * Get leftAlarTop.
         */
        public getLeftAlarTop(): Point
        {
            return this.leftAlarTop;
        }

        /**
         * Get rightAlarTop.
         */
        public getRightAlarTop(): Point
        {
            return this.rightAlarTop;
        }

        /**
         * Get letAlarOutTip.
         */
        public getLeftAlarOutTip(): Point
        {
            return this.leftAlarOutTip;
        }

        /**
         * Get rightAlarOutTip.
         */
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

        public toXML(): library.XML
        {
            var xml: library.XML = super.toXML();
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