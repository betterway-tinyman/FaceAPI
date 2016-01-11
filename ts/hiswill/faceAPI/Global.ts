/// <reference path="FaceAPI.ts" />

/// <reference path="IJSONEntity.ts" />

namespace hiswill.faceapi
{
    /**
     * A static, utiltiy class.
     *
     * @author Jeongho Nam
     */
    export class Global
    {
        /**
         * Construct member of an entity from a JSON object.
         * 
         * @param entity A target entity to construct member data.
         * @param json JSON object containing member data.
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
                    var json_entity: IJSONEntity = <IJSONEntity>entity[key];
                    json_entity.constructByJSON(json[key]);
                }
            }
        }
    }

    /**
     * A static class for expressing direction.
     *
     * @author Jeongho Nam
     */
    export class Direction 
    {
        /**
         * left, code 1.
         */
        public static get LEFT(): number { return 1 };

        /**
         * right, code 2.
         */
        public static get RIGHT(): number { return 2 };
    }
}