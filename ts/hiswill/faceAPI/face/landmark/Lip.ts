/// <reference path="../../FaceAPI.ts" />

/// <reference path='../../basic/IJSonEntity.ts' />

/// <reference path='../../basic/Point.ts' />

/// <reference path='Mouth.ts' />

namespace hiswill.faceAPI.face.landmark 
{
    export class Lip
        extends Entity
        implements basic.IJSONEntity
    {
        protected mouth: Mouth;

        protected upperTop: basic.Point;
        protected upperBottom: basic.Point;
    
        protected underTop: basic.Point;
        protected underBottom: basic.Point;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
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
        public getMouth(): Mouth
        {
            return this.mouth;
        }
    
        public getUpperTop(): basic.Point
        {
            return this.upperTop;
        }
        public getUpperBottom(): basic.Point
        {
            return this.upperBottom;
        }

        public getUnderTop(): basic.Point
        {
            return this.underTop;
        }
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