/// <reference path="FaceAPI.ts" />

/// <reference path="IJSONEntity.ts" />

/// <reference path="FaceReferArray.ts" />

namespace hiswill.faceapi
{
    export class FaceGroup
        extends FaceReferArray
        implements IJSONEntity
    {
        protected groupArray: SimilarFaceGroupArray;

        /* --------------------------------------------------------
            CONSTRUCTOR
        -------------------------------------------------------- */
        public constructor(groupArray: SimilarFaceGroupArray)
        {
            super();

            this.groupArray = groupArray;
        }

        public constructByJSON(val: any): void
        {
            this.splice(0, this.length);

            var idArray: Array<string> = val;

            for (var i: number = 0; i < idArray.length; i++)
            {
                var id: string = idArray[i];
                var face: Face = this.fetchChild(id);

                if (face == null)
                    continue;

                this.push(face);
            }
        }

        protected fetchChild(id: string): Face
        {
            var faceArray: FaceReferArray = this.groupArray.getFaceArray();
            if (faceArray.has(id) == true)
                return faceArray.get(id);

            var api: FaceAPI = this.groupArray.getAPI();
            if (api == null)
                return null;

            var pictureArray: PictureArray = api.getPictureArray();
            for (var i: number = 0; i < pictureArray.length; i++)
                if (pictureArray[i].has(id) == true)
                    return pictureArray[i].get(id);

            return null;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * Get groupArray.
         */
        public getGroupArray(): SimilarFaceGroupArray
        {
            return this.groupArray;
        }
    }
}