/// <reference path="../../FaceAPI.ts" />

/// <reference path='../../basic/IJSonEntity.ts' />

/// <reference path='../../basic/Point.ts' />

/// <reference path='Mouth.ts' />

namespace hiswill.faceapi.face.landmark 
{
    /**
     * An entity representing a lip contained in a Mouth.
     *
     * @author Jeongho Nam
     */
    export class Lip
        extends Entity
        implements basic.IJSONEntity
    {
        /**
         * A mouth containing the Lip.
         */
        protected mouth: Mouth;

        /**
         * Position of upper-top.
         */
        protected upperTop: basic.Point;

        /**
         * Position of upper-bottom.
         */
        protected upperBottom: basic.Point;
    
        /**
         * Position of under-top.
         */
        protected underTop: basic.Point;
        
        /**
         * Position of under-bottom.
         */
        protected underBottom: basic.Point;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a Mouth. 
         *
         * @param mouth A mouth containing the Lip.
         */
        public constructor(mouth: Mouth)
        {
            super();
            this.mouth = mouth;

            this.upperTop = new basic.Point("upperTop");
            this.upperBottom = new basic.Point("upperBottom");
        
            this.underTop = new basic.Point("underTop");
            this.underBottom = new basic.Point("underBottom");
        }

        public constructByJSON(obj: any): void
        {
            this.upperTop.constructByJSON(obj["upperLipTop"]);
            this.upperBottom.constructByJSON(obj["upperLipBottom"]);

            this.underTop.constructByJSON(obj["underLipTop"]);
            this.underBottom.constructByJSON(obj["underLipBottom"]);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get mouth.
         */
        public getMouth(): Mouth
        {
            return this.mouth;
        }
    
        /**
         * Get upperTop.
         */
        public getUpperTop(): basic.Point
        {
            return this.upperTop;
        }

        /**
         * Get upperBottom.
         */
        public getUpperBottom(): basic.Point
        {
            return this.upperBottom;
        }

        /**
         * Get underTop.
         */
        public getUnderTop(): basic.Point
        {
            return this.underTop;
        }

        /**
         * Get underBottom.
         */
        public getUnderBottom(): basic.Point
        {
            return this.underBottom;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "lip";
        }

        public toXML(): XML
        {
            var xml: XML = super.toXML();
            xml.push
            (
                this.upperTop.toXML(),
                this.upperBottom.toXML(),
                this.underTop.toXML(),
                this.underBottom.toXML()
            );

            return xml;
        }
    }
}