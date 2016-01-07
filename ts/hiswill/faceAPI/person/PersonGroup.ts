/// <reference path="../FaceAPI.ts" />

/// <reference path="Person.ts" />
/// <reference path="../basic/IGroup.ts" />

/// <reference path="PersonGroupArray.ts" />

namespace hiswill.faceAPI.person 
{
    /**
     * <p> Person의 집합. </p>
     *
     * <p> Face가 누구(Person)의 얼굴인지 식별하고자 한다면 반드시 구성해야 할 집합이다. </p>
     *
     * <p> 참고자료
     * <ul>
     *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244 </li>
     *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395249 </li>
     * </ul>
     *
     * @author 남정호
     */
    export class PersonGroup
        extends EntityArray<Person>
        implements basic.IGroup<Person>
    {
        protected groupArray: PersonGroupArray;

        protected id: string;
        protected name: string;

        protected registered: boolean;
        protected trained: boolean;

        protected listeners: Map<string, Set<(ev: Event) => void>>;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public constructor(groupArray: PersonGroupArray, name: string = "")
        {
            super();

            this.groupArray = groupArray;
            this.id = "";
            this.name = name;

            this.trained = false;
            this.registered = false;
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
         * 학습을 수행함.
         *
         * <ul>
         *  <li> 참고 자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395249 </li>
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
                    this_.trained = true;
                }
            );

            // 수행 작업 현황을 확인한다.
            /*var prev: Date = new Date();

            while (true)
            {
                var now: Date = new Date();
                if (now.getTime() - prev.getTime() < 500)
                    continue;
                
                var completed = false;

                FaceAPI.query
                (
                    "https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id + "/training",
                    "GET",

                    null,
                    null,

                    function (data)
                    {
                        trace( "training process", data["status"], now.toString());

                        if (data["status"] == "succeded")
                            completed = true;
                    }
                );

                if (completed == true)
                    break;

                prev = now;
            }*/
        }

        protected checkTrainStatus(): void
        {

        }

        /**
         * 특정 얼굴의 주인이 누구일지 판별해 본다.
         *
         * <ul>
         *  <li> 참고 자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
         * </ul>
         *
         * @param face 대상 얼굴
         * @param maxCandidates 최대 후보 수
         *
         * @return 후보 사람들 및 각각의 일치도
         */
        public identify(face: face.Face, maxCandidates: number = 1): Array<Pair<Person, number>>
        {
            // 학습이 먼저 수행되어야 한다.
            if (this.isTrained() == false)
                this.train();

            var this_: PersonGroup = this;
            var personArray: Array<Pair<Person, number>> = new Array<Pair<Person, number>>();

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

                function (args) 
                {
                    trace("Succeded to identify");

                    var data: Object = args[0];
                    var faces: Array<Object> = data["candidates"];

                    for (var i: number = 0; i < faces.length; i++)
                    {
                        var personID: string = faces[i]["personId"];
                        var confidence: number = faces[i]["confidence"];

                        if (this_.has(personID) == false)
                            continue;

                        var pair: Pair<Person, number> = new Pair<Person, number>(this_.get(personID), confidence);
                        personArray.push(pair);
                    }
                }
            );
        
            return personArray;
        }

        /**
         * 현재의 PersonGroup 을 Face API 서버에 등록.
         *
         * <ul>
         *  <li> 참고 자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244 </li>
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
         * 현재의 PersonGroup 을 Face API 서버에서 제거.
         *
         * <ul>
         *  <li> 참고 자료: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395245 </li>
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

        public getGroupArray(): PersonGroupArray
        {
            return this.groupArray;
        }

        public getID(): string
        {
            return this.id;
        }
        public getName(): string
        {
            return this.name;
        }

        public isRegistered(): boolean
        {
            return this.registered;;
        }
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