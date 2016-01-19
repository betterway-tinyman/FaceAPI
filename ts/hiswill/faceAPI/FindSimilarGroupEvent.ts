/// <reference path="FaceAPI.ts" />

/// <referecen path="FaceEvent.ts" />

namespace hiswill.faceapi
{
    export class FindSimilarGroupEvent
        extends FaceEvent
    {
        public static get FIND(): string { return "find_similar_group"; }

        protected faceArray_: Array<Face>;
        protected similarGroups_: SimilarFaceGroupArray;

        public constructor(faceArray: Array<Face>, similarGroups: SimilarFaceGroupArray)
        {
            super(FindSimilarGroupEvent.FIND);

            this.similarGroups_ = similarGroups;
        }

        public get faceArray(): Array<Face>
        {
            return this.faceArray_;
        }
        public get similarGroups(): SimilarFaceGroupArray
        {
            return this.similarGroups_;
        }
    }
}