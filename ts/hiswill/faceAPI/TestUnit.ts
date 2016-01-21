/// <reference path="FaceAPI.ts" />

namespace hiswill.faceapi
{
    export class TestUnit
    {
        protected api: FaceAPI;

        public constructor()
        {
            this.api = new FaceAPI();
            
            this.constructPersonGroups(null);
        }

        /* --------------------------------------------------------
            COMMANDERS
        -------------------------------------------------------- */
        protected detect(): void
        {
            var picture: Picture = this.api.createPicture("http://samchon.org/download/group_others2.jpg");

            picture.addEventListener(FaceEvent.DETECT, this.handleDetect, this);
            picture.detect();
        }

        protected constructPersonGroups(picture: Picture): void
        {
            var personGroupArray: PersonGroupArray = this.api.getPersonGroupArray();
            
            var personGroup: PersonGroup = this.api.createPersonGroup("other_group");
            samchon.trace("person_group is registered: " + personGroup.isRegistered());

            //this.api.getPersonGroupArray().popBack();

            /*for (var i: number = 0; i < 3; i++)
            {
                var person: Person = new Person(personGroup, (i+1) + " th person");
                var face: Face = picture.at(i);

                person.addEventListener(ContainerEvent.ADD, this.handleInsertion, this);

                personGroup.push(person);
                person.push(face);
            }*/
        }

        protected train(personGroup: PersonGroup): void
        {
            personGroup.addEventListener(FaceEvent.DETECT, this.handleDetect, this);

            personGroup.train();
        }

        protected identify(face: Face, personGroup: PersonGroup): void
        {
            face.addEventListener(IdentifyEvent.IDENTIFY, this.handleIdentify);
            
            face.identify(personGroup, 1);
        }

        /* --------------------------------------------------------
            EVENT HANDLERS
        -------------------------------------------------------- */
        protected handleDetect(event: FaceEvent): void
        {
            var picture: Picture = <Picture>event.target;

            samchon.trace("A picture and faces are detected: #" + picture.size());

            // TO THE NEXT STEP
            this.constructPersonGroups(picture);
        }

        protected handleInsertion(event: ContainerEvent): void
        {
            var person: Person = <Person>event.target;
            var personGroup: PersonGroup = person.getGroup();

            trace("A person is constructed clearly: " + person.getName());

            if (personGroup.isRegistered() == false)
                return;

            this.train(personGroup);
        }

        protected handleTrain(event: FaceEvent): void
        {
            trace("A person group is trained.");

            var personGroup: PersonGroup = <PersonGroup>event.target;
            var face: Face = personGroup.at(1 - 1).at(0).getFace();

            this.identify(face, personGroup);
        }

        protected handleIdentify(event: IdentifyEvent): void
        {
            var candidatePersonArray: CandidatePersonArray = event.candidates;

            trace("Some faces are identified as candidates: \n" + candidatePersonArray.toXML().toString());

            // THIS IS THE LAST STEP.
        }
    }
}