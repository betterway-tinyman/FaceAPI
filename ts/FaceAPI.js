var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        /**
         * <p> An entity, a standard data class. </p>
         *
         * <p> Entity is a class for standardization of expression method using on network I/O by XML. If
         * Invoke is a standard message protocol of Samchon Framework which must be kept, Entity is a
         * recommended semi-protocol of message for expressing a data class. Following the semi-protocol
         * Entity is not imposed but encouraged. </p>
         *
         * <p> As we could get advantages from standardization of message for network I/O with Invoke,
         * we can get additional advantage from standardizing expression method of data class with Entity.
         * We do not need to know a part of network communication. Thus, with the Entity, we can only
         * concentrate on entity's own logics and relationships between another entities. Entity does not
         * need to how network communications are being done. </p>
         *
         * <p> I say repeatedly. Expression method of Entity is recommended, but not imposed. It's a semi
         * protocol for network I/O but not a essential protocol must be kept. The expression method of
         * Entity, using on network I/O, is expressed by XML string. </p>
         *
         * <p> If your own network system has a critical performance issue on communication data class,
         * it would be better to using binary communication (with ByteArray).
         * Don't worry about the problem! Invoke also provides methods for binary data (ByteArray). </p>
         *
         * @author Jeongho Nam
         */
        var Entity = (function () {
            /**
             * <p> Default Constructor. </p>
             */
            function Entity() {
                //NOTHING
            }
            Entity.prototype.construct = function (xml) {
                // MEMBER VARIABLES; ATOMIC
                var propertyMap = xml.getPropertyMap();
                for (var v_it = propertyMap.begin(); v_it.equals(propertyMap.end()) != true; v_it = v_it.next())
                    if (this.hasOwnProperty(v_it.first) == true && (typeof this[v_it.first] == "number" || typeof this[v_it.first] == "string"))
                        this[v_it.first] = v_it.second;
                // MEMBER ENTITIES
                for (var e_it = xml.begin(); e_it.equals(xml.end()) != true; e_it = e_it.next()) {
                    if (this.hasOwnProperty(e_it.first) == true
                        && e_it.second.size() == 1
                        && (this[e_it.first] instanceof Entity || this[e_it.first] instanceof protocol.EntityArray)
                        && this[e_it.first] != null) {
                        var entity = this[e_it.first];
                        var e_xml = e_it.second.at(0);
                        if (entity == null)
                            continue;
                        entity.construct(e_xml);
                    }
                }
            };
            Entity.prototype.TAG = function () { return ""; };
            Entity.prototype.key = function () { return ""; };
            Entity.prototype.toXML = function () {
                var xml = new samchon.library.XML();
                xml.setTag(this.TAG());
                // MEMBERS
                for (var key in this)
                    if (typeof key == "string" &&
                        (typeof this[key] == "string" || typeof this[key] == "number")) {
                        xml.setProperty(key, this[key]);
                    }
                return xml;
            };
            return Entity;
        })();
        protocol.Entity = Entity;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    /* =========================================================
        + EXCEPTION
            + LOGIC_ERROR
                - DOMAIN_ERROR
                - INVALID_ARGUMENT
                - LENGTH_ERROR
                - OUT_OF_RANGE
            + RUNTIME_ERROR
                - OVERFLOW_ERROR
                - RANGE_ERROR
                - SYSTEM_ERROR
                - UNDERFLOW_ERROR
    ========================================================= */
    /**
     * <p> Standard exception class. </p>
     * <p> Base class for standard exceptions. </p>
     *
     * <p> All objects thrown by components of the standard library are derived from this class.
     * Therefore, all standard exceptions can be caught by catching this type by reference. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/exception/exception/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    var Exception = (function () {
        function Exception(what) {
            if (what === void 0) { what = ""; }
            this.message = what;
        }
        /**
         * <p> Get string identifying exception. </p>
         * <p> Returns a string that may be used to identify the exception. </p>
         *
         * <p> The particular representation pointed by the returned value is implementation-defined.
         * As a virtual function, derived classes may redefine this function so that specify value are
         * returned. </p>
         */
        Exception.prototype.what = function () {
            return this.message;
        };
        return Exception;
    })();
    std.Exception = Exception;
    /* =========================================================
        + LOGIC_ERROR
            - DOMAIN_ERROR
            - INVALID_ARGUMENT
            - LENGTH_ERROR
            - OUT_OF_RANGE
            - ABSTRACT_METHOD_ERROR
    ========================================================= */
    /**
     * <p> Logic error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report errors in the internal
     * logical of the program, such as violation of logical preconditions or class invariants. </p>
     *
     * <p> These errors are presumably detectable before the program executes. </p>
     *
     * <p> It is used as a base class for several logical error exceptions. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/stdexcept/logic_error/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    var LogicError = (function (_super) {
        __extends(LogicError, _super);
        function LogicError(what) {
            _super.call(this, what);
        }
        return LogicError;
    })(Exception);
    std.LogicError = LogicError;
    var DomainError = (function (_super) {
        __extends(DomainError, _super);
        function DomainError(what) {
            _super.call(this, what);
        }
        return DomainError;
    })(LogicError);
    std.DomainError = DomainError;
    var InvalidArgument = (function (_super) {
        __extends(InvalidArgument, _super);
        function InvalidArgument(what) {
            _super.call(this, what);
        }
        return InvalidArgument;
    })(LogicError);
    std.InvalidArgument = InvalidArgument;
    var LengthError = (function (_super) {
        __extends(LengthError, _super);
        function LengthError(what) {
            _super.call(this, what);
        }
        return LengthError;
    })(LogicError);
    std.LengthError = LengthError;
    var OutOfRange = (function (_super) {
        __extends(OutOfRange, _super);
        function OutOfRange(what) {
            _super.call(this, what);
        }
        return OutOfRange;
    })(LogicError);
    std.OutOfRange = OutOfRange;
    var AbstractMethodError = (function (_super) {
        __extends(AbstractMethodError, _super);
        function AbstractMethodError(what) {
            _super.call(this, what);
        }
        return AbstractMethodError;
    })(LogicError);
    std.AbstractMethodError = AbstractMethodError;
    /* =========================================================
        + RUNTIME_ERROR
            - OVERFLOW_ERROR
            - RANGE_ERROR
            - SYSTEM_ERROR
            - UNDERFLOW_ERROR
    ========================================================= */
    /**
     * <p> Runtime error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report errors that can only be
     * detected during runtime. </p>
     *
     * <p> It is used as a base class for several runtime error exceptions. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/stdexcept/runtime_error/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    var RuntimeError = (function (_super) {
        __extends(RuntimeError, _super);
        function RuntimeError(what) {
            _super.call(this, what);
        }
        return RuntimeError;
    })(Exception);
    std.RuntimeError = RuntimeError;
    var OverflowError = (function (_super) {
        __extends(OverflowError, _super);
        function OverflowError(what) {
            _super.call(this, what);
        }
        return OverflowError;
    })(RuntimeError);
    std.OverflowError = OverflowError;
    var UnderflowError = (function (_super) {
        __extends(UnderflowError, _super);
        function UnderflowError(what) {
            _super.call(this, what);
        }
        return UnderflowError;
    })(RuntimeError);
    std.UnderflowError = UnderflowError;
    var RangeError = (function (_super) {
        __extends(RangeError, _super);
        function RangeError(what) {
            _super.call(this, what);
        }
        return RangeError;
    })(RuntimeError);
    std.RangeError = RangeError;
    var SystemError = (function (_super) {
        __extends(SystemError, _super);
        function SystemError(what) {
            _super.call(this, what);
        }
        return SystemError;
    })(RuntimeError);
    std.SystemError = SystemError;
})(std || (std = {}));
/// <reference path="Iterator.ts" />
/// <reference path="Exception.ts" />
var std;
(function (std) {
    /**
     * An abstract class containing elements.
     *
     * @author Jeongho Nam
     */
    var Container = (function () {
        function Container() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
        }
        /**
         * <p> Assign Container content. </p>
         *
         * <p> Assigns new contents to the Container, replacing its current contents,
         * and modifying its size accordingly. </p>
         *
         * @param begin Input interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        Container.prototype.assign = function (begin, end) {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        /**
         * <p> Clear content. </p>
         *
         * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
         */
        Container.prototype.clear = function () {
            this.erase(this.begin(), this.end());
        };
        /* ---------------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------------- */
        Container.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        Container.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        /* ---------------------------------------------------------------
            GETTERS
        --------------------------------------------------------------- */
        /**
         * <p> Return iterator to beginning. </p>
         * <p> Returns an iterator referring the first element in the Container. </p>
         *
         * <h4> Note </h4>
         * <p> If the container is empty, the returned iterator is same with end(). </p>
         *
         * @return An iterator to the first element in the container.
         *         The iterator containes the first element's value.
         */
        Container.prototype.begin = function () {
            if (this.size() == 0)
                return this.end();
            else
                throw new std.AbstractMethodError("Have to be overriden.");
        };
        /**
         * <p> Return iterator to end. </p>
         * <p> Returns an iterator referring to the past-the-end element in the Container. </p>
         *
         * <p> The past-the-end element is the theoretical element that would follow the last element in
         * the Container. It does not point to any element, and thus shall not be dereferenced. </p>
         *
         * <p> Because the ranges used by functions of the Container do not include the element reference
         * by their closing iterator, this function is often used in combination with Container::begin() to specify
         * a range including all the elements in the container. </p>
         *
         * <h4> Note </h4>
         * <p> Returned iterator from Container.end() does not refer any element. Trying to accessing
         * element by the iterator will cause throwing exception (out of range). </p>
         * <p> If the container is empty, this function returns the same as Container::begin(). </p>
         *
         * @return An iterator to the end element in the container.
         */
        Container.prototype.end = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        /**
         * Return the number of elements in the Container.
         */
        Container.prototype.size = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        /**
         * Test whether the Container is empty.
         */
        Container.prototype.empty = function () {
            return this.size() == 0;
        };
        return Container;
    })();
    std.Container = Container;
    var PairContainer = (function (_super) {
        __extends(PairContainer, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Default Constructor
         */
        function PairContainer() {
            _super.call(this);
        }
        PairContainer.prototype.assign = function (begin, end) {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.clear = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        PairContainer.prototype.size = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.begin = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.end = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.find = function (key) {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairContainer.prototype.has = function (key) {
            return !this.find(key).equals(this.end());
        };
        PairContainer.prototype.get = function (key) {
            return this.find(key).second;
        };
        PairContainer.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        return PairContainer;
    })(Container);
    std.PairContainer = PairContainer;
})(std || (std = {}));
/// <reference path="Container.ts" />
/// <reference path="Exception.ts" />
var std;
(function (std) {
    var Iterator = (function () {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from the source Container.
         *
         * @param source The source Container.
         */
        function Iterator(source) {
            this.source = source;
        }
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * Get iterator to previous element.
         */
        Iterator.prototype.prev = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        /**
         * Return an Iterator.
         */
        Iterator.prototype.next = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        /**
         * Advances the Iterator by n element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced Iterator.
         */
        Iterator.prototype.advance = function (n) {
            var it = this;
            var i;
            if (n >= 0) {
                for (i = 0; i < n; i++)
                    if (it.equals(this.source.end()))
                        return this.source.end();
                    else
                        it = it.next();
            }
            else {
                n = n * -1;
                for (i = 0; i < n; i++)
                    if (it.equals(this.source.end()))
                        return this.source.end();
                    else
                        it = it.prev();
            }
            return it;
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        Iterator.prototype.equals = function (obj) {
            return this.source == obj.source;
        };
        /**
         * Get source.
         */
        Iterator.prototype.getSource = function () {
            return this.source;
        };
        Object.defineProperty(Iterator.prototype, "value", {
            /**
             * Get value.
             */
            get: function () {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            /**
             * Set value.
             */
            set: function (val) {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            enumerable: true,
            configurable: true
        });
        return Iterator;
    })();
    std.Iterator = Iterator;
    var PairIterator = (function (_super) {
        __extends(PairIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from the source PairContainer.
         *
         * @param source The source PairContainer.
         */
        function PairIterator(source) {
            _super.call(this, source);
        }
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        PairIterator.prototype.prev = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        PairIterator.prototype.next = function () {
            throw new std.AbstractMethodError("Have to be overriden.");
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        PairIterator.prototype.equals = function (obj) {
            return this.source == obj.source;
        };
        Object.defineProperty(PairIterator.prototype, "first", {
            get: function () {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            set: function (val) {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PairIterator.prototype, "second", {
            get: function () {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            set: function (val) {
                throw new std.AbstractMethodError("Have to be overriden.");
            },
            enumerable: true,
            configurable: true
        });
        return PairIterator;
    })(Iterator);
    std.PairIterator = PairIterator;
})(std || (std = {}));
/// <reference path="Container.ts" />
/// <reference path="Iterator.ts" />
var std;
(function (std) {
    /**
     * <p> Vectors are sequence containers representing arrays that can change in size. </p>
     *
     * <p> Just like arrays, vectors use contiguous storage locations for their elements, which means that
     * their elements can also be accessed using offsets on regular pointers to its elements, and just as
     * efficiently as in arrays. But unlike arrays, their size can change dynamically, with their storage
     * being handled automatically by the container. </p>
     *
     * <p> Internally, Vectors use a dynamically allocated array to store their elements. This array may
     * need to be reallocated in order to grow in size when new elements are inserted, which implies
     * allocating a new array and moving all elements to it. This is a relatively expensive task in terms
     * of processing time, and thus, vectors do not reallocate each time an element is added to the
     * container. </p>
     *
     * <p> Instead, vector containers may allocate some extra storage to accommodate for possible growth,
     * and thus the container may have an actual capacity greater than the storage strictly needed to
     * contain its elements (i.e., its size). Libraries can implement different strategies for growth to
     * balance between memory usage and reallocations, but in any case, reallocations should only happen at
     * logarithmically growing intervals of size so that the insertion of individual elements at the end of
     * the vector can be provided with amortized constant time complexity. </p>
     *
     * <p> Therefore, compared to arrays, vectors consume more memory in exchange for the ability to manage
     * storage and grow dynamically in an efficient way. </p>
     *
     * <p> Compared to the other dynamic sequence containers (deques, lists and forward_lists), vectors are
     * very efficient accessing its elements (just like arrays) and relatively efficient adding or removing
     * elements from its end. For operations that involve inserting or removing elements at positions other
     * than the end, they perform worse than the others, and have less consistent iterators and references
     * than Lists. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/vector/vector/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    var Vector = (function (_super) {
        __extends(Vector, _super);
        function Vector() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            if (args.length == 0) {
            }
            if (args.length == 1 && args[0] instanceof Array) {
                // CONSTRUCT FROM AN ARRAY OF ITEMS
                var array = args[0];
                this.push.apply(this, array);
            }
            else if (args.length == 1 && typeof args[0] == "number") {
                // CONSTRUCT FROM SIZE
                var size = args[0];
                this.length = size;
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                // CONSTRUCT FROM SIZE AND REPEATING VALUE
                var size = args[0];
                var val = args[1];
                this.assign(size, val);
            }
            else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof std.Container)) {
                // COPY CONSTRUCTOR
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // CONSTRUCT FROM INPUT ITERATORS
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
        }
        Vector.prototype.assign = function (first, second) {
            this.clear();
            if (first instanceof std.Iterator && second instanceof std.Iterator) {
                var begin = first;
                var end = second;
                for (var it = begin; it.equals(end) == false; it = it.next())
                    this.push(it.value);
            }
            else if (typeof first == "number") {
                var size = first;
                var val = second;
                this.length = size;
                for (var i = 0; i < size; i++)
                    this[i] = val;
            }
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.clear = function () {
            this.erase(this.begin(), this.end());
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Vector.prototype.begin = function () {
            if (this.size() == 0)
                return this.end();
            else
                return new VectorIterator(this, 0);
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.end = function () {
            return new VectorIterator(this, -1);
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.size = function () {
            return this.length;
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.empty = function () {
            return this.length == 0;
        };
        /**
         * <p> Access element. </p>
         * <p> Returns a value to the element at position <code>index</code> in the Vector.</p>
         *
         * <p> The function automatically checks whether n is within the bounds of valid elements in the
         * Vector, throwing an OutOfRange exception if it is not (i.e., if <code>index</code> is greater or
         * equal than its size). This is in contrast with member operator[], that does not check against
         * bounds. </p>
         *
         * @param index Position of an element in the container.
         *              If this is greater than or equal to the vector size, an exception of type OutOfRange
         *              is thrown. Notice that the first element has a position of 0 (not 1).
         *
         * @return The element at the specified position in the container.
         */
        Vector.prototype.at = function (index) {
            if (index < this.size())
                return this[index];
            else
                throw new std.OutOfRange("Target index is greater than Vector's size.");
        };
        /**
         * <p> Access first element. </p>
         * <p> Returns a value in the first element of the Vector. </p>
         *
         * <p> Unlike member <code>Vector.begin()</code>, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the first element of the Vector.
         */
        Vector.prototype.front = function () {
            return this.at(0);
        };
        /**
         * <p> Access last element. </p>
         * <p> Returns a value in the last element of the Vector. </p>
         *
         * <p> Unlike member <code>Vector.end()</code>, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the last element of the Vector.
         */
        Vector.prototype.back = function () {
            return this.at(this.length - 1);
        };
        /* ---------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------- */
        Vector.prototype.pushBack = function (element) {
            this.push(element);
        };
        /**
         * Replaces the element at the specified position in this list with the specified element.
         *
         * @param index A specified position of the value to replace.
         * @param val A value to be stored at the specified position.
         *
         * @return The previous element had stored at the specified position.
         */
        Vector.prototype.set = function (index, val) {
            if (index > this.length)
                throw new std.OutOfRange("Target index is greater than Vector's size.");
            var prev = this[index];
            this[index] = val;
            return prev;
        };
        /**
         * <p> Delete last element. </p>
         *
         * <p> Removes the last element in the Vector container, effectively reducing the container
         * <code>size</code> by one. </p>
         */
        Vector.prototype.popBack = function () {
            this.erase(this.end().prev());
        };
        Vector.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var position = args[0];
            if (args.length == 2 && args[1] instanceof std.Iterator == false) {
                var val = args[1];
                return this.insert(position, 1, val);
            }
            else if (args.length == 3 && typeof args[1] == "number") {
                var size = args[1];
                var val = args[2];
                var spliced = this.splice(position.getIndex());
                var inserts = [];
                for (var i = 0; i < size; i++)
                    inserts.push(val);
                this.push.apply(this, spliced);
                this.push.apply(this, inserts);
                return new VectorIterator(this, position.getIndex() + inserts.length);
            }
            else if (args.length == 3 && args[1] instanceof std.Iterator && args[2] instanceof std.Iterator) {
                var myEnd = args[0];
                var begin = args[1];
                var end = args[2];
                var spliced = this.splice(position.getIndex());
                var inserts = [];
                for (var it = begin; it.equals(end) == false; it = it.next())
                    inserts.push(it.value);
                this.push.apply(this, spliced);
                this.push.apply(this, inserts);
                return new VectorIterator(this, myEnd.getIndex() + inserts.length);
            }
            else
                throw new std.InvalidArgument("invalid parameters.");
        };
        Vector.prototype.erase = function (begin, end) {
            if (end === void 0) { end = null; }
            var startIndex = begin.getIndex();
            if (end == null)
                this.splice(startIndex, 1);
            else
                this.splice(startIndex, end.getIndex() - startIndex);
            return new VectorIterator(this, startIndex);
        };
        return Vector;
    })(Array);
    std.Vector = Vector;
    ;
    /**
     * <p> A bi-directional iterator of a Set. </p>
     *
     * <ul>
     *  <li> _Ty: Type of the elements. </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    var VectorIterator = (function (_super) {
        __extends(VectorIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Vector instead. </p>
         *
         * @param vector The source vector to reference.
         * @param index Sequence number of the element in the surce vector.
         */
        function VectorIterator(source, index) {
            _super.call(this, source);
            this.index = index;
        }
        Object.defineProperty(VectorIterator.prototype, "vector", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            get: function () {
                return this.source;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VectorIterator.prototype, "value", {
            /**
             * <p> Get value of the iterator is pointing. </p>
             *
             * @return A value of the iterator.
             */
            get: function () {
                return this.vector.at(this.index);
            },
            /**
             * <p> Set value of the iterator is pointing. </p>
             *
             * @param val A new value of the iterator.
             */
            set: function (val) {
                this.vector.set(this.index, val);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * <p> Whether an iterator is equal with the iterator. </p>
         * <p> Compare two iterators and returns whether they are equal or not. </p>
         *
         * <h4> Note </h4>
         * <p> Iterator's equals() only compare souce map and index number. </p>
         * <p> Although elements in a pair, key and value are equals, if the source map or
         * index number is different, then the equals() will return false. If you want to
         * compare the elements of a pair, compare them directly by yourself. </p>
         *
         * @param obj An iterator to compare
         * @return Indicates whether equal or not.
         */
        VectorIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.index == obj.index;
        };
        VectorIterator.prototype.getIndex = function () {
            return this.index;
        };
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * <p> Get iterator to previous element. </p>
         * <p> If current iterator is the first item(equal with <i>begin()</i>), returns end(). </p>
         *
         * @return An iterator of the previous item.
         */
        VectorIterator.prototype.prev = function () {
            if (this.index <= 0)
                return this.source.end();
            else
                return new VectorIterator(this.vector, this.index - 1);
        };
        /**
         * <p> Get iterator to next element. </p>
         * <p> If current iterator is the last item, returns end(). </p>
         *
         * @return An iterator of the next item.
         */
        VectorIterator.prototype.next = function () {
            if (this.index >= this.source.size() - 1)
                return this.source.end();
            else
                return new VectorIterator(this.vector, this.index + 1);
        };
        VectorIterator.prototype.advance = function (n) {
            var newIndex = this.index + n;
            if (newIndex < 0 || newIndex >= this.source.size())
                return this.source.end();
            else
                return new VectorIterator(this.vector, newIndex);
        };
        return VectorIterator;
    })(std.Iterator);
    std.VectorIterator = VectorIterator;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> A pair of values. </p>
     * <ul>
     *  <li> _Ty1: Type of member fisrt. </li>
     *  <li> _Ty2 Type of member second. </li>
     * </ul>
     *
     * <p> This class couples together a pair of values, which may be of different types
     * (_Ty1 and _Ty2). The individual values can be accessed through its public members
     * first and second. </p>
     *
     * <p> Same with std::pair (http://www.cplusplus.com/reference/utility/pair/) </p>
     *
     * @author Jeongho Nam
     */
    var Pair = (function () {
        /**
         * <p> Construct from pair values. </p>
         *
         * @param first The first value of the Pair
         * @param second The second value of the Pair
         */
        function Pair(first, second) {
            this.first = first;
            this.second = second;
        }
        /**
         * <p> Whether a Pair is equal with the Pair. <p>
         * <p> Compare each first and second value of two Pair(s) and returns whether they are equal or not. </p>
         *
         * <p> If stored key and value in a Pair are not number or string but an object like a class or struct,
         * the comparison will be executed by a member method (SomeObject)::equals(). If the object does not have
         * the member method equals(), only address of pointer will be compared. </p>
         *
         * @param obj A Map to compare
         * @return Indicates whether equal or not.
         */
        Pair.prototype.equals = function (obj) {
            var first;
            var second;
            if (this.first.hasOwnProperty("equals") && this.first["equals"] instanceof Function)
                first = this.first["equals"](obj.first);
            else
                first = this.first == obj.first;
            if (this.second.hasOwnProperty("equals") && this.second["equals"] instanceof Function)
                second = this.second["equals"](obj.second);
            else
                second = this.second == obj.second;
            return first == true && second == true;
        };
        /**
         * <p> Returns a string representation of the Map. </p>
         *
         * <p> The returned string will follow the form of JSonObject </p>
         * <ul>
         *	<li> {"first": "???", "second": ???} </li>
         * </ul>
         */
        Pair.prototype.toString = function () {
            return "{first: " + this.first + ", second: " + this.second + "}";
        };
        return Pair;
    })();
    std.Pair = Pair;
})(std || (std = {}));
/// <reference path="Container.ts" />
/// <reference path="IMap.ts" />
/// <reference path="Iterator.ts" />
/// <reference path="Vector.ts" />
/// <reference path="Pair.ts" />
var std;
(function (std) {
    /**
     * <p> A map containing pairs of key and value. </p>
     * <ul>
     *  <li> _Kty: Type of the keys. Each element in a map is uniquely identified by its key value. </li>
     *  <li> _Ty: Type of the mapped value. Each element in a map stores some data as its mapped value. </li>
     * </ul>
     *
     * <p> Map is designed to pursuing formality in JavaScript. </p>
     * <h4> Definition of std::unordered_map. </h4>
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_map/unordered_map/ </li>
     * </ul>
     *
     * <p> Unordered maps are associative containers that store elements formed by the combination of
     * a key value and a mapped value, and which allows for fast retrieval of individual elements
     * based on their keys. </p>
     *
     * <p> In an unordered_map, the key value is generally used to uniquely identify the element, while the
     * mapped value is an object with the content associated to this key. Types of key and mapped value may
     * differ. </p>
     *
     * <p> Internally, the elements in the unordered_map are not sorted in any particular order with respect to
     * either their key or mapped values, but organized into buckets depending on their hash values to allow
     * for fast access to individual elements directly by their key values (with a constant average time
     * complexity on average). </p>
     *
     * <p> unordered_map containers are faster than map containers to access individual elements by their key,
     * although they are generally less efficient for range iteration through a subset of their elements. </p>
     *
     * <p> Unordered maps implement the direct access operator (operator[]) which allows for direct access of
     * the mapped value using its key value as argument. </p>
     *
     * <p> Iterators in the container are at least forward iterators. </p>
     *
     * <h4> Differences between std::unordered_map. </h4>
     * <ul>
     *	<li> Addicted Methods </li>
     *	<ul>
     *		<li> has := { find(key) != end(); } </li>
     *		<li> set := { insert({key, value}); } </li>
     *		<li> get := { find(key).second; } </li>
     *	</ul>
     *	<li> Depreciated Methods </li>
     *	<ul>
     *		<li> Modifier methods using iterators </li>
     *		<li> operator[] </li>
     *	</ul>
     * </ul>
     *
     * <h4> Note </h4>
     * <p> Do not use operator[] and hasOwnProperty(). Use get() and has() instead. </p>
     * <p> Do not iterate by <i>for statement</i> used for dynamic object of JavaScript; <i>for(var key in Map)</i> </p>.
     * <p> Use <i>iterator</i> with begin() and end() instaed. </p>
     *
     * @author Jeongho Nam
     */
    var UnorderedMap = (function (_super) {
        __extends(UnorderedMap, _super);
        function UnorderedMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.data_ = new std.Vector();
        }
        UnorderedMap.prototype.assign = function (begin, end) {
            this.data_.assign(begin, end);
        };
        UnorderedMap.prototype.clear = function () {
            this.data_.clear();
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * <p> Get data. </p>
         * <p> Returns the source container of the Map. </p>
         *
         * <h4> Note </h4>
         * <p> Changes on the returned container influences the source Map. </p>
         */
        UnorderedMap.prototype.data = function () {
            return this.data_;
        };
        /**
         * <p> Return container size. </p>
         * <p> Returns the number of elements in Map container. </p>
         *
         * @return The number of elements in the container.
         */
        UnorderedMap.prototype.size = function () {
            return this.data_.size();
        };
        /**
         * <p> Get iterator to element. </p>
         *
         * <p> Searches the container for an element with a identifier equivalent to <i>key</i> and
         * returns an iterator to it if found, otherwise it returns an iterator to Map::end(). </p>
         *
         * <p> Two keys are considered equivalent if the container's comparison object returns false
         * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
         *
         * <p> Another member function, Map.has(), can be used to just check whether
         * a particular key exists. </p>
         *
         * @param key Key to be searched for
         * @return An iterator to the element, if an element with specified key is found, or Map::end() otherwise.
         */
        UnorderedMap.prototype.find = function (key) {
            var i;
            if (key.hasOwnProperty("equals") == true) {
                for (i = 0; i < this.data_.size(); i++)
                    if (this.data_.at(i).first["equals"](key) == true)
                        return new UnorderedMapIterator(this, i);
            }
            else {
                for (i = 0; i < this.data_.size(); i++)
                    if (this.data_.at(i).first == key)
                        return new UnorderedMapIterator(this, i);
            }
            return this.end();
        };
        /* ---------------------------------------------------------
            GETTERS
        --------------------------------------------------------- */
        /**
         * <p> Whether have the item or not. </p>
         * <p> Indicates whether a map has an item having the specified identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         * @return Whether the map has an item having the specified identifier
         */
        UnorderedMap.prototype.has = function (key) {
            return !this.find(key).equals(this.end());
        };
        /**
         * <p> Get element by key. </p>
         * <p> Returns a reference to the mapped value of the element identified with key. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         * @throw exception out of range.
         *
         * @return A reference object of the mapped value (_Ty)
         */
        UnorderedMap.prototype.get = function (key) {
            return this.find(key).second;
        };
        /* ---------------------------------------------------------
            ITERATORS
        --------------------------------------------------------- */
        /**
         * <p> Return iterator to beginning. </p>
         * <p> Returns an iterator referring the first element in the Map container. </p>
         *
         * <h4> Note </h4>
         * <p> If the container is empty, the returned iterator is same with end(). </p>
         *
         * @return An iterator to the first element in the container.
         *         The iterator containes the first element's pair; key and value.
         */
        UnorderedMap.prototype.begin = function () {
            if (this.size() == 0)
                return this.end();
            return new UnorderedMapIterator(this, 0);
        };
        /**
         * <p> Return iterator to end. </p>
         * <p> Returns an iterator referring to the past-the-end element in the Map container. </p>
         *
         * <p> The past-the-end element is the theoretical element that would follow the last element in
         * the Map container. It does not point to any element, and thus shall not be dereferenced. </p>
         *
         * <p> Because the ranges used by functions of the Map do not include the element reference
         * by their closing iterator, this function is often used in combination with Map::begin() to specify
         * a range including all the elements in the container. </p>
         *
         * <h4> Note </h4>
         * <p> Returned iterator from Map.end() does not refer any element. Trying to accessing
         * element by the iterator will cause throwing exception (out of range). </p>
         * <p> If the container is empty, this function returns the same as Map::begin(). </p>
         *
         * @return An iterator to the end element in the container.
         */
        UnorderedMap.prototype.end = function () {
            return new UnorderedMapIterator(this, -1);
        };
        UnorderedMap.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1 && args[0] instanceof std.Pair)
                return this.insertByKey(args[0]);
            else if (args.length == 2 && args[1] instanceof std.Pair)
                return this.insertByHint(args[0], args[1]);
            else if (args.length == 2 && args[1] instanceof std.PairIterator)
                return this.insertByRange(args[0], args[1]);
            else
                throw new std.InvalidArgument("Invalid parameters are passed to UnorderedMap.insert()");
        };
        UnorderedMap.prototype.insertByKey = function (pair) {
            if (this.has(pair.first) == false)
                return new std.Pair(this.end(), false);
            else {
                this.data_.pushBack(pair);
                return new std.Pair(this.end().prev(), true);
            }
        };
        UnorderedMap.prototype.insertByHint = function (hint, pair) {
            var index = hint.getIndex();
            if (index == -1)
                index = this.data_.size() - 1;
            this.data_.push(pair);
            return new UnorderedMapIterator(this, index);
        };
        UnorderedMap.prototype.insertByRange = function (begin, end) {
            var begin;
            var end;
            for (var it = begin; it.equals(end) == false; it = it.next())
                if (this.has(it.first) == false)
                    this.data_.pushBack(new std.Pair(it.first, it.second));
        };
        UnorderedMap.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1 && args[0] instanceof std.PairIterator == false)
                return this.eraseByKey(args[0]);
            else if (args.length == 1 && args[0] instanceof std.PairIterator)
                return this.eraseByIterator(args[0]);
            else if (args.length == 2 && args[0] instanceof std.PairIterator && args[1] instanceof std.PairIterator)
                return this.eraseByRange(args[0], args[1]);
            else
                throw new std.InvalidArgument("Invalid parameters are passed to UnorderedMap.erase()");
        };
        UnorderedMap.prototype.eraseByKey = function (key) {
            if (this.has(key) == true)
                this.erase(this.find(key));
            return this.size();
        };
        UnorderedMap.prototype.eraseByIterator = function (it) {
            var index = it.getIndex();
            this.data_.splice(index, 1);
            if (this.empty() == true)
                index = -1;
            return new UnorderedMapIterator(this, index);
        };
        UnorderedMap.prototype.eraseByRange = function (begin, end) {
            var beginIndex = begin.getIndex();
            var endIndex = end.getIndex();
            this.data_.splice(beginIndex, endIndex);
            if (this.empty() == true)
                beginIndex = -1;
            return new UnorderedMapIterator(this, beginIndex);
        };
        /**
         * <p> Set element. </p>
         * <p> Set an item as the specified identifier. </p>
         *
         * <p> If the identifier is already in map, change value of the identifier.
         * If not, then insert the object with the identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         * @param val Value, the item.
         */
        UnorderedMap.prototype.set = function (key, value) {
            for (var i = 0; i < this.data_.size(); i++)
                if (this.data_.at(i).first == key) {
                    this.data_.at(i).second = value;
                    return;
                }
            this.data_.push(new std.Pair(key, value));
        };
        /**
         * <p> Pop an element. </p>
         * <p> Removes an element by its key(identifier) from the Map container and returns it. </p>
         *
         * @param key Key of the element to be removed from the Map.
         * @throw exception out of range.
         */
        UnorderedMap.prototype.pop = function (key) {
            for (var i = 0; i < this.data_.size(); i++)
                if (this.data_.at(i).first == key)
                    return this.data_.splice(i, 1)[0].second;
            throw Error("out of range");
        };
        /* ---------------------------------------------------------
            COMPARE
        --------------------------------------------------------- */
        /**
         * <p> Whether a Map is equal with the Map. </p>
         *
         * <p> Map::equals() does not compare reference(address of pointer) of Maps or elements
         * in the two Maps. The target of comparison are the key and value in all children elements(pairs).
         * It's not a matter that order sequence of children are different between two Maps. </p>
         *
         * <p> If stored key or value in a pair (element) in those Maps are not number or string, but an object
         * like a class or struct, the comparison will be executed by a member method (SomeObject)::equals(). If
         * the object does not have the member method equals(), only address of pointer will be compared. </p>
         *
         * @param obj A Map to compare
         * @return Indicates whether equal or not.
         */
        UnorderedMap.prototype.equals = function (obj) {
            if (this.size() != obj.size())
                return false;
            for (var i = 0; i < this.data_.size(); i++)
                if (this.data_.at(i).equals(obj.data_.at(i)) == false)
                    return false;
            return true;
        };
        /* ---------------------------------------------------------
            EXPORT
        --------------------------------------------------------- */
        /**
         * <p> Returns a string representation of the Map. </p>
         *
         * <p> The returned string will follow the form of JSonObject </p>
         * <ul>
         *	<li> {{"key": "???", "value": ???}, {"key": "?", "value": ?}, ...} </li>
         * </ul>
         */
        UnorderedMap.prototype.toString = function () {
            var str = "{";
            for (var i = 0; i < this.data_.size(); i++) {
                var pair = this.data_.at(i);
                var key = "\"" + pair.first + "\"";
                var value = (typeof pair.second == "string")
                    ? "\"" + pair.second + "\""
                    : String(pair.second);
                str += "{\"key\": " + key + ": value: " + value + "}";
            }
            str += "}";
            return str;
        };
        return UnorderedMap;
    })(std.PairContainer);
    std.UnorderedMap = UnorderedMap;
    /**
     * <p> A bi-directional iterator. </p>
     * <ul>
     *  <li> _Kty: Type of the keys. Each element in a map is uniquely identified by its key value. </li>
     *  <li> _Ty: Type of the mapped value. Each element in a map stores some data as its mapped value. </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    var UnorderedMapIterator = (function (_super) {
        __extends(UnorderedMapIterator, _super);
        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Map instead. </p>
         *
         * @param map The source map to reference
         * @param index Sequence number of the element in the source map
         */
        function UnorderedMapIterator(source, index) {
            _super.call(this, source);
            if (index != -1 && index < source.size())
                this.index = index;
            else
                this.index = -1;
        }
        Object.defineProperty(UnorderedMapIterator.prototype, "map", {
            /* ---------------------------------------------------------
                GETTERS AND SETTERS
            --------------------------------------------------------- */
            get: function () {
                return (this.source);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnorderedMapIterator.prototype, "first", {
            /**
             * <p> Get first element (key). </p>
             */
            get: function () {
                return this.map.data().at(this.index).first;
            },
            /**
             * <p> Set first element (key). </p>
             */
            set: function (key) {
                this.map.data().at(this.index).first = key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnorderedMapIterator.prototype, "second", {
            /**
             * <p> Get second element (mapped value). </p>
             */
            get: function () {
                return this.map.data().at(this.index).second;
            },
            /**
             * <p> Set second element (mapped value). </p>
             */
            set: function (val) {
                this.map.data().at(this.index).second = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Get index.
         */
        UnorderedMapIterator.prototype.getIndex = function () {
            return this.index;
        };
        /* ---------------------------------------------------------
            COMPARISON
        --------------------------------------------------------- */
        /**
         * <p> Whether an iterator is equal with the iterator. </p>
         * <p> Compare two iterators and returns whether they are equal or not. </p>
         *
         * <h4> Note </h4>
         * <p> Iterator's equals() only compare souce map and index number. </p>
         * <p> Although elements in a pair, key and value are equals, if the source map or
         * index number is different, then the equals() will return false. If you want to
         * compare the elements of a pair, compare them directly by yourself. </p>
         *
         * @param obj An iterator to compare
         * @return Indicates whether equal or not.
         */
        UnorderedMapIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.index == obj.index;
        };
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * <p> Get iterator to previous element. </p>
         * <p> If current iterator is the first item(equal with <i>begin()</i>), returns end(). </p>
         *
         * @return An iterator of the previous item.
         */
        UnorderedMapIterator.prototype.prev = function () {
            if (this.index - 1 < 0)
                return this.map.end();
            else
                return new UnorderedMapIterator(this.map, this.index - 1);
        };
        /**
         * <p> Get iterator to next element. </p>
         * <p> If current iterator is the last item, returns end(). </p>
         *
         * @return An iterator of the next item.
         */
        UnorderedMapIterator.prototype.next = function () {
            if (this.index + 1 >= this.map.size())
                return this.map.end();
            else
                return new UnorderedMapIterator(this.map, this.index + 1);
        };
        return UnorderedMapIterator;
    })(std.PairIterator);
    std.UnorderedMapIterator = UnorderedMapIterator;
})(std || (std = {}));
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        /**
         * <p> A utility class supporting static methods of string. </p>
         *
         * @author Jeongho Nam
         */
        var StringUtil = (function () {
            function StringUtil() {
            }
            /**
             * <p> Get a tabbed string by specified size. </p>
             */
            StringUtil.tab = function (size) {
                var str = "";
                for (var i = 0; i < size; i++)
                    str += "\t";
                return str;
            };
            /**
             * <p> Get a tabbed HTLM string by specified size. </p>
             */
            StringUtil.htmlTab = function (size) {
                var str = "";
                for (var i = 0; i < size; i++)
                    str += "&nbsp;&nbsp;&nbsp;&nbsp;";
                return str;
            };
            /*public static substitute(format: string, ...args: any[]): string
            {
                return "";
            }*/
            /**
             * <p> Replace all patterns of a string. </p>
             */
            StringUtil.replaceAll = function (str, pairs) {
                if (pairs.length == 0)
                    return str;
                for (var i = 0; i < pairs.length; i++)
                    str = str.split(pairs[i].first).join(pairs[i].second);
                return str;
            };
            return StringUtil;
        })();
        library.StringUtil = StringUtil;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
/// <reference path="../../std/UnorderedMap.ts" />
///     <reference path="XMLList.ts" />
/// <reference path="StringUtil.ts" />
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        /**
         * <p> XML is a class representing a tree structued xml objects. </p>
         * <p> The XML class provides methods and properties for working with XML objects. </p>
         *
         * <p> The XML class (along with the XMLList and Namespace) implements
         * the powerful XML-handling standard defined in ECMAScript for XML (E4X) specification. </p>
         *
         * <p> XML class has a recursive, hierarchical relationship. </p>
         *
         * <p> Relationships between XML and XMLList </p>
         * <ul>
         *	<li> XML contains XMLList from dictionary of XMLList. </li>
         *  <li> XMLList contains XML from vector of XML. </li>
         * </ul>
         *
         * <h4> Note </h4>
         * <p> Do not abuse values for expressing member variables. </p>
         *
         * <table>
         *	<tr>
         *		<th>Standard Usage</th>
         *		<th>Non-standard usage abusing value</th>
         *	</tr>
         *	<tr>
         *		<td>
         *			&lt;memberList&gt;<br/>
         *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;member id='jhnam88' name='Jeongho+Nam' birthdate='1988-03-11' /&gt;<br/>
         *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;member id='master' name='Administartor' birthdate='2011-07-28' /&gt;<br/>
         *			&lt;/memberList&gt;
         *		</td>
         *		<td>
         *			&lt;member&gt;<br/>
         *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;id&gt;jhnam88&lt;/id&gt;<br/>
         *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;name&gt;Jeongho+Nam&lt;/name&gt;<br/>
         *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;birthdate&gt;1988-03-11&lt;/birthdate&gt;<br/>
         *			&lt;/member&gt;
         *		</td>
         *	</tr>
         * </table>
         *
         * @author Jeongho Nam
         */
        var XML = (function (_super) {
            __extends(XML, _super);
            /* -------------------------------------------------------------
                CONSTRUCTORS
            ------------------------------------------------------------- */
            /**
             * <p> Default Constructor. </p>
             *
             * <p> If the string parameter is not omitted, constructs its tag, value and
             * properties by parsing the string. If there's children, then construct the
             * children XML, XMLList objects, too. </p>
             *
             * @param str A string to be parsed
             */
            function XML(str) {
                if (str === void 0) { str = ""; }
                _super.call(this);
                this.properties = new std.UnorderedMap();
                this.value = "";
                if (str.indexOf("<") == -1)
                    return;
                var start;
                var end;
                //ERASE HEADER OF XML
                if ((start = str.indexOf("<?xml")) != -1) {
                    end = str.indexOf("?>", start);
                    if (end != -1)
                        str = str.substr(end + 2);
                }
                //ERASE COMMENTS
                while ((start = str.indexOf("<!--")) != -1) {
                    end = str.indexOf("-->", start);
                    if (end != -1)
                        break;
                    str = str.substr(0, start) + str.substr(end + 3);
                }
                //BEGIN PARSING
                this.construct(str);
            }
            /**
             * <p> Construct XML objects by parsing a string. </p>
             */
            XML.prototype.construct = function (str) {
                this.parseTag(str);
                this.parseProperty(str);
                var res = this.parseValue(str);
                if (res.second == true)
                    this.parseChildren(res.first);
            };
            /**
             * <p> Parse and fetch a tag. </p>
             */
            XML.prototype.parseTag = function (str) {
                var start = str.indexOf("<") + 1;
                var end = this.calcMinIndex(str.indexOf(" ", start), str.indexOf("\r\n", start), str.indexOf("\n", start), str.indexOf("\t", start), str.indexOf(">", start), str.indexOf("/", start));
                if (start == 0 || end == -1)
                    return;
                this.tag = str.substring(start, end);
            };
            /**
             * <p> Parse and fetch properties. </p>
             */
            XML.prototype.parseProperty = function (str) {
                var start = str.indexOf("<" + this.tag) + this.tag.length + 1;
                var end = this.calcMinIndex(str.lastIndexOf("/"), str.indexOf(">", start));
                if (start == -1 || end == -1 || start >= end)
                    return;
                //<comp label='ABCD' /> : " label='ABCD' "
                var line = str.substring(start, end);
                if (line.indexOf("=") == -1)
                    return;
                var label;
                var value;
                var helpers = new Array();
                var inQuote = false;
                var quoteType;
                var equal;
                //INDEXING
                for (var i = 0; i < line.length; i++) {
                    //Start of quote
                    if (inQuote == false && (line.charAt(i) == "'" || line.charAt(i) == "\"")) {
                        inQuote = true;
                        start = i;
                        if (line.charAt(i) == "'")
                            quoteType = 1;
                        else if (line.charAt(i) == "\"")
                            quoteType = 2;
                    }
                    else if (inQuote == true &&
                        ((quoteType == 1 && line.charAt(i) == "'") ||
                            (quoteType == 2 && line.charAt(i) == "\""))) {
                        helpers.push({ "type": quoteType, "start": start, "end": i });
                        inQuote = false;
                    }
                }
                //CONSTRUCTING
                for (var i = 0; i < helpers.length; i++) {
                    var quote = helpers[i];
                    if (i == 0) {
                        equal = line.indexOf("=");
                        label = line.substring(0, equal).trim();
                    }
                    else {
                        equal = line.indexOf("=", helpers[i - 1]["end"] + 1);
                        label = line.substring(helpers[i - 1]["end"] + 1, equal).trim();
                    }
                    value = line.substring(helpers[i]["start"] + 1, helpers[i]["end"]);
                    this.setProperty(label, XML.decodeProperty(value));
                }
            };
            /**
             * <p> Parse and fetch a value. </p>
             */
            XML.prototype.parseValue = function (str) {
                var end_slash = str.lastIndexOf("/");
                var end_block = str.indexOf(">");
                if (end_slash < end_block || end_slash + 1 == str.lastIndexOf("<")) {
                    //STATEMENT1: <TAG />
                    //STATEMENT2: <TAG></TAG> -> SAME WITH STATEMENT1: <TAG />
                    this.value = "";
                    return new std.Pair(str, false);
                }
                var start = end_block + 1;
                var end = str.lastIndexOf("<");
                str = str.substring(start, end); //REDEFINE WEAK_STRING -> IN TO THE TAG
                if (str.indexOf("<") == -1)
                    this.value = XML.decodeValue(str.trim());
                else
                    this.value = "";
                return new std.Pair(str, true);
            };
            /**
             * <p> Parse and construct children XML objects. </p>
             */
            XML.prototype.parseChildren = function (str) {
                if (str.indexOf("<") == -1)
                    return;
                var start = str.indexOf("<");
                var end = str.lastIndexOf(">") + 1;
                str = str.substring(start, end);
                var blockStart = 0;
                var blockEnd = 0;
                start = 0;
                for (var i = 0; i < str.length; i++) {
                    if (str.charAt(i) == "<" && str.substr(i, 2) != "</")
                        blockStart++;
                    else if (str.substr(i, 2) == "/>" || str.substr(i, 2) == "</")
                        blockEnd++;
                    if (blockStart >= 1 && blockStart == blockEnd) {
                        end = str.indexOf(">", i);
                        var xmlList;
                        var xml = new XML();
                        xml.construct(str.substring(start, end + 1));
                        if (this.has(xml.tag) == true)
                            xmlList = this.get(xml.tag);
                        else {
                            xmlList = new library.XMLList();
                            this.set(xml.tag, xmlList);
                        }
                        xmlList.push(xml);
                        i = end;
                        start = end + 1;
                        blockStart = 0;
                        blockEnd = 0;
                    }
                }
            };
            /* -------------------------------------------------------------
                ACCESSORS
            ------------------------------------------------------------- */
            /**
             * <p> Get tag. </p>
             */
            XML.prototype.getTag = function () {
                return this.tag;
            };
            /**
             * <p> Get value. </p>
             */
            XML.prototype.getValue = function () {
                return this.value;
            };
            /**
             * <p> Test wheter a property exists or not. </p>
             */
            XML.prototype.hasProperty = function (key) {
                return this.properties.has(key);
            };
            /**
             * <p> Get property by its key. </p>
             */
            XML.prototype.getProperty = function (key) {
                return this.properties.get(key);
            };
            XML.prototype.getPropertyMap = function () {
                return this.properties;
            };
            /* -------------------------------------------------------------
                SETTERS
            ------------------------------------------------------------- */
            /**
             * <p> Set tag (identifier) of the XML. </p>
             */
            XML.prototype.setTag = function (str) {
                this.tag = str;
            };
            /**
             * <p> Set value of the XML. </p>
             *
             * @param val The value to set
             *
             * <p> Do not abuse values for expressing member variables. </p>
             * <table>
             *	<tr>
             *		<th>Standard Usage</th>
             *		<th>Non-standard usage abusing value</th>
             *	</tr>
             *	<tr>
             *		<td>
             *			\<memberList\>\n
             *			&nbsp;&nbsp;&nbsp;&nbsp;\<member id='jhnam88' name='Jeongho+Nam' birthdate='1988-03-11' /\>\n
             *			&nbsp;&nbsp;&nbsp;&nbsp;\<member id='master' name='Administartor' birthdate='2011-07-28' /\>\n
             *			\</memberList\>
             *		</td>
             *		<td>
             *			\<member\>\n
             *				\<id\>jhnam88\</id\>\n
             *				\<name\>Jeongho+Nam\</name\>\n
             *				\<birthdate\>1988-03-11\</birthdate\>\n
             *			\</member\>
             *		</td>
             *	</tr>
             * </table>
             *
             * @param val A value to set
             */
            XML.prototype.setValue = function (str) {
                this.value = str;
            };
            /**
             * <p> Set a property with its key. </p>
             */
            XML.prototype.setProperty = function (key, value) {
                this.properties.set(key, value);
            };
            /**
             * <p> Erase a property by its key. </p>
             *
             * @param key The key of the property to erase
             * @throw exception out of range
             */
            XML.prototype.eraseProperty = function (key) {
                if (this.properties.has(key) == false)
                    throw Error("out of range");
                else
                    this.properties.erase(key);
            };
            XML.prototype.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                for (var i = 0; i < items.length; i++) {
                    if (items[i] instanceof XML) {
                        var xml = items[i];
                        if (this.has(xml.tag) == true)
                            this.get(xml.tag).push(xml);
                        else {
                            var xmlList = new library.XMLList();
                            xmlList.push(xml);
                            this.set(xml.tag, xmlList);
                        }
                    }
                    else if (items[i] instanceof library.XMLList) {
                        _super.prototype.push.call(this, items[i]);
                    }
                }
                return this.size();
            };
            XML.prototype.addAllProperties = function (xml) {
                for (var it = xml.properties.begin(); it.equals(xml.properties.end()) == false; it = it.next())
                    this.setProperty(it.first, it.second);
            };
            XML.prototype.clearProperties = function () {
                this.properties = new std.UnorderedMap();
            };
            /* -------------------------------------------------------------
                FILTERS
            ------------------------------------------------------------- */
            XML.prototype.calcMinIndex = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var min = args[0];
                for (var i = 1; i < args.length; i++) {
                    if (args[i] == -1)
                        continue;
                    if (min == -1 || args[i] < min)
                        min = args[i];
                }
                return min;
            };
            /**
             * <p> Decode a value. </p>
             *
             * <table>
             *	<tr>
             *		<th>Encoded</th>
             *		<th>Decoded</th>
             *	</tr>
             *	<tr>
             *		<td>\&amp;</td>
             *		<td>\&</td>
             *	</tr>
             *	<tr>
             *		<td>\&lt;</td>
             *		<td>\<</td>
             *	</tr>
             *	<tr>
             *		<td>\&gt;</td>
             *		<td>\></td>
             *	</tr>
             * </table>
             *
             * @return A decoded string represents a value
             */
            XML.decodeValue = function (str) {
                var pairs = [
                    new std.Pair("&amp;", "&"),
                    new std.Pair("&lt;", "<"),
                    new std.Pair("&gt;", ">")
                ];
                return library.StringUtil.replaceAll(str, pairs);
            };
            /**
             * <p> Encode a value. </p>
             *
             * <table>
             *	<tr>
             *		<th>Original</th>
             *		<th>Encoded</th>
             *	</tr>
             *	<tr>
             *		<td>\&</td>
             *		<td>\&amp;</td>
             *	</tr>
             *	<tr>
             *		<td>\<</td>
             *		<td>\&lt;</td>
             *	</tr>
             *	<tr>
             *		<td>\></td>
             *		<td>\&gt;</td>
             *	</tr>
             * </table>
             *
             * @return A encoded string represents a value
             */
            XML.encodeValue = function (str) {
                var pairs = [
                    new std.Pair("&", "&amp;"),
                    new std.Pair("<", "&lt;"),
                    new std.Pair(">", "&gt;")
                ];
                return library.StringUtil.replaceAll(str, pairs);
            };
            /**
              * <p> Decode a property. </p>
              *
              * <table>
              *	<tr>
              *		<th>Encoded</th>
              *		<th>Decoded</th>
              *	</tr>
              *	<tr>
              *		<td>\&amp;</td>
              *		<td>\&</td>
              *	</tr>
              *	<tr>
              *		<td>\&lt;</td>
              *		<td>\<</td>
              *	</tr>
              *	<tr>
              *		<td>\&gt;</td>
              *		<td>\></td>
              *	</tr>
              *	<tr>
              *		<td>&quot;</td>
              *		<td>\"</td>
              *	</tr>
              *	<tr>
              *		<td>&apos;</td>
              *		<td>'</td>
              *	</tr>
              *	<tr>
              *		<td>&#x9;</td>
              *		<td>'</td>
              *	</tr>
              *	<tr>
              *		<td>&apos;</td>
              *		<td>\\t</td>
              *	</tr>
              *	<tr>
              *		<td>&#xA;</td>
              *		<td>\\n</td>
              *	</tr>
              *	<tr>
              *		<td>&#xD;</td>
              *		<td>\\r</td>
              *	</tr>
              * </table>
              *
              * @return A decoded string represents a property
              */
            XML.decodeProperty = function (str) {
                var pairs = [
                    new std.Pair("&amp;", "&"),
                    new std.Pair("&lt;", "<"),
                    new std.Pair("&gt;", ">"),
                    new std.Pair("&quot;", "\""),
                    new std.Pair("&apos;", "'"),
                    new std.Pair("&#x9;", "\t"),
                    new std.Pair("&#xA;", "\n"),
                    new std.Pair("&#xD;", "\r"),
                ];
                return library.StringUtil.replaceAll(str, pairs);
            };
            /**
             * <p> Decode a property. </p>
             *
             * <table>
             *	<tr>
             *		<th>Original</th>
             *		<th>Encoded</th>
             *	</tr>
             *	<tr>
             *		<td>\&</td>
             *		<td>\&amp;</td>
             *	</tr>
             *	<tr>
             *		<td>\<</td>
             *		<td>\&lt;</td>
             *	</tr>
             *	<tr>
             *		<td>\></td>
             *		<td>\&gt;</td>
             *	</tr>
             *	<tr>
             *		<td>\"</td>
             *		<td>&quot;</td>
             *	</tr>
             *	<tr>
             *		<td>'</td>
             *		<td>&apos;</td>
             *	</tr>
             *	<tr>
             *		<td>'</td>
             *		<td>&#x9;</td>
             *	</tr>
             *	<tr>
             *		<td>\\t</td>
             *		<td>&apos;</td>
             *	</tr>
             *	<tr>
             *		<td>\\n</td>
             *		<td>&#xA;</td>
             *	</tr>
             *	<tr>
             *		<td>\\r</td>
             *		<td>&#xD;</td>
             *	</tr>
             * </table>
             *
             * @return A encoded string represents a property
             */
            XML.encodeProperty = function (str) {
                var pairs = [
                    new std.Pair("&", "&amp;"),
                    new std.Pair("<", "&lt;"),
                    new std.Pair(">", "&gt;"),
                    new std.Pair("\"", "&quot;"),
                    new std.Pair("'", "&apos;"),
                    new std.Pair("\t", "&#x9;"),
                    new std.Pair("\n", "&#xA;"),
                    new std.Pair("\r", "&#xD;"),
                ];
                return library.StringUtil.replaceAll(str, pairs);
            };
            /* -------------------------------------------------------------
                EXPORTS
            ------------------------------------------------------------- */
            /**
             * <p> Convert the XML to a string. </p>
             */
            XML.prototype.toString = function (level) {
                if (level === void 0) { level = 0; }
                var str = library.StringUtil.tab(level) + "<" + this.tag;
                var childrenString = "";
                //PROPERTIES
                for (var p_it = this.properties.begin(); p_it.equals(this.properties.end()) == false; p_it = p_it.next())
                    str += " " + p_it.first + "=\"" + XML.encodeProperty(String(p_it.second)) + "\"";
                if (this.size() == 0) {
                    if (this.value != "")
                        str += ">" + XML.encodeValue(String(this.value)) + "</" + this.tag + ">";
                    else
                        str += " />";
                }
                else {
                    str += ">\n";
                    for (var x_it = this.begin(); x_it.equals(this.end()) == false; x_it = x_it.next())
                        str += x_it.second.toString(level + 1);
                    str += library.StringUtil.tab(level) + "</" + this.tag + ">";
                }
                return str;
            };
            /**
             * <p> Convert the XML to HTML string. </p>
             */
            XML.prototype.toHTML = function (level) {
                if (level === void 0) { level = 0; }
                var str = library.StringUtil.htmlTab(level) + "&lt;" + this.tag;
                var childrenString = "";
                //PROPERTIES
                for (var p_it = this.properties.begin(); p_it.equals(this.properties.end()) == false; p_it = p_it.next())
                    str += " " + p_it.first + "=&quot;" + XML.encodeProperty(String(p_it.second)) + "&quot;";
                if (this.size() == 0) {
                    if (this.value != "")
                        str += "&gt;" + XML.encodeValue(String(this.value)) + "</" + this.tag + ">";
                    else
                        str += " /&gt;";
                }
                else {
                    str += "&gt;<br>\n";
                    for (var x_it = this.begin(); x_it.equals(this.end()) == false; x_it = x_it.next())
                        str += x_it.second.toHTML(level + 1);
                    str += library.StringUtil.htmlTab(level) + "&lt;/" + this.tag + "&gt;";
                }
                return str;
            };
            return XML;
        })(std.UnorderedMap);
        library.XML = XML;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
/// <reference path="../../std/Vector.ts" />
///     <reference path="XML.ts" />
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        /**
         * <p> List of XML(s) having same tag. </p>
         *
         * @author Jeongho Nam
         */
        var XMLList = (function (_super) {
            __extends(XMLList, _super);
            /**
             * <p> Default Constructor. </p>
             */
            function XMLList() {
                _super.call(this);
            }
            /**
             * <p> Convert XMLList to string. </p>
             *
             * @param level Level(depth) of the XMLList.
             */
            XMLList.prototype.toString = function (level) {
                if (level === void 0) { level = 0; }
                var str = "";
                for (var i = 0; i < this.size(); i++)
                    str += this.at(i).toString(level) + "\n";
                return str;
            };
            /**
             * <p> Convert XMLList to HTML string. </p>
             *
             * @param level Level(depth) of the XMLList.
             */
            XMLList.prototype.toHTML = function (level) {
                if (level === void 0) { level = 0; }
                var str = "";
                for (var i = 0; i < this.size(); i++)
                    str += this.at(i).toHTML(level) + "<br>\n";
                return str;
            };
            return XMLList;
        })(std.Vector);
        library.XMLList = XMLList;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
/// <reference path="../library/XML.ts" />
/// <reference path="../../std/Vector.ts" />
///     <reference path="IEntity.ts" />
/// <reference path="../../std/IMap.ts" />
/// <reference path="../library/XML.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        /**
         * @inheritdoc
         */
        var EntityArray = (function (_super) {
            __extends(EntityArray, _super);
            /* ------------------------------------------------------------------
                CONSTRUCTORS
            ------------------------------------------------------------------ */
            /**
             * Default Constructor.
             */
            function EntityArray() {
                _super.call(this);
            }
            /**
             * <p> Construct data of the Entity from an XML object. </p>
             *
             * <p> Constructs the EntityArray's own member variables only from the input XML object. </p>
             *
             * <p> Do not consider about constructing children Entity objects' data in EntityArray::construct().
             * Those children Entity objects' data will constructed by their own construct() method. Even insertion
             * of XML objects representing children are done by abstract method of EntityArray::toXML(). </p>
             *
             * <p> Constructs only data of EntityArray's own. </p>
             *
             * @inheritdoc
             */
            EntityArray.prototype.construct = function (xml) {
                this.clear();
                // MEMBER VARIABLES; ATOMIC
                var propertyMap = xml.getPropertyMap();
                for (var v_it = propertyMap.begin(); v_it.equals(propertyMap.end()) != true; v_it = v_it.next())
                    if (this.hasOwnProperty(v_it.first) == true
                        && (typeof this[v_it.first] == "number" || typeof this[v_it.first] == "string")
                        && v_it.first != "length") {
                        this[v_it.first] = v_it.second;
                    }
                // MEMBER ENTITIES
                for (var e_it = xml.begin(); e_it.equals(xml.end()) != true; e_it = e_it.next()) {
                    if (this.hasOwnProperty(e_it.first) == true
                        && e_it.first != this.CHILD_TAG()
                        && e_it.second.size() == 1
                        && (this[e_it.first] instanceof protocol.Entity || this[e_it.first] instanceof EntityArray)
                        && this[e_it.first] != null) {
                        var entity = this[e_it.first];
                        var e_xml = e_it.second.at(0);
                        if (entity == null)
                            continue;
                        entity.construct(e_xml);
                    }
                }
                //CHILDREN
                if (xml.has(this.CHILD_TAG()) == false)
                    return;
                var xmlList = xml.get(this.CHILD_TAG());
                for (var i = 0; i < xmlList.size(); i++) {
                    var child = this.createChild(xmlList.at(i));
                    if (child == null)
                        continue;
                    child.construct(xmlList.at(i));
                    this.push(child);
                }
            };
            /**
             * <p> Factory method of a child Entity. </p>
             *
             * <p> EntityArray::createChild() is a factory method creating a new child Entity which is belonged
             * to the EntityArray. This method is called by EntityArray::construct(). The children construction
             * methods Entity::construct() will be called by abstract method of the EntityArray::construct(). </p>
             *
             * @return A new child Entity belongs to EntityArray.
             */
            EntityArray.prototype.createChild = function (xml) {
                return null;
            };
            /* ------------------------------------------------------------------
                GETTERS
            ------------------------------------------------------------------ */
            /**
             * @inheritdoc
             */
            EntityArray.prototype.key = function () {
                return "";
            };
            /**
             * @inheritdoc
             */
            EntityArray.prototype.has = function (key) {
                var i;
                if (key instanceof protocol.Entity || key instanceof EntityArray) {
                    for (i = 0; i < this.size(); i++)
                        if (this.at(i) == key)
                            return true;
                }
                else {
                    for (var i = 0; i < this.size(); i++)
                        if (this.at(i).key() == key)
                            return true;
                }
                return false;
            };
            /**
             * @inheritdoc
             */
            EntityArray.prototype.get = function (key) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).key() == key)
                        return this.at(i);
                throw Error("out of range");
            };
            /* ------------------------------------------------------------------
                ELEMENTS I/O
            ------------------------------------------------------------------ */
            //public set(key: string, entity: Ety): void
            //{
            //    this.push(entity);
            //}
            //public erase(key: string): std.Iterator<Ety>
            //{
            //    for (var i: number = this.length - 1; i >= 0; i--)
            //        if (this.at(i).key() == key)
            //        {
            //            this.splice(i, 1);
            //            return new std.VectorIterator<Ety>(this, i);
            //        }
            //    return this.end();
            //}
            /* ------------------------------------------------------------------
                EXPORTERS
            ------------------------------------------------------------------ */
            /**
             * @inheritdoc
             */
            EntityArray.prototype.TAG = function () { return ""; };
            /**
             * <p> A tag name of children objects. </p>
             */
            EntityArray.prototype.CHILD_TAG = function () { return ""; };
            /**
             * <p> Get an XML object represents the EntityArray. </p>
             *
             * <p> Archives the EntityArray's own member variables only to the returned XML object. </p>
             *
             * <p> Do not consider about archiving children Entity objects' data in EntityArray::toXML().
             * Those children Entity objects will converted to XML object by their own toXML() method. The
             * insertion of XML objects representing children are done by abstract method of
             * EntityArray::toXML(). </p>
             *
             * <p> Archives only data of EntityArray's own. </p>
             *
             * @inheritdoc
             */
            EntityArray.prototype.toXML = function () {
                var xml = new samchon.library.XML();
                xml.setTag(this.TAG());
                // MEMBERS
                for (var key in this)
                    if (typeof key == "string" && key != "length" // LENGTH: MEMBER OF AN ARRAY
                        && (typeof this[key] == "string" || typeof this[key] == "number")) {
                        // ATOMIC
                        xml.setProperty(key, this[key]);
                    }
                // CHILDREN
                for (var i = 0; i < this.size(); i++)
                    xml.push(this.at(i).toXML());
                return xml;
            };
            return EntityArray;
        })(std.Vector);
        protocol.EntityArray = EntityArray;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <refercen path="../API.ts" />
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/IEntity.ts" />
/// <reference path="../../samchon/library/IEventDispatcher.ts" />
/// <reference path="FaceAPI.ts" />
/// <reference path="IAsyncEntity.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var AsyncEntityParent = (function (_super) {
            __extends(AsyncEntityParent, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function AsyncEntityParent() {
                _super.call(this);
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
                this.queueingList = new std.Vector();
            }
            /* ========================================================
                ELEMENTS I/O EVENTS
                    - OVERRIDINGS
                    - INSERTION / DELETION HANDLERS
                    - METHODS OF EVENT_DISPATCHER
            ===========================================================
                OVERRIDINGS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            AsyncEntityParent.prototype.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                var size = _super.prototype.push.apply(this, items);
                for (var i = 0; i < items.length; i++)
                    this.inserted(items[i]);
                return size;
            };
            AsyncEntityParent.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var position = args[0];
                var index = position.getIndex();
                var prevSize = this.size();
                var res = _super.prototype.insert.apply(this, args);
                var insertedSize = this.size() - prevSize;
                for (var i = index; i < index + insertedSize; i++)
                    this.inserted(this[i]);
            };
            /* --------------------------------------------------------
                INSERTION & DELETION HANDLERS
            -------------------------------------------------------- */
            /**
             * Post-processing method of handling inserted item.
             *
             * @param item An inserted item.
             */
            AsyncEntityParent.prototype.inserted = function (item) {
                item.addEventListener(faceapi.FaceEvent.REGISTER, this.handleRegisterChild, this);
                item.addEventListener(faceapi.FaceEvent.UNREGISTER, this.handleUnregisterChild, this);
                this.queueingList.push(item);
                if (this.queueingList.size() == 1)
                    item.register();
            };
            /**
             * Post-processing method of handling erased item.
             *
             * @param item An item erased.
             */
            AsyncEntityParent.prototype.erased = function (item) {
                if (item.isRegistered() == false) {
                    for (var q_it = this.queueingList.begin(); q_it.equals(this.queueingList.end()) == false; q_it = q_it.next())
                        if (q_it.value == item) {
                            this.queueingList.erase(q_it);
                            break;
                        }
                }
                else
                    item.unregister();
            };
            /**
             * <p> An event handler listening child element's registration. </p>
             *
             * <p> <code>AsyncEntityParent.handleRegisterChild()</code> also dispatches the event to its
             * listeners. When some children instances waiting for registration process are left, step to
             * the next registration. The process are repeated until all elements <code>queueingList</code>
             * are truncated. </p>
             *
             * @param event An event instance containing inserted element.
             */
            AsyncEntityParent.prototype.handleRegisterChild = function (event) {
                var child = event.target;
                //child.removeEventListener(FaceEvent.REGISTER, this.handleRegisterChild, this);
                this.dispatchEvent(new faceapi.ContainerEvent(faceapi.ContainerEvent.ADD, child));
                this.queueingList.erase(this.queueingList.begin());
                if (this.queueingList.empty() == false)
                    this.queueingList.front().register();
            };
            AsyncEntityParent.prototype.handleUnregisterChild = function (event) {
                var child = event.target;
                child.removeEventListener(faceapi.FaceEvent.UNREGISTER, this.handleUnregisterChild, this);
                this.dispatchEvent(new faceapi.ContainerEvent(faceapi.ContainerEvent.REMOVE, child));
            };
            /* --------------------------------------------------------
                METHODS OF EVENT_DISPATCHER
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            AsyncEntityParent.prototype.hasEventListener = function (type) {
                return this.eventDispatcher.hasEventListener(type);
            };
            /**
             * @inheritdoc
             */
            AsyncEntityParent.prototype.dispatchEvent = function (event) {
                return this.eventDispatcher.dispatchEvent(event);
            };
            /**
             * @inheritdoc
             */
            AsyncEntityParent.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.eventDispatcher.addEventListener(type, listener, thisArg);
            };
            /**
             * @inheritdoc
             */
            AsyncEntityParent.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.removeEventListener(type, listener, thisArg);
            };
            return AsyncEntityParent;
        })(samchon.protocol.EntityArray);
        faceapi.AsyncEntityParent = AsyncEntityParent;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <referecen apth="FaceAPI.ts" />
/// <reference path="AsyncEntityParent.ts" />
/// <reference path="IAsyncEntity.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * @author Jeongho Nam
         */
        var AsyncEntityArray = (function (_super) {
            __extends(AsyncEntityArray, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function AsyncEntityArray(name) {
                if (name === void 0) { name = ""; }
                _super.call(this);
                this.id = "";
                this.name = name;
                this.registered = false;
            }
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            AsyncEntityArray.prototype.key = function () {
                return this.id;
            };
            /**
             * Whether this instance is belonged to another type of AsyncEntityArray.
             */
            AsyncEntityArray.prototype.hasAsyncParent = function () {
                return false;
            };
            /**
             * Get id.
             */
            AsyncEntityArray.prototype.getID = function () {
                return this.id;
            };
            /**
             * Get name.
             */
            AsyncEntityArray.prototype.getName = function () {
                return this.name;
            };
            /**
             * Set name and notify it to the Face-API server.
             *
             * @param name New name.
             */
            AsyncEntityArray.prototype.setName = function (name) {
                this.name = name;
            };
            /* --------------------------------------------------------
                INSERTION & DELETION HANDLERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            AsyncEntityArray.prototype.inserted = function (item) {
                item.addEventListener(faceapi.FaceEvent.REGISTER, this.handleRegisterChild, this);
                item.addEventListener(faceapi.FaceEvent.UNREGISTER, this.handleUnregisterChild, this);
                this.queueingList.push(item);
                if (this.registered == false || this.queueingList.size() != 1) {
                    if (this.registered == false && this.hasAsyncParent() == false)
                        this.register();
                }
                else
                    item.register();
            };
            /**
             * @inheritdoc
             */
            AsyncEntityArray.prototype.handleRegister = function (data) {
                this.registered = true;
                if (this.queueingList.empty() == false)
                    this.queueingList.front().register();
                else
                    this.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.REGISTER));
            };
            /**
             * @inheritdoc
             */
            AsyncEntityArray.prototype.handleUnregister = function () {
                this.registered = false;
                this.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.UNREGISTER));
            };
            /**
             * @inheritdoc
             */
            AsyncEntityArray.prototype.handleRegisterChild = function (event) {
                _super.prototype.handleRegisterChild.call(this, event);
                if (this.queueingList.empty() == true)
                    this.handleRegister(null);
            };
            /* --------------------------------------------------------
                INTERACTION WITH FACE-API SERVER
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            AsyncEntityArray.prototype.isRegistered = function () {
                if (this.registered == false || this.queueingList.empty() == false)
                    return false;
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).isRegistered() == false)
                        return false;
                return true;
            };
            /**
             * @inheritdoc
             */
            AsyncEntityArray.prototype.register = function () {
                throw new std.AbstractMethodError("AsyncEntityArray::register() is not overriden.");
            };
            /**
             * @inheritdoc
             */
            AsyncEntityArray.prototype.unregister = function () {
                throw new std.AbstractMethodError("AsyncEntityArray::unregister() is not overriden.");
            };
            return AsyncEntityArray;
        })(faceapi.AsyncEntityParent);
        faceapi.AsyncEntityArray = AsyncEntityArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An entity representing coordinates X and Y.
         *
         * @author Jeongho Nam
         */
        var Point = (function (_super) {
            __extends(Point, _super);
            function Point(tag) {
                if (tag === void 0) { tag = ""; }
                _super.call(this);
                this.tag = tag;
                this.x = 0;
                this.y = 0;
            }
            /**
             * @inheritdoc
             */
            Point.prototype.constructByJSON = function (val) {
                faceapi.Global.fetch(this, val);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get coordinate X.
             */
            Point.prototype.getX = function () {
                return this.x;
            };
            /**
             * Get coordinate Y.
             */
            Point.prototype.getY = function () {
                return this.y;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Point.prototype.TAG = function () {
                return this.tag;
            };
            /**
             * @inheritdoc
             */
            Point.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.eraseProperty("tag");
                return xml;
            };
            return Point;
        })(samchon.protocol.Entity);
        faceapi.Point = Point;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="Point.ts" />
/// <reference path="IJSonEntity.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An abstract class having position and size data of rectangle which are representing a face in a picture.
         *
         * @author Jeongho Nam
         */
        var FaceRectangle = (function (_super) {
            __extends(FaceRectangle, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function FaceRectangle() {
                _super.call(this);
                this.width = 0;
                this.height = 0;
            }
            FaceRectangle.prototype.constructByJSON = function (obj) {
                faceapi.Global.fetch(this, obj);
                this.x = obj["left"];
                this.y = obj["top"];
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get width.
             */
            FaceRectangle.prototype.getWidth = function () {
                return this.width;
            };
            /**
             * Get height.
             */
            FaceRectangle.prototype.getHeight = function () {
                return this.height;
            };
            return FaceRectangle;
        })(faceapi.Point);
        faceapi.FaceRectangle = FaceRectangle;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="FaceRectangle.ts" />
/// <reference path="IAsyncEntity.ts" />
/// <reference path="FacePairArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * <p> A FaceRectangle directing a Face. </p>
         *
         * <p> Reference </p>
         * <ul>
         *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395250 </li>
         *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523b </li>
         * </ul>
         *
         * @author Jeongho Nam
         */
        var FacePair = (function (_super) {
            __extends(FacePair, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FacePairArray.
             *
             * @param pairArray An array and parent of the FacePair.
             */
            function FacePair(pairArray) {
                _super.call(this);
                this.pairArray = pairArray;
                this.id = "";
                this.pictureURL = "";
                this.face = null;
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
                this.registered = false;
            }
            /**
             * @inheritdoc
             */
            FacePair.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                if (xml.hasProperty("faceID") == true) {
                    var pictureURL = xml.getProperty("pictureURL");
                    var faceID = xml.getProperty("faceID");
                    var pictureArray = this.pairArray.getFaceAPI().getPictureArray();
                    if (pictureArray.hasURL(pictureURL) == true && pictureArray.getByURL(pictureURL).has(faceID) == true)
                        this.face = pictureArray.getByURL(pictureURL).get(faceID);
                }
                else
                    this.face = null;
            };
            /* --------------------------------------------------------
                INTERACTION WITH FACE API SERVER
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            FacePair.prototype.register = function () {
                samchon.trace("FacePair::insertToServer");
                this.pairArray.registerFace(this);
            };
            /**
             * @inheritdoc
             */
            FacePair.prototype.unregister = function () {
                this.pairArray.unregisterFace(this);
                this.registered = false;
            };
            /* --------------------------------------------------------
                SETTERS & GETTERS
            -------------------------------------------------------- */
            /**
             * Set (related) file.
             *
             * @param face A related file with the FacePair.
             */
            FacePair.prototype.setFile = function (face) {
                this.face = face;
                this.pictureURL = face.getPicture().getURL();
                this.setRectangle(face);
            };
            /**
             * <p> Set rectangle data. </p>
             * <p>? Constructs members of FaceRectangle, basic class of the FacePair. </p>
             *
             * @param rectangle A FaceRentangle instance to copy.
             */
            FacePair.prototype.setRectangle = function (rectangle) {
                // POINT'S MEMBERS
                this.x = rectangle.getX();
                this.y = rectangle.getY();
                // FACE_RECTANGLE'S MEMBERS
                this.width = rectangle.getWidth();
                this.height = rectangle.getHeight();
            };
            /**
             * Set identifier.
             *
             * @param id An identifier gotten from Face-API server.
             */
            FacePair.prototype.setID = function (id) {
                this.id = id;
                this.registered = (id != "");
            };
            FacePair.prototype.key = function () {
                return this.id;
            };
            /**
             * Get pairArray.
             */
            FacePair.prototype.getPairArray = function () {
                return this.pairArray;
            };
            /**
             * Get face.
             */
            FacePair.prototype.getFace = function () {
                return this.face;
            };
            /**
             * Get id.
             */
            FacePair.prototype.getID = function () {
                return this.id;
            };
            /**
             * Get pictureURL.
             */
            FacePair.prototype.getPictureURL = function () {
                return this.pictureURL;
            };
            FacePair.prototype.isRegistered = function () {
                return this.registered;
            };
            /* --------------------------------------------------------
                METHODS OF EVENT_DISPATCHER
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            FacePair.prototype.hasEventListener = function (type) {
                return this.eventDispatcher.hasEventListener(type);
            };
            /**
             * @inheritdoc
             */
            FacePair.prototype.dispatchEvent = function (event) {
                return this.eventDispatcher.dispatchEvent(event);
            };
            /**
             * @inheritdoc
             */
            FacePair.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.eventDispatcher.addEventListener(type, listener, thisArg);
            };
            /**
             * @inheritdoc
             */
            FacePair.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.removeEventListener(type, listener, thisArg);
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            FacePair.prototype.TAG = function () {
                return "facePair";
            };
            FacePair.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.face != null)
                    xml.setProperty("faceID", this.face.getID());
                return xml;
            };
            return FacePair;
        })(faceapi.FaceRectangle);
        faceapi.FacePair = FacePair;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="AsyncEntityArray.ts" />
///     <reference path="FacePair.ts" />
/// <reference path="FaceRectangle.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
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
        var FacePairArray = (function (_super) {
            __extends(FacePairArray, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from name.
             *
             * @param name Name representing the FacePairArray.
             */
            function FacePairArray(name) {
                if (name === void 0) { name = ""; }
                _super.call(this, name);
            }
            /**
             * @inheritdoc
             */
            FacePairArray.prototype.createChild = function (xml) {
                return new faceapi.FacePair(this);
            };
            /**
             * Create a child FacePair instance from a FaceRectangle instance.
             *
             * @param rect A FaceRectangle instance used to reference.
             */
            FacePairArray.prototype.deductChild = function (rect) {
                var pair;
                if (rect instanceof faceapi.FacePair)
                    pair = rect;
                else {
                    pair = new faceapi.FacePair(this);
                    pair.setRectangle(rect);
                    if (rect instanceof faceapi.Face)
                        pair.setFile(rect);
                }
                return pair;
            };
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
            FacePairArray.prototype.registerFace = function (face) {
                throw new std.AbstractMethodError("FacePair::insertFaceToServer() has to be overriden.");
            };
            /**
             * Unregister a FacePair from the Face-API server.
             *
             * @param face Target instance to unregister.
             */
            FacePairArray.prototype.unregisterFace = function (face) {
                throw new std.AbstractMethodError("FacePair::eraseFaceFromServer() has to be overriden.");
            };
            FacePairArray.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var position = args[0];
                if (args.length == 2 && args[1] instanceof faceapi.FaceRectangle) {
                    var rectangle = args[1];
                    return _super.prototype.insert.call(this, position, this.deductChild(rectangle));
                }
                else if (args.length == 3 && args[1] instanceof std.Iterator && args[2] instanceof std.Iterator) {
                    var begin = args[1];
                    var end = args[2];
                    var myChildren = new std.List();
                    for (var it = begin; it.equals(end) == false; it = it.next())
                        myChildren.pushBack(this.deductChild(it.value));
                    return _super.prototype.insert.call(this, position, myChildren.begin(), myChildren.end());
                }
                else
                    throw new std.InvalidArgument("invalid parameter(s).");
            };
            FacePairArray.prototype.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                var newItems = new Array();
                for (var i = 0; i < items.length; i++)
                    newItems.push(this.deductChild(items[i]));
                return _super.prototype.push.apply(this, newItems);
            };
            /* --------------------------------------------------------
                GETTERS & SETTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            FacePairArray.prototype.key = function () {
                return this.id;
            };
            /**
             * An abstract method getting FaceAPI instance.
             */
            FacePairArray.prototype.getFaceAPI = function () {
                // TO BE OVERRIDEN
                return null;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            FacePairArray.prototype.CHILD_TAG = function () {
                return "facePair";
            };
            return FacePairArray;
        })(faceapi.AsyncEntityArray);
        faceapi.FacePairArray = FacePairArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="FacePairArray.ts" />
/// <reference path="PersonGroup.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * <p> A FacePairArray for representing a person. </p>
         *
         * <p> References </p>
         * <ul>
         *  <li> Creating a Person: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523c </li>
         *  <li> Identify: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
         * </ul>
         *
         * @author Jeongho Nam
         * @inheritdoc
         */
        var Person = (function (_super) {
            __extends(Person, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a PersonGroup and name.
             *
             * @param group A group of Person instances.
             * @param name A name representing the Person.
             */
            function Person(group, name) {
                if (name === void 0) { name = ""; }
                _super.call(this);
                this.group = group;
                this.name = name;
            }
            /**
             * @inheritdoc
             */
            Person.prototype.hasAsyncParent = function () {
                return true;
            };
            /* --------------------------------------------------------
                INTERACTION WITH FACE API
            -------------------------------------------------------- */
            /**
             * Insert the FaceList to the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523c </li>
             * </ul>
             */
            Person.prototype.register = function () {
                samchon.trace("Person::insertToServer", this.name, this.group.getID());
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons", "POST", null, { "name": this.name, "userData": "" }, new std.Bind(this.handleRegister, this));
            };
            /**
             * Remove the FaceList from the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523d </li>
             * </ul>
             */
            Person.prototype.unregister = function () {
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id, "DELETE", {
                    "personGroupId": this.group.getID(),
                    "personId": this.id
                }, null);
                this.handleUnregister();
            };
            /**
             * @inheritdoc
             */
            Person.prototype.handleRegister = function (data) {
                samchon.trace("Person::handleRegister");
                if (data != null)
                    this.id = data["personId"];
                this.group["trained"] = false;
                _super.prototype.handleRegister.call(this, data);
            };
            /**
             * @inheritdoc
             */
            Person.prototype.handleUnregister = function () {
                this.group["trained"] = false;
                _super.prototype.handleUnregister.call(this);
            };
            /**
             * Insert a child FacePair instance to the Face-API server
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523b </li>
             * </ul>
             */
            Person.prototype.registerFace = function (face) {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces", "POST", {
                    "personGroupId": this.group.getID(),
                    "personId": this.id,
                    "targetFace": face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight(),
                    "userData": ""
                }, {
                    "url": face.getPictureURL()
                }, function (data) {
                    samchon.trace("A FacePair is registered in a Person");
                    this.group["trained"] = false;
                    face.setID(data["persistedFaceId"]);
                    face.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.REGISTER));
                });
            };
            /**
             * Remove a child FacePair instance from the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523e </li>
             * </ul>
             */
            Person.prototype.unregisterFace = function (face) {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces/" + face.getID(), "DELETE", {
                    "personGroupId": this.group.getID(),
                    "personId": this.id,
                    "persistedFaceId": face.getID()
                }, null, function (data) {
                    this.group["trained"] = false;
                    face.setID("");
                    face.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.UNREGISTER));
                });
            };
            /* --------------------------------------------------------
                GETTERS & SETTERS
            -------------------------------------------------------- */
            /**
             * Get group.
             */
            Person.prototype.getGroup = function () {
                return this.group;
            };
            /**
             * Set name and notify it to the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395242 </li>
             * </ul>
             *
             * @param name New name.
             */
            Person.prototype.setName = function (name) {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id, "PATCH", {
                    "personGroupId": this.group.getID(),
                    "personId": this.id
                }, {
                    "name": this.name,
                    "userData": ""
                }, function (data) {
                    this_.name = name;
                }, false);
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Person.prototype.TAG = function () {
                return "person";
            };
            return Person;
        })(faceapi.FacePairArray);
        faceapi.Person = Person;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSONEntity.ts" />
/// <reference path="Person.ts" />
/// <reference path="CandidatePersonArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * <p> A candidate person derived from Identify. </p>
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
         * </ul>
         *
         * @author Jeongho Nam
         */
        var CandidatePerson = (function (_super) {
            __extends(CandidatePerson, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a CandidatePersonArray
             *
             * @param personArray An array and parent of CandidatePerson.
             */
            function CandidatePerson(personArray) {
                _super.call(this);
                this.personArray = personArray;
            }
            CandidatePerson.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                this.person = null;
                if (xml.hasProperty("personID") == false)
                    return;
                var personID = xml.getProperty("personID");
                var personGroup = this.personArray.getPersonGroup();
                if (personGroup != null && personGroup.has(personID) == true)
                    this.person = personGroup.get(personID);
            };
            CandidatePerson.prototype.constructByJSON = function (obj) {
                faceapi.Global.fetch(this, obj); // confidence
                // SET PERSON
                var personGroup = this.personArray.getPersonGroup();
                var personID = obj["personId"];
                if (personGroup != null && personGroup.has(personID) == true)
                    this.person = personGroup.get(personID);
                else
                    this.person = null;
            };
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Get personArray.
             */
            CandidatePerson.prototype.getPersonArray = function () {
                return this.personArray;
            };
            /**
             * Get person.
             */
            CandidatePerson.prototype.getPerson = function () {
                return this.person;
            };
            /**
             * Get confidence.
             */
            CandidatePerson.prototype.getConfidence = function () {
                return this.confidence;
            };
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            CandidatePerson.prototype.TAG = function () {
                return "candidatePerson";
            };
            CandidatePerson.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.person != null)
                    xml.setProperty("personID", this.person.getID());
                return xml;
            };
            return CandidatePerson;
        })(samchon.protocol.Entity);
        faceapi.CandidatePerson = CandidatePerson;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />
/// <referench path='FaceLandmark.ts' />
/// <referench path='Eyebrows.ts' />
/// <referench path='Nose.ts' />
/// <referench path='Mouth.ts' />
/// <referench path='Face.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * A group and parent of FaceLandmark entities.
         *
         * @author Jeongho Nam
         */
        var FaceLandmarks = (function (_super) {
            __extends(FaceLandmarks, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a Face.
             *
             * @param face A Face that the FaceLandmarks is belonged to.
             */
            function FaceLandmarks(face) {
                _super.call(this);
                this.face = face;
                this.eyeBrows = new faceapi.Eyebrows(this);
                this.eyes = new faceapi.Eyes(this);
                this.nose = new faceapi.Nose(this);
                this.mouth = new faceapi.Mouth(this);
            }
            FaceLandmarks.prototype.constructByJSON = function (obj) {
                this.eyeBrows.constructByJSON(obj);
                this.eyes.constructByJSON(obj);
                this.nose.constructByJSON(obj);
                this.mouth.constructByJSON(obj);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get face.
             */
            FaceLandmarks.prototype.getFace = function () {
                return this.face;
            };
            /**
             * Get eyeBrowss.
             */
            FaceLandmarks.prototype.getEyeBrows = function () {
                return this.eyeBrows;
            };
            /**
             * Get eyes.
             */
            FaceLandmarks.prototype.getEyes = function () {
                return this.eyes;
            };
            /**
             * Get nose.
             */
            FaceLandmarks.prototype.getNose = function () {
                return this.nose;
            };
            /**
             * Get mouth.
             */
            FaceLandmarks.prototype.getMouth = function () {
                return this.mouth;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            FaceLandmarks.prototype.TAG = function () {
                return "landmarks";
            };
            FaceLandmarks.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.eyeBrows.toXML(), this.eyes.toXML(), this.nose.toXML(), this.mouth.toXML());
                return xml;
            };
            return FaceLandmarks;
        })(samchon.protocol.Entity);
        faceapi.FaceLandmarks = FaceLandmarks;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />
/// <reference path='FaceAttributes.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An abstract entity representing an attribute data belongs to a face.
         *
         * @author Jeongho Nam
         */
        var FaceAttribute = (function (_super) {
            __extends(FaceAttribute, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Contruct from a FaceAttributes
             *
             * @param attributes A group and parent of the FaceAttribute.
             */
            function FaceAttribute(attributes) {
                _super.call(this);
                this.attributes = attributes;
            }
            FaceAttribute.prototype.constructByJSON = function (val) {
                faceapi.Global.fetch(this, val);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get attributes.
             */
            FaceAttribute.prototype.getAttributes = function () {
                return this.attributes;
            };
            return FaceAttribute;
        })(samchon.protocol.Entity);
        faceapi.FaceAttribute = FaceAttribute;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path='FaceAttribute.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FacialHair = (function (_super) {
            __extends(FacialHair, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Contruct from a FaceAttributes
             *
             * @param attributes A group and parent of the FaceAttribute.
             */
            function FacialHair(attributes) {
                _super.call(this, attributes);
                this.mustache = 0;
                this.beard = 0;
                this.sideburns = 0;
            }
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get mustache.
             */
            FacialHair.prototype.getMustache = function () {
                return this.mustache;
            };
            /**
             * Get beard.
             */
            FacialHair.prototype.getBeard = function () {
                return this.beard;
            };
            /**
             * Get sideburns.
             */
            FacialHair.prototype.getSideburns = function () {
                return this.sideburns;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            FacialHair.prototype.TAG = function () {
                return "facialHair";
            };
            return FacialHair;
        })(faceapi.FaceAttribute);
        faceapi.FacialHair = FacialHair;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path='FaceAttribute.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var HeadPose = (function (_super) {
            __extends(HeadPose, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Contruct from a FaceAttributes
             *
             * @param attributes A group and parent of the FaceAttribute.
             */
            function HeadPose(attributes) {
                _super.call(this, attributes);
                this.roll = 0;
                this.yaw = 0;
                this.pitch = 0;
            }
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get roll.
             */
            HeadPose.prototype.getRoll = function () {
                return this.roll;
            };
            /**
             * Get pitch.
             */
            HeadPose.prototype.getPitch = function () {
                return this.pitch;
            };
            /**
             * Get yaw.
             */
            HeadPose.prototype.getYaw = function () {
                return this.yaw;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            HeadPose.prototype.TAG = function () {
                return "headPose";
            };
            return HeadPose;
        })(faceapi.FaceAttribute);
        faceapi.HeadPose = HeadPose;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />
/// <reference path="FaceAttribute.ts" />
/// <reference path="FacialHair.ts" />
/// <reference path="HeadPose.ts" />
/// <reference path="Face.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * <p> An entity representing attributes of a Face. </p>
         *
         * <p> FaceAttributes also takes a role of group and parent of FaceAttribute entities. </p>
         *
         * @author Jeongho Nam
         */
        var FaceAttributes = (function (_super) {
            __extends(FaceAttributes, _super);
            /* --------------------------------------------------------
                CONSTRUCTOR
            -------------------------------------------------------- */
            /**
             * Construct from a Face.
             *
             * @param face A Face that the FaceAttributes are belonged to.
             */
            function FaceAttributes(face) {
                _super.call(this);
                this.face = face;
                this.age = 0;
                this.gender = "";
                this.smile = 0;
                this.facialHair = new faceapi.FacialHair(this);
                this.headPose = new faceapi.HeadPose(this);
            }
            FaceAttributes.prototype.constructByJSON = function (obj) {
                faceapi.Global.fetch(this, obj);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get face.
             */
            FaceAttributes.prototype.getFace = function () {
                return this.face;
            };
            /**
             * Get age.
             */
            FaceAttributes.prototype.getAge = function () {
                return this.age;
            };
            /**
             * Get gender.
             */
            FaceAttributes.prototype.getGender = function () {
                return this.gender;
            };
            /**
             * Get smile.
             */
            FaceAttributes.prototype.getSmile = function () {
                return this.smile;
            };
            /**
             * Get facialHair.
             */
            FaceAttributes.prototype.getFacialHair = function () {
                return this.facialHair;
            };
            /**
             * Get headPose.
             */
            FaceAttributes.prototype.getHeadPose = function () {
                return this.headPose;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            FaceAttributes.prototype.TAG = function () {
                return "attributes";
            };
            FaceAttributes.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.facialHair.toXML(), this.headPose.toXML());
                return xml;
            };
            return FaceAttributes;
        })(samchon.protocol.Entity);
        faceapi.FaceAttributes = FaceAttributes;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSONEntity.ts" />
/// <reference path="SimilarFaceArray.ts" />
/// <reference path="FacePair.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var SimilarFace = (function (_super) {
            __extends(SimilarFace, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a SimilarFaceArray.
             *
             * @param faceArray An array and parent of the SimilarFace.
             */
            function SimilarFace(faceArray) {
                _super.call(this);
                this.faceArray = faceArray;
            }
            SimilarFace.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                this.facePair = null;
                if (xml.hasProperty("facePairID") == false)
                    return;
                var facePairID = xml.getProperty("facePairID");
                var faceList = this.faceArray.getFaceList();
                if (faceList != null && faceList.has(facePairID) == true)
                    this.facePair = faceList.get(facePairID);
            };
            SimilarFace.prototype.constructByJSON = function (data) {
                faceapi.Global.fetch(this, data);
                var facePairID = data["persistedFaceId"];
                var faceList = this.faceArray.getFaceList();
                if (faceList != null && faceList.has(facePairID) == true)
                    this.facePair = faceList.get(facePairID);
                else
                    this.facePair = null;
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get faceArray.
             */
            SimilarFace.prototype.getFaceArray = function () {
                return this.faceArray;
            };
            /**
             * Get facePair.
             */
            SimilarFace.prototype.getFacePair = function () {
                return this.facePair;
            };
            /**
             * Get confidence.
             */
            SimilarFace.prototype.getConfidence = function () {
                return this.confidence;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            SimilarFace.prototype.TAG = function () {
                return "similarFace";
            };
            SimilarFace.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.facePair != null)
                    xml.setProperty("facePairID", this.facePair.getID());
                return xml;
            };
            return SimilarFace;
        })(samchon.protocol.Entity);
        faceapi.SimilarFace = SimilarFace;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="SimilarFace.ts" />
/// <reference path="IJSONEntity.ts" />
/// <reference path="Face.ts" />
/// <reference path="FaceList.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var SimilarFaceArray = (function (_super) {
            __extends(SimilarFaceArray, _super);
            function SimilarFaceArray() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
                if (args.length == 1 && args[0] instanceof faceapi.FaceAPI) {
                    this.api = args[0];
                    this.face = null;
                    this.faceList = null;
                }
                else if (args.length == 2 && args[0] instanceof faceapi.Face && args[1] instanceof faceapi.FaceList) {
                    this.face = args[0];
                    this.faceList = args[1];
                    this.api = this.faceList.getListArray().getAPI();
                }
            }
            SimilarFaceArray.prototype.construt = function (xml) {
                this.faceList = null;
                // SET FACE
                if (xml.hasProperty("faceID") == true) {
                    var faceID = xml.getProperty("faceID");
                    var pictureArray = this.api.getPictureArray();
                    for (var i = 0; i < pictureArray.size(); i++) {
                        var picture = pictureArray.at(i);
                        if (picture.has(faceID) == true) {
                            this.face = picture.get(faceID);
                            break;
                        }
                    }
                }
                // SET FACE_LIST
                if (xml.hasProperty("faceListID") == true) {
                    var faceListID = xml.getProperty("faceListID");
                    var faceListArray = this.api.getFaceListArray();
                    if (faceListArray.has(faceListID) == true)
                        this.faceList = faceListArray.get(faceListID);
                }
                // SET CHILDREN
                _super.prototype.construct.call(this, xml);
            };
            SimilarFaceArray.prototype.constructByJSON = function (val) {
                this.clear(); // CLEAR
                var items = val;
                for (var i = 0; i < items.length; i++) {
                    var similar = new faceapi.SimilarFace(this);
                    similar.constructByJSON(items[i]);
                    this.push(similar);
                }
            };
            SimilarFaceArray.prototype.createChild = function (xml) {
                return new faceapi.SimilarFace(this);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            SimilarFaceArray.prototype.getAPI = function () {
                return this.api;
            };
            SimilarFaceArray.prototype.getFace = function () {
                return this.face;
            };
            SimilarFaceArray.prototype.getFaceList = function () {
                return this.faceList;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            SimilarFaceArray.prototype.TAG = function () {
                return "similarFaceArray";
            };
            SimilarFaceArray.prototype.CHILD_TAG = function () {
                return "similarFace";
            };
            SimilarFaceArray.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.face != null)
                    xml.setProperty("faceID", this.face.getID());
                if (this.faceList != null)
                    xml.setProperty("faceListID", this.faceList.getID());
                return xml;
            };
            return SimilarFaceArray;
        })(samchon.protocol.EntityArray);
        faceapi.SimilarFaceArray = SimilarFaceArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="FacePairArray.ts" />
/// <reference path="SimilarFaceArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * <p> A FacePairArray for representing a face list. </p>
         *
         * <p> References </p>
         * <ul>
         *  <li> Creating a FaceList: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524b </li>
         *  <li> Find Similar: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395237 </li>
         * </ul>
         *
         * @inheritDoc
         */
        var FaceList = (function (_super) {
            __extends(FaceList, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FaceListArray and name.
             *
             * @param listArray An array and parent of the FaceList.
             * @param name Name representing the FaceList.
             */
            function FaceList(listArray, name) {
                if (name === void 0) { name = ""; }
                _super.call(this, name);
                this.listArray = listArray;
                this.id = "";
                this.name = name;
                this.registered = false;
            }
            /* --------------------------------------------------------
                INTERACTION WITH FACE API
            -------------------------------------------------------- */
            /**
             * Find similar faces in the FaceList from a Face.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395237 </li>
             * </ul>
             *
             * @param face A Face who wants find the similars.
             * @param maxCandidates Maximum number of candidates to be retured.
             *
             * @return Similar faces being looked similar.
             */
            FaceList.prototype.findSimilars = function (face, maxCandidates) {
                var this_ = this;
                var similarFaceArray = new faceapi.SimilarFaceArray(face, this);
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/findsimilars", "POST", {
                    "faceId": face.getID(),
                    "faceListId": this.id,
                    "maxNumOfCandidatesReturned": maxCandidates
                }, null, function (data) {
                    similarFaceArray.constructByJSON(data);
                    this_.dispatchEvent(new faceapi.FindSimilarEvent(this_, face, maxCandidates, similarFaceArray));
                });
            };
            /**
             * Insert the FaceList to the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524b </li>
             * </ul>
             */
            FaceList.prototype.register = function () {
                // ISSUE ID
                if (this.id == "")
                    this.id = faceapi.FaceAPI.issueID("face_list");
                var this_ = this;
                // REGISTER TO THE SERVER
                var url = "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id;
                var method = "PUT";
                var params = { "faceListId": this.id };
                var data = {
                    "name": this.name,
                    "userData": ""
                };
                var success = function (data) {
                    this_.handleRegister(data);
                };
                // SEND
                faceapi.FaceAPI.query(url, method, params, data, success);
            };
            /**
             * Remove the FaceList from the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524b </li>
             * </ul>
             */
            FaceList.prototype.unregister = function () {
                var this_ = this;
                // READY
                var url = "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id;
                var method = "DELETE";
                var params = { "faceListId": this.id };
                var func = function (data) {
                    this_.handleUnregister();
                };
                // SEND
                faceapi.FaceAPI.query(url, method, params, null, func);
            };
            /**
             * Insert a child FacePair instance to the Face-API server
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395250 </li>
             * </ul>
             */
            FaceList.prototype.registerFace = function (face) {
                if (this.isRegistered() == false)
                    this.register();
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces", "POST", {
                    //"faceListId": this.id,
                    "userData": "",
                    "targetFace": face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight()
                }, {
                    "url": face.getPictureURL()
                }, function (data) {
                    face.setID(data["persistedFaceId"]);
                });
            };
            /**
             * Remove a child FacePair instance from the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395251 </li>
             * </ul>
             */
            FaceList.prototype.unregisterFace = function (face) {
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces/" + face.getID(), "DELETE", {
                    "faceListId": this.id,
                    "persistedFaceId": face.getID()
                }, null, null);
                _super.prototype.unregisterFace.call(this, face);
            };
            /* --------------------------------------------------------
                GETTERS & SETTERS
            -------------------------------------------------------- */
            /**
             * Get api in listArray.
             */
            FaceList.prototype.getAPI = function () {
                return this.listArray.getAPI();
            };
            /**
             * Get listArray.
             */
            FaceList.prototype.getListArray = function () {
                return this.listArray;
            };
            /**
             * Set name and notify it to the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524e </li>
             * </ul>
             *
             * @param name New name of the FacePairArray.
             */
            FaceList.prototype.setName = function (name) {
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id, "PATCH", { "faceListId": this.id }, {
                    "name": this.name,
                    "userData": ""
                }, function (data) {
                    this_.name = name;
                });
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            FaceList.prototype.TAG = function () {
                return "faceList";
            };
            return FaceList;
        })(faceapi.FacePairArray);
        faceapi.FaceList = FaceList;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="Face.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceReferArray = (function (_super) {
            __extends(FaceReferArray, _super);
            /* --------------------------------------------------------
                CONSTRUCTOR
            -------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function FaceReferArray() {
                _super.call(this);
            }
            FaceReferArray.prototype.construct = function (xml) {
                // CLEAR
                this.clear();
                if (xml.has(this.CHILD_TAG()) == false)
                    return;
                // FIND CHILDREN
                var xmlList = xml.get(this.CHILD_TAG());
                for (var i = 0; i < xmlList.size(); i++) {
                    var face = this.fetchChild(xmlList.at(i).getProperty("id"));
                    if (face == null)
                        continue;
                    this.push(face);
                }
            };
            FaceReferArray.prototype.fetchChild = function (id) {
                return null;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            FaceReferArray.prototype.TAG = function () {
                return "faceReferArray";
            };
            FaceReferArray.prototype.CHILD_TAG = function () {
                return "faceRefer";
            };
            FaceReferArray.prototype.toXML = function () {
                var xml = new samchon.library.XML();
                xml.setTag(this.TAG());
                for (var i = 0; i < this.size(); i++) {
                    var childXML = new samchon.library.XML();
                    childXML.setTag(this.CHILD_TAG());
                    childXML.setProperty("id", this.at(i).getID());
                    // INSERTS
                    xml.push(childXML);
                }
                return xml;
            };
            return FaceReferArray;
        })(samchon.protocol.EntityArray);
        faceapi.FaceReferArray = FaceReferArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="IJSONEntity.ts" />
/// <reference path="FaceReferArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceGroup = (function (_super) {
            __extends(FaceGroup, _super);
            /* --------------------------------------------------------
                CONSTRUCTOR
            -------------------------------------------------------- */
            function FaceGroup(groupArray) {
                _super.call(this);
                this.groupArray = groupArray;
            }
            FaceGroup.prototype.constructByJSON = function (val) {
                this.clear();
                var idArray = val;
                for (var i = 0; i < idArray.length; i++) {
                    var id = idArray[i];
                    var face = this.fetchChild(id);
                    if (face == null)
                        continue;
                    this.push(face);
                }
            };
            FaceGroup.prototype.fetchChild = function (id) {
                var faceArray = this.groupArray.getFaceArray();
                if (faceArray.has(id) == true)
                    return faceArray.get(id);
                var api = this.groupArray.getAPI();
                if (api == null)
                    return null;
                var pictureArray = api.getPictureArray();
                for (var i = 0; i < pictureArray.size(); i++)
                    if (pictureArray.at(i).has(id) == true)
                        return pictureArray.at(i).get(id);
                return null;
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get groupArray.
             */
            FaceGroup.prototype.getGroupArray = function () {
                return this.groupArray;
            };
            return FaceGroup;
        })(faceapi.FaceReferArray);
        faceapi.FaceGroup = FaceGroup;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="FaceGroup.ts" />
/// <reference path="IJSONEntity.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var SimilarFaceGroup = (function (_super) {
            __extends(SimilarFaceGroup, _super);
            /* --------------------------------------------------------
                CONSTRUCTOR
            -------------------------------------------------------- */
            /**
             * Construct from groupArray.
             *
             * @param groupArray An array and parent of the SimilarFaceGroup.
             */
            function SimilarFaceGroup(groupArray) {
                _super.call(this, groupArray);
            }
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            SimilarFaceGroup.prototype.TAG = function () {
                return "similarFaceGroup";
            };
            return SimilarFaceGroup;
        })(faceapi.FaceGroup);
        faceapi.SimilarFaceGroup = SimilarFaceGroup;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="FaceGroup.ts" />
/// <reference path="IJSONEntity.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var MessyFaceGroup = (function (_super) {
            __extends(MessyFaceGroup, _super);
            /* --------------------------------------------------------
                CONSTRUCTOR
            -------------------------------------------------------- */
            function MessyFaceGroup(groupArray) {
                _super.call(this, groupArray);
            }
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            MessyFaceGroup.prototype.TAG = function () {
                return "messyFaceGroup";
            };
            return MessyFaceGroup;
        })(faceapi.FaceGroup);
        faceapi.MessyFaceGroup = MessyFaceGroup;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="SimilarFaceGroup.ts" />
/// <reference path="IJSONEntity.ts" />
/// <reference path="MessyFaceGroup.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var SimilarFaceGroupArray = (function (_super) {
            __extends(SimilarFaceGroupArray, _super);
            function SimilarFaceGroupArray(obj) {
                _super.call(this);
                this.messyGroup = new faceapi.MessyFaceGroup(this);
                if (obj instanceof faceapi.FaceAPI) {
                    this.api = obj;
                    this.faceArray = new faceapi.FaceReferArray();
                }
                else {
                    this.faceArray = obj;
                    if (this.faceArray.size() == 0)
                        this.api = null;
                    else
                        this.api = this.faceArray.at(0).getPicture().getPictureArray().getAPI();
                }
            }
            SimilarFaceGroupArray.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                this.messyGroup.construct(xml.get(this.messyGroup.TAG()).at(0));
                for (var i = 0; i < this.size(); i++)
                    for (var j = 0; j < this.at(i).size(); j++)
                        this.faceArray.push(this.at(i).at(j));
                for (i = 0; i < this.messyGroup.size(); i++)
                    this.faceArray.push(this.messyGroup.at(i));
                if (this.faceArray.size() == 0)
                    this.api = null;
                else
                    this.api = this.faceArray.at(i).getPicture().getPictureArray().getAPI();
            };
            SimilarFaceGroupArray.prototype.constructByJSON = function (data) {
                this.clear();
                var similarGroupArray = data["groups"];
                var messyGroup = data["messyGroup"];
                for (var i = 0; i < similarGroupArray.length; i++) {
                    var similarGroup = new faceapi.SimilarFaceGroup(this);
                    similarGroup.constructByJSON(similarGroupArray);
                    this.push(similarGroup);
                }
                this.messyGroup.constructByJSON(messyGroup);
            };
            SimilarFaceGroupArray.prototype.createChild = function (xml) {
                return new faceapi.SimilarFaceGroup(this);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get api.
             */
            SimilarFaceGroupArray.prototype.getAPI = function () {
                if (this.api == null && this.faceArray.size() != 0)
                    this.api = this.faceArray.at(0).getPicture().getPictureArray().getAPI();
                return this.api;
            };
            /**
             * Get faceArray.
             */
            SimilarFaceGroupArray.prototype.getFaceArray = function () {
                return this.faceArray;
            };
            /**
             * Get messyGroup.
             */
            SimilarFaceGroupArray.prototype.getMessyGroup = function () {
                return this.messyGroup;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            SimilarFaceGroupArray.prototype.TAG = function () {
                return "similarFaceGroupArray";
            };
            SimilarFaceGroupArray.prototype.CHILD_TAG = function () {
                return "similarFaceGroup";
            };
            SimilarFaceGroupArray.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.messyGroup.toXML());
                return xml;
            };
            return SimilarFaceGroupArray;
        })(samchon.protocol.EntityArray);
        faceapi.SimilarFaceGroupArray = SimilarFaceGroupArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
var samchon;
(function (samchon) {
    /**
     * <p> Trace arguments on screen. </p>
     * <p> Displays arguments on screen by <i>document.write</i>. </p>
     *
     * <p> If any argument in a trace statement includes a data type other than a string, the trace function
     * invokes the associated toString() method for that data type. If the argument which is not a string
     * doesn't have <i>toString()</i> method, only "[object Object]" words will be traced. </p>
     *
     * <p> Trace prints words in web page direclty. It can harm ordinary layout of the page. </p>
     *
     * @param args One or more (comma separated) expressions to evaluate.
     *			   For multiple expressions, a space is inserted between each expression in the output.
     *
     * @author Jeongho Nam
     */
    function trace() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var str = "";
        var replacerArray = [
            //new std.Pair<string, string>("'", "&apos;"),
            //new std.Pair<string, string>('"', "&quot;"),
            new std.Pair("&", "&amp;"),
            new std.Pair("<", "&lt;"),
            new std.Pair(">", "&gt;"),
            new std.Pair("\n", "<br>"),
            new std.Pair("\t", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        ];
        for (var i = 0; i < args.length; i++) {
            var item = String(args[i]);
            item = samchon.library.StringUtil.replaceAll(item, replacerArray);
            if (i == 0)
                str += item;
            else
                str += ", " + item;
        }
        document.write("<p>" + str + "</p>");
    }
    samchon.trace = trace;
})(samchon || (samchon = {}));
/// <reference path="../API.ts" />
/// <reference path="../../std/Exception.ts" />
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        /**
         * An event class.
         *
         * <ul>
         *  <li> Comments from - https://developer.mozilla.org/en-US/docs/Web/API/Event/ </li>
         * </ul>
         *
         * @author Jeongho Nam
         */
        var BasicEvent = (function () {
            /* -------------------------------------------------------------------
                CONSTRUCTORS
            ------------------------------------------------------------------- */
            function BasicEvent(type, bubbles, cancelable) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                this.type_ = type.toLowerCase();
                this.target_ = null;
                this.currentTarget_ = null;
                this.trusted_ = false;
                this.bubbles_ = bubbles;
                this.cancelable_ = cancelable;
                this.defaultPrevented_ = false;
                this.cancelBubble_ = false;
                this.timeStamp_ = new Date();
            }
            Object.defineProperty(BasicEvent, "NONE", {
                /* -------------------------------------------------------------------
                    STATIC CONSTS
                ------------------------------------------------------------------- */
                /**
                 *  No event is being processed at this time.
                 */
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "NONE", {
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent, "CAPTURING_PHASE", {
                /**
                 * The event is being propagated through the target's ancestor objects. This process starts with the Window,
                 * then Document, then the HTMLHtmlElement, and so on through the elements until the target's parent is reached.
                 * Event listeners registered for capture mode when EventTarget.addEventListener() was called are triggered
                 * during this phase.
                 */
                get: function () { return Event.CAPTURING_PHASE; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "CAPTURING_PHASE", {
                get: function () { return Event.CAPTURING_PHASE; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent, "AT_TARGET", {
                /**
                 * The event has arrived at the event's target. Event listeners registered for this phase are called at this
                 * time. If Event.bubbles is false, processing the event is finished after this phase is complete.
                 */
                get: function () { return Event.AT_TARGET; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "AT_TARGET", {
                get: function () { return Event.AT_TARGET; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent, "BUBBLING_PHASE", {
                /**
                 * The event is propagating back up through the target's ancestors in reverse order, starting with the parent,
                 * and eventually reaching the containing Window. This is known as bubbling, and occurs only if Event.bubbles
                 * is true. Event listeners registered for this phase are triggered during this process.
                 */
                get: function () { return Event.BUBBLING_PHASE; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "BUBBLING_PHASE", {
                get: function () { return Event.BUBBLING_PHASE; },
                enumerable: true,
                configurable: true
            });
            /**
             * Initializes the value of an Event created. If the event has already being dispatched, this method does nothing.
             */
            BasicEvent.prototype.initEvent = function (type, bubbles, cancelable) {
                this.type_ = type.toLowerCase();
                this.bubbles_ = bubbles;
                this.cancelable_ = cancelable;
            };
            /* -------------------------------------------------------------------
                ACTIONS ON PROGRESS
            ------------------------------------------------------------------- */
            /**
             * Cancels the event (if it is cancelable).
             */
            BasicEvent.prototype.preventDefault = function () {
                throw new std.AbstractMethodError("BasicEvent.preventDefault() is not overriden yet.");
            };
            /**
             * For this particular event, no other listener will be called. Neither those attached on the same element,
             * nor those attached on elements which will be traversed later (in capture phase, for instance).
             */
            BasicEvent.prototype.stopImmediatePropagation = function () {
                throw new std.AbstractMethodError("BasicEvent.stopImmediatePropagation() is not overriden yet.");
            };
            /**
             * Stops the propagation of events further along in the DOM.
             */
            BasicEvent.prototype.stopPropagation = function () {
                throw new std.AbstractMethodError("BasicEvent.stopPropagation() is not overriden yet.");
            };
            Object.defineProperty(BasicEvent.prototype, "type", {
                /* -------------------------------------------------------------------
                    GETTERS
                ------------------------------------------------------------------- */
                /**
                 * The name of the event (case-insensitive).
                 */
                get: function () {
                    return this.type_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "target", {
                /**
                 * A reference to the target to which the event was originally dispatched.
                 */
                get: function () {
                    return this.target_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "currentTarget", {
                /**
                 * A reference to the currently registered target for the event.
                 */
                get: function () {
                    return this.currentTarget_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "srcElement", {
                /**
                 * A proprietary alias for the standard Event.target property. It is specific to old versions of
                 * Microsoft Internet Explorer.
                 */
                get: function () {
                    return this.target_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "isTrusted", {
                /**
                 * Indicates whether or not the event was initiated by the browser (after a user click for instance) or
                 * by a script (using an event creation method, like event.initEvent).
                 */
                get: function () {
                    return this.isTrusted;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "bubbles", {
                /**
                 * A boolean indicating whether the event bubbles up through the DOM or not.
                 */
                get: function () {
                    return this.bubbles_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "cancelable", {
                /**
                 * A boolean indicating whether the event is cancelable.
                 */
                get: function () {
                    return this.cancelable_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "eventPhase", {
                /**
                 * Indicates which phase of the event flow is currently being evaluated.
                 */
                get: function () {
                    return this.NONE;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "defaultPrevented", {
                /**
                 * Returns a boolean indicating whether or not event.preventDefault() was called on the event.
                 */
                get: function () {
                    return this.defaultPrevented_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "cancelBubble", {
                /**
                 * Indicates if event bubbling for this event has been canceled or not. It is set to false by default, allowing
                 * the event to bubble up the DOM, if it is a bubbleable event. Setting this property to true stops the event
                 * from bubbling up the DOM. Not all events are allowed to bubble up the DOM.
                 */
                get: function () {
                    return this.cancelBubble_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "timeStamp", {
                /**
                 * The time that the event was created.
                 */
                get: function () {
                    return this.timeStamp_.getTime();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "returnValue", {
                /**
                 * Don't know what it is.
                 */
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            return BasicEvent;
        })();
        library.BasicEvent = BasicEvent;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
var std;
(function (std) {
    var Bind = (function () {
        function Bind(func, thisArg) {
            this.func = func;
            this.thisArg = thisArg;
        }
        Bind.prototype.apply = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return this.func.apply(this.thisArg, args);
        };
        Bind.prototype.equals = function (obj) {
            return this.func == obj.func && this.thisArg == obj.thisArg;
        };
        return Bind;
    })();
    std.Bind = Bind;
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="IEventDispatcher.ts" />
/// <reference path="BasicEvent.ts" />
/// <reference path="../../std/Bind.ts" />
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        /**
         * <p> Registers an event listener object with an EventDispatcher object so that the listener
         * receives notification of an event. You can register event listeners on all nodes in the display
         * list for a specific type of event, phase, and priority. </p>
         *
         * <p> After you successfully register an event listener, you cannot change its priority through
         * additional calls to addEventListener(). To change a listener's priority, you must first call
         * removeListener(). Then you can register the listener again with the new priority level. </p>
         *
         * Keep in mind that after the listener is registered, subsequent calls to <code>addEventListener()</code>
         * with a different type or useCapture value result in the creation of a separate listener registration.
         * For example, if you first register a listener with useCapture set to true, it listens only during the
         * capture phase. If you call addEventListener() again using the same listener object, but with
         * useCapture set to false, you have two separate listeners: one that listens during the capture
         * phase and another that listens during the target and bubbling phases.
         *
         * <p> You cannot register an event listener for only the target phase or the bubbling phase. Those
         * phases are coupled during registration because bubbling applies only to the ancestors of the
         * target node. </p>
         *
         * <p> If you no longer need an event listener, remove it by calling <code>removeEventListener()</code>,
         * or memory problems could result. Event listeners are not automatically removed from memory
         * because the garbage collector does not remove the listener as long as the dispatching object
         * exists (unless the useWeakReference parameter is set to true). </p>
         *
         * <p> Copying an EventDispatcher instance does not copy the event listeners attached to it. (If your
         * newly created node needs an event listener, you must attach the listener after creating the
         * node.) However, if you move an EventDispatcher instance, the event listeners attached to it move
         * along with it. </p>
         *
         * <p> If the event listener is being registered on a node while an event is being processed on
         * this node, the event listener is not triggered during the current phase but can be triggered
         * during a later phase in the event flow, such as the bubbling phase. </p>
         *
         * <p> If an event listener is removed from a node while an event is being processed on the node, it is
         * still triggered by the current actions. After it is removed, the event listener is never invoked
         * again (unless registered again for future processing). </p>
         *
         * <ul>
         *  <li> Made by AS3 - http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/EventDispatcher.html
         * </ul>
         *
         * @author Migrated by Jeongho Nam
         */
        var EventDispatcher = (function () {
            function EventDispatcher(target) {
                if (target === void 0) { target = null; }
                if (target == null)
                    this.target = this;
                else
                    this.target = target;
                this.listeners = new std.UnorderedMap();
            }
            /**
             * @inheritdoc
             */
            EventDispatcher.prototype.hasEventListener = function (type) {
                type = type.toLowerCase();
                return this.listeners.has(type);
            };
            /**
             * @inheritdoc
             */
            EventDispatcher.prototype.dispatchEvent = function (event) {
                if (event instanceof library.BasicEvent)
                    event["target_"] = this.target;
                else
                    event.target = this.target;
                if (this.listeners.has(event.type) == false)
                    return false;
                var listenerSet = this.listeners.get(event.type);
                for (var it = listenerSet.begin(); it.equals(listenerSet.end()) == false; it = it.next())
                    it.value.apply(event);
                return true;
            };
            /**
             * @inheritdoc
             */
            EventDispatcher.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                type = type.toLowerCase();
                var listenerSet;
                if (this.listeners.has(type) == false) {
                    listenerSet = new std.UnorderedSet();
                    this.listeners.set(type, listenerSet);
                }
                else
                    listenerSet = this.listeners.get(type);
                listenerSet.insert(new std.Bind(listener, thisArg));
            };
            /**
             * @inheritdoc
             */
            EventDispatcher.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                type = type.toLowerCase();
                if (this.listeners.has(type) == false)
                    return;
                var listenerSet = this.listeners.get(type);
                var bind = new std.Bind(listener, thisArg);
                if (listenerSet.has(bind) == false)
                    return;
                listenerSet.erase(bind);
                if (listenerSet.empty() == true)
                    this.listeners.erase(type);
            };
            return EventDispatcher;
        })();
        library.EventDispatcher = EventDispatcher;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="Picture.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An array and parent of Picture entities.
         *
         * @author Jeongho Nam
         */
        var PictureArray = (function (_super) {
            __extends(PictureArray, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FaceAPI.
             *
             * @param api A facade controller and factory class for Face-API.
             */
            function PictureArray(api) {
                _super.call(this);
                this.api = api;
            }
            /**
             * @inheritdoc
             */
            PictureArray.prototype.createChild = function (xml) {
                return new faceapi.Picture(this, xml.getProperty("url"));
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get api.
             */
            PictureArray.prototype.getAPI = function () {
                return this.api;
            };
            /**
             * Test whether the PictureArray has a Picture having an url.
             *
             * @param url URL-address used as a key in the test.
             */
            PictureArray.prototype.hasURL = function (url) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).getURL() == url)
                        return true;
                return false;
            };
            /**
             * Get a Picture instance having the target url.
             *
             * @param url URL-address used as a key in the retrieve.
             * @return A Picture has the url.
             */
            PictureArray.prototype.getByURL = function (url) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).getURL() == url)
                        return this.at(i);
                throw Error("out of range");
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PictureArray.prototype.TAG = function () {
                return "pictureArray";
            };
            /**
             * @inheritdoc
             */
            PictureArray.prototype.CHILD_TAG = function () {
                return "picture";
            };
            return PictureArray;
        })(samchon.protocol.EntityArray);
        faceapi.PictureArray = PictureArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="Face.ts" />
/// <reference path="IJSONEntity.ts" />
/// <reference path="../../samchon/library/IEventDispatcher.ts" />
/// <reference path="../../samchon/library/EventDispatcher.ts" />
/// <reference path="PictureArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * A picture entity who containing Face entities.
         *
         * @author Jeongho Nam
         */
        var Picture = (function (_super) {
            __extends(Picture, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from an PictureArray and url.
             *
             * @param pictureArray An array and parent of Picture entities.
             * @param url An url-address the (physical) picture is placed in.
             */
            function Picture(pictureArray, url) {
                if (url === void 0) { url = ""; }
                _super.call(this);
                this.pictureArray = pictureArray;
                this.url = url;
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
            }
            /**
             * @inheritdoc
             */
            Picture.prototype.constructByJSON = function (val) {
                this.clear(); // CLEAR
                var array = val;
                for (var i = 0; i < array.length; i++) {
                    var face = new faceapi.Face(this);
                    face.constructByJSON(array[i]);
                    this.push(face);
                }
            };
            /**
             * @inheritdoc
             */
            Picture.prototype.createChild = function (xml) {
                return new faceapi.Face(this);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Picture.prototype.key = function () {
                return this.url;
            };
            /**
             * Get pictureArray.
             */
            Picture.prototype.getPictureArray = function () {
                return this.pictureArray;
            };
            /**
             * Get url.
             */
            Picture.prototype.getURL = function () {
                return this.url;
            };
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
            Picture.prototype.detect = function () {
                // REMOVE ALL
                this.clear();
                var this_ = this;
                // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/detect", "POST", {
                    "returnFaceId": "true",
                    "returnFaceLandmarks": "true",
                    "returnFaceAttributes": "age,gender,smile,facialHair,headPose",
                }, { "url": this.url }, function (data) {
                    samchon.trace("Detected in inline function");
                    this_.constructByJSON(data);
                    this_.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.DETECT));
                });
            };
            /* --------------------------------------------------------
                METHODS OF EVENT_DISPATCHER
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Picture.prototype.hasEventListener = function (type) {
                return this.eventDispatcher.hasEventListener(type);
            };
            /**
             * @inheritdoc
             */
            Picture.prototype.dispatchEvent = function (event) {
                samchon.trace("dispatchEvent in Picture", event.type, this.eventDispatcher.hasEventListener(event.type));
                return this.eventDispatcher.dispatchEvent(event);
            };
            /**
             * @inheritdoc
             */
            Picture.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.eventDispatcher.addEventListener(type, listener, thisArg);
            };
            /**
             * @inheritdoc
             */
            Picture.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.removeEventListener(type, listener, thisArg);
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Picture.prototype.TAG = function () {
                return "person";
            };
            /**
             * @inheritdoc
             */
            Picture.prototype.CHILD_TAG = function () {
                return "face";
            };
            return Picture;
        })(samchon.protocol.EntityArray);
        faceapi.Picture = Picture;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="FaceRectangle.ts" />
/// <reference path="IJSonEntity.ts" />
/// <reference path="FaceLandmarks.ts" />
/// <reference path="FaceAttributes.ts" />
/// <reference path="Person.ts" />
/// <reference path="PersonGroup.ts" />
/// <reference path="FaceList.ts" />
/// <reference path="CandidatePersonArray.ts" />
/// <reference path="SimilarFaceGroupArray.ts" />
/// <reference path="Picture.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * A face entity.
         *
         * @author Jeongho Nam
         */
        var Face = (function (_super) {
            __extends(Face, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Constructor from a Picture.
             *
             * @param picture A picture that containing the Face.
             */
            function Face(picture) {
                _super.call(this);
                this.picture = picture;
                this.person = null;
                this.id = "";
                this.landmarks = new faceapi.FaceLandmarks(this);
                this.attributes = new faceapi.FaceAttributes(this);
                this.eventDispatcher = new samchon.library.EventDispatcher(this);
            }
            /**
             * @inheritdoc
             */
            Face.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                this.person = null;
                if (xml.has("person") == false)
                    return;
                var person = xml.get("person").at(0);
                var personName = person.getProperty("name");
                var personGroupID = person.getProperty("groupID");
            };
            /**
             * @inheritdoc
             */
            Face.prototype.constructByJSON = function (obj) {
                this.id = obj["faceId"];
                _super.prototype.constructByJSON.call(this, obj["faceRectangle"]);
                this.landmarks.constructByJSON(obj["faceLandmarks"]);
                this.attributes.constructByJSON(obj["faceAttributes"]);
            };
            /* --------------------------------------------------------
                COMPARES
            -------------------------------------------------------- */
            /**
             * <p> Identify the Face is whom (Person, from a PersonGroup). </p>
             *
             * <p> You've to execute PersonGroup.train() method, asynchronous method dispatching
             * "complete" Event when the training was completed, before running the identify() method. </p>
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
             * </ul>
             *
             * @param personGroup A PersonGroup, candidates of the owner.
             * @param maxCandidates Permitted number of candidates to return.
             *
             * @return Candidates of the owner with conformaility degrees.
             */
            Face.prototype.identify = function (personGroup, maxCandidates) {
                if (maxCandidates === void 0) { maxCandidates = 1; }
                if (personGroup.isTrained() == false)
                    personGroup.addEventListener(faceapi.FaceEvent.TRAIN, this.handleTrain, this);
                personGroup.addEventListener(faceapi.IdentifyEvent.IDENTIFY, this.handleIdentity, this);
                personGroup.identify(this, maxCandidates);
            };
            /**
             * Find similar faces in the FaceList from a Face.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395237 </li>
             * </ul>
             *
             * @param faceList Candidate faces.
             * @param maxCandidates Maximum number of candidates to be retured.
             *
             * @return Similar faces being looked similar.
             */
            Face.prototype.findSimilars = function (faceList, maxCandidates) {
                faceList.addEventListener(faceapi.FindSimilarEvent.FIND, this.handleFindSimilar, this);
                faceList.findSimilars(this, maxCandidates);
            };
            /**
             * <p> Divide candidate faces into groups based on face similarity. </p>
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395238 </li>
             * </ul>
             *
             * @param faces Candidate faces.
             * @return Grouped faces by similarity.
             */
            Face.prototype.findSimilarGroups = function (faceArray) {
                var this_ = this;
                var faceReferArray = new faceapi.FaceReferArray();
                var faceIDArray = new Array();
                for (var i = 0; i < faceArray.length; i++) {
                    faceReferArray.push(faceArray[i]);
                    faceIDArray.push(faceArray[i].getID());
                }
                var similarFaceGroupArray = new faceapi.SimilarFaceGroupArray(faceReferArray);
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/group", "POST", null, { "faceIds": faceIDArray }, function (data) {
                    similarFaceGroupArray.constructByJSON(data);
                    this_.dispatchEvent(new faceapi.FindSimilarGroupEvent(faceReferArray, similarFaceGroupArray));
                }, false);
            };
            Face.prototype.handleTrain = function (event) {
                this.dispatchEvent(event);
            };
            Face.prototype.handleIdentity = function (event) {
                this.dispatchEvent(event);
            };
            Face.prototype.handleFindSimilar = function (event) {
                this.dispatchEvent(event);
            };
            /**
             * Test whether two Faces are owned by a same Person.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523a/console </li>
             * </ul>
             *
             * @param face Target Face to compare with.
             * @return A pair of flag (whether two Faces are from a same person) and confidence (conformality degree).
             */
            Face.prototype.equals = function (face) {
                if (this == face)
                    return new std.Pair(true, 1.0);
                var pair = new std.Pair(false, -1.0);
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/verify", "POST", null, { "faceId1": this.id, "faceId2": face.id }, function (data) {
                    var isIdentical = data["isIdentical"];
                    var confidence = data["confidence"];
                    pair = new std.Pair(isIdentical, confidence);
                });
                return pair;
            };
            /* --------------------------------------------------------
                GETTERS & SETTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Face.prototype.key = function () {
                return this.id;
            };
            /**
             * Get id.
             */
            Face.prototype.getID = function () {
                return this.id;
            };
            /**
             * Get picture.
             */
            Face.prototype.getPicture = function () {
                return this.picture;
            };
            /**
             * Get person.
             */
            Face.prototype.getPerson = function () {
                return this.person;
            };
            /**
             * Get landmarks.
             */
            Face.prototype.getLandmarks = function () {
                return this.landmarks;
            };
            /**
             * Get attributes.
             */
            Face.prototype.getAttributes = function () {
                return this.attributes;
            };
            /* --------------------------------------------------------
                METHODS OF EVENT_DISPATCHER
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Face.prototype.hasEventListener = function (type) {
                return this.eventDispatcher.hasEventListener(type);
            };
            /**
             * @inheritdoc
             */
            Face.prototype.dispatchEvent = function (event) {
                return this.eventDispatcher.dispatchEvent(event);
            };
            /**
             * @inheritdoc
             */
            Face.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.eventDispatcher.addEventListener(type, listener, thisArg);
            };
            /**
             * @inheritdoc
             */
            Face.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.removeEventListener(type, listener, thisArg);
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Face.prototype.TAG = function () {
                return "face";
            };
            /**
             * @inheritdoc
             */
            Face.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.landmarks.toXML(), this.attributes.toXML());
                return xml;
            };
            return Face;
        })(faceapi.FaceRectangle);
        faceapi.Face = Face;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="CandidatePerson.ts" />
/// <referench path="IJSONEntity.ts" />
/// <reference path="Face.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * <p> An array and parent of CandidatePerson. </p>
         *
         * <ul>
         *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
         * </ul>
         *
         * @author Jeongho Nam
         */
        var CandidatePersonArray = (function (_super) {
            __extends(CandidatePersonArray, _super);
            function CandidatePersonArray() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
                if (args.length == 1 && args[0] instanceof faceapi.FaceAPI) {
                    this.api = args[0];
                    this.face = null;
                    this.personGroup = null;
                }
                else if (args.length == 2 && args[0] instanceof faceapi.Face && args[1] instanceof faceapi.PersonGroup) {
                    this.face = args[0];
                    this.personGroup = args[1];
                    this.api = this.face.getPicture().getPictureArray().getAPI();
                }
            }
            CandidatePersonArray.prototype.construct = function (xml) {
                this.face = null;
                this.personGroup = null;
                // SET FACE
                if (xml.hasProperty("faceID") == true) {
                    var faceID = xml.getProperty("faceID");
                    var pictureArray = this.api.getPictureArray();
                    for (var i = 0; i < pictureArray.size(); i++) {
                        var picture = pictureArray.at(i);
                        if (picture.has(faceID) == true) {
                            this.face = picture.get(faceID);
                            break;
                        }
                    }
                }
                // SET PERSON_GROUP
                if (xml.hasProperty("personGroupID") == true) {
                    var personGroupID = xml.getProperty("personGroupID");
                    var personGroupArray = this.api.getPersonGroupArray();
                    if (personGroupArray.has(personGroupID) == true)
                        this.personGroup = personGroupArray.get(personGroupID);
                }
                // SET CHILDREN
                _super.prototype.construct.call(this, xml);
            };
            CandidatePersonArray.prototype.constructByJSON = function (data) {
                this.clear();
                var array = data["candidates"];
                for (var i = 0; i < array.length; i++) {
                    var candidatePerson = new faceapi.CandidatePerson(this);
                    candidatePerson.constructByJSON(array[i]);
                    this.push(candidatePerson);
                }
            };
            CandidatePersonArray.prototype.createChild = function (xml) {
                if (xml.hasProperty("personID") == true)
                    return new faceapi.CandidatePerson(this);
                else
                    return null;
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get api.
             */
            CandidatePersonArray.prototype.getAPI = function () {
                return this.api;
            };
            /**
             * Get face.
             */
            CandidatePersonArray.prototype.getFace = function () {
                return this.face;
            };
            /**
             * Get personGroup.
             */
            CandidatePersonArray.prototype.getPersonGroup = function () {
                return this.personGroup;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            CandidatePersonArray.prototype.TAG = function () {
                return "candidatePersonArray";
            };
            CandidatePersonArray.prototype.CHILD_TAG = function () {
                return "candidatePerson";
            };
            CandidatePersonArray.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.face != null)
                    xml.setProperty("faceID", this.face.getID());
                if (this.personGroup != null)
                    xml.setProperty("personGroupID", this.personGroup.getID());
                return xml;
            };
            return CandidatePersonArray;
        })(samchon.protocol.EntityArray);
        faceapi.CandidatePersonArray = CandidatePersonArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="AsyncEntityArray.ts" />
///     <reference path="Person.ts" />
/// <reference path="CandidatePersonArray.ts" />
/// <reference path="PersonGroupArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * <p> A group of Person instances. </p>
         *
         * <p> The PersonGroup class is required when you try to identify a Face is from whom (Person). </p>
         *
         * <p> Reference </p>
         * <ul>
         *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244 </li>
         *  <li> https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395249 </li>
         * </ul>
         *
         * @author Jeongho Nam
         */
        var PersonGroup = (function (_super) {
            __extends(PersonGroup, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a PersonGroupArray and name.
             *
             * @param groupArray An array and parent of the PersonGroup.
             * @param name Allocated (or to be allocated) name of the PersonGroup.
             */
            function PersonGroup(groupArray, name) {
                if (name === void 0) { name = ""; }
                _super.call(this);
                this.groupArray = groupArray;
                this.id = "";
                this.name = name;
                this.registered = false;
                this.trained = false;
            }
            /**
             * @inheritdoc
             */
            PersonGroup.prototype.createChild = function (xml) {
                return new faceapi.Person(this, xml.getProperty("name"));
            };
            /* --------------------------------------------------------
                INTERACTION WITH FACE API
            -------------------------------------------------------- */
            /**
             * <p> Start training; studying.  The method train() a pre-process essentially required
             * for identify(). </p>
             *
             * <p> The training is processed in server side asynchronously. When you call the method train(),
             * it dispatches an Event "activate". When the training is completed in server side, PersonGroup
             * will dispatch the "complete" Event. </p>
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395249 </li>
             * </ul>
             */
            PersonGroup.prototype.train = function () {
                // 등록을 먼저 수행
                if (this.isRegistered() == false)
                    throw new std.LogicError("Must be registered on server.");
                // 학습 수행
                var this_ = this;
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id + "/train", "POST", null, //{"personGroupId": this.id},
                null, function (data) {
                    samchon.trace("handleRequestTrain");
                    setTimeout(PersonGroup.checkTrainStatus, 50, this_);
                });
            };
            /**
             * Query about training status to Face-API server.
             *
             * @param this_ A PersonGroup object who executed the train() method.
             */
            PersonGroup.checkTrainStatus = function (this_) {
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this_.id + "/training", "GET", null, null, function (data) {
                    var status = data["status"];
                    samchon.trace("on progress", status);
                    if (status == "succeeded") {
                        // SUCCESS
                        this_.trained = true;
                        this_.dispatchEvent(new faceapi.FaceEvent(faceapi.FaceEvent.TRAIN));
                    }
                    else if (status == "failed") {
                        // FAILED
                        var errorEvent = new ErrorEvent();
                        errorEvent.message = data["message"];
                        this_.dispatchEvent(errorEvent);
                    }
                    else {
                        // 50ms 후에 재 확인
                        setTimeout(PersonGroup.checkTrainStatus, 50, this_);
                    }
                });
            };
            /**
             * <p> Ideitify who is owner of the Face. </p>
             *
             * <p> You've to execute train() method, asynchronous method dispatching "complete" Event
             * when the training was completed, before running the identify() method. </p>
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
             * </ul>
             *
             * @param face Target face to identify
             * @param maxCandidates Permitted number of candidates to return.
             *
             * @return Candidates of the owner with conformaility degrees.
             */
            PersonGroup.prototype.identify = function (face, maxCandidates) {
                if (maxCandidates === void 0) { maxCandidates = 1; }
                // Have to be trained.
                if (this.isTrained() == false)
                    throw new std.LogicError("Must be trained as a pre-process.");
                var this_ = this;
                var candidatePersonArray = new faceapi.CandidatePersonArray(face, this);
                samchon.trace("PersonGroup::identify", this.id, face.getID(), maxCandidates);
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/identify", "POST", null, {
                    "personGroupId": this.id,
                    "faceIds": [face.getID()],
                    "maxNumOfCandidatesReturned": maxCandidates
                }, function (data) {
                    candidatePersonArray.constructByJSON(data);
                    this_.dispatchEvent(new faceapi.IdentifyEvent(this_, face, maxCandidates, candidatePersonArray));
                });
            };
            /**
             * Insert the PersonGroup to the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244 </li>
             * </ul>
             */
            PersonGroup.prototype.register = function () {
                // Issue an unique identifier.
                if (this.id == "")
                    this.id = faceapi.FaceAPI.issueID("person_group");
                samchon.trace("PersonGroup::register");
                // Register to server.
                var res = faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "PUT", { "personGroupId": this.id }, { "name": this.name, "userData": "" });
                if (res == true)
                    this.handleRegister(null);
            };
            /**
             * Remove the PersonGroup from the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395245 </li>
             * </ul>
             */
            PersonGroup.prototype.unregister = function () {
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "DELETE", { "personGroupId": this.id }, null);
                this.handleUnregister();
            };
            /**
             * @inheritdoc
             */
            PersonGroup.prototype.handleRegister = function (data) {
                this.trained = false;
                _super.prototype.handleRegister.call(this, data);
            };
            /**
             * @inheritdoc
             */
            PersonGroup.prototype.handleUnregister = function () {
                this.trained = false;
                _super.prototype.handleUnregister.call(this);
            };
            /* --------------------------------------------------------
                GETTERS & SETTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PersonGroup.prototype.key = function () {
                return this.id;
            };
            /**
             * Get groupArray.
             */
            PersonGroup.prototype.getGroupArray = function () {
                return this.groupArray;
            };
            /**
             * Get id.
             */
            PersonGroup.prototype.getID = function () {
                return this.id;
            };
            /**
             * Get name.
             */
            PersonGroup.prototype.getName = function () {
                return this.name;
            };
            /**
             * @inheritdoc
             */
            PersonGroup.prototype.isRegistered = function () {
                return this.registered;
                ;
            };
            /**
             * Test whether the PersonGroup has trained.
             */
            PersonGroup.prototype.isTrained = function () {
                return this.trained;
            };
            /**
             * Set name not only in PersonGroup but also in the Face-API server.
             *
             * <ul>
             *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524a </li>
             * </ul>
             *
             * @param name New name
             */
            PersonGroup.prototype.setName = function (name) {
                faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "PATCH", null, { "name": name, "userData": "" }, null);
                this.name = name;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PersonGroup.prototype.TAG = function () {
                return "personGroup";
            };
            /**
             * @inheritdoc
             */
            PersonGroup.prototype.CHILD_TAG = function () {
                return "person";
            };
            return PersonGroup;
        })(faceapi.AsyncEntityArray);
        faceapi.PersonGroup = PersonGroup;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
///     <reference path="PersonGroup.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An array and parent of PersonGroup entities.
         *
         * @author Jeongho Nam
         */
        var PersonGroupArray = (function (_super) {
            __extends(PersonGroupArray, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FaceAPI.
             *
             * @param api A facade controller and factory class for Face-API.
             */
            function PersonGroupArray(api) {
                _super.call(this);
                this.api = api;
            }
            /**
             * @inheritdoc
             */
            PersonGroupArray.prototype.createChild = function (xml) {
                return new faceapi.PersonGroup(this, xml.getProperty("name"));
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get api.
             */
            PersonGroupArray.prototype.getAPI = function () {
                return this.api;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PersonGroupArray.prototype.TAG = function () {
                return "personGroupArray";
            };
            /**
             * @inheritdoc
             */
            PersonGroupArray.prototype.CHILD_TAG = function () {
                return "personGroup";
            };
            return PersonGroupArray;
        })(faceapi.AsyncEntityParent);
        faceapi.PersonGroupArray = PersonGroupArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
/// <reference path="FaceList.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An array and parent of FaceList entities.
         *
         * @author Jeongho Nam
         */
        var FaceListArray = (function (_super) {
            __extends(FaceListArray, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FaceAPI.
             *
             * @param api A facade controller and factory class for Face-API.
             */
            function FaceListArray(api) {
                _super.call(this);
                this.api = api;
            }
            FaceListArray.prototype.createChild = function (xml) {
                return new faceapi.FaceList(this, xml.getProperty("name"));
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get api.
             */
            FaceListArray.prototype.getAPI = function () {
                return this.api;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            FaceListArray.prototype.TAG = function () {
                return "faceListArray";
            };
            FaceListArray.prototype.CHILD_TAG = function () {
                return "faceList";
            };
            return FaceListArray;
        })(samchon.protocol.EntityArray);
        faceapi.FaceListArray = FaceListArray;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="PersonGroupArray.ts" />
/// <reference path="FaceListArray.ts" />
/// <reference path="PictureArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * A facade controller and factory class for Face-API.
         *
         * @author Jeongho Nam
         */
        var FaceAPI = (function (_super) {
            __extends(FaceAPI, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function FaceAPI() {
                _super.call(this);
                this.personGroupArray = new faceapi.PersonGroupArray(this);
                this.faceListArray = new faceapi.FaceListArray(this);
                this.pictureArray = new faceapi.PictureArray(this);
            }
            /**
             * Factory method of PersonGroup.
             *
             * @param name Name of a new PersonGroup
             */
            FaceAPI.prototype.createPersonGroup = function (name) {
                var personGroup = new faceapi.PersonGroup(this.personGroupArray, name);
                this.personGroupArray.push(personGroup);
                return personGroup;
            };
            /**
             * Factory method of FaceList.
             *
             * @param name Name of a new FaceList.
             */
            FaceAPI.prototype.createFaceList = function (name) {
                var faceList = new faceapi.FaceList(this.faceListArray, name);
                this.faceListArray.push(faceList);
                return faceList;
            };
            /**
             * Factory method of Picture.
             *
             * @param url URL-address of a new Picture.
             */
            FaceAPI.prototype.createPicture = function (url) {
                var picture = new faceapi.Picture(this.pictureArray, url);
                this.pictureArray.push(picture);
                return picture;
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get personGroupArray.
             */
            FaceAPI.prototype.getPersonGroupArray = function () {
                return this.personGroupArray;
            };
            /**
             * Get faceListArray.
             */
            FaceAPI.prototype.getFaceListArray = function () {
                return this.faceListArray;
            };
            /**
             * Get pictureArray.
             */
            FaceAPI.prototype.getPictureArray = function () {
                return this.pictureArray;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            FaceAPI.prototype.TAG = function () {
                return "faceAPI";
            };
            /**
             * @inheritdoc
             */
            FaceAPI.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.personGroupArray.toXML(), this.pictureArray.toXML());
                return xml;
            };
            Object.defineProperty(FaceAPI, "CERTIFICATION_KEY", {
                /* --------------------------------------------------------
                    STATIC MEMBERS
                -------------------------------------------------------- */
                /**
                 * Certification key for Face-API server.
                 */
                get: function () {
                    // return "e107bcd678f64de3ae238095f7a57661";
                    // return "b072c71311d144388ac2527a5f06ffca";
                    // return "cbb239951be6454481fd7988b825f4a4";
                    return "cbb239951be6454481fd7988b825f4a4";
                },
                enumerable: true,
                configurable: true
            });
            FaceAPI.query = function (url, method, params, data, success, async) {
                if (success === void 0) { success = null; }
                if (async === void 0) { async = true; }
                var successFlag = false;
                if (success == null)
                    async = false;
                else if (success instanceof std.Bind)
                    async = true;
                $.ajax({
                    url: url + (params == null ? "" : "?" + $.param(params)),
                    beforeSend: function (xhrObj) {
                        // Request headers
                        xhrObj.setRequestHeader("Content-Type", "application/json");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", FaceAPI.CERTIFICATION_KEY);
                    },
                    type: method,
                    async: async,
                    //timeout: 10000,
                    data: (data == null) ? "" : JSON.stringify(data),
                }).done(function (data, textStatus, jqXHR) {
                    samchon.trace("success in $.ajax");
                    if (success == null)
                        successFlag = true;
                    if (success instanceof Function)
                        success.apply(null, [data]);
                    else if (success instanceof std.Bind)
                        success.apply(data);
                }).fail(function (jqXHR, textStatus, errorThrow) {
                    if (success = null)
                        successFlag = false;
                    samchon.trace(JSON.stringify(jqXHR), url);
                });
                if (success == null && async == false)
                    return successFlag;
            };
            /**
             * Issue an unique identifier code.
             *
             * @param prefix A word inserted in front of the automatically generated code.
             */
            FaceAPI.issueID = function (prefix) {
                return prefix + "_hiswill_" + new Date().getTime() + "_" + (++FaceAPI.sequence);
            };
            /**
             * A automatically increasing sequence number used on issuing unique identifier code. </p>?
             */
            FaceAPI.sequence = 0;
            return FaceAPI;
        })(samchon.protocol.Entity);
        faceapi.FaceAPI = FaceAPI;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/IEntity.ts" />
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/library/BasicEvent.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FaceEvent = (function (_super) {
            __extends(FaceEvent, _super);
            function FaceEvent(type) {
                _super.call(this, type);
            }
            Object.defineProperty(FaceEvent, "REGISTER", {
                get: function () { return "register"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FaceEvent, "UNREGISTER", {
                get: function () { return "unregister"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FaceEvent, "DETECT", {
                get: function () { return "detect"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FaceEvent, "TRAIN", {
                get: function () { return "train"; },
                enumerable: true,
                configurable: true
            });
            return FaceEvent;
        })(samchon.library.BasicEvent);
        faceapi.FaceEvent = FaceEvent;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceEvent.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var ContainerEvent = (function (_super) {
            __extends(ContainerEvent, _super);
            function ContainerEvent(type, item) {
                _super.call(this, type);
                this.item_ = item;
            }
            Object.defineProperty(ContainerEvent, "ADD", {
                get: function () { return "add"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ContainerEvent, "REMOVE", {
                get: function () { return "remove"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ContainerEvent.prototype, "item", {
                get: function () {
                    return this.item_;
                },
                enumerable: true,
                configurable: true
            });
            return ContainerEvent;
        })(faceapi.FaceEvent);
        faceapi.ContainerEvent = ContainerEvent;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />
/// <reference path="FaceLandmarks.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An abstract entity representing a landmark of a face with its position and size.
         *
         * @author Jeongho Nam
         */
        var FaceLandmark = (function (_super) {
            __extends(FaceLandmark, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FaceLandmarks.
             *
             * @param landmarks A group and parent of the FaceLandmark.
             */
            function FaceLandmark(landmarks) {
                _super.call(this);
            }
            FaceLandmark.prototype.constructByJSON = function (val) {
                faceapi.Global.fetch(this, val);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get landmarks.
             */
            FaceLandmark.prototype.getLandmarks = function () {
                return this.landmarks;
            };
            return FaceLandmark;
        })(samchon.protocol.Entity);
        faceapi.FaceLandmark = FaceLandmark;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />
/// <reference path="Point.ts" />
/// <reference path="Eyes.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An entity representing an eye.
         *
         * @author Jeongho Nam
         */
        var Eye = (function (_super) {
            __extends(Eye, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from an Eyes and direction.
             *
             * @param eyes A parent entity containing two Eye(s).
             * @param direction Direction of placed in.
             */
            function Eye(eyes, direction) {
                _super.call(this);
                this.eyes = eyes;
                this.direction = direction;
                this.top = new faceapi.Point("top");
                this.bottom = new faceapi.Point("bottom");
                this.inner = new faceapi.Point("inner");
                this.outer = new faceapi.Point("outer");
                this.pupil = new faceapi.Pupil(this);
            }
            Eye.prototype.constructByJSON = function (obj) {
                if (this.direction == faceapi.Direction.LEFT) {
                    this.top.constructByJSON(obj["eyeLeftTop"]);
                    this.bottom.constructByJSON(obj["eyeLeftBottom"]);
                    this.inner.constructByJSON(obj["eyeLeftInner"]);
                    this.outer.constructByJSON(obj["eyeLeftOuter"]);
                    this.pupil.constructByJSON(obj["pupilLeft"]);
                }
                else {
                    this.top.constructByJSON(obj["eyeRightTop"]);
                    this.bottom.constructByJSON(obj["eyeRightBottom"]);
                    this.inner.constructByJSON(obj["eyeRightInner"]);
                    this.outer.constructByJSON(obj["eyeRightOuter"]);
                    this.pupil.constructByJSON(obj["pupilRight"]);
                }
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get eyes.
             */
            Eye.prototype.getEyes = function () {
                return this.eyes;
            };
            /**
             * Get opposite side's Eye.
             */
            Eye.prototype.getOpposite = function () {
                if (this.direction == faceapi.Direction.LEFT)
                    return this.eyes.getRight();
                else
                    return this.eyes.getLeft();
            };
            /**
             * Get top.
             */
            Eye.prototype.getTop = function () {
                return this.top;
            };
            /**
             * Get bottom.
             */
            Eye.prototype.getBottom = function () {
                return this.bottom;
            };
            /**
             * Get inner.
             */
            Eye.prototype.getInner = function () {
                return this.inner;
            };
            /**
             * Get outer.
             */
            Eye.prototype.getOuter = function () {
                return this.outer;
            };
            /**
             * Get pupil.
             */
            Eye.prototype.getPupil = function () {
                return this.pupil;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            Eye.prototype.TAG = function () {
                if (this.direction == faceapi.Direction.LEFT)
                    return "left";
                else
                    return "right";
            };
            Eye.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.eraseProperty("direction");
                xml.push(this.top.toXML(), this.bottom.toXML(), this.inner.toXML(), this.outer.toXML(), this.pupil.toXML());
                return xml;
            };
            return Eye;
        })(samchon.protocol.Entity);
        faceapi.Eye = Eye;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="FaceLandmark.ts" />
/// <reference path="Eye.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * A FaceLandmark representing eyes.
         *
         * @author Jeongho Nam
         */
        var Eyes = (function (_super) {
            __extends(Eyes, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FaceLandmarks.
             *
             * @param landmarks A group and parent of the FaceLandmark.
             */
            function Eyes(landmarks) {
                _super.call(this, landmarks);
                this.left = new faceapi.Eye(this, faceapi.Direction.LEFT);
                this.right = new faceapi.Eye(this, faceapi.Direction.RIGHT);
            }
            Eyes.prototype.constructByJSON = function (obj) {
                this.left.constructByJSON(obj);
                this.right.constructByJSON(obj);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get left.
             */
            Eyes.prototype.getLeft = function () {
                return this.left;
            };
            /**
             * Get right.
             */
            Eyes.prototype.getRight = function () {
                return this.right;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            Eyes.prototype.TAG = function () {
                return "eyes";
            };
            Eyes.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.left.toXML(), this.right.toXML());
                return xml;
            };
            return Eyes;
        })(faceapi.FaceLandmark);
        faceapi.Eyes = Eyes;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />
/// <reference path="Point.ts" />
/// <reference path="Eyebrows.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An entity representing an eyebrow.
         *
         * @author Jeongho Nam
         */
        var Eyebrow = (function (_super) {
            __extends(Eyebrow, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from an Eyebrows and direction.
             *
             * @param eyeBrows A parent entity containing two Eyebrow(s).
             * @param direction Direction of placed in.
             */
            function Eyebrow(eyeBrows, direction) {
                _super.call(this);
                this.eyeBrows = eyeBrows;
                this.direction = direction;
                this.inner = new faceapi.Point("inner");
                this.outer = new faceapi.Point("outer");
            }
            Eyebrow.prototype.constructByJSON = function (obj) {
                if (this.direction == faceapi.Direction.LEFT) {
                    this.inner.constructByJSON(obj["eyebrowLeftInner"]);
                    this.outer.constructByJSON(obj["eyebrowLeftOuter"]);
                }
                else {
                    this.inner.constructByJSON(obj["eyebrowRightInner"]);
                    this.outer.constructByJSON(obj["eyebrowRightOuter"]);
                }
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get eyeBrows.
             */
            Eyebrow.prototype.getEyeBrows = function () {
                return this.eyeBrows;
            };
            /**
             * Get opposite side's Eyebrow.
             */
            Eyebrow.prototype.getOpposite = function () {
                if (this.direction == faceapi.Direction.LEFT)
                    return this.eyeBrows.getRight();
                else
                    return this.eyeBrows.getLeft();
            };
            /**
             * Get inner.
             */
            Eyebrow.prototype.getInner = function () {
                return this.inner;
            };
            /**
             * Get outer.
             */
            Eyebrow.prototype.getOuter = function () {
                return this.outer;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            Eyebrow.prototype.TAG = function () {
                if (this.direction == faceapi.Direction.LEFT)
                    return "left";
                else
                    return "right";
            };
            Eyebrow.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.eraseProperty("direction");
                xml.push(this.inner.toXML(), this.outer.toXML());
                return xml;
            };
            return Eyebrow;
        })(samchon.protocol.Entity);
        faceapi.Eyebrow = Eyebrow;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="FaceLandmark.ts" />
/// <reference path="Eyebrow.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * A FaceLandmark representing eyebrows.
         *
         * @author Jeongho Nam
         */
        var Eyebrows = (function (_super) {
            __extends(Eyebrows, _super);
            /* --------------------------------------------------------
                CONSTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FaceLandmarks.
             *
             * @param landmarks A group and parent of the FaceLandmark.
             */
            function Eyebrows(landmarks) {
                _super.call(this, landmarks);
                this.left = new faceapi.Eyebrow(this, faceapi.Direction.LEFT);
                this.right = new faceapi.Eyebrow(this, faceapi.Direction.RIGHT);
            }
            Eyebrows.prototype.constructByJSON = function (obj) {
                this.left.constructByJSON(obj);
                this.right.constructByJSON(obj);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get left.
             */
            Eyebrows.prototype.getLeft = function () {
                return this.left;
            };
            /**
             * Get right.
             */
            Eyebrows.prototype.getRight = function () {
                return this.right;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            Eyebrows.prototype.TAG = function () {
                return "eyeBrows";
            };
            Eyebrows.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.left.toXML(), this.right.toXML());
                return xml;
            };
            return Eyebrows;
        })(faceapi.FaceLandmark);
        faceapi.Eyebrows = Eyebrows;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <referecen path="FaceEvent.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FindSimilarEvent = (function (_super) {
            __extends(FindSimilarEvent, _super);
            function FindSimilarEvent(faceList, face, maxCandidates, similars) {
                _super.call(this, FindSimilarEvent.FIND);
                this.faceList_ = faceList;
                this.face_ = face;
                this.maxCandidates_ = maxCandidates;
                this.similars_ = similars;
            }
            Object.defineProperty(FindSimilarEvent, "FIND", {
                get: function () { return "find_similar"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarEvent.prototype, "faceList", {
                get: function () {
                    return this.faceList_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarEvent.prototype, "face", {
                get: function () {
                    return this.face_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarEvent.prototype, "maxCandidates", {
                get: function () {
                    return this.maxCandidates_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarEvent.prototype, "similars", {
                get: function () {
                    return this.similars_;
                },
                enumerable: true,
                configurable: true
            });
            return FindSimilarEvent;
        })(faceapi.FaceEvent);
        faceapi.FindSimilarEvent = FindSimilarEvent;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <referecen path="FaceEvent.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var FindSimilarGroupEvent = (function (_super) {
            __extends(FindSimilarGroupEvent, _super);
            function FindSimilarGroupEvent(faceArray, similarGroups) {
                _super.call(this, FindSimilarGroupEvent.FIND);
                this.similarGroups_ = similarGroups;
            }
            Object.defineProperty(FindSimilarGroupEvent, "FIND", {
                get: function () { return "find_similar_group"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarGroupEvent.prototype, "faceArray", {
                get: function () {
                    return this.faceArray_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSimilarGroupEvent.prototype, "similarGroups", {
                get: function () {
                    return this.similarGroups_;
                },
                enumerable: true,
                configurable: true
            });
            return FindSimilarGroupEvent;
        })(faceapi.FaceEvent);
        faceapi.FindSimilarGroupEvent = FindSimilarGroupEvent;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="IJSONEntity.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="../../samchon/protocol/EntityArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * A static, utiltiy class.
         *
         * @author Jeongho Nam
         */
        var Global = (function () {
            function Global() {
            }
            /**
             * Construct member of an entity from a JSON object.
             *
             * @param entity A target entity to construct member data.
             * @param json JSON object containing member data.
             */
            Global.fetch = function (entity, json) {
                for (var key in json) {
                    if (typeof key != "string" || entity.hasOwnProperty(key) == false)
                        continue;
                    if (typeof entity[key] == "number" || typeof entity[key] == "string")
                        entity[key] = json[key];
                    else if (entity[key] instanceof samchon.protocol.Entity || entity[key] instanceof samchon.protocol.EntityArray) {
                        var json_entity = entity[key];
                        json_entity.constructByJSON(json[key]);
                    }
                }
            };
            return Global;
        })();
        faceapi.Global = Global;
        /**
         * A static class for expressing direction.
         *
         * @author Jeongho Nam
         */
        var Direction = (function () {
            function Direction() {
            }
            Object.defineProperty(Direction, "LEFT", {
                /**
                 * left, code 1.
                 */
                get: function () { return 1; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Direction, "RIGHT", {
                /**
                 * right, code 2.
                 */
                get: function () { return 2; },
                enumerable: true,
                configurable: true
            });
            ;
            return Direction;
        })();
        faceapi.Direction = Direction;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <referecen path="FaceEvent.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var IdentifyEvent = (function (_super) {
            __extends(IdentifyEvent, _super);
            function IdentifyEvent(personGroup, face, maxCandidates, candidates) {
                _super.call(this, IdentifyEvent.IDENTIFY);
                this.face_ = face;
                this.personGroup_ = personGroup;
                this.maxCandidates_ = maxCandidates;
                this.candidates_ = candidates;
            }
            Object.defineProperty(IdentifyEvent, "IDENTIFY", {
                get: function () { return "identify"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IdentifyEvent.prototype, "personGroup", {
                get: function () {
                    return this.personGroup_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IdentifyEvent.prototype, "face", {
                get: function () {
                    return this.face_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IdentifyEvent.prototype, "maxCandidates", {
                get: function () {
                    return this.maxCandidates_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IdentifyEvent.prototype, "candidates", {
                get: function () {
                    return this.candidates_;
                },
                enumerable: true,
                configurable: true
            });
            return IdentifyEvent;
        })(faceapi.FaceEvent);
        faceapi.IdentifyEvent = IdentifyEvent;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="../../samchon/protocol/Entity.ts" />
/// <reference path="IJSonEntity.ts" />
/// <reference path="Point.ts" />
/// <reference path="Mouth.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An entity representing a lip contained in a Mouth.
         *
         * @author Jeongho Nam
         */
        var Lip = (function (_super) {
            __extends(Lip, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a Mouth.
             *
             * @param mouth A mouth containing the Lip.
             */
            function Lip(mouth) {
                _super.call(this);
                this.mouth = mouth;
                this.upperTop = new faceapi.Point("upperTop");
                this.upperBottom = new faceapi.Point("upperBottom");
                this.underTop = new faceapi.Point("underTop");
                this.underBottom = new faceapi.Point("underBottom");
            }
            Lip.prototype.constructByJSON = function (obj) {
                this.upperTop.constructByJSON(obj["upperLipTop"]);
                this.upperBottom.constructByJSON(obj["upperLipBottom"]);
                this.underTop.constructByJSON(obj["underLipTop"]);
                this.underBottom.constructByJSON(obj["underLipBottom"]);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get mouth.
             */
            Lip.prototype.getMouth = function () {
                return this.mouth;
            };
            /**
             * Get upperTop.
             */
            Lip.prototype.getUpperTop = function () {
                return this.upperTop;
            };
            /**
             * Get upperBottom.
             */
            Lip.prototype.getUpperBottom = function () {
                return this.upperBottom;
            };
            /**
             * Get underTop.
             */
            Lip.prototype.getUnderTop = function () {
                return this.underTop;
            };
            /**
             * Get underBottom.
             */
            Lip.prototype.getUnderBottom = function () {
                return this.underBottom;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            Lip.prototype.TAG = function () {
                return "lip";
            };
            Lip.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.upperTop.toXML(), this.upperBottom.toXML(), this.underTop.toXML(), this.underBottom.toXML());
                return xml;
            };
            return Lip;
        })(samchon.protocol.Entity);
        faceapi.Lip = Lip;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="FaceLandmark.ts" />
/// <reference path="Lip.ts" />
/// <reference path="Point.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * A FaceLandmark representing a mouth.
         */
        var Mouth = (function (_super) {
            __extends(Mouth, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FaceLandmarks.
             *
             * @param landmarks A group and parent of the FaceLandmark.
             */
            function Mouth(landmarks) {
                _super.call(this, landmarks);
                this.lip = new faceapi.Lip(this);
                this.left = new faceapi.Point("left");
                this.right = new faceapi.Point("right");
            }
            Mouth.prototype.constructByJSON = function (obj) {
                this.lip.constructByJSON(obj);
                this.left.constructByJSON(obj["mouthLeft"]);
                this.right.constructByJSON(obj["mouthRight"]);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get lip.
             */
            Mouth.prototype.getLip = function () {
                return this.lip;
            };
            /**
             * Get left.
             */
            Mouth.prototype.getLeft = function () {
                return this.left;
            };
            /**
             * Get right.
             */
            Mouth.prototype.getRight = function () {
                return this.right;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            Mouth.prototype.TAG = function () {
                return "mouth";
            };
            Mouth.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.lip.toXML(), this.left.toXML(), this.right.toXML());
                return xml;
            };
            return Mouth;
        })(faceapi.FaceLandmark);
        faceapi.Mouth = Mouth;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="FaceLandmark.ts" />
/// <reference path="Point.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * A FaceLandmark representing a nose.
         *
         * @author Jeongho Nam
         */
        var Nose = (function (_super) {
            __extends(Nose, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from a FaceLandmarks.
             *
             * @param landmarks A group and parent of the FaceLandmark.
             */
            function Nose(landmarks) {
                _super.call(this, landmarks);
                this.tip = new faceapi.Point("tip");
                this.leftRoot = new faceapi.Point("leftRoot");
                this.rightRoot = new faceapi.Point("rightRoot");
                this.leftAlarTop = new faceapi.Point("leftAlarTop");
                this.rightAlarTop = new faceapi.Point("rightAlarTop");
                this.leftAlarOutTip = new faceapi.Point("leftAlarOutTip");
                this.rightAlarOutTip = new faceapi.Point("rightAlarOutTip");
            }
            Nose.prototype.constructByJSON = function (obj) {
                this.tip.constructByJSON(obj["noseTip"]);
                this.leftRoot.constructByJSON(obj["noseRootLeft"]);
                this.rightRoot.constructByJSON(obj["noseRootRight"]);
                this.leftAlarTop.constructByJSON(obj["noseLeftAlarTop"]);
                this.rightAlarTop.constructByJSON(obj["noseRightAlarTop"]);
                this.leftAlarOutTip.constructByJSON(obj["noseLeftAlarOutTip"]);
                this.rightAlarOutTip.constructByJSON(obj["noseRightAlarOutTip"]);
            };
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get tip.
             */
            Nose.prototype.getTip = function () {
                return this.tip;
            };
            /**
             * Get leftRoot.
             */
            Nose.prototype.getLeftRoot = function () {
                return this.leftRoot;
            };
            /**
             * Get rightRoot.
             */
            Nose.prototype.getRightRoot = function () {
                return this.rightRoot;
            };
            /**
             * Get leftAlarTop.
             */
            Nose.prototype.getLeftAlarTop = function () {
                return this.leftAlarTop;
            };
            /**
             * Get rightAlarTop.
             */
            Nose.prototype.getRightAlarTop = function () {
                return this.rightAlarTop;
            };
            /**
             * Get letAlarOutTip.
             */
            Nose.prototype.getLeftAlarOutTip = function () {
                return this.leftAlarOutTip;
            };
            /**
             * Get rightAlarOutTip.
             */
            Nose.prototype.getRightAlarOutTip = function () {
                return this.rightAlarOutTip;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            Nose.prototype.TAG = function () {
                return "nose";
            };
            Nose.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.tip.toXML(), this.leftRoot.toXML(), this.rightRoot.toXML(), this.leftAlarTop.toXML(), this.rightAlarTop.toXML(), this.leftAlarOutTip.toXML(), this.rightAlarOutTip.toXML());
                return xml;
            };
            return Nose;
        })(faceapi.FaceLandmark);
        faceapi.Nose = Nose;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="Point.ts" />
/// <reference path="Eye.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        /**
         * An entity representing a pupil in an Eye.
         *
         * @author Jeongho Nam
         */
        var Pupil = (function (_super) {
            __extends(Pupil, _super);
            /* --------------------------------------------------------
                CONTRUCTORS
            -------------------------------------------------------- */
            /**
             * Construct from an Eye.
             *
             * @param eye An eye the Pupil is belonged to.
             */
            function Pupil(eye) {
                _super.call(this, "pupil");
                this.eye = eye;
            }
            /* --------------------------------------------------------
                GETTERS
            -------------------------------------------------------- */
            /**
             * Get eye.
             */
            Pupil.prototype.getEye = function () {
                return this.eye;
            };
            /* --------------------------------------------------------
                EXPORTERS
            -------------------------------------------------------- */
            Pupil.prototype.TAG = function () {
                return _super.prototype.TAG.call(this);
            };
            return Pupil;
        })(faceapi.Point);
        faceapi.Pupil = Pupil;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var TestUnit = (function () {
            /**
             * Default Constructor.
             */
            function TestUnit() {
                this.api = new faceapi.FaceAPI();
                this.detect();
            }
            /* --------------------------------------------------------
                COMMANDERS
            -------------------------------------------------------- */
            TestUnit.prototype.detect = function () {
                var picture = this.api.createPicture("http://samchon.org/download/group_others2.jpg");
                picture.addEventListener(faceapi.FaceEvent.DETECT, this.handleDetect, this);
                picture.detect();
            };
            TestUnit.prototype.findSimilarGroups = function (picture) {
                var face = picture.at(0);
                face.addEventListener(faceapi.FindSimilarGroupEvent.FIND, this.handleSimilarGroups);
                face.findSimilarGroups(picture);
            };
            TestUnit.prototype.constructPersonGroups = function (picture) {
                var personGroupArray = this.api.getPersonGroupArray();
                personGroupArray.addEventListener(faceapi.ContainerEvent.ADD, function (event) {
                    samchon.trace("A personGroup is registered.");
                });
                var personGroup = this.api.createPersonGroup("other_group");
                for (var i = 0; i < picture.size(); i++) {
                    var person = new faceapi.Person(personGroup, (i + 1) + " th person");
                    var face = picture.at(i);
                    person.addEventListener(faceapi.ContainerEvent.ADD, this.handleInsertion, this);
                    personGroup.push(person);
                    person.push(face);
                }
            };
            TestUnit.prototype.train = function (personGroup) {
                personGroup.addEventListener(faceapi.FaceEvent.DETECT, this.handleDetect, this);
                personGroup.train();
            };
            TestUnit.prototype.identify = function (face, personGroup) {
                face.addEventListener(faceapi.IdentifyEvent.IDENTIFY, this.handleIdentify);
                face.identify(personGroup, 1);
            };
            /* --------------------------------------------------------
                EVENT HANDLERS
            -------------------------------------------------------- */
            TestUnit.prototype.handleDetect = function (event) {
                var picture = event.target;
                samchon.trace(picture.toXML().toString());
                // TO THE NEXT STEP
                this.findSimilarGroups(picture);
                //this.constructPersonGroups(picture);
            };
            TestUnit.prototype.handleSimilarGroups = function (event) {
                var similarGroups = event.similarGroups;
                samchon.trace(similarGroups.toXML().toString());
            };
            TestUnit.prototype.handleInsertion = function (event) {
                var person = event.target;
                var personGroup = person.getGroup();
                samchon.trace("A person is constructed clearly: " + person.getName());
                if (personGroup.isRegistered() == false)
                    return;
                this.train(personGroup);
            };
            TestUnit.prototype.handleTrain = function (event) {
                samchon.trace("A person group is trained.");
                var personGroup = event.target;
                var face = personGroup.at(2 - 1).at(0).getFace();
                this.identify(face, personGroup);
            };
            TestUnit.prototype.handleIdentify = function (event) {
                var candidatePersonArray = event.candidates;
                samchon.trace("Some faces are identified as candidates: \n" + candidatePersonArray.toXML().toString());
                // THIS IS THE LAST STEP.
            };
            return TestUnit;
        })();
        faceapi.TestUnit = TestUnit;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="Container.ts" />
/// <reference path="Iterator.ts" />
var std;
(function (std) {
    /**
     * <p> Lists are sequence containers that allow constant time insert and erase operations anywhere
     * within the sequence, and iteration in both directions. </p>
     *
     * <p> List containers are implemented as doubly-linked lists; Doubly linked lists can store each of
     * the elements they contain in different and unrelated storage locations. The ordering is kept
     * internally by the association to each element of a link to the element preceding it and a link to
     * the element following it. </p>
     *
     * <p> They are very similar to forward_list: The main difference being that forward_list objects are
     * single-linked lists, and thus they can only be iterated forwards, in exchange for being somewhat
     * smaller and more efficient. </p>
     *
     * <p> Compared to other base standard sequence containers (array, vector and deque), lists perform
     * generally better in inserting, extracting and moving elements in any position within the container
     * for which an iterator has already been obtained, and therefore also in algorithms that make
     * intensive use of these, like sorting algorithms. </p>
     *
     * <p> The main drawback of lists and forward_lists compared to these other sequence containers is that
     * they lack direct access to the elements by their position; For example, to access the sixth element
     * in a list, one has to iterate from a known position (like the beginning or the end) to that position,
     * which takes linear time in the distance between these. They also consume some extra memory to keep
     * the linking information associated to each element (which may be an important factor for large lists
     * of small-sized elements). </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/list/list/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            if (args.length == 0) {
                this.clear();
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                var array = args[0];
                this.clear();
                this.push.apply(this, array);
            }
            else if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof std.Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                var size = args[0];
                var val = args[1];
                this.assign(size, val);
            }
        }
        List.prototype.assign = function (par1, par2) {
            if (par1 instanceof std.Iterator && par2 instanceof std.Iterator) {
                // PARAMETERS
                var begin = par1;
                var end = par2;
                // BODY
                var prev = null;
                var item;
                var it = begin;
                while (true) {
                    // CONSTRUCT ELEMENT ITEM
                    item = new ListIterator(this, prev, null, (it != end ? it.value : null));
                    // SET PREVIOUS NEXT POINTER
                    if (prev != null)
                        prev.setNext(item);
                    // CONSTRUCT BEGIN AND END
                    if (it == begin)
                        this.begin_ = item;
                    else if (it == end) {
                        this.end_ = item;
                        break;
                    }
                    // ADD COUNTS AND STEP TO THE NEXT
                    this.size_++;
                    it = it.next();
                }
            }
        };
        List.prototype.clear = function () {
            var it = new ListIterator(this, null, null, null);
            it.setPrev(it);
            it.setNext(it);
            this.begin_ = it;
            this.end_ = it;
            this.size_ = 0;
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        List.prototype.begin = function () {
            return this.begin_;
        };
        /**
         * @inheritdoc
         */
        List.prototype.end = function () {
            return this.end_;
        };
        /**
         * @inheritdoc
         */
        List.prototype.size = function () {
            return this.size_;
        };
        /**
         * <p> Access first element. </p>
         * <p> Returns a value in the first element of the List. </p>
         *
         * <p> Unlike member <code>List.end()</code>, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the first element of the List.
         */
        List.prototype.front = function () {
            return this.begin_.value;
        };
        /**
         * <p> Access last element. </p>
         * <p> Returns a value in the last element of the List. </p>
         *
         * <p> Unlike member <code>List.end()</code>, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the last element of the List.
         */
        List.prototype.back = function () {
            return this.end_.prev().value;
        };
        /* ---------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------- */
        List.prototype.push = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < args.length; i++)
                this.pushBack(args[i]);
            return this.size();
        };
        List.prototype.pushFront = function (val) {
            var item = new ListIterator(this, null, this.begin_, val);
            // CONFIGURE BEGIN AND NEXT
            this.begin_.setPrev(item);
            if (this.size_ == 0) {
                // IT WAS EMPTY
                this.end_ = new ListIterator(this, item, item, null);
                item.setNext(this.end_);
            }
            else
                this.end_.setNext(item);
            // SET
            this.begin_ = item;
            this.size_++;
        };
        List.prototype.pushBack = function (val) {
            var prev = this.end_.prev();
            var item = new ListIterator(this, this.end_.prev(), this.end_, val);
            prev.setNext(item);
            this.end_.setPrev(item);
            if (this.empty() == true) {
                this.begin_ = item;
                item.setPrev(this.end_);
            }
            this.size_++;
        };
        /**
         * <p> Delete first element. </p>
         *
         * <p> Removes first last element in the List container, effectively reducing the container
         * <code>size</code> by one. </p>
         */
        List.prototype.popFront = function () {
            this.erase(this.begin_);
        };
        /**
         * <p> Delete last element. </p>
         *
         * <p> Removes the last element in the List container, effectively reducing the container
         * <code>size</code> by one. </p>
         */
        List.prototype.popBack = function () {
            this.erase(this.end_.prev());
        };
        List.prototype.insert = function (myEnd, begin, end) {
            if (end === void 0) { end = null; }
            if (this != myEnd.getSource())
                throw new std.InvalidArgument("Parametric Iterator is not this Container's own.");
            else if (end != null && begin.getSource() != end.getSource())
                throw new std.InvalidArgument("Parameter begin and end are not from same container.");
            if (end == null)
                end = begin.next();
            var myPrev = myEnd;
            var myLast = myEnd.next();
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next()) {
                var myIt = new ListIterator(this, myPrev, null, it.value);
                myPrev.setNext(myIt);
                if (it == begin && this.empty() == true)
                    this.begin_ = myIt;
                myPrev = myIt;
                size++;
            }
            myPrev.setNext(myLast);
            myLast.setPrev(myPrev);
            this.size_ += size;
            return myPrev;
        };
        List.prototype.erase = function (begin, end) {
            if (end === void 0) { end = null; }
            if (this != begin.getSource() || begin.getSource() != end.getSource())
                throw new std.InvalidArgument("Parametric Iterator is not this Container's own.");
            var prev = begin.prev();
            var next = (end == null)
                ? begin.next()
                : end.next();
            prev.setNext(next);
            next.setPrev(prev);
            // CALCULATE THE SIZE
            var size = 0;
            if (end != null) {
                for (var it = begin; it.equals(end) == false; it = it.next())
                    size++;
            }
            else
                size = 1;
            this.size_ -= size;
            return prev;
        };
        return List;
    })(std.Container);
    std.List = List;
    var ListIterator = (function (_super) {
        __extends(ListIterator, _super);
        /* ---------------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------------- */
        /**
         * <p> Construct from source List. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in List instead. </p>
         *
         * @param list The source vector to reference.
         */
        function ListIterator(source, prev, next, value) {
            _super.call(this, source);
            this.prev_ = prev;
            this.next_ = next;
            this.value_ = value;
        }
        ListIterator.prototype.setPrev = function (prev) {
            this.prev_ = prev;
        };
        ListIterator.prototype.setNext = function (next) {
            this.next_ = next;
        };
        /* ---------------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------------- */
        ListIterator.prototype.equals = function (obj) {
            if (obj instanceof ListIterator == false)
                return false;
            var it = obj;
            return _super.prototype.equals.call(this, obj) == true && this.prev_ == it.prev_ && this.next_ == it.next_;
        };
        ListIterator.prototype.prev = function () {
            return this.prev_;
        };
        ListIterator.prototype.next = function () {
            return this.next_;
        };
        Object.defineProperty(ListIterator.prototype, "value", {
            get: function () {
                return this.value_;
            },
            set: function (val) {
                this.value_ = val;
            },
            enumerable: true,
            configurable: true
        });
        return ListIterator;
    })(std.Iterator);
    std.ListIterator = ListIterator;
})(std || (std = {}));
/// <reference path="../../API.ts" />
/// <reference path="../../../std/List.ts" />
var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var container;
        (function (container) {
            function main() {
                var list = new std.UnorderedSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                samchon.trace("#" + list.size());
                for (var it = list.begin(); it.equals(list.end()) == false; it = it.next())
                    samchon.trace(it.value);
                var eventDispatcher = new samchon.library.EventDispatcher();
                eventDispatcher.addEventListener("complete", handleEvent);
                eventDispatcher.dispatchEvent(new samchon.library.BasicEvent("complete"));
            }
            container.main = main;
            function handleEvent(event) {
                samchon.trace("completed");
            }
            container.handleEvent = handleEvent;
        })(container = example.container || (example.container = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="../../protocol/EntityArray.ts" />
/// <reference path="../../protocol/Entity.ts" />
var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var entity;
        (function (entity) {
            function main() {
                var str = "<memberList>\n" +
                    "   <member id='abcd' name='ABCD' />\n" +
                    "   <member id='efgh' name='EFGH' />\n" +
                    "</memberList>";
                var xml = new samchon.library.XML(str);
                samchon.trace(xml.toString());
                samchon.trace(new samchon.library.XML(xml.toString()).toString());
            }
            entity.main = main;
        })(entity = example.entity || (example.entity = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="../../protocol/IEntity.ts" />
/// <reference path="../../API.ts" />
/// <reference path="../../protocol/EntityArray.ts" />
///     <referecen path="Product.ts" />
var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var packer;
        (function (packer) {
            var ProductArray = (function (_super) {
                __extends(ProductArray, _super);
                /* ------------------------------------------------------------------
                    CONSTRUCTORS
                ------------------------------------------------------------------ */
                /**
                 * Default Constructor.
                 */
                function ProductArray() {
                    _super.call(this);
                }
                ProductArray.prototype.createChild = function (xml) {
                    return new packer.Product();
                };
                /* ------------------------------------------------------------------
                    EXPORTERS
                ------------------------------------------------------------------ */
                ProductArray.prototype.TAG = function () {
                    return "productArray";
                };
                ProductArray.prototype.CHILD_TAG = function () {
                    return "product";
                };
                return ProductArray;
            })(samchon.protocol.EntityArray);
            packer.ProductArray = ProductArray;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="ProductArray.ts" />
///     <reference path="Instance.ts" />
var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var packer;
        (function (packer) {
            var Wrapper = (function (_super) {
                __extends(Wrapper, _super);
                function Wrapper() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    _super.call(this);
                    if (args.length == 1 && args[0] instanceof Wrapper) {
                        var wrapper = args[0];
                        this.name = wrapper.name;
                        this.price = wrapper.price;
                        this.volume = wrapper.volume;
                        this.weight = wrapper.weight;
                    }
                    else if (args.length == 4) {
                        this.name = args[0];
                        this.price = args[1];
                        this.volume = args[2];
                        this.weight = args[3];
                    }
                }
                Wrapper.prototype.createChild = function (xml) {
                    return new packer.Product();
                };
                /* --------------------------------------------------------------------
                    OPERATORS
                -------------------------------------------------------------------- */
                Wrapper.prototype.tryInsert = function (product) {
                    var volume = 0;
                    var weight = 0;
                    for (var i = 0; i < this.size(); i++) {
                        volume += this.at(i).getVolume();
                        weight += this.at(i).getWeight();
                    }
                    if (product.getVolume() + volume > this.volume ||
                        product.getWeight() + weight > this.weight) {
                        return false;
                    }
                    this.push(product);
                    return true;
                };
                /* --------------------------------------------------------------------
                    GETTERS
                -------------------------------------------------------------------- */
                Wrapper.prototype.getName = function () {
                    return this.name;
                };
                Wrapper.prototype.getPrice = function () {
                    return this.price;
                };
                Wrapper.prototype.getVolume = function () {
                    return this.volume;
                };
                Wrapper.prototype.getWeight = function () {
                    return this.weight;
                };
                /* --------------------------------------------------------------------
                    EXPORTERS
                -------------------------------------------------------------------- */
                Wrapper.prototype.TAG = function () {
                    return "wrapper";
                };
                return Wrapper;
            })(packer.ProductArray);
            packer.Wrapper = Wrapper;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="../../protocol/EntityArray.ts" />
///     <reference path="Wrapper.ts" />
var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var packer;
        (function (packer) {
            var WrapperArray = (function (_super) {
                __extends(WrapperArray, _super);
                /* --------------------------------------------------------------------
                    CONSTRUCTORS
                -------------------------------------------------------------------- */
                /**
                 * <p> Construct from a sample wrapper. </p>
                 *
                 * @param sample A sample wrapper used to copy wrappers.
                 */
                function WrapperArray(sample) {
                    if (sample === void 0) { sample = null; }
                    _super.call(this);
                    this.sample = sample;
                    this.reserved = new Array();
                }
                WrapperArray.prototype.construct = function (xml) {
                    _super.prototype.construct.call(this, xml);
                    this.sample = new packer.Wrapper();
                    this.sample.construct(xml);
                };
                WrapperArray.prototype.createChild = function (xml) {
                    return new packer.Wrapper();
                };
                /* --------------------------------------------------------------------
                    OPERATORS
                -------------------------------------------------------------------- */
                /**
                 * <p> Try to insert a product into reserved list. </p>
                 *
                 * <p> If the Product's volume and weight is equal or less than the Wrapper categorized so that enable to
                 * insert in a Wrapper, reserve the Product and returns <i>true</i>. If not, does not reserve and just
                 * return <i>false</i>. </p>
                 *
                 * @return Whether the Product's volume and weight is equal or less than the Wrapper.
                 */
                WrapperArray.prototype.tryInsert = function (product) {
                    if (product.getVolume() > this.sample.getVolume() ||
                        product.getWeight() > this.sample.getWeight()) {
                        return false;
                    }
                    this.reserved.push(product);
                    return true;
                };
                /**
                 * <p> Optimize to retrieve the best solution. </p>
                 *
                 * <p> Retrieves the best solution of packaging in level of WrapperArray. </p>
                 * <p> Shuffles sequence of reserved Product(s) by samchon::library::FactorialGenerator and insert the reserved
                 * Products(s) following the sequence creating Wrapper(s) as needed. Between the sequences from FactorialGenerator,
                 * retrieve and determine the best solution. </p>
                 *
                 * <h4> Note. </h4>
                 * <p> Sequence of inserting Product can affeact to numbers of Wrapper(s) to be used. </p>
                 * <p> It's the reason why even WrapperArray has the optimize() method. </p>
                 */
                WrapperArray.prototype.optimize = function () {
                    if (this.reserved.length == 0)
                        return;
                    var factorial = new samchon.library.FactorialGenerator(this.reserved.length);
                    var minWrapperArray;
                    for (var i = 0; i < factorial.size(); i++) {
                        var wrapperArray = new WrapperArray(this.sample);
                        var row = factorial.at(i);
                        for (var j = 0; j < row.length; j++) {
                            var product = this.reserved[row[j]];
                            if (wrapperArray.size() == 0 ||
                                wrapperArray.at(wrapperArray.size() - 1).tryInsert(product) == false) {
                                var wrapper = new packer.Wrapper(this.sample);
                                wrapper.tryInsert(product);
                                wrapperArray.push(wrapper);
                            }
                        }
                        if (minWrapperArray == null ||
                            wrapperArray.calcPrice() < minWrapperArray.calcPrice()) {
                            minWrapperArray = wrapperArray;
                        }
                    }
                    //REPLACE TO MIN_WRAPPER_ARRAY
                    this.splice(0, this.size());
                    for (var i = 0; i < minWrapperArray.size(); i++)
                        this.push(minWrapperArray.at(i));
                };
                /* --------------------------------------------------------------------
                    GETTERS
                -------------------------------------------------------------------- */
                /**
                 * <p> Calculate price of the Wrapper(s). </p>
                 *
                 * <p> Calculates price of all wrappers'. The price does not contain inserted products'. </p>
                 */
                WrapperArray.prototype.calcPrice = function () {
                    return this.sample.getPrice() * this.size();
                };
                /**
                 * <p> Get sample. </p>
                 */
                WrapperArray.prototype.getSample = function () {
                    return this.sample;
                };
                /* --------------------------------------------------------------------
                    EXPORTERS
                -------------------------------------------------------------------- */
                WrapperArray.prototype.TAG = function () {
                    return "wrapperArray";
                };
                WrapperArray.prototype.CHILD_TAG = function () {
                    return "wrapper";
                };
                WrapperArray.prototype.toXML = function () {
                    var xml = _super.prototype.toXML.call(this);
                    xml.addAllProperties(this.sample.toXML());
                    return xml;
                };
                return WrapperArray;
            })(samchon.protocol.EntityArray);
            packer.WrapperArray = WrapperArray;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="../../protocol/EntityArray.ts" />
///     <reference path="WrapperArray.ts" />
var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var packer;
        (function (packer_1) {
            /**
             * <p> A packer planning the best packaging. </p>
             * <p> Retrieves the solution of packaging by combination permuation and factorial case. </p>
             *
             * <h4> Warning. </h4>
             * <p> Be careful about number of products and wrappers. </p>
             * <p> The time complexity of Packer overs O(m^n). Elapsed time of calculation increases enourmously.
             * Do not use Packer if the digits of number of products or wrappers overs 2. </p>
             *
             * @author Jeongho Nam
             */
            var Packer = (function (_super) {
                __extends(Packer, _super);
                /* --------------------------------------------------------------------
                    CONSTRUCTORS
                -------------------------------------------------------------------- */
                /**
                 * <p> Construct from an argument. </p>
                 */
                function Packer(obj) {
                    if (obj === void 0) { obj = null; }
                    _super.call(this);
                    if (obj == null) {
                        this.productArray = new packer_1.ProductArray();
                        return;
                    }
                    if (obj instanceof packer_1.ProductArray) {
                        this.productArray = obj;
                    }
                    else if (obj instanceof Packer) {
                        var packer = obj;
                        this.productArray = packer.productArray;
                        for (var i = 0; i < packer.size(); i++)
                            this.push(new packer_1.WrapperArray(packer.at(i).getSample()));
                    }
                    else
                        throw "invalid argument";
                }
                Packer.prototype.createChild = function (xml) {
                    return new packer_1.WrapperArray();
                };
                /* --------------------------------------------------------------------
                    CALCULATORS
                -------------------------------------------------------------------- */
                /**
                 * <p> Find the best packaging method. </p>
                 */
                Packer.prototype.optimize = function (start, size) {
                    if (start === void 0) { start = 0; }
                    if (size === void 0) { size = -1; }
                    if (this.size() == 0 || this.productArray.size() == 0)
                        return;
                    var caseGenerator = new samchon.library.CombinedPermutationGenerator(this.size(), this.productArray.size());
                    var minPacker = null;
                    //ADJUST END INDEX
                    if (size == -1 || start + size > caseGenerator.size())
                        size = caseGenerator.size() - start;
                    //FIND THE BEST SOLUTION
                    for (var i = start; i < start + size; i++) {
                        var packer = new Packer(this);
                        var row = caseGenerator.at(i);
                        var validity = true;
                        for (var j = 0; j < row.length; j++) {
                            var product = this.productArray.at(j);
                            var wrapperArray = packer.at(row[j]);
                            if (wrapperArray.tryInsert(product) == false) {
                                validity = false;
                                break;
                            }
                        }
                        if (validity == false)
                            continue;
                        //OPTIMIZE ALL WRAPPERS IN A PACKER
                        for (var j = 0; j < packer.size(); j++)
                            packer.at(j).optimize();
                        if (minPacker == null || packer.calcPrice() < minPacker.calcPrice())
                            minPacker = packer;
                    }
                    //REPLACE TO MIN_PACKER
                    this.splice(0, this.size());
                    for (var i = 0; i < minPacker.size(); i++)
                        this.push(minPacker.at(i));
                };
                /**
                 * <p> Calculate price of the wrappers. </p>
                 */
                Packer.prototype.calcPrice = function () {
                    var price = 0;
                    for (var i = 0; i < this.size(); i++)
                        price += this.at(i).calcPrice();
                    return price;
                };
                /* --------------------------------------------------------------------
                    EXPORTERS
                -------------------------------------------------------------------- */
                Packer.prototype.TAG = function () {
                    return "packer";
                };
                Packer.prototype.CHILD_TAG = function () {
                    return "wrapperArray";
                };
                /* --------------------------------------------------------------------
                    STATIC MAIN
                -------------------------------------------------------------------- */
                Packer.main = function () {
                    var productArray = new packer_1.ProductArray();
                    productArray.push(new packer_1.Product("Eraser", 500, 10, 70), new packer_1.Product("Pencil", 400, 30, 35), new packer_1.Product("Pencil", 400, 30, 35), new packer_1.Product("Pencil", 400, 30, 35), new packer_1.Product("Book", 8000, 150, 300), new packer_1.Product("Book", 8000, 150, 300), new packer_1.Product("Drink", 1000, 75, 250), new packer_1.Product("Umbrella", 4000, 200, 1000), new packer_1.Product("Notebook-PC", 800000, 150, 850), new packer_1.Product("Tablet-PC", 600000, 120, 450));
                    var packer = new Packer(productArray);
                    packer.push(new packer_1.WrapperArray(new packer_1.Wrapper("Large", 100, 200, 1000)), new packer_1.WrapperArray(new packer_1.Wrapper("Medium", 70, 150, 500)), new packer_1.WrapperArray(new packer_1.Wrapper("Small", 50, 100, 250)));
                    packer.optimize();
                    samchon.trace(packer.toXML().toString());
                };
                return Packer;
            })(samchon.protocol.EntityArray);
            packer_1.Packer = Packer;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="../../protocol/Entity.ts" />
var samchon;
(function (samchon) {
    var example;
    (function (example) {
        var packer;
        (function (packer) {
            var Product = (function (_super) {
                __extends(Product, _super);
                function Product(name, price, volume, weight) {
                    if (name === void 0) { name = ""; }
                    if (price === void 0) { price = 0; }
                    if (volume === void 0) { volume = 0; }
                    if (weight === void 0) { weight = 0; }
                    _super.call(this);
                    this.name = name;
                    this.price = price;
                    this.volume = volume;
                    this.weight = weight;
                }
                /* --------------------------------------------------------------------
                    GETTERS
                -------------------------------------------------------------------- */
                Product.prototype.getName = function () {
                    return this.name;
                };
                Product.prototype.getPrice = function () {
                    return this.price;
                };
                Product.prototype.getVolume = function () {
                    return this.volume;
                };
                Product.prototype.getWeight = function () {
                    return this.weight;
                };
                /* --------------------------------------------------------------------
                    EXPORTERS
                -------------------------------------------------------------------- */
                Product.prototype.TAG = function () {
                    return "product";
                };
                return Product;
            })(samchon.protocol.Entity);
            packer.Product = Product;
        })(packer = example.packer || (example.packer = {}));
    })(example = samchon.example || (samchon.example = {}));
})(samchon || (samchon = {}));
/// <reference path="library/StringUtil.ts" />
/// <reference path="../std/Pair.ts" />
var samchon;
(function (samchon) {
    var Global = (function () {
        function Global() {
        }
        return Global;
    })();
    samchon.Global = Global;
})(samchon || (samchon = {}));
//var uid_: number = 0;
//Object.prototype["__getUID"] = function () 
//{
//    if (this.hasOwnProperty("uid__") == true)
//        return this["uid__"];
//    else 
//    {
//        this["uid__"] = ++uid_;
//        return this["uid__"];
//    }
//} 
/// <reference path="../API.ts" />
/// <reference path="../../std/Exception.ts" />
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        /**
         * <p> Case generator. </p>
         *
         * <p> CaseGenerator is an abstract case generator using like a matrix. </p>
         * <ul>
         *  <li> nTTr(n^r) -> CombinedPermutationGenerator </li>
         *  <li> nPr -> PermutationGenerator </li>
         *  <li> n! -> FactorialGenerator </li>
         * </ul>
         *
         * @author Jeongho Nam
         */
        var CaseGenerator = (function () {
            /* ---------------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------------- */
            /**
             * <p> Construct from size of N and R. </p>
             *
             * @param n Size of candidates.
             * @param r Size of elements of each case.
             */
            function CaseGenerator(n, r) {
                this.n_ = n;
                this.r_ = r;
            }
            /* ---------------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------------- */
            /**
             * <p> Get size of all cases. </p>
             *
             * @return Get a number of the all cases.
             */
            CaseGenerator.prototype.size = function () {
                return this.size_;
            };
            /**
             * <p> Get size of the N. </p>
             */
            CaseGenerator.prototype.n = function () {
                return this.n_;
            };
            /**
             * <p> Get size of the R. </p>
             */
            CaseGenerator.prototype.r = function () {
                return this.r_;
            };
            /**
             * <p> Get index'th case. </p>
             *
             * @param index Index number
             * @return The row of the index'th in combined permuation case
             */
            CaseGenerator.prototype.at = function (index) {
                throw new std.AbstractMethodError("Don't create CaseGenerator directly.");
            };
            return CaseGenerator;
        })();
        library.CaseGenerator = CaseGenerator;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
/// <reference path="../API.ts" />
/// <reference path="CaseGenerator.ts" />
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        /**
         * <p> A combined-permutation case generator. </p>
         * <p> <sub>n</sub>TT<sub>r</sub> </p>
         *
         * @inheritdoc
         * @author Jeongho Nam
         */
        var CombinedPermutationGenerator = (function (_super) {
            __extends(CombinedPermutationGenerator, _super);
            /* ---------------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------------- */
            /**
             * <p> Construct from size of N and R. </p>
             *
             * @param n Size of candidates.
             * @param r Size of elements of each case.
             */
            function CombinedPermutationGenerator(n, r) {
                _super.call(this, n, r);
                this.size_ = Math.pow(n, r);
                this.dividerArray = new Array();
                for (var i = 0; i < r; i++) {
                    var x = r - (i + 1);
                    var val = Math.pow(n, x);
                    this.dividerArray.push(val);
                }
            }
            CombinedPermutationGenerator.prototype.at = function (index) {
                var row = new Array();
                for (var i = 0; i < this.r_; i++) {
                    var val = Math.floor(index / this.dividerArray[i]) % this.n_;
                    row.push(val);
                }
                return row;
            };
            return CombinedPermutationGenerator;
        })(library.CaseGenerator);
        library.CombinedPermutationGenerator = CombinedPermutationGenerator;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
/// <reference path="../API.ts" />
/// <reference path="CaseGenerator.ts" />
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        /**
         * <p> A permutation case generator. </p>
         * <p> nPr </p>
         *
         * @author Jeongho Nam
         * @inheritdoc
         */
        var PermuationGenerator = (function (_super) {
            __extends(PermuationGenerator, _super);
            /* ---------------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------------- */
            /**
             * <p> Construct from size of N and R. </p>
             *
             * @param n Size of candidates.
             * @param r Size of elements of each case.
             */
            function PermuationGenerator(n, r) {
                _super.call(this, n, r);
                this.size_ = n;
                for (var i = n - 1; i > n - r; i--)
                    this.size_ *= i;
            }
            /**
             * @inheritdoc
             */
            PermuationGenerator.prototype.at = function (index) {
                var atoms = new Array();
                for (var i = 0; i < this.n_; i++)
                    atoms.push(i);
                var row = new Array();
                for (var i = 0; i < this.r_; i++) {
                    var item = index % atoms.length;
                    index = Math.floor(index / atoms.length);
                    row.push(atoms[item]);
                    atoms.splice(item, 1);
                }
                return row;
            };
            return PermuationGenerator;
        })(library.CaseGenerator);
        library.PermuationGenerator = PermuationGenerator;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
/// <reference path="../API.ts" />
/// <reference path="PermutationGenerator.ts" />
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var FactorialGenerator = (function (_super) {
            __extends(FactorialGenerator, _super);
            /**
             * Construct from factorial size N.
             *
             * @param n Factoria size N.
             */
            function FactorialGenerator(n) {
                _super.call(this, n, n);
            }
            return FactorialGenerator;
        })(library.PermuationGenerator);
        library.FactorialGenerator = FactorialGenerator;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
/// <reference path="BasicEvent.ts" />
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var ProgressEvent = (function (_super) {
            __extends(ProgressEvent, _super);
            function ProgressEvent(type, numerator, denominator) {
                _super.call(this, type);
                this.numerator_ = numerator;
                this.denominator_ = denominator;
            }
            Object.defineProperty(ProgressEvent, "PROGRESS", {
                get: function () { return "progress"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressEvent.prototype, "numerator", {
                get: function () {
                    return this.numerator_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressEvent.prototype, "denominator", {
                get: function () {
                    return this.denominator_;
                },
                enumerable: true,
                configurable: true
            });
            return ProgressEvent;
        })(library.BasicEvent);
        library.ProgressEvent = ProgressEvent;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
/// <reference path="API.ts" />
/// <reference path="Entity.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        /**
         * A parameter belongs to an Invoke.
         *
         * @see Invoke
         * @author Jeongho Nam
         */
        var InvokeParameter = (function (_super) {
            __extends(InvokeParameter, _super);
            /* -------------------------------------------------------------------
                CONSTRUCTORS
            ------------------------------------------------------------------- */
            function InvokeParameter() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
            }
            InvokeParameter.prototype.construct = function (xml) {
            };
            /* -------------------------------------------------------------------
                GETTERS
            ------------------------------------------------------------------- */
            InvokeParameter.prototype.key = function () {
                return this.name;
            };
            /**
             * Get name.
             */
            InvokeParameter.prototype.getName = function () {
                return this.name;
            };
            /**
             * Get type.
             */
            InvokeParameter.prototype.getType = function () {
                return this.type;
            };
            /**
             * Get value.
             */
            InvokeParameter.prototype.getValue = function () {
                return this.value;
            };
            /* -------------------------------------------------------------------
                EXPORTERS
            ------------------------------------------------------------------- */
            InvokeParameter.prototype.TAG = function () {
                return "parameter";
            };
            InvokeParameter.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.name != "")
                    xml.setProperty("name", this.name);
                xml.setProperty("type", this.type);
                // NOT CONSIDERED ABOUT THE BINARY DATA
                xml.setProperty("value", this.value);
                return xml;
            };
            return InvokeParameter;
        })(protocol.Entity);
        protocol.InvokeParameter = InvokeParameter;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="EntityArray.ts" />
///     <reference path="InvokeParameter.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        /**
         * <p> Standard message of network I/O. </p>
         * <p> Invoke is a class used in network I/O in protocol package of Samchon Framework. </p>
         *
         * <p> The Invoke message has an XML structure like the result screen of provided example in below.
         * We can enjoy lots of benefits by the normalized and standardized message structure used in
         * network I/O. </p>
         *
         * <p> The greatest advantage is that we can make any type of network system, even how the system
         * is enourmously complicated. As network communication message is standardized, we only need to
         * concentrate on logical relationships between network systems. We can handle each network system
         * like a object (class) in OOD. And those relationships can be easily designed by using design
         * pattern. </p>
         *
         * <p> In Samchon Framework, you can make any type of network system with basic 3 + 1 componenets
         * (IProtocol, IServer and IClient + ServerConnector), by implemens or inherits them, like designing
         * classes of S/W architecture. </p>
         *
         * @see IProtocol
         * @author Jeongho Nam
         */
        var Invoke = (function (_super) {
            __extends(Invoke, _super);
            function Invoke() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
                if (args.length == 0) {
                    this.listener = "";
                }
                else if (args.length == 1 && typeof args[0] == "string") {
                    var listener = args[0];
                    this.listener = listener;
                }
                else if (args.length == 1 && args[0] instanceof samchon.library.XML) {
                    this.listener = "";
                    var xml = args[0];
                    this.construct(xml);
                }
                else if (args.length == 1 && args[0] instanceof Invoke) {
                    var invoke = args[0];
                    this.listener = invoke.listener;
                    this.assign(invoke.begin(), invoke.end());
                }
                else if (args.length == 3 && args[1] instanceof std.Iterator && args[2] instanceof std.Iterator) {
                    var listener = args[0];
                    var begin = args[1];
                    var end = args[2];
                    this.listener = listener;
                    this.assign(begin, end);
                }
                else if (args.length > 1) {
                    this.listener = args[0];
                    for (var i = 1; i < args.length; i++)
                        this.pushBack(new protocol.InvokeParameter("", args[i]));
                }
            }
            /**
             * @inheritdoc
             */
            Invoke.prototype.createChild = function (xml) {
                return new protocol.InvokeParameter();
            };
            /* -------------------------------------------------------------------
                GETTERS
            ------------------------------------------------------------------- */
            /**
             * Get listener.
             */
            Invoke.prototype.getListener = function () {
                return this.listener;
            };
            /**
             * <p> Get arguments for Function.apply(). </p>
             *
             * @return An array containing values of the contained parameters.
             */
            Invoke.prototype.getArguments = function () {
                var args = [];
                for (var i = 0; i < this.size(); i++)
                    args.push(this[i].getValue());
                return args;
            };
            /* -------------------------------------------------------------------
                APPLY BY FUNCTION POINTER
            ------------------------------------------------------------------- */
            /**
             * <p> Apply to a matched function. </p>
             */
            Invoke.prototype.apply = function (obj) {
                if (!(this.listener in obj && obj[this.listener] instanceof Function))
                    return false;
                var func = obj[this.listener];
                var args = this.getArguments();
                func.apply(obj, args);
                return true;
            };
            /* -------------------------------------------------------------------
                EXPORTERS
            ------------------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Invoke.prototype.TAG = function () {
                return "invoke";
            };
            /**
             * @inheritdoc
             */
            Invoke.prototype.CHILD_TAG = function () {
                return "parameter";
            };
            return Invoke;
        })(protocol.EntityArray);
        protocol.Invoke = Invoke;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="Invoke.ts" />
/// <reference path="Container.ts" />
/// <reference path="Iterator.ts" />
/// <reference path="Vector.ts" />
/// <reference path="Pair.ts" />
var std;
(function (std) {
    /**
     * <p> A set containing key values. </p>
     * <ul>
     *  <li> _Ty: Type of the elements. Each element in a Set is also uniquely identified by this value.
     *            Aliased as member types unordered_set::key_type and unordered_set::value_type. </li>
     * </ul>
     *
     * <p> Set is designed to pursuing formality in JavaScript. </p>
     * <h4> Definition of std::unordered_set. </h4>
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_set/unordered_set/ </li>
     * </ul>
     *
     * <p> Unordered sets are containers that store unique elements in no particular order, and which allow
     * for fast retrieval of individual elements based on their value. </p>
     *
     * <p> In an unordered_set, the value of an element is at the same time its key, that identifies it uniquely.
     * Keys are immutable, therefore, the elements in an unordered_set cannot be modified once in the container -
     * they can be inserted and removed, though. </p>
     *
     * <p> Internally, the elements in the unordered_set are not sorted in any particular order, but organized into
     * buckets depending on their hash values to allow for fast access to individual elements directly by their values
     * (with a constant average time complexity on average). </p>
     *
     * <p> unordered_set containers are faster than set containers to access individual elements by their key,
     * although they are generally less efficient for range iteration through a subset of their elements. </p>
     *
     * <p> Iterators in the container are at least forward iterators. </p>
     *
     * @author Jeongho Nam
     */
    var UnorderedSet = (function (_super) {
        __extends(UnorderedSet, _super);
        function UnorderedSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.data_ = new std.Vector();
            if (args.length == 1 && args[0] instanceof Array) {
                var array = args[0];
                this.data_ = new std.Vector(array);
            }
            else if (args.length == 1 && (args[0] instanceof std.Vector || args[1] instanceof std.Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
        }
        UnorderedSet.prototype.assign = function (begin, end) {
            this.data_.assign(begin, end);
        };
        UnorderedSet.prototype.clear = function () {
            this.data_.clear();
        };
        UnorderedSet.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1) {
                var key = args[0];
                if (this.has(key) == true)
                    return new std.Pair(this.end(), false);
                else {
                    this.data_.push(key);
                    return new std.Pair(this.end().prev(), true);
                }
            }
            else if (args.length == 2 && args[1] instanceof std.Iterator == false) {
                var position = args[0];
                var key = args[1];
                if (this.has(key) == true)
                    return new std.Pair(this.find(key), false);
                else {
                    var index = position.getIndex();
                    this.data_.insert(this.data_.begin().advance(index), key);
                    return new std.Pair(new UnorderedSetIterator(this, index + 1), true);
                }
            }
            else if (args.length == 2 && args[1] instanceof std.Iterator == true) {
                var begin = args[0];
                var end = args[1];
                var index = position.getIndex();
                var inserted = 0;
                for (var it = begin; it.equals(end) == false; it = it.next()) {
                    if (this.has(it.value) == true)
                        continue;
                    this.data_.pushBack(it.value);
                    inserted++;
                }
            }
        };
        ;
        UnorderedSet.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1 && args[0] instanceof std.Iterator == false) {
                var key = args[0];
                if (this.has(key) == true)
                    this.erase(this.find(key));
                return this.size();
            }
            else if (args.length == 1 && args[0] instanceof std.Iterator) {
                var it = args[0];
                var index = it.getIndex();
                this.data_.splice(index, 1);
                if (this.empty() == true)
                    index = -1;
                return new UnorderedSetIterator(this, index);
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                var beginIndex = begin.getIndex();
                var endIndex = end.getIndex();
                this.data_.splice(beginIndex, endIndex);
                if (this.empty() == true)
                    beginIndex = -1;
                return new UnorderedSetIterator(this, beginIndex);
            }
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        UnorderedSet.prototype.begin = function () {
            if (this.empty() == true)
                return this.end();
            else
                return new UnorderedSetIterator(this, 0);
        };
        /**
         * @inheritdoc
         */
        UnorderedSet.prototype.end = function () {
            return new UnorderedSetIterator(this, -1);
        };
        UnorderedSet.prototype.find = function (key) {
            var i;
            if (key.hasOwnProperty("equals") == true) {
                for (i = 0; i < this.data_.size(); i++)
                    if (this.data_.at(i)["equals"](key) == true)
                        return new UnorderedSetIterator(this, i);
            }
            else {
                for (i = 0; i < this.data_.size(); i++)
                    if (this.data_.at(i) == key)
                        return new UnorderedSetIterator(this, i);
            }
            return this.end();
        };
        /**
         * <p> Get data. </p>
         * <p> Returns the source container of the Set. </p>
         *
         * <h4> Note </h4>
         * <p> Changes on the returned container influences the source Set. </p>
         */
        UnorderedSet.prototype.data = function () {
            return this.data_;
        };
        /**
         * <p> Return container size. </p>
         * <p> Returns the number of elements in Set container. </p>
         *
         * @return The number of elements in the container.
         */
        UnorderedSet.prototype.size = function () {
            return this.data_.size();
        };
        /**
         * <p> Whether have the item or not. </p>
         * <p> Indicates whether a map has an item having the specified identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         * @return Whether the map has an item having the specified identifier
         */
        UnorderedSet.prototype.has = function (key) {
            return !this.find(key).equals(this.end());
        };
        /* ---------------------------------------------------------
            COMPARE
        --------------------------------------------------------- */
        /**
         * <p> Whether a Set is equal with the Set. </p>
         *
         * @param obj A Set to compare
         * @return Indicates whether equal or not.
         */
        UnorderedSet.prototype.equals = function (obj) {
            if (this.size() != obj.size())
                return false;
            for (var i = 0; i < this.data_.size(); i++)
                if (this.data_.at(i) != obj.data_.at(i))
                    return false;
            return true;
        };
        return UnorderedSet;
    })(std.Container);
    std.UnorderedSet = UnorderedSet;
    /**
     * <p> An iterator of a Set. </p>
     * <ul>
     *  <li> _Ty: Type of the elements. Each element in a Set is also uniquely identified by this value.
     *            Aliased as member types unordered_set::key_type and unordered_set::value_type. </li>
     * </ul>
     *
     * @author Jeongho Nam
     */
    var UnorderedSetIterator = (function (_super) {
        __extends(UnorderedSetIterator, _super);
        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Map instead. </p>
         *
         * @param map The source Set to reference.
         * @param index Sequence number of the element in the source Set.
         */
        function UnorderedSetIterator(source, index) {
            _super.call(this, source);
            this.index = index;
        }
        Object.defineProperty(UnorderedSetIterator.prototype, "value", {
            /**
             * <p> Get key value of the iterator is pointing. </p>
             *
             * @return A key value of the iterator.
             */
            get: function () {
                return this.set.data().at(this.index);
            },
            set: function (key) {
                this.set.data().set(this.index, key);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnorderedSetIterator.prototype, "set", {
            /* ---------------------------------------------------------
                GETTERS
            --------------------------------------------------------- */
            get: function () {
                return this.source;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * <p> Whether an iterator is equal with the iterator. </p>
         * <p> Compare two iterators and returns whether they are equal or not. </p>
         *
         * <h4> Note </h4>
         * <p> Iterator's equals() only compare souce map and index number. </p>
         * <p> Although elements, key values are equals, if the source set or
         * index number is different, then the equals() will return false. If you want to
         * compare the key values, compare them directly by yourself. </p>
         *
         * @param obj An iterator to compare
         * @return Indicates whether equal or not.
         */
        UnorderedSetIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.index == obj.index;
        };
        UnorderedSetIterator.prototype.getIndex = function () {
            return this.index;
        };
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * <p> Get iterator to previous element. </p>
         * <p> If current iterator is the first item(equal with <i>begin()</i>), returns end(). </p>
         *
         * @return An iterator of the previous item.
         */
        UnorderedSetIterator.prototype.prev = function () {
            if (this.index == 0)
                return this.set.end();
            else
                return new UnorderedSetIterator(this.set, this.index - 1);
        };
        /**
         * <p> Get iterator to next element. </p>
         * <p> If current iterator is the last item, returns end(). </p>
         *
         * @return An iterator of the next item.
         */
        UnorderedSetIterator.prototype.next = function () {
            if (this.index >= this.set.data().size() - 1)
                return this.set.end();
            else
                return new UnorderedSetIterator(this.set, this.index + 1);
        };
        return UnorderedSetIterator;
    })(std.Iterator);
    std.UnorderedSetIterator = UnorderedSetIterator;
})(std || (std = {}));
/// <reference path="IProtocol.ts" />
/// <reference path="Invoke.ts" />
/// <reference path="../library/StringUtil.ts" />
/// <reference path="../../std/Pair.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        /**
         * <p> A server connector for a physical client. </p>
         *
         * <p> ServerConnector is a class for a physical client connecting a server. If you want to connect
         * to a server,  then implements this ServerConnector and just override some methods like
         * getIP(), getPort() and replyData(). That's all. </p>
         *
         * <p> In Samchon Framework, package protocol, There are basic 3 + 1 components that can make any
         * type of network system in Samchon Framework. The basic 3 components are IProtocol, IServer and
         * IClient. The last, surplus one is the ServerConnector. Looking around classes in
         * Samchon Framework, especially module master and slave which are designed for realizing
         * distributed processing systems and parallel processing systems, physical client classes are all
         * derived from this ServerConnector. </p>
         *
         * <img src="interface.png" />
         *
         * @author Jeongho Nam
         */
        var ServerConnector = (function () {
            /**
             * <p> Constructor with parent. </p>
             */
            function ServerConnector(parent) {
                this.parent = parent;
                this.str = "";
            }
            /**
             * <p> Connects to a cloud server with specified host and port. </p>
             *
             * <p> If the connection fails immediately, either an event is dispatched or an exception is thrown:
             * an error event is dispatched if a host was specified, and an exception is thrown if no host
             * was specified. Otherwise, the status of the connection is reported by an event.
             * If the socket is already connected, the existing connection is closed first. </p>
             *
             * @param ip
             * 		The name or IP address of the host to connect to.
             * 		If no host is specified, the host that is contacted is the host where the calling
             * 		file resides. If you do not specify a host, use an event listener to determine whether
             * 		the connection was successful.
             * @param port
             * 		The port number to connect to.
             *
             * @throws IOError
             * 		No host was specified and the connection failed.
             * @throws SecurityError
             * 		This error occurs in SWF content for the following reasons:
             * 		Local untrusted SWF files may not communicate with the Internet. You can work around
             * 		this limitation by reclassifying the file as local-with-networking or as trusted.
             */
            ServerConnector.prototype.connect = function (ip, port) {
                if (ip.indexOf("ws://") == -1) {
                    if (ip.indexOf("://") != -1)
                        throw "only websocket is possible";
                    else
                        ip = "ws://" + ip;
                }
                this.socket = new WebSocket(ip + ":" + port);
                this.socket.onopen = this.handleConnect;
                this.socket.onmessage = this.handleReply;
            };
            /* ----------------------------------------------------
                IPROTOCOL'S METHOD
            ---------------------------------------------------- */
            /**
             * <p> Send data to the server. </p>
             */
            ServerConnector.prototype.sendData = function (invoke) {
                var xml = invoke.toXML();
                var str = xml.toString();
                this.socket.send(str);
            };
            /**
             * <p> Shift responsiblity of handling message to parent. </p>
             */
            ServerConnector.prototype.replyData = function (invoke) {
                this.parent.replyData(invoke);
            };
            /* ----------------------------------------------------
                HANDLING CONNECTION AND MESSAGES
            ---------------------------------------------------- */
            ServerConnector.prototype.handleConnect = function (event) {
                if (this.onopen == null)
                    return;
                this.onopen.apply([event]);
            };
            /**
             * <p> Handling replied message. </p>
             */
            ServerConnector.prototype.handleReply = function (event) {
                this.str += event.data;
                var invokeArray;
                var indexPair = null;
                var sizePair = new std.Pair(0, 0);
                var startIndex = 0;
                var endIndex = 0;
                while (true) {
                    var iPair = new std.Pair(this.str.indexOf("<invoke", startIndex), this.str.indexOf("</invoke>", startIndex)); //FIND WORDS
                    if (iPair.first != -1)
                        sizePair.first++;
                    if (iPair.second != -1)
                        sizePair.second++; //AND COUNTS
                    if (indexPair == null && sizePair.first == 1)
                        indexPair = new std.Pair(iPair.first, -1); //SPECIFY THE STARTING INDEX
                    //FAILED TO FIND ANYTHING
                    if (iPair.first == -1 || iPair.second == -1)
                        break;
                    /* FOUND SOMETHING FROM NOW ON */
                    //AN INVOKE HAS FOUND
                    if (indexPair != null && sizePair.first == sizePair.second) {
                        var start = indexPair.first;
                        var end = indexPair.second + ("</invoke>").length;
                        var xml = new samchon.library.XML(this.str.substring(start, end));
                        var invoke = new protocol.Invoke(xml);
                        invokeArray.push(invoke);
                        //CLEAR CURRENT'S INDEX PAIR
                        endIndex = end;
                        indexPair = null;
                    }
                    //ADJUST INDEX
                    startIndex = Math.max(Math.max(iPair.first, iPair.second), 1);
                }
                //ERASE USED CHARACTERS
                if (endIndex != 0)
                    this.str = this.str.substr(endIndex);
                //CALL REPLY_DATA
                for (var i = 0; i < invokeArray.length; i++)
                    this.replyData(invokeArray[i]);
            };
            return ServerConnector;
        })();
        protocol.ServerConnector = ServerConnector;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="../API.ts" />
/// <reference path="EntityArray.ts" />
///     <reference path="ExternalSystemRole.ts" />
/// <reference path="IProtocol.ts" />
/// <reference path="ServerConnector.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        /**
         * <p> A network driver for an external system. </p>
         *
         * <p> ExternalSystem is a boundary class interacting with an external system by network communication.
         * Also, ExternalSystem is an abstract class that a network role, which one is server and which one is
         * client, is not determined yet. </p>
         *
         * <p> The ExternalSystem has ExternalSystemRole(s) groupped methods, handling Invoke message
         * interacting with the external system, by subject or unit of a moudle. The ExternalSystemRole is
         * categorized in a 'control'. </p>
         *
         * <h4> Note </h4>
         * <p> The ExternalSystem class takes a role of interaction with external system in network level.
         * However, within a framework of Samchon Framework, a boundary class like the ExternalSystem is
         * not such important. You can find some evidence in a relationship between ExternalSystemArray,
         * ExternalSystem and ExternalSystemRole. </p>
         *
         * <p> Of course, the ExternalSystemRole is belonged to an ExternalSystem. However, if you
         * access an ExternalSystemRole from an ExternalSystemArray directly, not passing by a belonged
         * ExternalSystem, and send an Invoke message even you're not knowing which ExternalSystem is
         * related in, it's called "Proxy pattern".
         *
         * <p> Like the explanation of "Proxy pattern", you can utilize an ExternalSystemRole as a proxy
         * of an ExternalSystem. With the pattern, you can only concentrate on ExternalSystemRole itself,
         * what to do with Invoke message, irrespective of the ExternalSystemRole is belonged to which
         * ExternalSystem. </p>
         *
         * @author Jeongho Nam
         */
        var ExternalSystem = (function (_super) {
            __extends(ExternalSystem, _super);
            /* ------------------------------------------------------------------
                CONSTRUCTORS
            ------------------------------------------------------------------ */
            /**
             * <p> Default Constructor. </p>
             */
            function ExternalSystem() {
                _super.call(this);
                this.driver = null;
            }
            /**
             * <p> Start interaction. </p>
             * <p> An abstract method starting interaction with an external system. </p>
             *
             * <p> If an external systems are a server, starts connection and listening Inovoke message,
             * else clients, just starts listening only. You also can addict your own procudures of starting
             * the driver, but if you directly override method of abstract ExternalSystem, be careful about
             * virtual inheritance. </p>
             */
            ExternalSystem.prototype.start = function () {
                if (this.driver != null)
                    return;
                this.driver = new protocol.ServerConnector(this);
                this.driver.connect(this.ip, this.port);
            };
            /* ------------------------------------------------------------------
                GETTERS
            ------------------------------------------------------------------ */
            ExternalSystem.prototype.key = function () {
                return this.name;
            };
            /**
             * <p> Get name. </p>
             */
            ExternalSystem.prototype.getName = function () {
                return this.name;
            };
            /**
             * <p> Get ip address of the external system. </p>
             */
            ExternalSystem.prototype.getIP = function () {
                return this.ip;
            };
            /**
             * <p> Get port number of the external system. </p>
             */
            ExternalSystem.prototype.getPort = function () {
                return this.port;
            };
            /* ------------------------------------------------------------------
                CHAIN OF INVOKE MESSAGE
            ------------------------------------------------------------------ */
            ExternalSystem.prototype.sendData = function (invoke) {
                this.driver.sendData(invoke);
            };
            ExternalSystem.prototype.replyData = function (invoke) {
                invoke.apply(this);
                for (var i = 0; i < this.size(); i++)
                    this[i].replyData(invoke);
            };
            /* ------------------------------------------------------------------
               EXPORTERS
           ------------------------------------------------------------------ */
            ExternalSystem.prototype.TAG = function () {
                return "system";
            };
            ExternalSystem.prototype.CHILD_TAG = function () {
                return "role";
            };
            return ExternalSystem;
        })(protocol.EntityArray);
        protocol.ExternalSystem = ExternalSystem;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="../API.ts" />
/// <reference path="IProtocol.ts" />
/// <reference path="ExternalSystem.ts" />
/// <reference path="../../std/UnorderedSet.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        /**
         * <p> A role belongs to an external system. </p>
         *
         * <p> ExternalSystemRole is a 'control' class groupping methods, handling Invoke messages
         * interacting with an external system that the ExternalSystemRole is belonged to, by a subject or
         * unit of a module. <p>
         *
         * <p> ExternalSystemRole can be a "logical proxy" for an ExternalSystem which is containing the
         * ExternalSystemRole. Of course, the ExternalSystemRole is belonged to an ExternalSystem. However,
         * if you access an ExternalSystemRole from an ExternalSystemArray directly, not passing by a
         * belonged ExternalSystem, and send an Invoke message even you're not knowing which ExternalSystem
         * is related in, the ExternalSystemRole acted a role of proxy. </p>
         *
         * <p> It's called as "Proxy pattern". With the pattern, you can only concentrate on
         * ExternalSystemRole itself, what to do with Invoke message, irrespective of the ExternalSystemRole
         * is belonged to which ExternalSystem. </p>
         *
         * @author Jeongho Nam
         */
        var ExternalSystemRole = (function (_super) {
            __extends(ExternalSystemRole, _super);
            /* ------------------------------------------------------------------
                CONSTRUCTORS
            ------------------------------------------------------------------ */
            /**
             * <p> Construct from external system driver. </p>
             *
             * @param system A driver of external system the ExternalSystemRole is belonged to.
             */
            function ExternalSystemRole(system) {
                _super.call(this);
                this.system = system;
                this.sendListeners = new std.UnorderedSet();
            }
            ExternalSystemRole.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
            };
            /* ------------------------------------------------------------------
                GETTERS
            ------------------------------------------------------------------ */
            ExternalSystemRole.prototype.getName = function () {
                return this.name;
            };
            ExternalSystemRole.prototype.hasSendListener = function (key) {
                return this.sendListeners.has(key);
            };
            /* ------------------------------------------------------------------
                CHAIN OF INVOKE MESSAGE
            ------------------------------------------------------------------ */
            ExternalSystemRole.prototype.sendData = function (invoke) {
                this.system.sendData(invoke);
            };
            ExternalSystemRole.prototype.replyData = function (invoke) {
                invoke.apply(this);
            };
            /* ------------------------------------------------------------------
                EXPORTERS
            ------------------------------------------------------------------ */
            ExternalSystemRole.prototype.TAG = function () {
                return "role";
            };
            ExternalSystemRole.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                return xml;
            };
            return ExternalSystemRole;
        })(protocol.Entity);
        protocol.ExternalSystemRole = ExternalSystemRole;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="../API.ts" />
/// <reference path="EntityArray.ts" />
///     <reference path="ExternalSystem.ts" />
/// <reference path="IProtocol.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        /**
         * <p> An array of ExternalSystem(s). </p>
         *
         * <p> ExternalSystemArray is an abstract class containing and managing external system drivers. </p>
         *
         * <p> Also, ExternalSystemArray can access to ExternalSystemRole(s) directly. With the method, you
         * can use an ExternalSystemRole as "logical proxy" of an ExternalSystem. Of course, the
         * ExternalSystemRole is belonged to an ExternalSystem. However, if you access an ExternalSystemRole
         * from an ExternalSystemArray directly, not passing by a belonged ExternalSystem, and send an Invoke
         * message even you're not knowing which ExternalSystem is related in, the ExternalSystemRole acted
         * a role of proxy. </p>
         *
         * <p> It's called as "Proxy pattern". With the pattern, you can only concentrate on
         * ExternalSystemRole itself, what to do with Invoke message, irrespective of the ExternalSystemRole
         * is belonged to which ExternalSystem. </p>
         *
         * <ul>
         *  <li> ExternalSystemArray::getRole("something")->sendData(invoke); </li>
         * </ul>
         *
         * @author Jeongho Nam
         */
        var ExternalSystemArray = (function (_super) {
            __extends(ExternalSystemArray, _super);
            /* ------------------------------------------------------------------
                CONSTRUCTORS
            ------------------------------------------------------------------ */
            /**
             * Default Constructor.
             */
            function ExternalSystemArray() {
                _super.call(this);
            }
            /**
             * <p> Start interaction. </p>
             * <p> An abstract method starting interaction with external systems. </p>
             *
             * <p> If external systems are servers, starts connection to them, else clients, opens a server
             * and accepts the external systems. You can addict your own procudures of starting drivers, but
             * if you directly override method of abstract ExternalSystemArray, be careful about virtual
             * inheritance. </p>
             */
            ExternalSystemArray.prototype.start = function () {
                for (var i = 0; i < this.size(); i++)
                    this.at(i).start();
            };
            /* ------------------------------------------------------------------
                GETTERS
            ------------------------------------------------------------------ */
            /**
             * <p> Test whether has a role. </p>
             *
             * @param name Name of an ExternalSystemRole.
             * @return Whether has or not.
             */
            ExternalSystemArray.prototype.hasRole = function (key) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).has(key) == true)
                        return true;
                return false;
            };
            /**
             * <p> Get a role. </p>
             *
             * @param name Name of an ExternalSystemRole
             * @return A shared pointer of specialized role
             */
            ExternalSystemArray.prototype.getRole = function (key) {
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).has(key) == true)
                        return this.at(i).get(key);
                throw Error("out of range");
            };
            /* ------------------------------------------------------------------
                CHAIN OF INVOKE MESSAGE
            ------------------------------------------------------------------ */
            ExternalSystemArray.prototype.sendData = function (invoke) {
                var listener = invoke.getListener();
                for (var i = 0; i < this.size(); i++)
                    for (var j = 0; j < this.at(i).size(); j++)
                        if (this.at(i).at(j).hasSendListener(listener) == true)
                            this.at(i).sendData(invoke);
            };
            ExternalSystemArray.prototype.replyData = function (invoke) {
                invoke.apply(this);
            };
            /* ------------------------------------------------------------------
                EXPORTERS
            ------------------------------------------------------------------ */
            ExternalSystemArray.prototype.TAG = function () {
                return "systemArray";
            };
            ExternalSystemArray.prototype.CHILD_TAG = function () {
                return "system";
            };
            return ExternalSystemArray;
        })(protocol.EntityArray);
        protocol.ExternalSystemArray = ExternalSystemArray;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="../API.ts" />
/// <reference path="Entity.ts" />
/// <referecen path="Invoke.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        /**
         * <p> A history of an Invoke message. </p>
         *
         * <p> InvokeHistory is a class for reporting history log of an Invoke message with elapsed time
         * from a slave to its master.</p>
         *
         * <p> With the elapsed time, consumed time for a process of handling the Invoke message,
         * InvokeHistory is reported to the master. The master utilizies the elapsed time to estimating
         * performances of each slave system. With the estimated performan index, master retrives the
         * optimal solution of distributing processes. </p>
         *
         * @author Jeongho Nam
         */
        var InvokeHistory = (function (_super) {
            __extends(InvokeHistory, _super);
            /* -----------------------------------------------------------------
                CONSTRUCTORS
            ----------------------------------------------------------------- */
            /**
             * <p> Construct from an Invoke message. </p>
             *
             * <p> InvokeHistory does not archive entire Invoke message, only archives its listener. </p>
             *
             * @param invoke A message to archive its history log
             */
            function InvokeHistory(invoke) {
                _super.call(this);
                this.uid = invoke.get("invoke_history_uid").getValue();
                this.listener = invoke.getListener();
                this.startTime = new Date();
                //DELETE UID IN INVOKE
                //invoke.erase("invoke_history_uid");
            }
            /**
             * <p> Notify end of the process. </p>
             *
             * <p> Notifies end of a process handling the matched Invoke message to InvokeHistory. </p>
             * <p> InvokeHistory archives the end datetime and calculates elapsed time as nanoseconds. </p>
             */
            InvokeHistory.prototype.notifyEnd = function () {
                this.endTime = new Date();
            };
            /* -----------------------------------------------------------------
                EXPORTERS
            ----------------------------------------------------------------- */
            InvokeHistory.prototype.TAG = function () {
                return "invokeHistory";
            };
            InvokeHistory.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                /*xml.setProperty("uid", this.uid);
                xml.setProperty("listener", this.listener);*/
                xml.setProperty("startTime", this.startTime.getTime() * Math.pow(10.0, 6));
                xml.setProperty("endTime", this.endTime.getTime() * Math.pow(10.0, 6));
                return xml;
            };
            /**
             * <p> Get an Invoke message. </p>
             *
             * <p> Returns an Invoke message to report to a master that how much time was elapsed on a
             * process handling the Invoke message. In master, those reports are used to estimate
             * performance of each slave system. </p>
             *
             * @return An Invoke message to report master.
             */
            InvokeHistory.prototype.toInvoke = function () {
                return null;
                //return new Invoke("reportInvokeHistory", this.toXML());
            };
            return InvokeHistory;
        })(protocol.Entity);
        protocol.InvokeHistory = InvokeHistory;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="../IProtocol.ts" />
/// <reference path="Movie.ts" />
/// <reference path="../ServerConnector.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var service;
        (function (service) {
            /**
             * <p> An application, the top class in JS-UI. </p>
             *
             * <p> The Application is separated to three part, TopMenu, Movie and ServerConnector. </p>
             * <ul>
             * 	<li> <code>TopMenu</code>: Menu on the top. It's not an essential component. </li>
             * 	<li> <code>Movie</code>: Correspond with Service in Server. Movie has domain UI components(Movie) for the matched Service. </li>
             * 	<li> <code>ServerConnector</code>: The socket connecting to the Server. </li>
             * </ul>
             *
             * <p> The Application and its UI-layout is not fixed, essential component for Samchon Framework in Flex,
             * so it's okay to do not use the provided Application and make your custom Application.
             * But the custom Application, your own, has to contain the Movie and keep the construction routine. </p>
             *
             * <p> <img src="movie.png" /> </p>
             *
             * <h4> THE CONSTRUCTION ROUTINE </h4>
             * <ul>
             * 	<li>Socket Connection</li>
             * 	<ul>
             * 		<li>Connect to the CPP-Server</li>
             * 	</ul>
             * 	<li>Fetch authority</li>
             * 	<ul>
             * 		<li>Send a request to fetching authority</li>
             * 		<li>The window can be navigated to other page by the authority</li>
             * 	</ul>
             * 	<li>Construct Movie</li>
             * 	<ul>
             * 		<li>Determine a Movie by URLVariables::movie and construct it</li>
             * 	</ul>
             * 	<li>All the routines are done</li>
             * </ul>
             *
             * @author Jeongho Nam
             */
            var Application = (function () {
                /**
                 * <p> Construct from arguments. </p>
                 *
                 * @param movie A movie represents a service.
                 * @param ip An ip address of cloud server to connect.
                 * @param port A port number of cloud server to connect.
                 */
                function Application(movie, ip, port) {
                    this.movie = movie;
                    this.socket = new protocol.ServerConnector(this);
                    this.socket.onopen = this.handleConnect;
                    this.socket.connect(ip, port);
                }
                Application.prototype.handleConnect = function (event) {
                };
                /**
                 * <p> Handle replied message or shift the responsibility. </p>
                 */
                Application.prototype.replyData = function (invoke) {
                    if (invoke.apply(this) == false)
                        this.movie.sendData(invoke);
                };
                /**
                 * <p> Send a data to server. </p>
                 */
                Application.prototype.sendData = function (invoke) {
                    this.socket.sendData(invoke);
                };
                return Application;
            })();
            service.Application = Application;
        })(service = protocol.service || (protocol.service = {}));
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="../IProtocol.ts" />
/// <reference path="Application.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var service;
        (function (service) {
            /**
             * A movie belonged to an Application.
             */
            var Movie = (function () {
                function Movie() {
                }
                /**
                 * Handle replied data.
                 */
                Movie.prototype.replyData = function (invoke) {
                    invoke.apply(this) == false;
                };
                /**
                 * Send data to server.
                 */
                Movie.prototype.sendData = function (invoke) {
                    this.application.sendData(invoke);
                };
                return Movie;
            })();
            service.Movie = Movie;
        })(service = protocol.service || (protocol.service = {}));
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="../IProtocol.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var service;
        (function (service) {
            /**
             * A sub-movie.
             *
             * @author Jeongho Nam
             */
            var SubMovie = (function () {
                function SubMovie() {
                }
                SubMovie.prototype.replyData = function (invoke) {
                    invoke.apply(this);
                };
                SubMovie.prototype.sendData = function (invoke) {
                    this.parent.sendData(invoke);
                };
                return SubMovie;
            })();
        })(service = protocol.service || (protocol.service = {}));
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <reference path="../../API.ts" />
/// <reference path="../ExternalSystem.ts" />
/// <reference path="../InvokeHistory.ts" />
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var slave;
        (function (slave) {
            /**
             * @brief A slave system.
             *
             * @details
             * <p> SlaveSystem, literally, means a slave system belongs to a maste system. </p>
             *
             * <p> The SlaveSystem class is used in opposite side system of master::DistributedSystem
             * and master::ParallelSystem and reports elapsed time of each commmand (by Invoke message)
             * for estimation of its performance. </p>
             *
             * @inheritdoc
             * @author Jeongho Nam
             */
            var SlaveSystem = (function (_super) {
                __extends(SlaveSystem, _super);
                /**
                 * <p> Default Constructor. </p>
                 */
                function SlaveSystem() {
                    _super.call(this);
                }
                /**
                 * @inheritdoc
                 */
                SlaveSystem.prototype.replyData = function (invoke) {
                    var history = new protocol.InvokeHistory(invoke);
                    _super.prototype.replyData.call(this, invoke);
                    history.notifyEnd();
                    this.sendData(history.toInvoke());
                };
                return SlaveSystem;
            })(protocol.ExternalSystem);
            slave.SlaveSystem = SlaveSystem;
        })(slave = protocol.slave || (protocol.slave = {}));
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
/// <referecen path="samchon/API.ts" />
/// <referecen path="samchon/std.ts" />
/// <referecen path="samchon/library.ts" />
/// <referecen path="samchon/protocol.ts" /> 
/// <reference path="IMap.ts" />
/// <reference path="Container.ts" />
/// <reference path="Iterator.ts" />
/// <refence path="TreeNode.ts" />
var std;
(function (std) {
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.data_ = null;
            this.size_ = 0;
        }
        return Map;
    })(std.PairContainer);
    std.Map = Map;
})(std || (std = {}));
/// <reference path="Container.ts" />
/// <reference path="Iterator.ts" />
/// <refence path="TreeNode.ts" />
var std;
(function (std) {
    var Set = (function (_super) {
        __extends(Set, _super);
        function Set() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.data_ = null;
            //this.size_ = 0;
        }
        Set.prototype.assign = function (begin, end) {
        };
        Set.prototype.clear = function () {
            this.data_ = null;
            //this.size_ = 0;
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        Set.prototype.begin = function () {
            if (this.data_ == null)
                return this.end();
            var node = this.data_;
            // MOVE LEFT LEFT LEFT AND LEFT OF CHILDREN.
            while (node.getLeftChild() != null)
                node = node.getLeftChild();
            return new SetIterator(this, node);
        };
        Set.prototype.end = function () {
            return new SetIterator(this, null);
        };
        Set.prototype.data = function () {
            return this.data_;
        };
        Set.prototype.size = function () {
            if (this.data_ == null)
                return 0;
            else
                return this.data_.size();
        };
        Set.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        Set.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        return Set;
    })(std.Container);
    std.Set = Set;
    var SetIterator = (function (_super) {
        __extends(SetIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        function SetIterator(source, node) {
            _super.call(this, source);
            this.node = node;
        }
        Object.defineProperty(SetIterator.prototype, "set", {
            get: function () { return this.source; },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        SetIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.node == obj.node;
        };
        Object.defineProperty(SetIterator.prototype, "value", {
            get: function () {
                return this.node.getValue();
            },
            set: function (val) {
                this.node.setValue(val);
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        SetIterator.prototype.prev = function () {
            if (this.node == null)
                return new SetIterator(this.set, this.set.data().back());
            else
                return new SetIterator(this.set, this.node.prev());
        };
        SetIterator.prototype.next = function () {
            if (this.node == null)
                return new SetIterator(this.set, this.set.data().front());
            return new SetIterator(this.set, this.node.next());
        };
        return SetIterator;
    })(std.Iterator);
    std.SetIterator = SetIterator;
})(std || (std = {}));
var std;
(function (std) {
    var TreeNode = (function () {
        /* -------------------------------------------------------------------
            CONSTRUCTORS
        ------------------------------------------------------------------- */
        function TreeNode(parent, value) {
            this.parent = parent;
            this.value = value;
        }
        /* -------------------------------------------------------------------
            ACCESSORS
        ------------------------------------------------------------------- */
        TreeNode.prototype.getParent = function () {
            return this.parent;
        };
        TreeNode.prototype.getLeftChild = function () {
            return this.leftChild;
        };
        TreeNode.prototype.getRightChild = function () {
            return this.rightChild;
        };
        TreeNode.prototype.getValue = function () {
            return this.value;
        };
        TreeNode.prototype.size = function () {
            var size = 1;
            if (this.leftChild != null)
                size += this.leftChild.size();
            if (this.rightChild != null)
                size += this.rightChild.size();
            return size;
        };
        /* -------------------------------------------------------------------
            LINKERS
        ------------------------------------------------------------------- */
        TreeNode.prototype.prev = function () {
            var node = null;
            if (this.leftChild != null)
                node = this.leftChild;
            else if (this.parent != null && this.parent.leftChild != this)
                node = this.parent.leftChild;
            // GO TO RIGHT, RIGHT, RIGHT AND RIGHT SIDE OF CHILDREN
            if (node != null)
                while (node.rightChild != null)
                    node = node.rightChild;
            return node;
        };
        TreeNode.prototype.next = function () {
            var node = null;
            if (this.rightChild != null)
                node = this.rightChild;
            else if (this.parent != null && this.parent.rightChild != this)
                node = this.parent.rightChild;
            // GO TO LEFT, LEFT, LEFT AND LEFT SIDE OF CHILDREN
            if (node != null)
                while (node.leftChild != null)
                    node = node.leftChild;
            return node;
        };
        TreeNode.prototype.front = function () {
            var node = this;
            // TO THE TOP
            while (node.parent != null)
                node = node.parent;
            // TO LEFT
            while (node.leftChild != null)
                node = node.leftChild;
            return node;
        };
        TreeNode.prototype.back = function () {
            var node = this;
            // TO THE TOP
            while (node.parent != null)
                node = node.parent;
            // TO RIGHT
            while (node.rightChild != null)
                node = node.rightChild;
            return node;
        };
        /* -------------------------------------------------------------------
            SETTERS
        ------------------------------------------------------------------- */
        TreeNode.prototype.setLeft = function (node) {
            this.leftChild = node;
        };
        TreeNode.prototype.setRight = function (node) {
            this.rightChild = node;
        };
        TreeNode.prototype.setValue = function (value) {
            this.value = value;
        };
        return TreeNode;
    })();
    std.TreeNode = TreeNode;
})(std || (std = {}));
//# sourceMappingURL=FaceAPI.js.map