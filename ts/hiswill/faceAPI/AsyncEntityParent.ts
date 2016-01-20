/// <reference path="FaceAPI.ts" />

/// <reference path="IAsyncEntity.ts" />

namespace hiswill.faceapi
{
    export class AsyncEntityParent<T extends IAsyncEntity>
		extends samchon.protocol.EntityArray<T>
        implements samchon.library.IEventDispatcher
	{
		/**
         * A chain instance of takeing responsibility of event dispatching.
         */
        protected eventDispatcher: samchon.library.EventDispatcher;

		/**
		 * A list of children waiting for registration to the Face-API server.
		 */
        protected queueingList: std.List<T>;
		
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
		
		/* ========================================================
            ELEMENTS I/O EVENTS
                - OVERRIDINGS
                - INSERTION / DELETION HANDLERS
				- METHODS OF EVENT_DISPATCHER
        ===========================================================
            OVERRIDINGS
        -------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push(...items: T[]): number
		{
			var prevSize: number  = this.size();
			var size: number = super.push(...items);
			
			for (var i: number = prevSize; i < size; i++)
				this.inserted(items[i]);
			
			return size;
		}
		
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
                this.inserted(this[i]);
        }

        /* --------------------------------------------------------
            INSERTION & DELETION HANDLERS
        -------------------------------------------------------- */
        protected inserted(item: T): void
        {
            item.addEventListener(FaceEvent.REGISTER, this.handleRegisteredChild, this);

            if (this.queueingList.empty() == false)
                this.queueingList.pushBack(item);
            else
                item.insertToServer();
        }

        protected erased(item: T): void
        {
            if (item.isRegistered() == false)
            {
                for (var q_it = this.queueingList.begin(); q_it.equals(this.queueingList.end()) == false; q_it = q_it.next())
                    if (q_it.value == item)
                    {
                        this.queueingList.erase(q_it);
                        break;
                    }
            }
            else
                item.eraseFromServer();
        }
		
		protected handleRegisteredChild(event: Event): void
        {
            var child: T = <T>event.target;

            child.removeEventListener(FaceEvent.REGISTER, this.handleRegisteredChild, this);
            this.dispatchEvent(new ContainerEvent(ContainerEvent.ADD, child));

            this.queueingList.popFront();

            if (this.queueingList.empty() == false)
                this.queueingList.front().insertToServer();
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