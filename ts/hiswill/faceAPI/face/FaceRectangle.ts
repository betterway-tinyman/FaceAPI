/// <reference path="../FaceAPI.ts" />

/// <reference path="../Point.ts" />
/// <reference path="../IJSonEntity.ts" />

namespace hiswill.faceAPI.face 
{
    export class FaceRectangle
        extends Point
        implements IJSONEntity
    {
        protected width: number;
        protected height: number;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        public constructor()
        {
            super("");
        
            this.width = 0;
            this.height = 0;
        }

        public constructByJSON(obj: any): void
        {
            Global.fetch(this, obj);
            this.x = obj["left"];
            this.y = obj["top"];
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getWidth(): number
        {
            return this.width;
        }
        public getHeight(): number
        {
            return this.height;
        }
    }
}