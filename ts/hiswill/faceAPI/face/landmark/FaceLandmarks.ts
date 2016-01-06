/// <reference path="../../FaceAPI.ts" />

/// <reference path='../../IJSonEntity.ts' />

/// <referench path='FaceLandmark.ts' />
/// <referench path='Eyebrows.ts' />
/// <referench path='Nose.ts' />
/// <referench path='Mouth.ts' />

/// <referench path='Face.ts' />

namespace hiswill.faceAPI.face.landmark 
{
    /**
     * 얼굴의 주요 요소 엔티티.
     *
     * @author 남정호
     */
    export class FaceLandmarks 
        extends Entity
        implements IJSONEntity
    {
        protected face: Face;

        protected eyeBrows: Eyebrows;
        protected eyes: Eyes;
        protected nose: Nose;
        protected mouth: Mouth;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
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
        public getFace(): Face
        {
            return this.face;
        }
    
        public getEyeBrows(): Eyebrows
        {
            return this.eyeBrows;
        }
        public getEyes(): Eyes
        {
            return this.eyes;
        }
        public getNose(): Nose
        {
            return this.nose;
        }
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