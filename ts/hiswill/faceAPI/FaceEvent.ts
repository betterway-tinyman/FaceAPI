namespace hiswill.faceapi
{
    export class FaceEvent
        extends Event
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

    export class IdentifyEvent
        extends FaceEvent
    {
        public static get IDENTIFY(): string { return "identify"; }

        protected personGroup_: PersonGroup;
        protected face_: Face;

        protected candidates_: CandidatePersonArray;

        public constructor(personGroup: PersonGroup, face: Face, candidates: CandidatePersonArray)
        {
            super(IdentifyEvent.IDENTIFY);
            
            this.face_ = face;
            this.personGroup_ = personGroup;
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

        public get candidates(): CandidatePersonArray
        {
            return this.candidates_;
        }
    }
}