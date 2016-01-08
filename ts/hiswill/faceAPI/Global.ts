/// <reference path="FaceAPI.ts" />

/// <reference path="basic/IJSONEntity.ts" />

namespace hiswill.faceapi
{
    /**
     * 전역 클래스.
     *
     * @author 남정호
     */
    export class Global
    {
        /**
         * 엔티티의 멤버를 JSON 객체로부터 구성한다.
         */
        public static fetch(entity: IEntity, json: Object): void
        {
            for (var key in json)
            {
                if (typeof key != "string" || entity.hasOwnProperty(key) == false)
                    continue;

                if (typeof entity[key] == "number" || typeof entity[key] == "string")
                    entity[key] = json[key];
                else if (entity[key] instanceof Entity || entity[key] instanceof EntityArray)
                {
                    var json_entity: basic.IJSONEntity = <basic.IJSONEntity>entity[key];
                    json_entity.constructByJSON(json[key]);
                }
            }
        }
    }

    export class Direction 
    {
        public static get LEFT(): number { return 1 };
        public static get RIGHT(): number { return 2 };
    }
}