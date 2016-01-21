/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/IEntity.ts" />
/// <reference path="../../samchon/library/IEventDispatcher.ts" />

namespace hiswill.faceapi
{
    export interface IAsyncEntity
        extends samchon.protocol.IEntity,
                samchon.library.IEventDispatcher
    {
        /**
         * Test whether the instance is registered on the Face-API server.
         */
        isRegistered(): boolean;

        /**
         * Insert the instance to the Face-API server.
         */
        register(): void;

        /**
         * Remove the instance from the Face-API server.
         */
        unregister(): void;
    }
}