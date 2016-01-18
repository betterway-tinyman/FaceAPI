/// <reference path="IAsyncEntity.ts" />

namespace hiswill.faceapi
{
    export class AsyncEntityArray<T extends IAsyncEntity>
        extends samchon.protocol.EntityArray<T>
        implements IAsyncEntity
    {
        /**
         * A chain instance of takeing responsibility of event dispatching.
         */
        protected eventDispatcher: samchon.library.EventDispatcher;

        protected queueingList: std.List<T>;

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
            this.queueingList = new std.List<T>();
        }

        /* --------------------------------------------------------
            ELEMENTS I/O
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        protected inserted(it: std.Iterator<T>): void
        {
            var child: T = it.value;
            
            child.addEventListener(FaceEvent.REGISTER, this.handleRegisteredChild, this);

            if (this.registered == false || this.queueingList.empty() == false)
                this.queueingList.pushBack(child);
            else
                child.insertToServer();
        }

        /**
         * @inheritdoc
         */
        protected erased(it: std.Iterator<T>): void
        {
            var child: T = it.value;

            if (child.isRegistered() == false)
            {
                for (var q_it = this.queueingList.begin(); q_it.equals(this.queueingList.end()) == false; q_it = q_it.next())
                    if (q_it.value == child)
                    {
                        this.queueingList.erase(q_it);
                        break;
                    }
            }
            else
                it.value.eraseFromServer();
        }

        protected dispatchRegisterEvent(): void
        {
            if (this.queueingList.empty() == false)
                this.queueingList.front().insertToServer();

            this.dispatchEvent(new FaceEvent(FaceEvent.REGISTER));
        }
        protected dispathUnregisterEvent(): void
        {
            this.dispatchEvent(new FaceEvent(FaceEvent.UNREGISTER));
        }

        private handleRegisteredChild(event: Event): void
        {
            var child: T = <T>event.target;

            child.removeEventListener(FaceEvent.REGISTER, this.handleRegisteredChild, this);

            this.queueingList.popFront();

            if (this.queueingList.empty() == false)
                this.queueingList.front().insertToServer();
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE-API SERVER
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public isRegistered(): boolean
        {
            return this.registered && this.queueingList.empty() == true;
        }

        public insertToServer(): void
        {
            throw new std.AbstractMethodError("insertToServer is not overriden.");
        }

        public eraseFromServer(): void
        {
            throw new std.AbstractMethodError("insertToServer is not overriden.");
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