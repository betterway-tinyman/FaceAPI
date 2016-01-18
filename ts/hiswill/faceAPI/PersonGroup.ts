/// <reference path="FaceAPI.ts" />

/// <reference path="AsyncEntityArray.ts" />
///     <reference path="Person.ts" />

/// <reference path="CandidatePersonArray.ts" />

/// <reference path="PersonGroupArray.ts" />

namespace hiswill.faceapi 
{
    /**
     * <p> A group of Person instances. </p>
     *
     * <p> The PersonGroup class is required when you try to identify a Face is from whom (Person). </p>
     *
     * <p> Reference </p>
     * <ul>
     *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244 </li>
     *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395249 </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    export class PersonGroup
        extends AsyncEntityArray<Person>
    {
        /**
         * An array and parent of the PersonGroup.
         */
        protected groupArray: PersonGroupArray;

        /**
         * An identifier issued by the Face-API server.
         */
        protected id: string;

        /**
         * A name representing the PersonGroup.
         */
        protected name: string;

        /**
         * Whether the instance is registered on the Face-API server.
         */
        protected registered: boolean;
        
        /**
         * Whether the PersonGroup has trained.
         */
        protected trained: boolean;

        /**
         * A group of pointers of event listener method.
         */
        protected eventDispatcher: samchon.library.EventDispatcher;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a PersonGroupArray and name.
         *
         * @param groupArray An array and parent of the PersonGroup.
         * @param name Allocated (or to be allocated) name of the PersonGroup.
         */
        public constructor(groupArray: PersonGroupArray, name: string = "")
        {
            super();

            this.groupArray = groupArray;
            this.id = "";
            this.name = name;
            
            this.registered = false;
            this.trained = false;

            this.eventDispatcher = new samchon.library.EventDispatcher(this);
        }
    
        /**
         * @inheritdoc
         */
        protected createChild(xml: samchon.library.XML): Person
        {
            return new Person(this, xml.getProperty("name"));
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE API
        -------------------------------------------------------- */
        /**
         * <p> Start training; studying.  The method train() a pre-process essentially required 
         * for identify(). </p>
         * 
         * <p> The training is processed in server side asynchronously. When you call the method train(),
         * it dispatches an Event "activate". When the training is completed in server side, PersonGroup
         * will dispatch the "complete" Event. </p>
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395249 </li>
         * </ul>
         */
        public train(): void
        {
            // 등록을 먼저 수행
            if (this.isRegistered() == false)
                throw new std.LogicError("Must be registered on server.");

            // 학습 수행
            var this_: PersonGroup = this;

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id + "/train",
                "POST",

                null, //{"personGroupId": this.id},
                null,

                function (data)
                {
                    setTimeout(PersonGroup.checkTrainStatus, 50, this_);
                }
            );
        }

        /**
         * Query about training status to Face-API server.
         *
         * @param this_ A PersonGroup object who executed the train() method.
         */
        private static checkTrainStatus(this_: PersonGroup): void
        {
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this_.id + "/training",
                "GET",

                null,
                null,

                function (data)
                {
                    var status: string = data["status"];

                    trace("on progress", status);

                    if (status == "succeeded")
                    {
                        // SUCCESS
                        this_.trained = true;
                        this_.dispatchEvent(new FaceEvent(FaceEvent.TRAIN));
                    }
                    else if (status == "failed")
                    {
                        // FAILED
                        var errorEvent: ErrorEvent = new ErrorEvent();
                        errorEvent.message = data["message"];

                        this_.dispatchEvent(errorEvent);
                    }
                    else
                    {
                        // 50ms 후에 재 확인
                        setTimeout(PersonGroup.checkTrainStatus, 50, this_);
                    }
                }
            );
        }

        /**
         * <p> Ideitify who is owner of the Face. </p>
         *
         * <p> You've to execute train() method, asynchronous method dispatching "complete" Event 
         * when the training was completed, before running the identify() method. </p>
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
         * </ul>
         *
         * @param face Target face to identify
         * @param maxCandidates Permitted number of candidates to return.
         *
         * @return Candidates of the owner with conformaility degrees.
         */
        public identify(face: Face, maxCandidates: number = 1): void
        {
            // Have to be trained.
            if (this.isTrained() == false)
                throw new std.LogicError("Must be trained as a pre-process.");

            var this_: PersonGroup = this;
            var candidatePersonArray: CandidatePersonArray = new CandidatePersonArray(face, this);

            trace("PersonGroup::identify", this.id, face.getID(), maxCandidates);

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/identify",
                "POST",

                null,
                {
                    "personGroupId": this.id, 
                    "faceIds": [face.getID()],
                    "maxNumOfCandidatesReturned": maxCandidates
                },

                function (data) 
                {
                    candidatePersonArray.constructByJSON(data);

                    this_.dispatchEvent(new IdentifyEvent(this_, face, maxCandidates, candidatePersonArray));
                }
            );
        }

        /**
         * Insert the PersonGroup to the Face-API server.
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244 </li>
         * </ul>
         */
        public insertToServer(): void
        {
            // Issue an unique identifier.
            if (this.id == "")
                this.id = FaceAPI.issueID("person_group");

            var this_: PersonGroup = this;

            trace("PersonGroup::insertToServer");

            // Register to server.
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id,
                "PUT",
            
                null,//{"personGroupId": this.id},
                {"name": this.name, "userData": ""},
            
                function (data)
                {
                    this_.registered = true;

                    this_.dispatchRegisterEvent();
                }
            );
        }

        /**
         * Remove the PersonGroup from the Face-API server.
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395245 </li>
         * </ul>
         */
        public eraseFromServer(): void
        {
            var this_ = this;

            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id,
                "DELETE",

                { "personGroupId": this.id },
                null,

                function (data)
                {
                    this_.trained = false;
                    this_.registered = false;

                    this_.dispatchUnregisterEvent();
                }
            );
        }

        /* --------------------------------------------------------
            GETTERS & SETTERS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public key(): any
        {
            return this.id;
        }

        /**
         * Get groupArray.
         */
        public getGroupArray(): PersonGroupArray
        {
            return this.groupArray;
        }

        /**
         * Get id.
         */
        public getID(): string
        {
            return this.id;
        }

        /**
         * Get name.
         */
        public getName(): string
        {
            return this.name;
        }
        
        /**
         * @inheritdoc
         */
        public isRegistered(): boolean
        {
            return this.registered;;
        }

        /**
         * Test whether the PersonGroup has trained.
         */
        public isTrained(): boolean
        {
            return this.trained;
        }

        /**
         * Set name not only in PersonGroup but also in the Face-API server.
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524a </li>
         * </ul>
         *
         * @param name New name
         */
        public setName(name: string): void
        {
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id,
                "PATCH",

                null,
                {"name": name, "userData": ""},

                null
            );

            this.name = name;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public TAG(): string
        {
            return "personGroup";
        }

        /**
         * @inheritdoc
         */
        public CHILD_TAG(): string
        {
            return "person";
        }
    }
}