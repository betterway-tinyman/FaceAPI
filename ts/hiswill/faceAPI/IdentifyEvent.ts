/// <reference path="FaceAPI.ts" />

/// <referecen path="FaceEvent.ts" />

namespace hiswill.faceapi
{
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
}