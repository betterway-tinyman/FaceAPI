/// <reference path="../../FaceAPI.ts" />

/// <reference path="../../basic/IJSonEntity.ts" />

/// <reference path="../../basic/Point.ts" />

/// <reference path="Eyebrows.ts" />

namespace hiswill.faceapi.face.landmark 
{
    /**
     * An entity representing an eyebrow.
     *
     * @author Jeongho Nam
     */
    export class Eyebrow 
        extends Entity
        implements basic.IJSONEntity
    {
        /**
         * A parent entity containing two Eyebrow(s).
         */
        protected eyeBrows: Eyebrows;

        /**
         * Direction of placed in.
         */
        protected direction: number;

        /**
         * Position of inner.
         */
        protected inner: basic.Point;

        /**
         * Position of outer.
         */
        protected outer: basic.Point;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from an Eyebrows and direction. 
         *
         * @param eyeBrows A parent entity containing two Eyebrow(s).
         * @param direction Direction of placed in.
         */
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
        /**
         * Get eyeBrows.
         */
        public getEyeBrows(): Eyebrows
        {
            return this.eyeBrows;
        }

        /**
         * Get opposite side's Eyebrow.
         */
        public getOpposite(): Eyebrow
        {
            if (this.direction == Direction.LEFT)
                return this.eyeBrows.getRight();
            else
                return this.eyeBrows.getLeft();
        }

        /**
         * Get inner.
         */
        public getInner(): basic.Point
        {
            return this.inner;
        }

        /**
         * Get outer.
         */
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