/// <reference path="../../FaceAPI.ts" />

/// <reference path='FaceAttribute.ts' />

namespace hiswill.faceapi.face.attribute
{
    export class HeadPose
        extends FaceAttribute
    {
        /**
         * Rotation of X axis; 0 ~ 1.
         */
        protected roll: number;

        /**
         * Rotation of Y-axis; 0 ~ 1.
         */
        protected pitch: number;

        /**
         * Rotation of Z-axis; 0 ~ 1.
         */
        protected yaw: number;

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

            this.roll = 0;
            this.yaw = 0;
            this.pitch = 0;
        }
    
        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get roll.
         */
        public getRoll(): number
        {
            return this.roll;
        }

        /**
         * Get pitch.
         */
        public getPitch(): number
        {
            return this.pitch;
        }

        /**
         * Get yaw.
         */
        public getYaw(): number
        {
            return this.yaw;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "headPose";
        }
    }
}