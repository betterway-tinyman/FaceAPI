/// <reference path="../../SamchonFramework.ts" />
/// <reference path="../../jquery.d.ts" />

/// <reference path="person/PersonGroupArray.ts" />
/// <reference path="facelist/FaceListArray.ts" />
/// <reference path="picture/PictureArray.ts" />

namespace hiswill.faceapi
{
    /**
     * A facade controller and factory class for Face-API.
     *
     * @author Jeongho Nam
     */
    export class FaceAPI
        extends Entity 
    {
        /**
         * An array of PersonGroup.
         */
        protected personGroupArray: person.PersonGroupArray;

        /**
         * An array of FaceList.
         */
        protected faceListArray: facelist.FaceListArray;

        /**
         * An array of Picture.
         */
        protected pictureArray: picture.PictureArray;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Default Constructor.
         */
        public constructor() 
        {
            super();

            this.personGroupArray = new person.PersonGroupArray(this);
            this.faceListArray = new facelist.FaceListArray(this);
            this.pictureArray = new picture.PictureArray(this);
        }

        /**
         * Factory method of PersonGroup.
         *
         * @param name Name of a new PersonGroup
         */
        public createPersonGroup(name: string): person.PersonGroup 
        {
            var personGroup: person.PersonGroup = new person.PersonGroup(this.personGroupArray, name);
            this.personGroupArray.push(personGroup);

            return personGroup;
        }

        /**
         * Factory method of FaceList.
         *
         * @apram name Name of a new FaceList.
         */
        public createFaceList(name: string): facelist.FaceList 
        {
            var faceList: facelist.FaceList = new faceapi.facelist.FaceList(this.faceListArray, name);
            this.faceListArray.push(faceList);

            return faceList;
        }

        /**
         * Factory method of Picture.
         *
         * @apram url URL-address of a new Picture.
         */
        public createPicture(url: string): picture.Picture 
        {
            var picture: picture.Picture = new faceapi.picture.Picture(this.pictureArray, url);
            this.pictureArray.push(picture);

            return picture;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get personGroupArray.
         */
        public getPersonGroupArray(): person.PersonGroupArray
        {
            return this.personGroupArray;
        }

        /**
         * Get faceListArray.
         */
        public getFaceListArray(): facelist.FaceListArray
        {
            return this.faceListArray;
        }
    
        /**
         * Get pictureArray.
         */
        public getPictureArray(): picture.PictureArray 
        {
            return this.pictureArray;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string 
        {
            return "faceAPI";
        }

        public toXML(): XML
        {
            var xml: XML = super.toXML();
            xml.push
            (
                this.personGroupArray.toXML(),
                this.pictureArray.toXML()
            );

            return xml;
        }

        /* --------------------------------------------------------
            STATIC MEMBERS
        -------------------------------------------------------- */
        /**
         * Certification key for Face-API server.
         */
        private static get CERTIFICATION_KEY(): string 
        {
            return "b072c71311d144388ac2527a5f06ffca";
        }

        /**
         * Query a formed-statement to Face-API server.
         *
         * @param url https address to query
         * @param method One of them (GET, POST, UPDATE, DELETE, PATCH)
         * @param params A pre-parameter
         * @param data A post-parameter (body)
         * @param success A method to be processed after the sending query is succeded.
         * @param async Whether to send query asynchronously. Default is false (synchronous query).
         */
        public static query(url: string, method:string, params: Object, data: Object, success:Function, async: boolean = false): void
        {
            $.ajax
            ({
                url: url + (params == null ? "" : "?" + $.param(params)),
                beforeSend: function (xhrObj) 
                {
                    // Request headers
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", FaceAPI.CERTIFICATION_KEY);
                },
                type: method,
                async: async,

                data: (data == null) ? "" : JSON.stringify(data),
                success: function (data, textStatus, xhr)
                {
                    if (success != null)
                        success.apply(null, [data]);
                },
                error: function(jqXHR: JQueryXHR, textStatus: string, errorThrow: string): any
                {
                    trace(JSON.stringify(jqXHR), url);
                }
            });
        }

        /**
         * A automatically increasing sequence number used on issuing unique identifier code. </p>?
         */
        private static sequence: number = 0;

        /**
         * Issue an unique identifier code. 
         *
         * @param prefix A word inserted in front of the automatically generated code.
         */
        public static issueID(prefix: string): string
        {
            return prefix + "_hiswill_" + new Date().getTime() + "_" + (++FaceAPI.sequence);
        }
    }
}