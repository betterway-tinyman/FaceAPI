/// <reference path="../../FaceAPI.ts" />

/// <reference path='FaceAttribute.ts' />

namespace hiswill.faceapi.face.attribute
{
    export class HeadPose
        extends FaceAttribute
    {
        protected roll: number;
        protected yaw: number;
        protected pitch: number;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
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
        public getRoll(): number
        {
            return this.roll;
        }
        public getYaw(): number
        {
            return this.yaw;
        }
        public getPitch(): number
        {
            return this.pitch;
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