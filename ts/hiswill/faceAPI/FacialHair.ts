/// <reference path="FaceAPI.ts" />

/// <reference path='FaceAttribute.ts' />

namespace hiswill.faceapi 
{
    export class FacialHair
        extends FaceAttribute
    {
        /**
         * Density of mustache; 0 ~ 1.
         */
        protected mustache: number;

        /**
         * Density of beard; 0 ~ 1
         */
        protected beard: number;
        
        /**
         * Density of sideburns; 0 ~ 1
         */
        protected sideburns: number;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * Contruct from a FaceAttributes 
         *
         * @param attributes A group and parent of the FaceAttribute.
         */
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
        /**
         * Get mustache.
         */
        public getMustache(): number
        {
            return this.mustache;
        }

        /**
         * Get beard.
         */
        public getBeard(): number
        {
            return this.beard;
        }

        /**
         * Get sideburns.
         */
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