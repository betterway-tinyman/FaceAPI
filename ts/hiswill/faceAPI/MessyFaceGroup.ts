/// <reference path="FaceAPI.ts" />

/// <reference path="FaceGroup.ts" />
/// <reference path="IJSONEntity.ts" />

namespace hiswill.faceapi
{
    export class MessyFaceGroup
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
            return "messyFaceGroup";
        }
    }
}