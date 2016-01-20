/// <reference path="AsyncEntityParent.ts" />
/// <reference path="IAsyncEntity.ts" />

namespace hiswill.faceapi
{
    export class AsyncEntityArray<T extends IAsyncEntity>
        extends AsyncEntityParent<T>
        implements IAsyncEntity
    {
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
			
            this.registered = false;
        }
		
        /* --------------------------------------------------------
            INSERTION & DELETION HANDLERS
        -------------------------------------------------------- */
        protected inserted(item: T): void
        {
            item.addEventListener(FaceEvent.REGISTER, this.handleRegisteredChild, this);

            if (this.registered == false || this.queueingList.empty() == false)
                this.queueingList.pushBack(item);
            else
                item.insertToServer();
        }
		
        protected dispatchRegisterEvent(): void
        {
            this.registered = true;

            if (this.queueingList.empty() == false)
                this.queueingList.front().insertToServer();

            this.dispatchEvent(new FaceEvent(FaceEvent.REGISTER));
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
        public insertToServer(): void
        {
            throw new std.AbstractMethodError("insertToServer is not overriden.");
        }

        /**
         * @inheritdoc
         */
        public eraseFromServer(): void
        {
            throw new std.AbstractMethodError("insertToServer is not overriden.");
        }
    }
}