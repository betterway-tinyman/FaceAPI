/// <reference path="FaceAPI.ts" />

/// <referecen path="FaceEvent.ts" />

namespace hiswill.faceapi
{
    export class FindSimilarEvent
        extends FaceEvent
    {
        public static get FIND(): string { return "find_similar"; }

        protected faceList_: FaceList;
        protected face_: Face;
        protected maxCandidates_: number;

        protected similars_: SimilarFaceArray;

        public constructor(faceList: FaceList, face: Face, maxCandidates: number, similars: SimilarFaceArray)
        {
            super(FindSimilarEvent.FIND);

            this.faceList_ = faceList;
            this.face_ = face;
            this.maxCandidates_ = maxCandidates;

            this.similars_ = similars;
        }

        public get faceList(): FaceList
        {
            return this.faceList_;
        }
        public get face(): Face
        {
            return this.face_;
        }
        public get maxCandidates(): number
        {
            return this.maxCandidates_;
        }

        public get similars(): SimilarFaceArray
        {
            return this.similars_;
        }
    }
}