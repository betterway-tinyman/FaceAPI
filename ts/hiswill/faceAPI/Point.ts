/// <reference path="FaceAPI.ts" />

/// <reference path="IJSonEntity.ts" />

namespace hiswill.faceAPI 
{
    /**
     * X-Y 좌표 엔티티.
     *
     * @author 남정호
     */
    export class Point
        extends Entity
        implements IJSONEntity 
    {
        /**
         * XML 태그명.
         */
        protected tag: string;

        /**
         * X 좌표.
         */
        protected x: number;

        /**
         * Y 좌표.
         */
        protected y: number;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * 생성자 with XML 태그명.
         */
        public constructor(tag: string) 
        {
            super();

            this.tag = tag;
            this.x = 0;
            this.y = 0;
        }
    
        public constructByJSON(val: any): void 
        {
            Global.fetch(this, val);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get X 좌표.
         */
        public getX(): number
        {
            return this.x;
        }

        /**
         * Get Y 좌표.
         */
        public getY(): number
        {
            return this.y;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string 
        {
            return this.tag;
        }

        public toXML(): XML
        {
            var xml: XML = super.toXML();
            xml.eraseProperty("tag");

            return xml;
        }
    }
}