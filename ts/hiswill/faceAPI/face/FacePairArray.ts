/// <reference path="../FaceAPI.ts" />

/// <reference path="FaceRectangle.ts" />
///     <reference path="FacePair.ts" />
/// <reference path="../basic/IGroup.ts" />

namespace hiswill.faceAPI.face
{
    export class FacePairArray
        extends EntityArray<FaceRectangle>
        implements basic.IGroup<FaceRectangle>
    {
        protected id: string;

        protected name: string;

        protected registered: boolean;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public constructor(name: string = "")
        {
            super();

            this.id = "";
            this.name = name;
            this.registered = false;
        }
    
        protected createChild(xml: XML): FaceRectangle
        {
            return new FacePair(this);
        }

        /* --------------------------------------------------------
            OPERATORS
        -------------------------------------------------------- */
        public push(...items: FaceRectangle[]): number
        {
            if (this.isRegistered() == false)
                this.insertToServer();

            for (var i: number = 0; i < items.length; i++)
            {
                if (items[i] instanceof FacePair == false)
                {
                    var pair: FacePair = new FacePair(this);

                    if (items[i] instanceof Face)
                        pair.setFile(<Face>items[i]);
                    else
                        pair.setRectangle(items[i]);

                    // 서버에 등록
                    pair.insertToServer();
                    
                    // 대치
                    items[i] = pair;
                }
            }

            return super.push(...items);
        }

        public splice(start: number, end?: number, ... items: FaceRectangle[]): FaceRectangle[]
        {
            // 각 원소들을 서버에서도 제거
            for (var i: number = start;  i < Math.min(start + end, this.length); i++)
                (<FacePair>this[i]).eraseFromServer();

            // 리턴
            var output = super.splice(start, end);

            this.push(...items);
            return output;
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE API SERVER
        -------------------------------------------------------- */
        public insertToServer(): void
        {
            // TO BE OVERRIDEN
        }

        public eraseFromServer(): void
        {
            // TO BE OVERRIDEN
            // ...

            this.registered = false;
        }

        protected setNameInServer(name: string): void 
        {
            // SOMETHING TO BE OVERRIDEN
        }

        public insertFaceToServer(face: FacePair): void
        {
            // TO BE OVERRIDEN
        }
        public eraseFaceFromServer(face: FacePair): void
        {
            // TO BE OVERRIDEN
            // ...

            face.setID("");
        }

        /* --------------------------------------------------------
            GETTERS & SETTERS
        -------------------------------------------------------- */
        public key(): any
        {
            return this.id;
        }
        
        public getFaceAPI(): FaceAPI
        {
            // TO BE OVERRIDEN
            return null;
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
            return this.registered;
        }

        public setName(name: string): void
        {
            this.setNameInServer(name);

            this.name = name;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public CHILD_TAG(): string
        {
            return "facePair";
        }
    }
}