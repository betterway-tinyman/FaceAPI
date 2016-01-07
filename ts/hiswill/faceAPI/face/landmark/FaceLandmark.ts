/// <reference path="../../FaceAPI.ts" />

/// <reference path="../../basic/IJSonEntity.ts" />

/// <reference path="FaceLandmarks.ts" />

namespace hiswill.faceAPI.face.landmark 
{
    export class FaceLandmark
        extends Entity
        implements basic.IJSONEntity
    {
        protected landmarks: FaceLandmarks;

        public constructor(landmarks: FaceLandmarks)
        {
            super();
        }

        public constructByJSON(val: any): void
        {
            Global.fetch(this, val);
        }

        public getLandmarks(): FaceLandmarks
        {
            return this.landmarks;
        }
    }
}