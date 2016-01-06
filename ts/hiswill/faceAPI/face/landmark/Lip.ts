/// <reference path="../../FaceAPI.ts" />

/// <reference path='../../IJSonEntity.ts' />

/// <reference path='../../Point.ts' />

/// <reference path='Mouth.ts' />

namespace hiswill.faceAPI.face.landmark 
{
    export class Lip
        extends Entity
        implements IJSONEntity
    {
        protected mouth: Mouth;

        protected upperTop: Point;
        protected upperBottom: Point;
    
        protected underTop: Point;
        protected underBottom: Point;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
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
        public getMouth(): Mouth
        {
            return this.mouth;
        }
    
        public getUpperTop(): Point
        {
            return this.upperTop;
        }
        public getUpperBottom(): Point
        {
            return this.upperBottom;
        }

        public getUnderTop(): Point
        {
            return this.underTop;
        }
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