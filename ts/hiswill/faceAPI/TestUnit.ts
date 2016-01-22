/// <reference path="FaceAPI.ts" />

namespace hiswill.faceapi
{
    export class TestUnit
    {
        /**
         * A facade controller and factory class for Face-API.
         */
        protected api: FaceAPI;

        /**
         * Default Constructor.
         */
        public constructor()
        {
            this.api = new FaceAPI();
            
            // First, detect faces from a picture.
            this.detect();
        }

        /* --------------------------------------------------------
            COMMANDERS
        -------------------------------------------------------- */
        /**
         * Detect faces from a picture.
         */
        protected detect(): void
        {
            var picture: Picture = this.api.createPicture("http://samchon.org/download/group_others2.jpg");

            picture.addEventListener(FaceEvent.DETECT, this.handleDetect, this);
            picture.detect();
        }

        /**
         * Find similar groups
         */
        protected findSimilarGroups(picture: Picture): void
        {
            var face: Face = picture.at(0);
            face.addEventListener(FindSimilarGroupEvent.FIND, this.handleSimilarGroups);

            face.findSimilarGroups(<Array<Face>>picture);
        }

        protected constructPersonGroups(picture: Picture): void
        {
            var personGroupArray: PersonGroupArray = this.api.getPersonGroupArray();
            personGroupArray.addEventListener
            (
                ContainerEvent.ADD, 
                function(event: ContainerEvent): void
                {
                    samchon.trace("A personGroup is registered.");
                }
            );

            var personGroup: PersonGroup = this.api.createPersonGroup("other_group");

            for (var i: number = 0; i < picture.size(); i++)
            {
                var person: Person = new Person(personGroup, (i+1) + " th person");
                var face: Face = picture.at(i);

                person.addEventListener(ContainerEvent.ADD, this.handleInsertion, this);

                personGroup.push(person);
                person.push(face);
            }
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
            
            // PRINT PICTURE AND FACE RECTANGLES ON SCREEN
            picture.draw();
            samchon.trace(picture.toSVG().toString());

            // TO THE NEXT STEP
            //this.findSimilarGroups(picture);
            //this.constructPersonGroups(picture);
        }

        protected handleSimilarGroups(event: FindSimilarGroupEvent): void
        {
            var similarGroups = event.similarGroups;

            samchon.trace(similarGroups.toXML().toString());
        }

        protected handleInsertion(event: ContainerEvent): void
        {
            var person: Person = <Person>event.target;
            var personGroup: PersonGroup = person.getGroup();

            samchon.trace("A person is constructed clearly: " + person.getName());

            if (personGroup.isRegistered() == false)
                return;

            this.train(personGroup);
        }

        protected handleTrain(event: FaceEvent): void
        {
            samchon.trace("A person group is trained.");

            var personGroup: PersonGroup = <PersonGroup>event.target;
            var face: Face = personGroup.at(2 - 1).at(0).getFace();

            this.identify(face, personGroup);
        }

        protected handleIdentify(event: IdentifyEvent): void
        {
            var candidatePersonArray: CandidatePersonArray = event.candidates;

            samchon.trace("Some faces are identified as candidates: \n" + candidatePersonArray.toXML().toString());

            // THIS IS THE LAST STEP.
        }
    }
}