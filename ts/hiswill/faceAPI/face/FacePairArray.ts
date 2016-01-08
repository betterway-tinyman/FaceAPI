/// <reference path="../FaceAPI.ts" />

/// <reference path="FaceRectangle.ts" />
///     <reference path="FacePair.ts" />
/// <reference path="../basic/IGroup.ts" />

namespace hiswill.faceapi.face
{
    /**
     * An abstract class containing FacePair objects as an array and parent of them.
     *
     * @author Jeongho Nam
     */
    export class FacePairArray
        extends EntityArray<FaceRectangle>
        implements basic.IGroup<FaceRectangle>
    {
        /**
         * An identifier issued by FaceAPI Server.
         */
        protected id: string;

        /**
         * A name representing the instance.
         */
        protected name: string;

        /**
         * Whether the instance is registered on the Face-API server.
         */
        protected registered: boolean;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from name. 
         *
         * @param name Name representing the FacePairArray.
         */
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
            // Remove the elements from Face-API server.
            for (var i: number = start;  i < Math.min(start + end, this.length); i++)
                (<FacePair>this[i]).eraseFromServer();

            // To return
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

        /**
         * Notify the name is changed to Face-API server.
         *
         * @param name New name of the FacePairArray.
         */
        protected notifySetName(name: string): void 
        {
            // SOMETHING TO BE OVERRIDEN
        }

        /**
         * An abstract method inserting the child FacePair instance to the Face-API server. 
         *
         * @param face A newly inserted FacePair object.
         */
        public insertFaceToServer(face: FacePair): void
        {
            // TO BE OVERRIDEN
        }

        /**
         * An abstract method removing the child FacePair instance from the Face-API server. 
         *
         * @param face A just removed FacePair object.
         */
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
        
        /**
         * An abstract method getting FaceAPI instance.
         */
        public getFaceAPI(): FaceAPI
        {
            // TO BE OVERRIDEN
            return null;
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

        public isRegistered(): boolean
        {
            return this.registered;
        }

        /**
         * Set name 
         *
         * @param name New name.
         */
        public setName(name: string): void
        {
            this.notifySetName(name);

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