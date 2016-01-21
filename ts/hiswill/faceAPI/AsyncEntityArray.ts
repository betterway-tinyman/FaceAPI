/// <reference path="AsyncEntityParent.ts" />
/// <reference path="IAsyncEntity.ts" />

namespace hiswill.faceapi
{
    /**
     * @author Jeongho Nam
     */
    export class AsyncEntityArray<T extends IAsyncEntity>
        extends AsyncEntityParent<T>
        implements IAsyncEntity
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
         * Whether the instance is registered on Face-API server or not.
         */
        protected registered: boolean;
        
        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * Default Constructor.
         */
        public constructor(name: string = "")
        {
            super();
			
            this.id = "";
            this.name = name;

            this.registered = false;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public key(): any
        {
            return this.id;
        }
        
        /**
         * Whether this instance is belonged to another type of AsyncEntityArray.
         */
        public hasAsyncParent(): boolean
        {
            return false;
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
         * Set name and notify it to the Face-API server.
         *
         * @param name New name.
         */
        public setName(name: string): void
        {
            this.name = name;
        }
		
        /* --------------------------------------------------------
            INSERTION & DELETION HANDLERS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        protected inserted(item: T): void
        {
            item.addEventListener(FaceEvent.REGISTER, this.handleRegisterChild, this);
            item.addEventListener(FaceEvent.UNREGISTER, this.handleUnregisterChild, this);

            this.queueingList.pushBack(item);

            if (this.registered == false || this.queueingList.size() != 1)
            {
                if (this.registered == false && this.hasAsyncParent() == false)
                    this.register();
            }
            else
                item.register();
        }
		
        protected handleRegister(data: any): void
        {
            this.registered = true;

            if (this.queueingList.empty() == false)
                this.queueingList.front().register();
            else
                this.dispatchEvent(new FaceEvent(FaceEvent.REGISTER));
        }

        protected handleUnregister(): void
        {
            this.registered = false;

            this.dispatchEvent(new FaceEvent(FaceEvent.UNREGISTER));
        }

        /**
         * @inheritdoc
         */
        protected handleRegisterChild(event: Event): void
        {
            super.handleRegisterChild(event);

            if (this.queueingList.empty() == true)
                this.handleRegister(null);
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE-API SERVER
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public isRegistered(): boolean
        {
            if (this.registered  == false || this.queueingList.empty() == false)
                return false;

            for (var i: number = 0; i < this.size(); i++)
                if (this.at(i).isRegistered() == false)
                    return false;

            return true;
        }
        
        /**
         * @inheritdoc
         */
        public register(): void
        {
            throw new std.AbstractMethodError("insertToServer is not overriden.");
        }

        /**
         * @inheritdoc
         */
        public unregister(): void
        {
            throw new std.AbstractMethodError("insertToServer is not overriden.");
        }
    }
}