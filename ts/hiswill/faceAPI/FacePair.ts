/// <reference path="FaceAPI.ts" />

/// <reference path="FaceRectangle.ts" />
/// <reference path="IAsyncEntity.ts" />

/// <reference path="FacePairArray.ts" />

namespace hiswill.faceapi 
{
    /**
     * <p> A FaceRectangle directing a Face. </p>
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
        implements IAsyncEntity
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
         * A chain instance of takeing responsibility of event dispatching.
         */
        protected eventDispatcher: samchon.library.EventDispatcher;

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
            this.face = null;

            this.eventDispatcher = new samchon.library.EventDispatcher(this);
            this.registered = false;
        }

		/**
		 * @inheritdoc
		 */
        public construct(xml: samchon.library.XML): void
        {
            super.construct(xml);

            if (xml.hasProperty("faceID") == true)
            {
                var pictureURL: string = xml.getProperty("pictureURL");
                var faceID: string = xml.getProperty("faceID");

                var pictureArray: PictureArray = this.pairArray.getFaceAPI().getPictureArray();
                if (pictureArray.hasURL(pictureURL) == true && pictureArray.getByURL(pictureURL).has(faceID) == true)
                    this.face = pictureArray.getByURL(pictureURL).get(faceID);
            }
            else
                this.face = null;
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE API SERVER
        -------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
        public register(): void
        {
            samchon.trace("FacePair::insertToServer");

            this.pairArray.registerFace(this);
        }

		/**
		 * @inheritdoc
		 */
        public unregister(): void
        {
            this.pairArray.unregisterFace(this);

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
         * <p> Set rectangle data. </p>
         * <p>? Constructs members of FaceRectangle, basic class of the FacePair. </p>
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
            METHODS OF EVENT_DISPATCHER
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public hasEventListener(type: string): boolean
        {
            return this.eventDispatcher.hasEventListener(type);
        }

        /**
         * @inheritdoc
         */
        public dispatchEvent(event: Event): boolean
        {
            return this.eventDispatcher.dispatchEvent(event);
        }

        /**
         * @inheritdoc
         */
        public addEventListener(type: string, listener: EventListener, thisArg: Object = null): void
        {
            this.eventDispatcher.addEventListener(type, listener, thisArg);
        }

        /**
         * @inheritdoc
         */
        public removeEventListener(type: string, listener: EventListener, thisArg: Object = null): void
        {
            this.removeEventListener(type, listener, thisArg);
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "facePair";
        }

        public toXML(): samchon.library.XML
        {
            var xml: samchon.library.XML = super.toXML();
            if (this.face != null)
                xml.setProperty("faceID", this.face.getID());

            return xml;
        }
    }
}