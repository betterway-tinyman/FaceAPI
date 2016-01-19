/// <reference path="FaceEvent.ts" />

namespace hiswill.faceapi
{
    export class ContainerEvent
        extends FaceEvent
    {
        public static get ADD(): string { return "add"; }
        public static get REMOVE(): string { return "remove"; }

        protected item_: IAsyncEntity;

        public constructor(type: string, item: IAsyncEntity)
        {
            super(type);
            
            this.item_ = item;
        }

        public get item(): IAsyncEntity
        {
            return this.item_;
        }
    }
}