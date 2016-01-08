/// <reference path="../FaceAPI.ts" />

/// <reference path="Picture.ts" />

namespace hiswill.faceapi.picture 
{
    /**
     * 사진 목록.
     * 
     * @author 남정호
     */
    export class PictureArray
        extends EntityArray<Picture>
    {
        protected api: FaceAPI;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * 생성자 from API.
         */
        public constructor(api: FaceAPI) 
        {
            super();

            this.api = api;
        }

        protected createChild(xml: XML): Picture 
        {
            return new Picture(this, xml.getProperty("url"));
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public hasURL(url: string): boolean 
        {
            for (var i: number = 0; i < this.length; i++)
                if (this[i].getURL() == url)
                    return true;

            return false;
        }

        public getByURL(url: string): Picture 
        {
            for (var i: number = 0; i < this.length; i++)
                if (this[i].getURL() == url)
                    return this[i];

            throw Error("out of range");
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string 
        {
            return "pictureArray";
        }
        public CHILD_TAG(): string 
        {
            return "picture";
        }
    }
}