/// <reference path="FaceAPI.ts" />

/// <reference path="Point.ts" />

/// <reference path="Eye.ts" />

namespace hiswill.faceapi
{
    /**
     * An entity representing a pupil in an Eye.
     *
     * @author Jeongho Nam
     */
    export class Pupil
        extends Point
    {
        /**
         * An Eye the Pupil is belonged to.
         */
        protected eye: Eye;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from an Eye. 
         *
         * @param eye An eye the Pupil is belonged to.
         */
        public constructor(eye: Eye)
        {
            super("pupil");

            this.eye = eye;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get eye.
         */
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