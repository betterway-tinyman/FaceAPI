/// <reference path="../FaceAPI.ts" />

/// <reference path="FaceRectangle.ts" />
/// <reference path="../basic/IFaceAPI.ts" />

/// <reference path="FacePairArray.ts" />

namespace hiswill.faceapi.face 
{
    /**
     * <p> An entity directing a Face and its basic data. </p>
     *
     * <p> Reference </p>
     * <ul>
     *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395250 </li>
     *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523b </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    export class FacePair
        extends FaceRectangle
        implements basic.IFaceAPI
    {
        /**
         * An array and parent of the FacePair.
         */
        protected pairArray: FacePairArray;

        /**
         * An identifier issued by Face-API server.
         */
        protected id: string;

        /**
         * URL-address of a picture containing the targeting face.
         */
        protected pictureURL: string;

        /**
         * <p> Related Face instance. </p>
         *
         * <p> When related Face exists, the FacePair follows data of the Face. However, the related
         * Face is not, FacePair construct its own data by itself (by inheriting FaceRectangle). </p>
         */
        protected face: Face;

        /**
         * Whether the instance is registered on the Face-API server.
         */
        protected registered: boolean;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a FacePairArray.
         *
         * @param pairArray An array and parent of the FacePair.
         */
        public constructor(pairArray: FacePairArray)
        {
            super();

            this.pairArray = pairArray;

            this.id = "";
            this.pictureURL = "";
            this.registered = false;
            this.face = null;
        }

        public construct(xml: XML): void
        {
            super.construct(xml);

            if (xml.hasProperty("faceID") == true)
            {
                var pictureURL: string = xml.getProperty("pictureURL");
                var faceID: string = xml.getProperty("faceID");

                var pictureArray: picture.PictureArray = this.pairArray.getFaceAPI().getPictureArray();
                if (pictureArray.hasURL(pictureURL) == true && pictureArray.getByURL(pictureURL).has(faceID) == true)
                    this.face = pictureArray.getByURL(pictureURL).get(faceID);
            }
            else
                this.face = null;
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE API SERVER
        -------------------------------------------------------- */
        public insertToServer(): void
        {
            this.pairArray.insertFaceToServer(this);
        }

        public eraseFromServer(): void
        {
            this.pairArray.eraseFaceFromServer(this);

            this.registered = false;
        }

        /* --------------------------------------------------------
            SETTERS & GETTERS
        -------------------------------------------------------- */
        /**
         * Set (related) file. 
         *
         * @param face A related file with the FacePair.
         */
        public setFile(face: Face): void
        {
            this.face = face;
            this.pictureURL = face.getPicture().getURL();

            this.setRectangle(face);
        }

        /**
         * <p> Set rectangle data. 
         * Constructs members of FaceRectangle, basic class of the FacePair. 
         *
         * @param rectangle A FaceRentangle instance to copy.
         */
        public setRectangle(rectangle: FaceRectangle): void
        {
            // POINT'S MEMBERS
            this.x = rectangle.getX();
            this.y = rectangle.getY();

            // FACE_RECTANGLE'S MEMBERS
            this.width = rectangle.getWidth();
            this.height = rectangle.getHeight();
        }

        /**
         * Set identifier. 
         *
         * @param id An identifier gotten from Face-API server.
         */
        public setID(id: string): void
        {
            this.id = id;
            this.registered = (id != "");
        }

        public key(): string
        {
            return this.id;
        }

        /**
         * Get pairArray.
         */
        public getPairArray(): FacePairArray
        {
            return this.pairArray;
        }

        /**
         * Get face.
         */
        public getFace(): Face
        {
            return this.face;
        }

        /**
         * Get id.
         */
        public getID(): string
        {
            return this.id;
        }

        /**
         * Get pictureURL.
         */
        public getPictureURL(): string
        {
            return this.pictureURL;
        }

        public isRegistered(): boolean
        {
            return this.registered;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "facePair";
        }

        public toXML(): XML
        {
            var xml: XML = super.toXML();
            if (this.face != null)
                xml.setProperty("faceID", this.face.getID());

            return xml;
        }
    }
}