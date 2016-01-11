/// <reference path="FaceAPI.ts" />

/// <reference path="IJSONEntity.ts" />

/// <reference path="Person.ts" />

/// <reference path="CandidatePersonArray.ts" />

namespace hiswill.faceapi
{
    /**
     * <p> A candidate person derived from Identify. </p>
     *
     * <ul>
     *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    export class CandidatePerson
        extends Entity
        implements IJSONEntity
    {
        /**
         * An array and parent of CandidatePerson.
         */
        protected personArray: CandidatePersonArray;

        /**
         * A candidate person.
         */
        protected person: Person;
        
        /**
         * Degree of conformality, 0 ~ 1.
         */
        protected confidence: number;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a CandidatePersonArray 
         *
         * @param personArray An array and parent of CandidatePerson.
         */
        public constructor(personArray: CandidatePersonArray)
        {
            super();

            this.personArray = personArray;
        }

        public construct(xml: XML): void
        {
            super.construct(xml);
            this.person = null;
            
            if (xml.hasProperty("personID") == false)
                return;

            var personID: string = xml.getProperty("personID");

            var personGroup: PersonGroup = this.personArray.getPersonGroup();
            if (personGroup != null && personGroup.has(personID) == true)
                this.person = personGroup.get(personID);
        }

        public constructByJSON(obj: any): void
        {
            Global.fetch(this, obj); // confidence

            // SET PERSON
            var personGroup: PersonGroup = this.personArray.getPersonGroup();
            var personID: string = obj["personId"];
            
            if (personGroup != null && personGroup.has(personID) == true)
                this.person = personGroup.get(personID);
            else
                this.person = null;
        }

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Get personArray.
         */
        public getPersonArray(): CandidatePersonArray
        {
            return this.personArray;
        }

        /**
         * Get person.
         */
        public getPerson(): Person
        {
            return this.person;
        }

        /**
         * Get confidence.
         */
        public getConfidence(): number
        {
            return this.confidence;
        }

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "candidatePerson";
        }

        public toXML(): XML
        {
            var xml: XML = super.toXML();

            if (this.person != null)
                xml.setProperty("personID", this.person.getID());

            return xml;
        }
    }
}