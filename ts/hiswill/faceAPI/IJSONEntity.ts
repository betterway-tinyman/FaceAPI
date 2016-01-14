/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/IEntity.ts" />

namespace hiswill.faceapi
{
    /**
     * An interface for JSON을 통하여 멤버가 구성되는 엔티티를 위한 인터페이스.
     *
     * @author Jeongho Nam
     */
    export interface IJSONEntity 
        extends protocol.IEntity
    {
        /**
         * Construct members from an JSON instance.
         *
         * @param val An JSON instance representing data of the entity.
         */
        constructByJSON(val: any): void;
    }
}