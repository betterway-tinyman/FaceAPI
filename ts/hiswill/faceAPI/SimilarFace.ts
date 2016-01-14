/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSONEntity.ts" />

/// <reference path="SimilarFaceArray.ts" />
/// <reference path="FacePair.ts" />

namespace hiswill.faceapi
{
    export class SimilarFace
        extends protocol.Entity
        implements IJSONEntity
    {
        /**
         * An array and parent of the SimilarFace.
         */
        protected faceArray: SimilarFaceArray;

        protected facePair: FacePair;

        protected confidence: number;

        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from a SimilarFaceArray. 
         *
         * @param faceArray An array and parent of the SimilarFace.
         */
        public constructor(faceArray: SimilarFaceArray)
        {
            super();

            this.faceArray = faceArray;
        }

        public construct(xml: library.XML): void
        {
            super.construct(xml);
            this.facePair = null;

            if (xml.hasProperty("facePairID") == false)
                return;

            var facePairID: string = xml.getProperty("facePairID");
            var faceList: FaceList = this.faceArray.getFaceList();

            if (faceList != null && faceList.has(facePairID) == true)
                this.facePair = <FacePair>faceList.get(facePairID);
        }
    
        public constructByJSON(data: any): void
        {
            Global.fetch(this, data);
            
            var facePairID: string = data["persistedFaceId"];
            var faceList: FaceList = this.faceArray.getFaceList();

            if (faceList != null && faceList.has(facePairID) == true)
                this.facePair = <FacePair>faceList.get(facePairID);
            else
                this.facePair = null;

        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get faceArray.
         */
        public getFaceArray(): SimilarFaceArray
        {
            return this.faceArray;
        }

        /**
         * Get facePair.
         */
        public getFacePair(): FacePair
        {
            return this.facePair;
        }

        /**
         * Get confidence.
         */
        public getConfidence(): number
        {
            return this.confidence;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "similarFace";
        }

        public toXML(): library.XML
        {
            var xml: library.XML = super.toXML();
            
            if (this.facePair != null)
                xml.setProperty("facePairID", this.facePair.getID());

            return xml;
        }
    }
}