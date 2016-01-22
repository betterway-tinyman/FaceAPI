/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="Face.ts" />

namespace hiswill.faceapi
{
    export class FaceReferArray
        extends samchon.protocol.EntityArray<Face>
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

        public construct(xml: samchon.library.XML): void
        {
            // CLEAR
            this.clear();

            if (xml.has(this.CHILD_TAG()) == false)
                return;

            // FIND CHILDREN
            var xmlList: samchon.library.XMLList = xml.get(this.CHILD_TAG());

            for (var i: number = 0; i < xmlList.size(); i++)
            {
                var face: Face = this.fetchChild(xmlList.at(i).getProperty("id"));
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

        public toXML(): samchon.library.XML
        {
            var xml: samchon.library.XML = new samchon.library.XML();
            xml.setTag(this.TAG());

            for (var i: number = 0; i < this.size(); i++)
            {
                var childXML: samchon.library.XML = new samchon.library.XML();
                childXML.setTag(this.CHILD_TAG());
                childXML.setProperty("id", this.at(i).getID());

                // INSERTS
                xml.push(childXML);
            }

            return xml;
        }
    }
}