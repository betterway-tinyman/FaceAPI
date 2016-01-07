/// <reference path="../../FaceAPI.ts" />

/// <reference path="../../basic/IJSonEntity.ts" />

/// <reference path="../../basic/Point.ts" />

/// <reference path="Eyebrows.ts" />

namespace hiswill.faceAPI.face.landmark 
{
    /**
     * 눈썹.
     *
     * @author 남정호
     */
    export class Eyebrow 
        extends Entity
        implements basic.IJSONEntity
    {
        protected eyeBrows: Eyebrows;
        protected direction: number;

        protected inner: basic.Point;
        protected outer: basic.Point;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        public constructor(eyeBrows: Eyebrows, direction: number)
        {
            super();

            this.eyeBrows = eyeBrows;
            this.direction = direction;

            this.inner = new basic.Point("inner");
            this.outer = new basic.Point("outer");
        }

        public constructByJSON(obj: any): void 
        {
            if (this.direction == Direction.LEFT)
            {
                this.inner.constructByJSON(obj["eyebrowLeftInner"]);
                this.outer.constructByJSON(obj["eyebrowLeftOuter"]);
            }
            else
            {
                this.inner.constructByJSON(obj["eyebrowRightInner"]);
                this.outer.constructByJSON(obj["eyebrowRightOuter"]);
            }
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getEyeBrows(): Eyebrows
        {
            return this.eyeBrows;
        }
        public getOpposite(): Eyebrow
        {
            if (this.direction == Direction.LEFT)
                return this.eyeBrows.getRight();
            else
                return this.eyeBrows.getLeft();
        }

        public getInner(): basic.Point
        {
            return this.inner;
        }
        public getOuter(): basic.Point
        {
            return this.outer;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            if (this.direction == Direction.LEFT)
                return "left";
            else
                return "right";
        }
        public toXML(): XML 
        {
            var xml: XML = super.toXML();
            xml.eraseProperty("direction");

            xml.push
            (
                this.inner.toXML(),
                this.outer.toXML()
            );

            return xml;
        }
    }
}