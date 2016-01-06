/// <reference path="../FaceAPI.ts" />

/// <reference path="FaceRectangle.ts" />
///     <reference path="FacePair.ts" />
/// <reference path="../IGroup.ts" />

namespace hiswill.faceAPI.face
{
    export class FacePairArray
        extends EntityArray<FaceRectangle>
        implements IGroup<FaceRectangle>
    {
        protected registered: boolean;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public constructor()
        {
            super();

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

                    // 대치
                    items[i] = pair;
                }
            
                // 서버에 등록
                (<FacePair>items[i]).insertToServer();
            }

            return this.length;
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
        }

        public insertFaceToServer(facePair: FacePair): void
        {
            // TO BE OVERRIDEN
        }
        public eraseFaceFromServer(facePair: FacePair): void
        {
            // TO BE OVERRIDEN
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getFaceAPI(): FaceAPI
        {
            // TO BE OVERRIDEN
            return null;
        }

        public isRegistered(): boolean
        {
            return this.registered;
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