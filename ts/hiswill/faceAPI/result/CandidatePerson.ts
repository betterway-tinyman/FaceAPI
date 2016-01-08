/// <reference path="../FaceAPI.ts" />

/// <reference path="../basic/IJSONEntity.ts" />

/// <reference path="../person/Person.ts" />

/// <reference path="CandidatePersonArray.ts" />

namespace hiswill.faceapi.result
{
    export class CandidatePerson
        extends Entity
        implements basic.IJSONEntity
    {
        /**
         * An array and parent of CandidatePerson.
         */
        protected personArray: CandidatePersonArray;

        /**
         * A candidate person.
         */
        protected person: person.Person;
        
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

            var personGroup: person.PersonGroup = this.personArray.getPersonGroup();
            if (personGroup != null && personGroup.has(personID) == true)
                this.person = personGroup.get(personID);
        }

        public constructByJSON(obj: any): void
        {
            Global.fetch(this, obj); // confidence

            // SET PERSON
            var personGroup: person.PersonGroup = this.personArray.getPersonGroup();
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
        public getPerson(): person.Person
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