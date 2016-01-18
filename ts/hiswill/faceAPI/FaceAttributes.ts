/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />

/// <reference path="FaceAttribute.ts" />
/// <reference path="FacialHair.ts" />
/// <reference path="HeadPose.ts" />

/// <reference path="Face.ts" />

namespace hiswill.faceapi 
{
    /**
     * <p> An entity representing attributes of a Face. </p>
     *
     * <p> FaceAttributes also takes a role of group and parent of FaceAttribute entities. </p>
     *
     * @author Jeongho Nam
     */
    export class FaceAttributes
        extends samchon.protocol.Entity
        implements IJSONEntity 
    {
        /**
         * A Face that the FaceAttributes is belonged to.
         */
        protected face: Face;

        /**
         * Estimated age.
         */
        protected age: number;

        /**
         * Estimated gender.
         */
        protected gender: string;

        /**
         * Estimated degree of smile; 0 ~ 1.
         */
        protected smile: number;

        /**
         * An entity representing density of facial hairs.
         */
        protected facialHair: FacialHair;

        /**
         * An entity representing rotation of head.
         */
        protected headPose: HeadPose;

        /* --------------------------------------------------------
            CONSTRUCTOR
        -------------------------------------------------------- */
        /**
         * Construct from a Face. 
         *
         * @param face A Face that the FaceAttributes are belonged to.
         */
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
        /**
         * Get face.
         */
        public getFace(): Face
        {
            return this.face;
        }

        /**
         * Get age.
         */
        public getAge(): number
        {
            return this.age;
        }

        /**
         * Get gender.
         */
        public getGender(): string
        {
            return this.gender;
        }

        /**
         * Get smile.
         */
        public getSmile(): number
        {
            return this.smile;
        }

        /**
         * Get facialHair.
         */
        public getFacialHair(): FacialHair
        {
            return this.facialHair;
        }

        /**
         * Get headPose.
         */
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

        public toXML(): samchon.library.XML
        {
            var xml: samchon.library.XML = super.toXML();
            xml.push
            (
                this.facialHair.toXML(),
                this.headPose.toXML()
            );

            return xml;
        }
    }
}