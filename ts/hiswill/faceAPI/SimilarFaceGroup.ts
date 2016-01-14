/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="FaceGroup.ts" />
/// <reference path="IJSONEntity.ts" />

namespace hiswill.faceapi
{
    export class SimilarFaceGroup
        extends FaceGroup
    {
        /* --------------------------------------------------------
            CONSTRUCTOR
        -------------------------------------------------------- */
        /**
         * Construct from groupArray. 
         *
         * @param groupArray An array and parent of the SimilarFaceGroup.
         */
        public constructor(groupArray: SimilarFaceGroupArray)
        {
            super(groupArray);
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "similarFaceGroup";
        }
    }
}