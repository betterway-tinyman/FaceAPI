/// <reference path="../../FaceAPI.ts" />

/// <reference path="../../basic/IJSonEntity.ts" />

/// <reference path="../../basic/Point.ts" />

/// <reference path="Eyes.ts" />

namespace hiswill.faceapi.face.landmark 
{
    /**
     * An entity representing an eye.
     *
     * @author Jeongho Nam
     */
    export class Eye 
        extends Entity
        implements basic.IJSONEntity
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
        protected top: basic.Point;
        
        /**
         * Position of top.
         */
        protected bottom: basic.Point;
        
        /**
         * Position of top.
         */
        protected inner: basic.Point;
        
        /**
         * Position of top.
         */
        protected outer: basic.Point;

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

            this.top = new basic.Point("top");
            this.bottom = new basic.Point("bottom");
            this.inner = new basic.Point("inner");
            this.outer = new basic.Point("outer");

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
        public getTop(): basic.Point
        {
            return this.top;
        }

        /**
         * Get bottom.
         */
        public getBottom(): basic.Point 
        {
            return this.bottom;
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