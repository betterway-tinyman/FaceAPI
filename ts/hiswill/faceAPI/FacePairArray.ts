/// <reference path="FaceAPI.ts" />

/// <reference path="AsyncEntityArray.ts" />
///     <reference path="FacePair.ts" />

/// <reference path="FaceRectangle.ts" />

namespace hiswill.faceapi
{
    /**
     * <p> An abstract class containing FacePair objects as an array and parent of them. </p>
     *
     * <p> Reference </p>
     * <ul>
     *  <li> Add a Face into a FaceList: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395250 </li>
     *  <li> Add a Face into a Person: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523b </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    export class FacePairArray
        extends AsyncEntityArray<FacePair>
    {
        /* --------------------------------------------------------
            CONTRUCTORS
        -------------------------------------------------------- */
        /**
         * Construct from name. 
         *
         * @param name Name representing the FacePairArray.
         */
        public constructor(name: string = "")
        {
            super(name);
        }
    
        /**
         * @inheritdoc
         */
        protected createChild(xml: samchon.library.XML): FacePair
        {
            return new FacePair(this);
        }

        /**
         * Create a child FacePair instance from a FaceRectangle instance. 
         *
         * @param rect A FaceRectangle instance used to reference.
         */
        protected deductChild(rect: FaceRectangle): FacePair
        {
            var pair: FacePair;

            if (rect instanceof FacePair)
                pair = <FacePair>rect;
            else 
            {
                pair = new FacePair(this);
                pair.setRectangle(rect);

                if (rect instanceof Face)
                    pair.setFile(<Face>rect);
            }

            return pair;
        }

        /* ========================================================
            INSERTION METHODS
                - CHILD FACE
                - PREVIOUS
                - REPLACEMENTS
        ===========================================================
            CHILD FACE
        --------------------------------- */
        /**
         * Register a FacePair to the Face-API server. 
         *
         * @param face A FacePair instance to register
         */
        public registerFace(face: FacePair): void
        {
            throw new std.AbstractMethodError("FacePair::insertFaceToServer() has to be overriden.");
        }

        /**
         * Unregister a FacePair from the Face-API server.
         *
         * @param face Target instance to unregister.
         */
        public unregisterFace(face: FacePair): void
        {
            throw new std.AbstractMethodError("FacePair::eraseFaceFromServer() has to be overriden.");
        }

        /* ---------------------------------
            PREVIOUS INSERTION METHODS
        --------------------------------- */
        /**
         * @inheritdoc
         */
        public insert(position: std.Iterator<FacePair>, val: FacePair): std.Iterator<FacePair>;
        
        /**
         * @inheritdoc
         */
        public insert(position: std.Iterator<FacePair>, size: number, val: FacePair): std.Iterator<FacePair>;
        
        /**
         * @inheritdoc
         */
        public insert<U extends FacePair>
            (
                position: std.Iterator<FacePair>, 
                begin: std.Iterator<U>, end: std.Iterator<U>
            ): std.Iterator<FacePair>;

        /* ---------------------------------
            REPLACERS
        --------------------------------- */
        public insert(position: std.Iterator<FacePair>, val: FaceRectangle): std.Iterator<FaceRectangle>;
        public insert(position: std.Iterator<FacePair>, size: number, val: FaceRectangle): std.Iterator<FaceRectangle>;
        public insert<U extends FaceRectangle>
            (
                position: std.Iterator<FacePair>,
                begin: std.Iterator<U>, end: std.Iterator<U>
            ): std.Iterator<FacePair>;

        public insert<U extends FaceRectangle>(...args: any[]): any
        {
            var position: std.VectorIterator<FacePair> = args[0];

            if (args.length == 2 && args[1] instanceof FaceRectangle)
            {
                var rectangle: FaceRectangle = args[1];

                return super.insert(position, this.deductChild(rectangle));
            }
            else if (args.length == 3 && args[1] instanceof std.Iterator && args[2] instanceof std.Iterator)
            {
                var begin: std.Iterator<U> = args[1];
                var end: std.Iterator<U> = args[2];
                
                var myChildren: std.List<FacePair> = new std.List<FacePair>();

                for (var it = begin; it.equals(end) == false; it = it.next())
                    myChildren.pushBack(this.deductChild(it.value));

                return super.insert(position, myChildren.begin(), myChildren.end());
            }
            else
                throw new std.InvalidArgument("invalid parameter(s).");
        }

        public push(...items: FaceRectangle[]): number 
        {
            var newItems: Array<FacePair> = new Array<FacePair>();

            for (var i: number = 0; i < items.length; i++)
                newItems.push(this.deductChild(items[i]));

            return super.push(...newItems);
        }

        /* --------------------------------------------------------
            GETTERS & SETTERS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public key(): any
        {
            return this.id;
        }
        
        /**
         * An abstract method getting FaceAPI instance.
         */
        public getFaceAPI(): FaceAPI
        {
            // TO BE OVERRIDEN
            return null;
        }

        /* --------------------------------------------------------
            EXPORTERS
        -------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public CHILD_TAG(): string
        {
            return "facePair";
        }
    }
}