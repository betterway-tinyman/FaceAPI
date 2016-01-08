/// <reference path="../../FaceAPI.ts" />

/// <reference path="../../basic/IJSonEntity.ts" />

/// <reference path='FaceAttributes.ts' />

namespace hiswill.faceapi.face.attribute 
{
    export class FaceAttribute
        extends Entity
        implements basic.IJSONEntity
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