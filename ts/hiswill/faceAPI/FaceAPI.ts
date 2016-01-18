/// <reference path="../../samchon/protocol/Entity.ts" />

/// <reference path="PersonGroupArray.ts" />
/// <reference path="FaceListArray.ts" />
/// <reference path="PictureArray.ts" />

var trace = samchon.trace;

namespace hiswill.faceapi
{
    /**
     * A facade controller and factory class for Face-API.
     *
     * @author Jeongho Nam
     */
    export class FaceAPI
        extends samchon.protocol.Entity 
    {
        /**
         * An array of PersonGroup.
         */
        protected personGroupArray: PersonGroupArray;

        /**
         * An array of FaceList.
         */
        protected faceListArray: FaceListArray;

        /**
         * An array of Picture.
         */
        protected pictureArray: PictureArray;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Default Constructor.
         */
        public constructor() 
        {
            super();

            this.personGroupArray = new PersonGroupArray(this);
            this.faceListArray = new FaceListArray(this);
            this.pictureArray = new PictureArray(this);
        }

        /**
         * Factory method of PersonGroup.
         *
         * @param name Name of a new PersonGroup
         */
        public createPersonGroup(name: string): PersonGroup 
        {
            var personGroup: PersonGroup = new PersonGroup(this.personGroupArray, name);
            this.personGroupArray.push(personGroup);

            return personGroup;
        }

        /**
         * Factory method of FaceList.
         *
         * @param name Name of a new FaceList.
         */
        public createFaceList(name: string): FaceList 
        {
            var faceList: FaceList = new faceapi.FaceList(this.faceListArray, name);
            this.faceListArray.push(faceList);

            return faceList;
        }

        /**
         * Factory method of Picture.
         *
         * @param url URL-address of a new Picture.
         */
        public createPicture(url: string): Picture 
        {
            var picture: Picture = new faceapi.Picture(this.pictureArray, url);
            this.pictureArray.push(picture);

            return picture;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get personGroupArray.
         */
        public getPersonGroupArray(): PersonGroupArray
        {
            return this.personGroupArray;
        }

        /**
         * Get faceListArray.
         */
        public getFaceListArray(): FaceListArray
        {
            return this.faceListArray;
        }
    
        /**
         * Get pictureArray.
         */
        public getPictureArray(): PictureArray 
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

        public toXML(): samchon.library.XML
        {
            var xml: samchon.library.XML = super.toXML();
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
         * @param async Whether to send query asynchronously. Default is true (synchronous query).
         */
        public static query
            (
                url: string, method:string, 
                params: Object, data: Object, 
                success: Function, 
                async: boolean = true): void
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
                timeout: 1000,

                data: (data == null) ? "" : JSON.stringify(data),
                success: function (data: any, textStatus: string, jqXHR: JQueryXHR): any
                {
                    if (success != null)
                        success.apply(null, [data, textStatus, jqXHR]);
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

        public static main(): void
        {
            var faceAPI: FaceAPI = new FaceAPI();

            var picture = faceAPI.createPicture("http://samchon.org/download/group_others2.jpg");
            picture.detect();

            trace("Detected");
    
            //var faceList = faceAPI.createFaceList("other_group");
            var personGroup = faceAPI.createPersonGroup("others");

            for (var i: number = 0; i < picture.size(); i++)
            {
                var face = picture.at(i);

                //faceList.push(face);

                var person = new Person(personGroup, "my_name_" + (i+1));
                personGroup.push(person);
                person.push(face);

                trace(i + "th person is constructoed");
            }

            trace("Registered");

            personGroup.addEventListener("complete",
                function(ev: Event): void
                {
                    trace("Trained");
                    
                }
            );

            personGroup.train();
        }
    }
}