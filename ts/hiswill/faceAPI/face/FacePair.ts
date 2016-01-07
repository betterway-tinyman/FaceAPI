/// <reference path="../FaceAPI.ts" />

/// <reference path="FaceRectangle.ts" />
/// <reference path="../basic/IFaceAPI.ts" />

/// <reference path="FacePairArray.ts" />

namespace hiswill.faceAPI.face 
{
    export class FacePair
        extends FaceRectangle
        implements basic.IFaceAPI
    {
        protected pairArray: FacePairArray;

        protected id: string;

        protected pictureURL: string;

        protected face: Face;

        protected registered: boolean;

        /* --------------------------------------------------------
            CONSTRUCTORS
        -------------------------------------------------------- */
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
        public setFile(face: Face): void
        {
            this.face = face;
            this.pictureURL = face.getPicture().getURL();

            this.setRectangle(face);
        }
        public setRectangle(rectangle: FaceRectangle): void
        {
            this.x = rectangle.getX();
            this.y = rectangle.getY();
            this.width = rectangle.getWidth();
            this.height = rectangle.getHeight();
        }
        public setID(id: string): void
        {
            this.id = id;
            this.registered = (id != "");
        }

        public key(): string
        {
            return this.id;
        }

        public getPairArray(): FacePairArray
        {
            return this.pairArray;
        }
        public getFace(): Face
        {
            return this.face;
        }

        public getID(): string
        {
            return this.id;
        }
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