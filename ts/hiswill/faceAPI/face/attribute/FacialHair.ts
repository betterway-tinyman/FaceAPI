/// <reference path="../../FaceAPI.ts" />

/// <reference path='FaceAttribute.ts' />

namespace hiswill.faceapi.face.attribute 
{
    export class FacialHair
        extends FaceAttribute
    {
        protected mustache: number;
        protected beard: number;
        protected sideburns: number;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        public constructor(attributes: FaceAttributes) 
        {
            super(attributes);

            this.mustache = 0;
            this.beard = 0;
            this.sideburns = 0;
        }
    
        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getMustache(): number
        {
            return this.mustache;
        }
        public getBeard(): number
        {
            return this.beard;
        }
        public getSideburns(): number
        {
            return this.sideburns;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string 
        {
            return "facialHair";
        }
    }
}