/// <reference path="../FaceAPI.ts" />

/// <reference path="Person.ts" />
/// <reference path="../basic/IGroup.ts" />

/// <reference path="../result/CandidatePersonArray.ts" />

/// <reference path="PersonGroupArray.ts" />

namespace hiswill.faceapi.person 
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
        extends EntityArray<Person>
        implements basic.IGroup<Person>
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
        protected listeners: Map<string, Set<(ev: Event) => void>>;

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

            this.trained = false;
            this.registered = false;

            this.listeners = new Map<string, Set<(ev: Event) => void>>();
        }
    
        protected createChild(xml: XML): Person
        {
            return new Person(this, xml.getProperty("name"));
        }

        /* --------------------------------------------------------
            OPERATORS
        -------------------------------------------------------- */
        public push(...items: Person[]): number 
        {
            if (this.isRegistered() == false)
                this.insertToServer();

            for (var i: number = 0; i < items.length; i++)
                items[i].insertToServer();

            return super.push(...items);
        }

        public splice(start: number, deleteCount?: number, ...items: Person[]): Person[] 
        {
            var i: number;

            for (i = start; i < Math.min(start + deleteCount, this.length); i++)
                items[i].eraseFromServer();

            for (i = 0; i < items.length; i++)
                items[i].insertToServer();

            return super.splice(start, deleteCount, ...items);
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
                this.insertToServer();

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
                        this_.trained = true;
                        this_.dispatchEvent(new Event("complete"));
                    }
                    else if (status == "failed")
                    {
                        var errorEvent: ErrorEvent = new ErrorEvent();
                        errorEvent.message = data["message"];

                        this_.dispatchEvent(errorEvent);
                    }
                    else
                    {
                        // 50ms 후에 재 확인
                        setTimeout(PersonGroup.checkTrainStatus, 50, this_);
                    }
                },
                false // ASYNCHRONOUSLY
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
        public identify(face: face.Face, maxCandidates: number = 1): result.CandidatePersonArray
        {
            // Have to be trained.
            if (this.isTrained() == false)
                throw new Error("Not trained.");

            var this_: PersonGroup = this;
            var candidatePersonArray: result.CandidatePersonArray 
                = new result.CandidatePersonArray(this.groupArray.getAPI(), face, this);

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
                }
            );
            
            return candidatePersonArray;
        }

        /**
         * Insert the PersonGroup to Face-API server.
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244 </li>
         * </ul>
         */
        public insertToServer(): void
        {
            // 식별자 번호 발급
            if (this.id == "")
                this.id = FaceAPI.issueID("person_group");

            var this_: PersonGroup = this;

            trace("PersonGroup::insertToServer");

            // 서버에 등록
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id,
                "PUT",
            
                null,//{"personGroupId": this.id},
                {"name": this.name, "userData": ""},
            
                function (data)
                {
                    this_.registered = true;
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
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id,
                "DELETE",

                { "personGroupId": this.id },
                null,

                null
            );

            this.trained = false;
            this.registered = false;
        }

        /* --------------------------------------------------------
            EVENT LISTENERS
        -------------------------------------------------------- */
        public hasEventListener(type: string): boolean
        {
            return this.listeners.has(type);
        }
        
        public addEventListener(type: string, listener:(event:Event) => void): void
        {
            if (this.listeners.has(type) == false)
                this.listeners.set(type, new Set<(ev: Event) => void>());

            var listenerSet = this.listeners.get(type);
            listenerSet.insert(listener);
        }

        public removeEventListener(type: string, listener: (event: Event) => void): void
        {
            if (this.listeners.has(type) == false)
                return;

            var listenerSet = this.listeners.get(type);
            listenerSet.erase(listener);
        }

        public dispatchEvent(event: Event): void
        {
            if (this.listeners.has(event.type) == false)
                return;

            var listenerSet = this.listeners.get(event.type);
            for (var it = listenerSet.begin(); it.equals(listenerSet.end()) == false; it = it.next())
                it.value(event);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
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
         * Get ID.
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

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "personGroup";
        }
        public CHILD_TAG(): string
        {
            return "person";
        }
    }
}