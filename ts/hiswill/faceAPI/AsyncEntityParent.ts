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
        protected queueingList: std.Vector<T>;
		
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
            this.queueingList = new std.Vector<T>();
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
			var size: number = super.push(...items);
			
			for (var i: number = 0; i < items.length; i++)
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
            item.addEventListener(FaceEvent.REGISTER, this.handleRegisterChild, this);
            item.addEventListener(FaceEvent.UNREGISTER, this.handleUnregisterChild, this);

            this.queueingList.pushBack(item);

            if (this.queueingList.size() == 1)
                item.register();
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
                item.unregister();
        }
		
		protected handleRegisterChild(event: Event): void
        {
            var child: T = <T>event.target;

            //child.removeEventListener(FaceEvent.REGISTER, this.handleRegisterChild, this);
            this.dispatchEvent(new ContainerEvent(ContainerEvent.ADD, child));

            this.queueingList.erase(this.queueingList.begin());

            if (this.queueingList.empty() == false)
                this.queueingList.front().register();
        }

        protected handleUnregisterChild(event: Event): void
        {
            var child: T = <T>event.target;

            child.removeEventListener(FaceEvent.UNREGISTER, this.handleUnregisterChild, this);
            this.dispatchEvent(new ContainerEvent(ContainerEvent.REMOVE, child));
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