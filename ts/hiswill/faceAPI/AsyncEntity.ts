/// <reference path="FaceAPI.ts" />

namespace hiswill.faceapi
{
    export class AsyncEntity
        extends samchon.protocol.Entity
        implements IAsyncEntity
    {
        /**
         * A chain instance of takeing responsibility of event dispatching.
         */
        protected eventDispatcher: samchon.library.EventDispatcher;

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
        public constructor()
        {
            super();

            this.eventDispatcher = new samchon.library.EventDispatcher(this);
            this.registered = false;
        }

        /**
         * @inheritdoc
         */
        public isRegistered(): boolean
        {
            return this.registered;
        }
        
        /**
         * @inheritdoc
         */
        public insertToServer(): void
        {
            throw new std.AbstractMethodError("AsynEntity::insertToServer() is not overriden.");
        }

        /**
         * @inheritdoc
         */
        public eraseFromServer(): void
        {
            throw new std.AbstractMethodError("AsyncEntity::EraseFromServer() is not overriden.");
        }

        /* --------------------------------------------------------
            SEQUENCE OF EVENTS
        -------------------------------------------------------- */
        protected dispatchRegisterEvent(): void
        {
            this.registered = true;
            
            this.dispatchEvent(new FaceEvent(FaceEvent.REGISTER));
        }

        protected dispatchUnregisterEvent(): void
        {
            this.registered = false;

            this.dispatchEvent(new FaceEvent(FaceEvent.UNREGISTER));
        }

        /* --------------------------------------------------------
            METHODS OF EVENT_DISPATCHER
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public hasEventListener(type: string): boolean
        {
            return this.eventDispatcher.hasEventListener(type);
        }

        /**
         * @inheritdoc
         */
        public dispatchEvent(event: Event): boolean
        {
            return this.eventDispatcher.dispatchEvent(event);
        }

        /**
         * @inheritdoc
         */
        public addEventListener(type: string, listener: EventListener, thisArg: Object = null): void
        {
            this.eventDispatcher.addEventListener(type, listener, thisArg);
        }

        /**
         * @inheritdoc
         */
        public removeEventListener(type: string, listener: EventListener, thisArg: Object = null): void
        {
            this.removeEventListener(type, listener, thisArg);
        }
    }
}