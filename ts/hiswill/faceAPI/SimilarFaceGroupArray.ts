/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="SimilarFaceGroup.ts" />
/// <reference path="IJSONEntity.ts" />

/// <reference path="MessyFaceGroup.ts" />

namespace hiswill.faceapi
{
    export class SimilarFaceGroupArray
        extends samchon.protocol.EntityArray<SimilarFaceGroup>
        implements IJSONEntity
    {
        protected api: FaceAPI;

        protected faceArray: FaceReferArray;

        protected messyGroup: MessyFaceGroup;

        /* --------------------------------------------------------
            CONSTRUCTOR
        -------------------------------------------------------- */
        public constructor(api: FaceAPI);

        public constructor(faceArray: FaceReferArray);

        public constructor(obj: FaceAPI | FaceReferArray)
        {
            super();

            this.messyGroup = new MessyFaceGroup(this);

            if (obj instanceof FaceAPI)
            {
                this.api = <FaceAPI>obj;
                this.faceArray = new FaceReferArray();
            }
            else
            {
                this.faceArray = <FaceReferArray>obj;
                if (this.faceArray.size() == 0)
                    this.api = null;
                else
                    this.api = this.faceArray.at(0).getPicture().getPictureArray().getAPI();
            }
        }

        public construct(xml: samchon.library.XML): void
        {
            super.construct(xml);

            this.messyGroup.construct(xml.get(this.messyGroup.TAG()).at(0));

            for (var i: number = 0; i < this.size(); i++)
                for (var j: number = 0; j < this.at(i).size(); j++)
                    this.faceArray.push(this.at(i).at(j));

            for (i = 0; i < this.messyGroup.size(); i++)
                this.faceArray.push(this.messyGroup.at(i));

            if (this.faceArray.size() == 0)
                this.api = null;
            else
                this.api = this.faceArray.at(i).getPicture().getPictureArray().getAPI();
        }

        public constructByJSON(data: any): void
        {
            this.clear();

            var similarGroupArray: Array<Object> = data["groups"];
            var messyGroup: Array<Object> = data["messyGroup"];

            for (var i = 0; i < similarGroupArray.length; i++)
            {
                var similarGroup: SimilarFaceGroup = new SimilarFaceGroup(this);
                similarGroup.constructByJSON(similarGroupArray);

                this.push(similarGroup);
            }

            this.messyGroup.constructByJSON(messyGroup);
        }

        protected createChild(xml: samchon.library.XML): SimilarFaceGroup
        {
            return new SimilarFaceGroup(this);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get api.
         */
        public getAPI(): FaceAPI
        {
            if (this.api == null && this.faceArray.size() != 0)
                this.api = this.faceArray.at(0).getPicture().getPictureArray().getAPI();

            return this.api;
        }

        /**
         * Get faceArray.
         */
        public getFaceArray(): FaceReferArray
        {
            return this.faceArray;
        }

        /**
         * Get messyGroup.
         */
        public getMessyGroup(): MessyFaceGroup
        {
            return this.messyGroup;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "similarFaceGroupArray";
        }
        public CHILD_TAG(): string
        {
            return "similarFaceGroup";
        }

        public toXML(): samchon.library.XML
        {
            var xml: samchon.library.XML = super.toXML();
            xml.push(this.messyGroup.toXML());

            return xml;
        }
    }
}