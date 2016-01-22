/// <reference path="FaceAPI.ts" />

/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="Face.ts" />
/// <reference path="IJSONEntity.ts" />
/// <reference path="../../samchon/library/IEventDispatcher.ts" />

/// <reference path="../../samchon/library/EventDispatcher.ts" />

/// <reference path="PictureArray.ts" />

namespace hiswill.faceapi
{
    /**
     * A picture entity who containing Face entities.
     *
     * @author Jeongho Nam
     */
    export class Picture 
        extends samchon.protocol.EntityArray<Face>
        implements IJSONEntity, 
                   samchon.library.IEventDispatcher
    {
        /**
         * An array and parent of Picture entities.
         */
        protected pictureArray: PictureArray;

        /**
         * An url-address the (physical) picture is placed in.
         */
        protected url: string;

        protected width: number;

        protected height: number;

        /**
         * A chain instance of takeing responsibility of event dispatching.
         */
        protected eventDispatcher: samchon.library.EventDispatcher;
        
        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from an PictureArray and url. 
         *
         * @param pictureArray An array and parent of Picture entities.
         * @param url An url-address the (physical) picture is placed in.
         */
        public constructor(pictureArray: PictureArray, url: string = "") 
        {
            super();

            this.pictureArray = pictureArray;
            this.url = url;

            //if (this.url != "")
            //    this.constructSize();
            
            this.eventDispatcher = new samchon.library.EventDispatcher(this);
        }
    
        /**
         * @inheritdoc
         */
        public constructByJSON(val: any): void
        {
            this.clear(); // CLEAR

            var array: Array<any> = val;

            for (var i: number = 0; i < array.length; i++)
            {
                var face: Face = new faceapi.Face(this);
                face.constructByJSON(array[i]);

                this.push(face);
            }
        }

        /**
         * @inheritdoc
         */
        protected createChild(xml: samchon.library.XML): Face
        {
            return new Face(this);
        }

        private constructSize(): void
        {
            var image = new Image();
            image.onload = function()
            {
                this.width = image.naturalWidth;
                this.height = image.naturalHeight;
            }
            image.src = this.url;
        }

        /* --------------------------------------------------------
            GETTERS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public key(): any
        {
            return this.url;
        }
    
        /**
         * Get pictureArray.
         */
        public getPictureArray(): PictureArray
        {
            return this.pictureArray;
        }

        /**
         * Get url.
         */
        public getURL(): string
        {
            return this.url;
        }

        /* --------------------------------------------------------
            INTERACTION WITH FACE-API
        -------------------------------------------------------- */
        /**
         * <p> Detect Face(s) in the Picture. </p>
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236 </li>
         * </ul>
         */
        public detect(): void
        {
            // REMOVE ALL
            this.clear();

            var this_ = this;

            // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
            FaceAPI.query
            (
                "https://api.projectoxford.ai/face/v1.0/detect", "POST", 
                {
                    "returnFaceId": "true",
                    "returnFaceLandmarks": "true",
                    "returnFaceAttributes": "age,gender,smile,facialHair,headPose",
                }, 
                { "url": this.url },

                function (data: any): any
                {
                    samchon.trace("Detected in inline function");
                    this_.constructByJSON(data);
                    
                    this_.dispatchEvent(new FaceEvent(FaceEvent.DETECT));
                }
            );
        }

        /* --------------------------------------------------------
            METHODS OF EVENT_DISPATCHER
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public hasEventListener(type: string): boolean
        {
            return this.eventDispatcher.hasEventListener(type);
        }

        /**
         * @inheritdoc
         */
        public dispatchEvent(event: Event): boolean
        {
            samchon.trace("dispatchEvent in Picture", event.type, this.eventDispatcher.hasEventListener(event.type));

            return this.eventDispatcher.dispatchEvent(event);
        }

        /**
         * @inheritdoc
         */
        public addEventListener(type: string, listener: EventListener, thisArg: Object = null): void
        {
            this.eventDispatcher.addEventListener(type, listener, thisArg);
        }

        /**
         * @inheritdoc
         */
        public removeEventListener(type: string, listener: EventListener, thisArg: Object = null): void
        {
            this.removeEventListener(type, listener, thisArg);
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public TAG(): string 
        {
            return "picture";
        }

        /**
         * @inheritdoc
         */
        public CHILD_TAG(): string
        {
            return "face";
        }

        /**
         * Get SVG element to print picture and face rentagles on the screen.
         */
        public toSVG(): samchon.library.XML
        {
            // CONSTRUCT SVG ELEMENT
            var svg = new samchon.library.XML();
            svg.setTag("svg");
            svg.setProperty("width", "auto");
            svg.setProperty("height", "auto");

            // CONSTRUCT IMAGE
            var image = new samchon.library.XML();
            image.setTag("image");
            image.setProperty("xlink:href", this.url);
            image.setProperty("width", this.width);
            image.setProperty("height", this.height);
            
            // INSERT IMAGE
            svg.push(image);

            // INSERT FACE RECTANGLES
            for (var it = this.begin(); it.equals(this.end()) == false; it = it.next())
                svg.push(it.value.toSVG());

            return svg;
        }

        /**
         * Draw picture and face rectangles to the screen.
         */
        public draw(): void
        {
            var this_ = this;
            var canvas = new fabric.Canvas("my_picture");

            // CALL PICTURE
            fabric.Image.fromURL(this.url,
                function (image: fabric.IImage)
                {
                    // ADD IMAGE
                    canvas.add(image);

                    // ADD FACE RECTANGLES
                    for (var it = this_.begin(); it.equals(this_.end()) == false; it = it.next())
                        canvas.add(it.value.toRect());
                }
            );
        }
    }
}