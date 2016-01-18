/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />

/// <reference path="Point.ts" />

/// <reference path="Mouth.ts" />

namespace hiswill.faceapi
{
    /**
     * An entity representing a lip contained in a Mouth.
     *
     * @author Jeongho Nam
     */
    export class Lip
        extends samchon.protocol.Entity
        implements IJSONEntity
    {
        /**
         * A mouth containing the Lip.
         */
        protected mouth: Mouth;

        /**
         * Position of upper-top.
         */
        protected upperTop: Point;

        /**
         * Position of upper-bottom.
         */
        protected upperBottom: Point;
    
        /**
         * Position of under-top.
         */
        protected underTop: Point;
        
        /**
         * Position of under-bottom.
         */
        protected underBottom: Point;

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

            this.upperTop = new Point("upperTop");
            this.upperBottom = new Point("upperBottom");
        
            this.underTop = new Point("underTop");
            this.underBottom = new Point("underBottom");
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
        public getUpperTop(): Point
        {
            return this.upperTop;
        }

        /**
         * Get upperBottom.
         */
        public getUpperBottom(): Point
        {
            return this.upperBottom;
        }

        /**
         * Get underTop.
         */
        public getUnderTop(): Point
        {
            return this.underTop;
        }

        /**
         * Get underBottom.
         */
        public getUnderBottom(): Point
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

        public toXML(): samchon.library.XML
        {
            var xml: samchon.library.XML = super.toXML();
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