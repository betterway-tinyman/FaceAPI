/// <reference path="FaceAPI.ts" />

/// <reference path="Point.ts" />
/// <reference path="IJSonEntity.ts" />

namespace hiswill.faceapi 
{
    /**
     * An abstract class having position and size data of rectangle which are representing a face in a picture.
     *
     * @author Jeongho Nam
     */
    export class FaceRectangle
        extends Point
        implements IJSONEntity
    {
        /**
         * Horizontal length of the FaceRectangle.
         */
        protected width: number;
        
        /**
         * Vertical length of the FaceRectangle.
         */
        protected height: number;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Default Constructor.
         */
        public constructor()
        {
            super();
        
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
        /**
         * Get width.
         */
        public getWidth(): number
        {
            return this.width;
        }

        /**
         * Get height.
         */
        public getHeight(): number
        {
            return this.height;
        }
    }
}