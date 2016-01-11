/// <reference path="FaceAPI.ts" />

/// <reference path="IJSonEntity.ts" />

/// <reference path="Point.ts" />

/// <reference path="Eyes.ts" />

namespace hiswill.faceapi
{
    /**
     * An entity representing an eye.
     *
     * @author Jeongho Nam
     */
    export class Eye 
        extends Entity
        implements IJSONEntity
    {
        /**
         * A parent entity containing two Eye(s).
         */
        protected eyes: Eyes;

        /**
         * Direction of placed in.
         */
        protected direction: number;

        /**
         * Position of top.
         */
        protected top: Point;
        
        /**
         * Position of top.
         */
        protected bottom: Point;
        
        /**
         * Position of top.
         */
        protected inner: Point;
        
        /**
         * Position of top.
         */
        protected outer: Point;

        /**
         * An entity representing a pupil belongs to the Eye.
         */
        protected pupil: Pupil;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from an Eyes and direction. 
         *
         * @param eyes A parent entity containing two Eye(s).
         * @param direction Direction of placed in.
         */
        public constructor(eyes: Eyes, direction: number)
        {
            super();

            this.eyes = eyes;
            this.direction = direction;

            this.top = new Point("top");
            this.bottom = new Point("bottom");
            this.inner = new Point("inner");
            this.outer = new Point("outer");

            this.pupil = new Pupil(this);
        }

        public constructByJSON(obj: any): void 
        {
            if (this.direction == Direction.LEFT)
            {
                this.top.constructByJSON(obj["eyeLeftTop"]);
                this.bottom.constructByJSON(obj["eyeLeftBottom"]);
                this.inner.constructByJSON(obj["eyeLeftInner"]);
                this.outer.constructByJSON(obj["eyeLeftOuter"]);

                this.pupil.constructByJSON(obj["pupilLeft"]);
            }
            else
            {
                this.top.constructByJSON(obj["eyeRightTop"]);
                this.bottom.constructByJSON(obj["eyeRightBottom"]);
                this.inner.constructByJSON(obj["eyeRightInner"]);
                this.outer.constructByJSON(obj["eyeRightOuter"]);

                this.pupil.constructByJSON(obj["pupilRight"]);
            }
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get eyes.
         */
        public getEyes(): Eyes
        {
            return this.eyes;
        }

        /**
         * Get opposite side's Eye.
         */
        public getOpposite(): Eye
        {
            if (this.direction == Direction.LEFT)
                return this.eyes.getRight();
            else
                return this.eyes.getLeft();
        }

        /**
         * Get top.
         */
        public getTop(): Point
        {
            return this.top;
        }

        /**
         * Get bottom.
         */
        public getBottom(): Point 
        {
            return this.bottom;
        }

        /**
         * Get inner.
         */
        public getInner(): Point 
        {
            return this.inner;
        }

        /**
         * Get outer.
         */
        public getOuter(): Point 
        {
            return this.outer;
        }

        /**
         * Get pupil.
         */
        public getPupil(): Pupil
        {
            return this.pupil;
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
                this.top.toXML(),
                this.bottom.toXML(),
                this.inner.toXML(),
                this.outer.toXML(),
                this.pupil.toXML()
            );

            return xml;
        }
    }
}