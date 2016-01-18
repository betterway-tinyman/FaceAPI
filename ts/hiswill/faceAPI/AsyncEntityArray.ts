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
            this.registered = false;
        }

        /* ========================================================
            ELEMENTS I/O
                - OVERRIDINGS
                - INSERTION / DELETION HANDLERS
                - SEQUENCE OF EVENTS
        ===========================================================
            OVERRIDINGS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public insert(position: std.Iterator<T>, val: T): std.Iterator<T>;
        
        /**
         * @inheritdoc
         */
        public insert(position: std.Iterator<T>, size: number, val: T): std.Iterator<T>;
        
        /**
         * @inheritdoc
         */
        public insert<U extends T>
            (
                position: std.Iterator<T>, 
                begin: std.Iterator<U>, end: std.Iterator<U>
            ): std.Iterator<T>;

        public insert(...args: any[]): any
        {
            var position: std.VectorIterator<T> = args[0];

            var index: number = position.getIndex();
            var prevSize: number = this.size();

            var res: std.Iterator<T> = super.insert.apply(this, args);
            var insertedSize: number = this.size() - prevSize;

            for (var i: number = index; i < index + insertedSize; i++)
                this.inserted(new std.VectorIterator(this, i));
        }

        /* --------------------------------------------------------
            INSERTION & DELETION HANDLERS
        -------------------------------------------------------- */
        private inserted(it: std.Iterator<T>): void
        {
            var child: T = it.value;
            
            child.addEventListener(FaceEvent.REGISTER, this.handleRegisteredChild, this);

            if (this.registered == false || this.queueingList.empty() == false)
                this.queueingList.pushBack(child);
            else
                child.insertToServer();
        }

        private erased(it: std.Iterator<T>): void
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

        /* --------------------------------------------------------
            SEQUENCE OF EVENTS
        -------------------------------------------------------- */
        protected dispatchRegisterEvent(): void
        {
            this.registered = true;

            if (this.queueingList.empty() == false)
                this.queueingList.front().insertToServer();

            this.dispatchEvent(new FaceEvent(FaceEvent.REGISTER));
        }
        
        protected dispatchUnregisterEvent(): void
        {
            this.registered = false;

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