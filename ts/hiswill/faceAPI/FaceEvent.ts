namespace hiswill.faceapi
{
    export class FaceEvent
        extends samchon.library.BasicEvent
    {
        public static get REGISTER(): string { return "register"; }
        public static get UNREGISTER(): string { return "unregister"; }

        public static get DETECT(): string { return "detect"; }
        public static get TRAIN(): string { return "train"; }

        public constructor(type: string, currentTarget: EventTarget)
        {
            super(type, currentTarget);
        }
    }

    export class IdentifyEvent
        extends FaceEvent
    {
        public static get IDENTIFY(): string { return "identify"; }

        protected personGroup_: PersonGroup;
        protected face_: Face;
        protected maxCandidates_: number;

        protected candidates_: CandidatePersonArray;

        public constructor(currentTarget: EventTarget, personGroup: PersonGroup, face: Face, maxCandidates:number, candidates: CandidatePersonArray)
        {
            super(IdentifyEvent.IDENTIFY, currentTarget);
            
            this.face_ = face;
            this.personGroup_ = personGroup;
            this.maxCandidates_ = maxCandidates;

            this.candidates_ = candidates;
        }
        
        public get personGroup(): PersonGroup
        {
            return this.personGroup_;
        }
        public get face(): Face
        {
            return this.face_;
        }
        public get maxCandidates(): number
        {
            return this.maxCandidates_;
        }

        public get candidates(): CandidatePersonArray
        {
            return this.candidates_;
        }
    }

    export class FindSimilarEvent
        extends FaceEvent
    {
        public static get FIND(): string { return "find_similar"; }

        protected faceList_: FaceList;
        protected face_: Face;
        protected maxCandidates_: number;

        protected similars_: SimilarFaceArray;

        public constructor(currentTarget: EventTarget, faceList: FaceList, face: Face, maxCandidates: number, similars: SimilarFaceArray)
        {
            super(FindSimilarEvent.FIND, currentTarget);

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

    export class FindSimilarGroupEvent
        extends FaceEvent
    {
        public static get FIND(): string { return "find_similar_group"; }

        protected faceArray_: Array<Face>;
        protected similarGroups_: SimilarFaceGroupArray;

        public constructor(faceArray: Array<Face>, similarGroups: SimilarFaceGroupArray)
        {
            super(FindSimilarGroupEvent.FIND, null);

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