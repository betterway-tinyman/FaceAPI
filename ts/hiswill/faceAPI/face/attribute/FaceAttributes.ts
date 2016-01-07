/// <reference path="../../FaceAPI.ts" />

/// <reference path='../../basic/IJSonEntity.ts' />

/// <reference path="FaceAttribute.ts" />
/// <reference path="FacialHair.ts" />
/// <reference path="HeadPose.ts" />

/// <reference path="../Face.ts" />

namespace hiswill.faceAPI.face.attribute 
{
    export class FaceAttributes
        extends Entity
        implements basic.IJSONEntity 
    {
        protected face: Face;

        protected age: number;
        protected gender: string;
        protected smile: number;

        protected facialHair: FacialHair;
        protected headPose: HeadPose;

        /* --------------------------------------------------------
            CONSTRUCTOR
        -------------------------------------------------------- */
        public constructor(face: Face) 
        {
            super();
            this.face = face;

            this.age = 0;
            this.gender = "";
            this.smile = 0;

            this.facialHair = new FacialHair(this);
            this.headPose = new HeadPose(this);
        }
    
        public constructByJSON(obj: any): void 
        {
            Global.fetch(this, obj);
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        public getFace(): Face
        {
            return this.face;
        }

        public getAge(): number
        {
            return this.age;
        }
        public getGender(): string
        {
            return this.gender;
        }
        public getSmile(): number
        {
            return this.smile;
        }

        public getFacialHair(): FacialHair
        {
            return this.facialHair;
        }
        public getHeadPose(): HeadPose
        {
            return this.headPose;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string 
        {
            return "attributes";
        }
        public toXML(): XML
        {
            var xml: XML = super.toXML();
            xml.push
            (
                this.facialHair.toXML(),
                this.headPose.toXML()
            );

            return xml;
        }
    }
}