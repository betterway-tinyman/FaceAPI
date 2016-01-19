/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/library/BasicEvent.ts" />

namespace hiswill.faceapi
{
    export class FaceEvent
        extends samchon.library.BasicEvent
    {
        public static get REGISTER(): string { return "register"; }
        public static get UNREGISTER(): string { return "unregister"; }

        public static get DETECT(): string { return "detect"; }
        public static get TRAIN(): string { return "train"; }

        public constructor(type: string)
        {
            super(type);
        }
    }
}