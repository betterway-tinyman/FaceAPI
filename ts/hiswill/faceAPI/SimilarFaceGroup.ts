/// <reference path="FaceAPI.ts" />

/// <reference path="FaceGroup.ts" />
/// <reference path="IJSONEntity.ts" />

namespace hiswill.faceapi
{
    export class SimilarFaceGroup
        extends FaceGroup
    {
        /* --------------------------------------------------------
            CONSTRUCTOR
        -------------------------------------------------------- */
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