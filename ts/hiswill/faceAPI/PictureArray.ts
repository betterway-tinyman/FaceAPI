/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="Picture.ts" />

namespace hiswill.faceapi 
{
    /**
     * An array and parent of Picture entities.
     *
     * @author Jeongho Nam
     */
    export class PictureArray
        extends samchon.protocol.EntityArray<Picture>
    {
        /**
         * A facade controller and factory class for Face-API.
         */
        protected api: FaceAPI;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a FaceAPI.
         *
         * @param api A facade controller and factory class for Face-API.
         */
        public constructor(api: FaceAPI) 
        {
            super();

            this.api = api;
        }

        protected createChild(xml: samchon.library.XML): Picture 
        {
            return new Picture(this, xml.getProperty("url"));
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get api.
         */
        public getAPI(): FaceAPI
        {
            return this.api;
        }

        /**
         * Test whether the PictureArray has a Picture having an url.
         *
         * @param url URL-address used as a key in the test.
         */
        public hasURL(url: string): boolean 
        {
            for (var i: number = 0; i < this.size(); i++)
                if (this.at(i).getURL() == url)
                    return true;

            return false;
        }

        /**
         * Get a Picture instance having the target url.
         *
         * @param url URL-address used as a key in the retrieve.
         * @return A Picture has the url.
         */
        public getByURL(url: string): Picture 
        {
            for (var i: number = 0; i < this.size(); i++)
                if (this.at(i).getURL() == url)
                    return this.at(i);

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