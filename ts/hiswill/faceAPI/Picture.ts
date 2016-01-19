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
     * <p> A picture entity who containing Face entities. </p>
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
            
            this.eventDispatcher = new samchon.library.EventDispatcher(this);
        }
    
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
            return "person";
        }

        /**
         * @inheritdoc
         */
        public CHILD_TAG(): string
        {
            return "face";
        }
    }
}