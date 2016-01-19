namespace hiswill.faceapi
{
    export class FaceEvent
        implements Event
    {
        public static get REGISTER(): string { return "register"; }
        public static get UNREGISTER(): string { return "unregister"; }

        public static get DETECT(): string { return "detect"; }
        public static get TRAIN(): string { return "train"; }

        //protected event: Event;

        public constructor(type: string)
        {
            //this.event = new Event(type, { "bubbles": true, "cancelable": false });
        }

        public initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void { }
        public preventDefault(): void { }
        public stopImmediatePropagation(): void { }
        public stopPropagation(): void { }

        public AT_TARGET: number;
        public BUBBLING_PHASE: number;
        public CAPTURING_PHASE: number;

        //public get AT_TARGET(): number { return -1; }
        //public get BUBBLING_PHASE(): number { return -1; }
        //public get CAPTURING_PHASE(): number { return -1; }

        public get bubbles(): boolean { return false; }
        public get cancelBubble(): boolean { return false; }
        public get cancelable(): boolean { return false; }
        public get currentTarget(): EventTarget { return null; }
        public get defaultPrevented(): boolean { return false; }
        public get eventPhase(): number { return -1; }
        public get isTrusted(): boolean { return false; }
        public get returnValue(): boolean { return false; }
        public get srcElement(): Element { return null; }
        public get target(): EventTarget { return null; }
        public get timeStamp(): number { return -1; }
        public get type(): string { return ""; }

        //public set AT_TARGET(val: number) { }
        //public set BUBBLING_PHASE(val: number) { }
        //public set CAPTURING_PHASE(val: number) { }

        public set bubbles(val: boolean) { }
        public set cancelBubble(val: boolean) { }
        public set cancelable(val: boolean) { }
        public set currentTarget(val: EventTarget) { }
        public set defaultPrevented(val: boolean) { }
        public set eventPhase(val: number) { }
        public set isTrusted(val: boolean) { }
        public set returnValue(val: boolean) { }
        public set srcElement(val: Element) { }
        public set target(val: EventTarget) { }
        public set timeStamp(val: number) { }
        public set type(val: string) { }
    }

    export class IdentifyEvent
        extends FaceEvent
    {
        public static get IDENTIFY(): string { return "identify"; }

        protected personGroup_: PersonGroup;
        protected face_: Face;
        protected maxCandidates_: number;

        protected candidates_: CandidatePersonArray;

        public constructor(personGroup: PersonGroup, face: Face, maxCandidates:number, candidates: CandidatePersonArray)
        {
            super(IdentifyEvent.IDENTIFY);
            
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