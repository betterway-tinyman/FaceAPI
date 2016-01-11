/// <reference path="FaceAPI.ts" />

/// <reference path="Face.ts" />

namespace hiswill.faceapi
{
    export class FaceReferArray
        extends EntityArray<Face>
    {
        /* --------------------------------------------------------
            CONSTRUCTOR
        -------------------------------------------------------- */
        /**
         * Default Constructor.
         */
        public constructor()
        {
            super();
        }

        public construct(xml: XML): void
        {
            // CLEAR
            this.splice(0, this.length);

            if (xml.has(this.CHILD_TAG()) == false)
                return;

            // FIND CHILDREN
            var xmlList: XMLList = xml.get(this.CHILD_TAG());

            for (var i: number = 0; i < xmlList.length; i++)
            {
                var face: Face = this.fetchChild(xmlList[i].getProperty("id"));
                if (face == null)
                    continue;
                   
                this.push(face);
            }
        }

        protected fetchChild(id: string): Face
        {
            return null;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        public TAG(): string
        {
            return "faceReferArray";
        }
        public CHILD_TAG(): string
        {
            return "faceRefer";
        }

        public toXML(): XML
        {
            var xml: XML = new XML();
            xml.setTag(this.TAG());

            for (var i: number = 0; i < this.length; i++)
            {
                var childXML: XML = new XML();
                childXML.setTag(this.CHILD_TAG());

                childXML.setProperty("id", this[i].getID());
            }

            return xml;
        }
    }
}