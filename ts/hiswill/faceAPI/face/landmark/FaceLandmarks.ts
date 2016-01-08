/// <reference path="../../FaceAPI.ts" />

/// <reference path='../../basic/IJSonEntity.ts' />

/// <referench path='FaceLandmark.ts' />
/// <referench path='Eyebrows.ts' />
/// <referench path='Nose.ts' />
/// <referench path='Mouth.ts' />

/// <referench path='Face.ts' />

namespace hiswill.faceapi.face.landmark 
{
    /**
     * A group and parent of FaceLandmark entities.
     *
     * @author Jeongho Nam
     */
    export class FaceLandmarks 
        extends Entity
        implements basic.IJSONEntity
    {
        /**
         * A Face that the FaceLandmarks is belonged to.
         */
        protected face: Face;

        /**
         * A FaceLandmark representing eyebrows.
         */
        protected eyeBrows: Eyebrows;

        /**
         * A FaceLandmark representing eyes.
         */
        protected eyes: Eyes;

        /**
         * A FaceLandmark representing a nose.
         */
        protected nose: Nose;

        /**
         * A FaceLandmark representing a mouth.
         */
        protected mouth: Mouth;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a Face. 
         *
         * @param face A Face that the FaceLandmarks is belonged to.
         */
        public constructor(face: Face)
        {
            super();
            this.face = face;

            this.eyeBrows = new Eyebrows(this);
            this.eyes = new Eyes(this);
            this.nose = new Nose(this);
            this.mouth = new Mouth(this);
        }

        public constructByJSON(obj: any): void
        {
            this.eyeBrows.constructByJSON(obj);
            this.eyes.constructByJSON(obj);
            this.nose.constructByJSON(obj);
            this.mouth.constructByJSON(obj);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get face.
         */
        public getFace(): Face
        {
            return this.face;
        }
    
        /**
         * Get eyeBrowss.
         */
        public getEyeBrows(): Eyebrows
        {
            return this.eyeBrows;
        }

        /**
         * Get eyes.
         */
        public getEyes(): Eyes
        {
            return this.eyes;
        }

        /**
         * Get nose.
         */
        public getNose(): Nose
        {
            return this.nose;
        }

        /**
         * Get mouth.
         */
        public getMouth(): Mouth
        {
            return this.mouth;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "landmarks";
        }

        public toXML(): XML
        {
            var xml: XML = super.toXML();
            xml.push
            (
                this.eyeBrows.toXML(),
                this.eyes.toXML(),
                this.nose.toXML(),
                this.mouth.toXML()
            );

            return xml;
        }
    }
}