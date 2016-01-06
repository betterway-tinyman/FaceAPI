/// <reference path="../../FaceAPI.ts" />

/// <reference path="../../Point.ts" />

/// <reference path="Eye.ts" />

namespace hiswill.faceAPI.face.landmark 
{
    /**
     * 눈동자.
     *
     * @author 남정호
     */
    export class Pupil
        extends Point
    {
        protected eye: Eye;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public constructor(eye: Eye)
        {
            super("pupil");

            this.eye = eye;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getEye(): Eye
        {
            return this.eye;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return super.TAG();
        }
    }
}