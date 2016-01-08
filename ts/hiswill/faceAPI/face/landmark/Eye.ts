/// <reference path="../../FaceAPI.ts" />

/// <reference path="../../basic/IJSonEntity.ts" />

/// <reference path="../../basic/Point.ts" />

/// <reference path="Eyes.ts" />

namespace hiswill.faceapi.face.landmark 
{
    export class Eye 
        extends Entity
        implements basic.IJSONEntity
    {
        protected eyes: Eyes;
        protected direction: number;

        protected top: basic.Point;
        protected bottom: basic.Point;
        protected inner: basic.Point;
        protected outer: basic.Point;

        protected pupil: Pupil;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
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
        public getEyes(): Eyes
        {
            return this.eyes;
        }
        public getOpposite(): Eye
        {
            if (this.direction == Direction.LEFT)
                return this.eyes.getRight();
            else
                return this.eyes.getLeft();
        }

        public getTop(): basic.Point
        {
            return this.top;
        }
        public getBottom(): basic.Point 
        {
            return this.bottom;
        }
        public getInner(): basic.Point 
        {
            return this.inner;
        }
        public getOuter(): basic.Point 
        {
            return this.outer;
        }

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