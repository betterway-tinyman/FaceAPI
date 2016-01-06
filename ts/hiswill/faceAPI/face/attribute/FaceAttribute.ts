/// <reference path="../../FaceAPI.ts" />

/// <reference path="../../IJSonEntity.ts" />

/// <reference path='FaceAttributes.ts' />

namespace hiswill.faceAPI.face.attribute 
{
    export class FaceAttribute
        extends Entity
        implements IJSONEntity
    {
        protected attributes: FaceAttributes;

        public constructor(attributes: FaceAttributes)
        {
            super();

            this.attributes = attributes;
        }

        public constructByJSON(val: any): void 
        {
            Global.fetch(this, val);
        }
    }
}