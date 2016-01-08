/*function test()
{
    var productArray: ProductArray = new ProductArray();
    productArray.push
    (
        new Product("Eraser", 500, 10, 70),
        new Product("Pencil", 400, 30, 35),
        new Product("Pencil", 400, 30, 35),
        new Product("Pencil", 400, 30, 35),
        new Product("Book", 8000, 150, 300),
        new Product("Book", 8000, 150, 300),
        new Product("Drink", 1000, 75, 250),
        new Product("Umbrella", 4000, 200, 1000),
        new Product("Notebook-PC", 800000, 150, 850),
        new Product("Tablet-PC", 600000, 120, 450)
    );

    var packer: Packer = new Packer(productArray);
    packer.push
    (
        new WrapperArray(new Wrapper("Large", 100, 200, 1000)),
        new WrapperArray(new Wrapper("Medium", 70, 150, 500)),
        new WrapperArray(new Wrapper("Small", 50, 100, 250))
    );

    var packerSystem: PackerSlaveSystem = new PackerSlaveSystem("127.0.0.1", 0);

    var invoke: Invoke = new Invoke("optimize", packer.toXML(), 1, 400);
    invoke.apply(packerSystem);
}*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        //new Pair<string, string>("'", "&apos;"),
        //new Pair<string, string>('"', "&quot;"),
        new Pair("&", "&amp;"),
        new Pair("<", "&lt;"),
        new Pair(">", "&gt;"),
        new Pair("\n", "<br>"),
        new Pair("\t", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
    ];
    for (var i = 0; i < args.length; i++) {
        var item = String(args[i]);
        item = StringUtil.replaceAll(item, replacerArray);
        if (i == 0)
            str += item;
        else
            str += ", " + item;
    }
    document.write("<p>" + str + "</p>");
}
/* =================================================================================
    LIBRARIES
====================================================================================
    * CONTAINERS
        - PAIR<_Ty1, _Ty2>
        - VECTOR<_Ty>
        - MAP<_Kty, _Ty>
            - MAP_ITERATOR<_Kty, _Ty>
            - DICTIONARY<_Ty>
    
    * UTILITIES
        - STRING_UTIL
        - XML
        - XML_LIST

    * CASE_GENERATOR
        * CASE_GENERATOR
        * COMBINED_PERMUTATION_GENERATOR
        * PERMUTATION_GENERATOR
        * FACTORIAL_GENERATOR
================================================================================= */
/* =================================================================================
    LIBRARY - CONTAINERS
================================================================================= */
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
/**
 * <p> Vector, the dynamic array. </p>
 * <ul>
 *  <li> _Ty: Type of elements. </li>
 * </ul>
 *
 * <p> Vector is an Array. It's not the customary expression that means inheritance but
 * dictionary meaning of the Array, which means that Vector is the Array, itself. </p>
 *
 * <p> The reason why using Vector instead of Array although there's any difference between
 * Array and Vector is for TypeScript. In TypeScript, Array is considered as an <i>interface</i>.
 * As the reason, any class can't inherit the Array in TypeScript. </p>
 *
 * <p> Vector implements the Array and filled the methods of Array and other classes
 * can inherit array extending Vector instead of Array. </p>
 *
 * @author Jeongho Nam
 */
var Vector = (function () {
    /**
     * Default Constructor.
     */
    function Vector() {
    }
    /* ------------------------------------------------------------------------
        MODIFIERS
    ------------------------------------------------------------------------ */
    /**
     * Appends new elements to an array, and returns the new length of the array.
     *
     * @param items New elements of the Array.
     * @return New length of the array.
     */
    Vector.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return 0;
    };
    /**
     * Removes the last element from an array and returns it.
     */
    Vector.prototype.pop = function () { return null; };
    /**
     * Combines two or more arrays.
     *
     * @param items Additional items to add to the end of array1.
     */
    Vector.prototype.concat = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return [];
    };
    /**
     * Adds all the elements of an array separated by the specified separator string.
     *
     * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
     */
    Vector.prototype.join = function (separator) { return ""; };
    /**
     * Reverses the elements in an Array.
     */
    Vector.prototype.reverse = function () { return []; };
    /**
     * Removes the first element from an array and returns it.
     */
    Vector.prototype.shift = function () { return null; };
    /**
     * Returns a section of an array.
     *
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    Vector.prototype.slice = function (start, end) { return []; };
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    Vector.prototype.sort = function (compareFn) { return []; };
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     *
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     */
    Vector.prototype.splice = function (start, deleteCount) {
        if (deleteCount === void 0) { deleteCount = 1; }
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        return [];
    };
    /**
     * Inserts new elements at the start of an array.
     *
     * @param items Elements to insert at the start of the Array.
     */
    Vector.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return 0;
    };
    /**
     * Returns the index of the first occurrence of a value in an array.
     *
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    Vector.prototype.indexOf = function (searchElement, fromIndex) { return 0; };
    /**
     * Returns the index of the last occurrence of a specified value in an array.
     *
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
     */
    Vector.prototype.lastIndexOf = function (searchElement, fromIndex) { return 0; };
    /**
     * Determines whether all the members of an array satisfy the specified test.
     *
     * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    Vector.prototype.every = function (callbackfn, thisArg) { return false; };
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     *
     * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    Vector.prototype.some = function (callbackfn, thisArg) { return false; };
    /**
     * Performs the specified action for each element in an array.
     *
     * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    Vector.prototype.forEach = function (callbackfn, thisArg) { };
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     *
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    Vector.prototype.map = function (callbackfn, thisArg) { return []; };
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     *
     * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    Vector.prototype.filter = function (callbackfn, thisArg) { return []; };
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     *
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    Vector.prototype.reduce = function (callbackfn, initialValue) { return null; };
    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     *
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    Vector.prototype.reduceRight = function (callbackfn, initialValue) { return null; };
    /* ------------------------------------------------------------------------
        EXPORTERS
    ------------------------------------------------------------------------ */
    /**
     * Returns a string representation of an array.
     */
    Vector.prototype.toString = function () { return ""; };
    Vector.prototype.toLocaleString = function () { return ""; };
    return Vector;
})();
Vector.prototype = new Array();
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
var Set = (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * <p> Default Constructor. </p>
     */
    function Set() {
        this.data_ = new Vector();
    }
    /**
     * <p> Insert element. </p>
     * <p> Inserts a new element in the Set. </p>
     *
     * <p> Each element is inserted only if it is not equivalent to any other element already
     * in the container (elements in an unordered_set have unique values). </p>
     *
     * <p> This effectively increases the container size by the number of elements inserted. </p>
     */
    Set.prototype.insert = function (key) {
        if (this.has(key) == true)
            return;
        this.data_.push(key);
    };
    /**
     * <p> Erase an element. </p>
     * <p> Removes an element by its key(identifier) from the Set container. </p>
     *
     * @param key Key of the element to be removed from the Set.
     * @throw exception out of range.
     */
    Set.prototype.erase = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i] == key) {
                this.data_.splice(i, 1);
                return;
            }
        throw Error("out of range");
    };
    /**
     * <p> Clear content. </p>
     *
     * <p> Removes all elements from the map container (which are destroyed),
     * leaving the container with a size of 0. </p>
     */
    Set.prototype.clear = function () {
        this.data_ = new Vector();
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * <p> Get data. </p>
     * <p> Returns the source container of the Set. </p>
     *
     * <h4> Note </h4>
     * <p> Changes on the returned container influences the source Set. </p>
     */
    Set.prototype.data = function () {
        return this.data_;
    };
    /**
     * <p> Return container size. </p>
     * <p> Returns the number of elements in Set container. </p>
     *
     * @return The number of elements in the container.
     */
    Set.prototype.size = function () {
        return this.data.length;
    };
    /**
     * <p> Whether have the item or not. </p>
     * <p> Indicates whether a map has an item having the specified identifier. </p>
     *
     * @param key Key value of the element whose mapped value is accessed.
     * @return Whether the map has an item having the specified identifier
     */
    Set.prototype.has = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i] == key)
                return true;
        return false;
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
    Set.prototype.equals = function (obj) {
        if (this.size() != obj.size())
            return false;
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i] != obj.data_[i])
                return false;
        return true;
    };
    /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
    /**
     * <p> Return iterator to beginning. </p>
     * <p> Returns an iterator referring the first element in the Set container. </p>
     *
     * <h4> Note </h4>
     * <p> If the container is empty, the returned iterator is same with end(). </p>
     *
     * @return An iterator to the key element in the container.
     */
    Set.prototype.begin = function () {
        if (this.data_.length == 0)
            return this.end();
        else
            return new SetIterator(this, 0);
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
    Set.prototype.end = function () {
        return new SetIterator(this, -1);
    };
    return Set;
})();
/**
 * <p> An iterator of a Set. </p>
 * <ul>
 *  <li> _Ty: Type of the elements. Each element in a Set is also uniquely identified by this value.
 *            Aliased as member types unordered_set::key_type and unordered_set::value_type. </li>
 * </ul>
 *
 * @author Jeongho Nam
 */
var SetIterator = (function () {
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
    function SetIterator(set_, index) {
        this.set_ = set_;
        this.index = index;
    }
    Object.defineProperty(SetIterator.prototype, "value", {
        /* ---------------------------------------------------------
            GETTERS
        --------------------------------------------------------- */
        /**
         * <p> Get key value of the iterator is pointing. </p>
         *
         * @return A key value of the iterator.
         */
        get: function () {
            return this.set_.data()[this.index];
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
    SetIterator.prototype.equals = function (obj) {
        return (this.set_ == obj.set_ && this.index == obj.index);
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
    SetIterator.prototype.prev = function () {
        if (this.index == 0)
            return this.set_.end();
        else
            return new SetIterator(this.set_, this.index - 1);
    };
    /**
     * <p> Get iterator to next element. </p>
     * <p> If current iterator is the last item, returns end(). </p>
     *
     * @return An iterator of the next item.
     */
    SetIterator.prototype.next = function () {
        if (this.index >= this.set_.size())
            return this.set_.end();
        else
            return new SetIterator(this.set_, this.index + 1);
    };
    return SetIterator;
})();
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
var Map = (function () {
    /**
     * <p> Default Constructor. </p>
     */
    function Map() {
        this.data_ = new Vector();
    }
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
    Map.prototype.data = function () {
        return this.data_;
    };
    /**
     * <p> Return container size. </p>
     * <p> Returns the number of elements in Map container. </p>
     *
     * @return The number of elements in the container.
     */
    Map.prototype.size = function () {
        return this.data_.length;
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
    Map.prototype.find = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key)
                return new MapIterator(this, i);
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
    Map.prototype.has = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key)
                return true;
        return false;
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
    Map.prototype.get = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key)
                return this.data_[i].second;
        throw Error("out of range");
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
    Map.prototype.begin = function () {
        if (this.size() == 0)
            return this.end();
        return new MapIterator(this, 0);
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
    Map.prototype.end = function () {
        return new MapIterator(this, -1);
    };
    /* ---------------------------------------------------------
        MODIFIERS
    --------------------------------------------------------- */
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
    Map.prototype.set = function (key, value) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key) {
                this.data_[i].second = value;
                return;
            }
        this.data_.push(new Pair(key, value));
    };
    /**
     * <p> Erase an element. </p>
     * <p> Removes an element by its key(identifier) from the Map container. </p>
     *
     * @param key Key of the element to be removed from the Map.
     * @throw exception out of range.
     */
    Map.prototype.erase = function (key) {
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key) {
                this.data_.splice(i, 1);
                return;
            }
        throw Error("out of range");
    };
    /**
     * <p> Clear content. </p>
     *
     * <p> Removes all elements from the map container (which are destroyed),
     * leaving the container with a size of 0. </p>
     */
    Map.prototype.clear = function () {
        this.data_ = new Vector();
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
    Map.prototype.equals = function (obj) {
        if (this.size() != obj.size())
            return false;
        for (var i = 0; i < this.data_.length; i++)
            if (this.data_[i].equals(obj.data_[i]) == false)
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
    Map.prototype.toString = function () {
        var str = "{";
        for (var i = 0; i < this.data_.length; i++) {
            var pair = this.data_[i];
            var key = "\"" + pair.first + "\"";
            var value = (typeof pair.second == "string")
                ? "\"" + pair.second + "\""
                : String(pair.second);
            str += "{\"key\": " + key + ": value: " + value + "}";
        }
        str += "}";
        return str;
    };
    return Map;
})();
/**
 * <p> A bi-directional iterator. </p>
 * <ul>
 *  <li> _Kty: Type of the keys. Each element in a map is uniquely identified by its key value. </li>
 *  <li> _Ty: Type of the mapped value. Each element in a map stores some data as its mapped value. </li>
 * </ul>
 *
 * @author Jeongho Nam
 */
var MapIterator = (function () {
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
    function MapIterator(map, index) {
        this.map = map;
        if (index != -1 && index < map.size())
            this.index = index;
        else
            this.index = -1;
    }
    Object.defineProperty(MapIterator.prototype, "first", {
        /* ---------------------------------------------------------
            GETTERS AND SETTERS
        --------------------------------------------------------- */
        /**
         * <p> Get first element (key). </p>
         */
        get: function () {
            return this.map.data()[this.index].first;
        },
        /**
         * <p> Set first element (key). </p>
         */
        set: function (key) {
            this.map.data()[this.index].first = key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapIterator.prototype, "second", {
        /**
         * <p> Get second element (mapped value). </p>
         */
        get: function () {
            return this.map.data()[this.index].second;
        },
        /**
         * <p> Set second element (mapped value). </p>
         */
        set: function (val) {
            this.map.data()[this.index].second = val;
        },
        enumerable: true,
        configurable: true
    });
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
    MapIterator.prototype.equals = function (obj) {
        return (this.map == obj.map && this.index == obj.index);
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
    MapIterator.prototype.prev = function () {
        if (this.index - 1 < 0)
            return this.map.end();
        else
            return new MapIterator(this.map, this.index - 1);
    };
    /**
     * <p> Get iterator to next element. </p>
     * <p> If current iterator is the last item, returns end(). </p>
     *
     * @return An iterator of the next item.
     */
    MapIterator.prototype.next = function () {
        if (this.index + 1 >= this.map.size())
            return this.map.end();
        else
            return new MapIterator(this.map, this.index + 1);
    };
    return MapIterator;
})();
/**
 * <p> A dictionary, Map<string, _Ty>. </p>
 *
 * @inheritDoc
 * @author Jeongho Nam
 */
var Dictionary = (function (_super) {
    __extends(Dictionary, _super);
    /**
     * <p> Default Constructor. </p>
     */
    function Dictionary() {
        _super.call(this);
    }
    return Dictionary;
})(Map);
/* =================================================================================
    LIBRARY - UTILITIES
================================================================================= */
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
        /*var foundPairList: Array<Pair<number, number>> = new Array<Pair<number, number>>();
        
        //FIND POSITION-INDEX IN ORIGINAL STRING
        for (var i: number = 0; i < pairs.length; i++)
        {
            var index: number = 0;

            while (true)
            {
                index = str.indexOf(pairs[i].first, index);
                if (index == -1)
                    break;

                foundPairList.push(new Pair<number, number>(index++, i));
            }
        }

        if (foundPairList.length == 0)
            return str;

        foundPairList.sort();

        //REPLACE
        var res: string = "";
        var index: number = 0;

        while (foundPairList.length > 0)
        {
            var foundPair = foundPairList[0];
            var before = pairs[foundPair.first].first;
            var after = pairs[foundPair.second].second;

            res += str.substring(index, foundPair.first);
            res += after;

            index = foundPair.first + before.length;
            foundPairList.splice(0, 1);
        }
        if (index <= str.length - 1)
            res += str.substr(index);

        return res;*/
    };
    return StringUtil;
})();
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
     * <h4> Note </h4>
     * <p> Throwing exceptions on parsing are not defined yet. If there's some problem on
     * the string representing the XML object, error will be occured. </p>
     *
     * @param str A string to be parsed
     */
    function XML(str) {
        if (str === void 0) { str = ""; }
        _super.call(this);
        this.properties = new Dictionary();
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
            return new Pair(str, false);
        }
        var start = end_block + 1;
        var end = str.lastIndexOf("<");
        str = str.substring(start, end); //REDEFINE WEAK_STRING -> IN TO THE TAG
        if (str.indexOf("<") == -1)
            this.value = XML.decodeValue(str.trim());
        else
            this.value = "";
        return new Pair(str, true);
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
                    xmlList = new XMLList();
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
        var xmlArray = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            xmlArray[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < xmlArray.length; i++) {
            var xml = xmlArray[i];
            if (this.has(xml.tag) == true)
                this.get(xml.tag).push(xml);
            else {
                var xmlList = new XMLList();
                xmlList.push(xml);
                this.set(xml.tag, xmlList);
            }
        }
    };
    XML.prototype.addAllProperties = function (xml) {
        for (var it = xml.properties.begin(); it.equals(xml.properties.end()) == false; it = it.next())
            this.setProperty(it.first, it.second);
    };
    XML.prototype.clearProperties = function () {
        this.properties = new Dictionary();
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
            new Pair("&amp;", "&"),
            new Pair("&lt;", "<"),
            new Pair("&gt;", ">")
        ];
        return StringUtil.replaceAll(str, pairs);
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
            new Pair("&", "&amp;"),
            new Pair("<", "&lt;"),
            new Pair(">", "&gt;")
        ];
        return StringUtil.replaceAll(str, pairs);
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
            new Pair("&amp;", "&"),
            new Pair("&lt;", "<"),
            new Pair("&gt;", ">"),
            new Pair("&quot;", "\""),
            new Pair("&apos;", "'"),
            new Pair("&#x9;", "\t"),
            new Pair("&#xA;", "\n"),
            new Pair("&#xD;", "\r"),
        ];
        return StringUtil.replaceAll(str, pairs);
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
            new Pair("&", "&amp;"),
            new Pair("<", "&lt;"),
            new Pair(">", "&gt;"),
            new Pair("\"", "&quot;"),
            new Pair("'", "&apos;"),
            new Pair("\t", "&#x9;"),
            new Pair("\n", "&#xA;"),
            new Pair("\r", "&#xD;"),
        ];
        return StringUtil.replaceAll(str, pairs);
    };
    /* -------------------------------------------------------------
        EXPORTS
    ------------------------------------------------------------- */
    /**
     * <p> Convert the XML to a string. </p>
     */
    XML.prototype.toString = function (level) {
        if (level === void 0) { level = 0; }
        var str = StringUtil.tab(level) + "<" + this.tag;
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
            str += StringUtil.tab(level) + "</" + this.tag + ">";
        }
        return str;
    };
    /**
     * <p> Convert the XML to HTML string. </p>
     */
    XML.prototype.toHTML = function (level) {
        if (level === void 0) { level = 0; }
        var str = StringUtil.htmlTab(level) + "&lt;" + this.tag;
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
            str += StringUtil.htmlTab(level) + "&lt;/" + this.tag + "&gt;";
        }
        return str;
    };
    return XML;
})(Dictionary);
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
        for (var i = 0; i < this.length; i++)
            str += this[i].toString(level) + "\n";
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
        for (var i = 0; i < this.length; i++)
            str += this[i].toHTML(level) + "<br>\n";
        return str;
    };
    return XMLList;
})(Vector);
/* =================================================================================
    LIBRARY - CASE GENERATOR
================================================================================= */
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
        return null;
    };
    return CaseGenerator;
})();
/**
 * <p> A combined-permutation case generator. </p>
 * <p> <sub>n</sub>TT<sub>r</sub> </p>
 *
 * @inheritDoc
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
        this.dividerArray = new Vector();
        for (var i = 0; i < r; i++) {
            var x = r - (i + 1);
            var val = Math.pow(n, x);
            this.dividerArray.push(val);
        }
    }
    CombinedPermutationGenerator.prototype.at = function (index) {
        var row = new Vector();
        for (var i = 0; i < this.r_; i++) {
            var val = Math.floor(index / this.dividerArray[i]) % this.n_;
            row.push(val);
        }
        return row;
    };
    return CombinedPermutationGenerator;
})(CaseGenerator);
/**
 * <p> A permutation case generator. </p>
 * <p> nPr </p>
 *
 * @inheritDoc
 * @author Jeongho Nam
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
    PermuationGenerator.prototype.at = function (index) {
        var atoms = new Vector();
        for (var i = 0; i < this.n_; i++)
            atoms.push(i);
        var row = new Vector();
        for (var i = 0; i < this.r_; i++) {
            var item = index % atoms.length;
            index = Math.floor(index / atoms.length);
            row.push(atoms[item]);
            atoms.splice(item, 1);
        }
        return row;
    };
    return PermuationGenerator;
})(CaseGenerator);
var FactorialGenerator = (function (_super) {
    __extends(FactorialGenerator, _super);
    function FactorialGenerator(n) {
        _super.call(this, n, n);
    }
    return FactorialGenerator;
})(PermuationGenerator);
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
        var sizePair = new Pair(0, 0);
        var startIndex = 0;
        var endIndex = 0;
        while (true) {
            var iPair = new Pair(this.str.indexOf("<invoke", startIndex), this.str.indexOf("</invoke>", startIndex)); //FIND WORDS
            if (iPair.first != -1)
                sizePair.first++;
            if (iPair.second != -1)
                sizePair.second++; //AND COUNTS
            if (indexPair == null && sizePair.first == 1)
                indexPair = new Pair(iPair.first, -1); //SPECIFY THE STARTING INDEX
            //FAILED TO FIND ANYTHING
            if (iPair.first == -1 || iPair.second == -1)
                break;
            /* FOUND SOMETHING FROM NOW ON */
            //AN INVOKE HAS FOUND
            if (indexPair != null && sizePair.first == sizePair.second) {
                var start = indexPair.first;
                var end = indexPair.second + ("</invoke>").length;
                var xml = new XML(this.str.substring(start, end));
                var invoke = new Invoke(xml);
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
                && e_it.second.length == 1
                && (this[e_it.first] instanceof Entity || this[e_it.first] instanceof EntityArray)
                && this[e_it.first] != null) {
                var entity = this[e_it.first];
                var e_xml = e_it.second[0];
                if (entity == null)
                    continue;
                entity.construct(e_xml);
            }
        }
    };
    Entity.prototype.TAG = function () { return ""; };
    Entity.prototype.key = function () { return ""; };
    Entity.prototype.toXML = function () {
        var xml = new XML();
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
/**
 * <p> An Entity and an Array of children Entity objects. </p>
 *
 * <p> EntityArray is a template class for containinig children Entity objects, and also another type
 * of an Entity, too. You can realize hierarchical relationship. Although some entities have complicated
 * hierarchical relationship, you can deduct a optimal solution easily with EntityArray and Entity. </p>
 *
 * <p> If an entity has some subordinate entities of same type, they are in "Composite relationship".
 * Make the entity to be EmntityGroup and subordinate entities to be children of the entity. When
 * those relationships are continued, continue to create classes dervied from EntityArray. When those
 * relationshiop meets a terminal node, then make the terminal node to be an Entity. </p>
 *
 * <p> <img src="inspect.png" /> </p>
 *
 * <p> EntityArray is an Entity, and a container of children Entity objects at the same time. If
 * children type, of a class derived from an EntityArray, is itself, you can realize hierarchical
 * and recursive relationship. The relationship is called as "Composite pattern". </p>
 *
 * <ul>
 *	<li> FTFolder extends FTInstance and EntityArray&lt;FTInstance&gt;. </li>
 *	<li> NTCriteria extends EntityArray&lt;NTCriteria&gt;. </li>
 * </ul>
 *
 * <h4> Inherited </h4>
 * @copy Entity
 *
 * @see Entity
 * @author Jeongho Nam
 */
var EntityArray = (function (_super) {
    __extends(EntityArray, _super);
    /* ------------------------------------------------------------------
        CONSTRUCTORS
    ------------------------------------------------------------------ */
    /**
     * <p> Default Constructor. </p>
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
     * @inheritDoc
     */
    EntityArray.prototype.construct = function (xml) {
        this.splice(0, this.length);
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
                && e_it.second.length == 1
                && (this[e_it.first] instanceof Entity || this[e_it.first] instanceof EntityArray)
                && this[e_it.first] != null) {
                var entity = this[e_it.first];
                var e_xml = e_it.second[0];
                if (entity == null)
                    continue;
                entity.construct(e_xml);
            }
        }
        //CHILDREN
        if (xml.has(this.CHILD_TAG()) == false)
            return;
        var xmlList = xml.get(this.CHILD_TAG());
        for (var i = 0; i < xmlList.length; i++) {
            var child = this.createChild(xmlList[i]);
            if (child == null)
                continue;
            child.construct(xmlList[i]);
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
    EntityArray.prototype.set = function (key, entity) {
        this.push(entity);
    };
    EntityArray.prototype.erase = function (key) {
        for (var i = this.length - 1; i >= 0; i--)
            if (this[i].key() == key)
                this.splice(i, 1);
    };
    /* ------------------------------------------------------------------
        GETTERS
    ------------------------------------------------------------------ */
    EntityArray.prototype.key = function () {
        return "";
    };
    EntityArray.prototype.has = function (key) {
        var i;
        if (key instanceof Entity || key instanceof EntityArray) {
            for (i = 0; i < this.length; i++)
                if (this[i] == key)
                    return true;
        }
        else {
            for (var i = 0; i < this.length; i++)
                if (this[i].key() == key)
                    return true;
        }
        return false;
    };
    EntityArray.prototype.get = function (key) {
        for (var i = 0; i < this.length; i++)
            if (this[i].key() == key)
                return this[i];
        throw Error("out of range");
    };
    /* ------------------------------------------------------------------
        EXPORTERS
    ------------------------------------------------------------------ */
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
     * @inheritDoc
     */
    EntityArray.prototype.toXML = function () {
        var xml = new XML();
        xml.setTag(this.TAG());
        // MEMBERS
        for (var key in this)
            if (typeof key == "string" && key != "length" // LENGTH: MEMBER OF AN ARRAY
                && (typeof this[key] == "string" || typeof this[key] == "number")) {
                // ATOMIC
                xml.setProperty(key, this[key]);
            }
        // CHILDREN
        for (var i = 0; i < this.length; i++)
            xml.push(this[i].toXML());
        return xml;
    };
    return EntityArray;
})(Vector);
/* =================================================================================
    PROTOCOL - INVOKE MESSAGE MODULE
================================================================================= */
/**
 * <p> Standard message of network I/O. </p>
 * <p> Invoke is a class used in network I/O in protocol package of Samchon Framework.  </p>
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
 * @author Jeongho Nam
 */
var Invoke = (function (_super) {
    __extends(Invoke, _super);
    /**
     * <p> Multiple Constructors. </p>
     *
     * <h4> Construct from a lisetenr </h4>
     * <p> Construct an Invoke only with its listener. </p>
     *
     * <ul>
     *  <li> listener := Represents who listens the Invoke message. Almost same with Function name. </li>
     * </ul>
     *
     * <hr />
     *
     * <h4> Construct from arguments </h4>
     * <p> Creates Invoke and InvokeParameter(s) at the same time by varadic template method. </p>
     *
     * <p> By the varadic template constructor, you can't specify name of each InvokeParameter, but
     * specify type and value of each InvokeParameter. If you try to record the Invoke to Database,
     * the name of InvokeParameter will be <i>NULL</i>.</p>
     *
     * <p> By the varadic template constructor, name of InovkeParameter(s) will be omitted. Because
     * of name, an identifier of an InvokeParameter, is omitted, you can't access to InvokeParameter
     * by Invoke::has() or Invoke::get(). </p>
     *
     * <ul>
     *  <li> listener := Represents who listens the Invoke message. Almost same with Function name. </li>
     *  <li> arguments := Arguments to be parameters of Invoke. </li>
     * </ul>
     *
     * <hr />
     *
     * <h4> Construct from an XML object </h4>
     * <p> Constructs Invoke and InvokeParameter objects by an XML object. </p>
     *
     * <ul>
     *  <li>xml := An xml object representing Invoke object. </li>
     * </ul>
     */
    function Invoke() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        _super.call(this);
        if (args.length == 1) {
            var val = args[0];
            if (typeof val == "string")
                this.listener = val;
            else if (val instanceof XML) {
                var xml = val;
                this.construct(xml);
            }
        }
        else {
            this.listener = args[0];
            for (var i = 1; i < args.length; i++) {
                var value = args[i];
                var parameter = new InvokeParameter("", value);
                this.push(parameter);
            }
        }
    }
    Invoke.prototype.construct = function (xml) {
        _super.prototype.construct.call(this, xml);
        this.listener = xml.getProperty("listener");
    };
    /* -------------------------------------------------------------------
        GETTERS
    ------------------------------------------------------------------- */
    /**
     * <p> Get listener. </p>
     */
    Invoke.prototype.getListener = function () {
        return this.listener;
    };
    /**
     * <p> Get arguments for Function.apply(). </p>
     *
     * @return An array containing values of the parameters.
     */
    Invoke.prototype.getArguments = function () {
        var args = [];
        for (var i = 0; i < this.length; i++)
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
        EXPORTER
    ------------------------------------------------------------------- */
    Invoke.prototype.TAG = function () {
        return "invoke";
    };
    Invoke.prototype.CHILD_TAG = function () {
        return "parameter";
    };
    Invoke.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("listener", this.listener);
        return xml;
    };
    return Invoke;
})(EntityArray);
/**
 * <p> Standard message of network I/O. </p>
 * <p> Invoke is a class used in network I/O in protocol package of Samchon Framework.  </p>
 *
 * <p> The Invoke message has a XML structure like the result screen of provided example in below.
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
 * @author Jeongho Nam
 */
var InvokeParameter = (function (_super) {
    __extends(InvokeParameter, _super);
    /* -------------------------------------------------------------------
        CONSTRUCTORS
    ------------------------------------------------------------------- */
    /**
     * <p> Multiple Constructors. </p>
     *
     * <h4> InvokeParameter(XML) </h4>
     * <p> Construct from XML. </p>
     * <ul>
     *	<li> xml := A XML instance representing InvokeParameter. </li>
     * </ul>
     *
     * <hr/>
     *
     * <h4> template <typename _Ty> InvokeParameter(_Ty) </h4>
     * <p> Construct from a value. </p>
     * <ul>
     *  <li> value := Value belonged to the parameter. </li>
     * </ul>
     *
     * <hr/>
     *
     * <h5> template <typename _Ty> InvokeParameter(string, _Ty) </h5>
     * <p> Construct from specified type and value. </p>
     * <ul>
     *	<li> type := Type of the parameter. </li>
     *	<li> value := A value belongs to the parameter. </li>
     * </ul>
     */
    function InvokeParameter() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        _super.call(this);
        if (args.length == 1 && args[0] instanceof XML) {
            this.construct(args[0]);
        }
        else if (args.length == 2) {
            this.name = args[0];
            var value = args[1];
            if (value instanceof Entity || value instanceof EntityArray) {
                this.type = "XML";
                this.value = value.toXML();
            }
            else if (value instanceof XML) {
                this.type = "XML";
                this.value = value;
            }
            else if (typeof value == "number" || typeof value == "string") {
                this.type = typeof value;
                this.value = value;
            }
            else {
                this.type = "unknown";
                this.value = value;
            }
        }
        else if (args.length == 3) {
            this.name = args[0];
            this.type = args[1];
            this.value = args[2];
        }
    }
    InvokeParameter.prototype.construct = function (xml) {
        this.name = xml.hasProperty("name") ? xml.getProperty("name") : "";
        this.type = xml.getProperty("type");
        if (this.type == "XML")
            this.value = xml.begin().second[0];
        else
            this.value = xml.getValue();
    };
    /* -------------------------------------------------------------------
        GETTERS
    ------------------------------------------------------------------- */
    InvokeParameter.prototype.key = function () {
        return this.name;
    };
    /**
     * <p> Get name. </p>
     */
    InvokeParameter.prototype.getName = function () {
        return this.name;
    };
    /**
     * <p> Get type. </p>
     */
    InvokeParameter.prototype.getType = function () {
        return this.type;
    };
    /**
     * <p> Get value. </p>
     */
    InvokeParameter.prototype.getValue = function () {
        return this.value;
    };
    /* -------------------------------------------------------------------
        EXPORTER
    ------------------------------------------------------------------- */
    InvokeParameter.prototype.TAG = function () {
        return "parameter";
    };
    InvokeParameter.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        if (this.name != "")
            xml.setProperty("name", this.name);
        xml.setProperty("type", this.type);
        if (this.type == "XML") {
            var xmlList = new XMLList();
            xmlList.push(this.value);
            xml.set(this.value.tag, xmlList);
        }
        else
            xml.setValue(this.value);
        return xml;
    };
    return InvokeParameter;
})(Entity);
/* =================================================================================
    PROTOCOL - APPLICATION MODULE
================================================================================= */
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
        this.socket = new ServerConnector(this);
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
/**
 * <p> A movie belonged to an Application
 */
var Movie = (function () {
    function Movie() {
    }
    /**
     * <p> Handle replied data
     */
    Movie.prototype.replyData = function (invoke) {
        invoke.apply(this) == false;
    };
    /**
     * <p> Send data to server
     */
    Movie.prototype.sendData = function (invoke) {
        this.application.sendData(invoke);
    };
    return Movie;
})();
/**
 * <p> A sub-movie
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
/* =================================================================================
    PROTOCOL - EXTERNAL SYSTEM MODULE
================================================================================= */
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
     * <p> Default Constructor. </p>
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
        for (var i = 0; i < this.length; i++)
            this[i].start();
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
        for (var i = 0; i < this.length; i++)
            if (this[i].has(key) == true)
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
        for (var i = 0; i < this.length; i++)
            if (this[i].has(key) == true)
                return this[i].get(key);
        throw Error("out of range");
    };
    /* ------------------------------------------------------------------
        CHAIN OF INVOKE MESSAGE
    ------------------------------------------------------------------ */
    ExternalSystemArray.prototype.sendData = function (invoke) {
        var listener = invoke.getListener();
        for (var i = 0; i < this.length; i++)
            for (var j = 0; j < this[i].length; j++)
                if (this[i][j].hasSendListener(listener) == true)
                    this[i].sendData(invoke);
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
})(EntityArray);
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
    ExternalSystem.prototype.construct = function (xml) {
        _super.prototype.construct.call(this, xml);
        this.name = xml.getProperty("name");
        this.ip = xml.getProperty("ip");
        this.port = xml.getProperty("port");
    };
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
        this.driver = new ServerConnector(this);
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
        for (var i = 0; i < this.length; i++)
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
    ExternalSystem.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("name", this.name);
        xml.setProperty("ip", this.ip);
        xml.setProperty("port", this.port);
        return xml;
    };
    return ExternalSystem;
})(EntityArray);
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
        this.sendListeners = new Set();
    }
    ExternalSystemRole.prototype.construct = function (xml) {
        this.name = xml.getProperty("name");
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
        xml.setProperty("name", this.name);
        return xml;
    };
    return ExternalSystemRole;
})(Entity);
/* =================================================================================
    PROTOCOL - SLAVE SYSTEM MODULE
================================================================================= */
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
 * @inheritDoc
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
    SlaveSystem.prototype.replyData = function (invoke) {
        var history = new InvokeHistory(invoke);
        _super.prototype.replyData.call(this, invoke);
        history.notifyEnd();
        this.sendData(history.toInvoke());
    };
    return SlaveSystem;
})(ExternalSystem);
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
        invoke.erase("invoke_history_uid");
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
    InvokeHistory.prototype.TAG = function () { return "invokeHistory"; };
    InvokeHistory.prototype.toXML = function () {
        var xml = _super.prototype.toXML.call(this);
        xml.setProperty("uid", this.uid);
        xml.setProperty("listener", this.listener);
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
        return new Invoke("reportInvokeHistory", this.toXML());
    };
    return InvokeHistory;
})(Entity);
var Product = (function (_super) {
    __extends(Product, _super);
    /* --------------------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------------------- */
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
})(Entity);
var ProductArray = (function (_super) {
    __extends(ProductArray, _super);
    function ProductArray() {
        _super.call(this);
    }
    ProductArray.prototype.createChild = function (xml) {
        return new Product();
    };
    ProductArray.prototype.TAG = function () {
        return "productArray";
    };
    ProductArray.prototype.CHILD_TAG = function () {
        return "product";
    };
    return ProductArray;
})(EntityArray);
var Wrapper = (function (_super) {
    __extends(Wrapper, _super);
    /* --------------------------------------------------------------------
        CONSTRUCTORS
    -------------------------------------------------------------------- */
    /**
     * <p> Construct from arguments. </p>
     */
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
        return new Product();
    };
    /* --------------------------------------------------------------------
        OPERATORS
    -------------------------------------------------------------------- */
    Wrapper.prototype.tryInsert = function (product) {
        var volume = 0;
        var weight = 0;
        for (var i = 0; i < this.length; i++) {
            volume += this[i].getVolume();
            weight += this[i].getWeight();
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
})(ProductArray);
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
        this.reserved = new Vector();
    }
    WrapperArray.prototype.construct = function (xml) {
        _super.prototype.construct.call(this, xml);
        this.sample = new Wrapper();
        this.sample.construct(xml);
    };
    WrapperArray.prototype.createChild = function (xml) {
        return new Wrapper();
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
        var factorial = new FactorialGenerator(this.reserved.length);
        var minWrapperArray;
        for (var i = 0; i < factorial.size(); i++) {
            var wrapperArray = new WrapperArray(this.sample);
            var row = factorial.at(i);
            for (var j = 0; j < row.length; j++) {
                var product = this.reserved[row[j]];
                if (wrapperArray.length == 0 ||
                    wrapperArray[wrapperArray.length - 1].tryInsert(product) == false) {
                    var wrapper = new Wrapper(this.sample);
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
        this.splice(0, this.length);
        for (var i = 0; i < minWrapperArray.length; i++)
            this.push(minWrapperArray[i]);
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
        return this.sample.getPrice() * this.length;
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
})(EntityArray);
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
            this.productArray = new ProductArray();
            return;
        }
        if (obj instanceof ProductArray) {
            this.productArray = obj;
        }
        else if (obj instanceof Packer) {
            var packer = obj;
            this.productArray = packer.productArray;
            for (var i = 0; i < packer.length; i++)
                this.push(new WrapperArray(packer[i].getSample()));
        }
        else
            throw "invalid argument";
    }
    Packer.prototype.createChild = function (xml) {
        return new WrapperArray();
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
        if (this.length == 0 || this.productArray.length == 0)
            return;
        var caseGenerator = new CombinedPermutationGenerator(this.length, this.productArray.length);
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
                var product = this.productArray[j];
                var wrapperArray = packer[row[j]];
                if (wrapperArray.tryInsert(product) == false) {
                    validity = false;
                    break;
                }
            }
            if (validity == false)
                continue;
            //OPTIMIZE ALL WRAPPERS IN A PACKER
            for (var j = 0; j < packer.length; j++)
                packer[j].optimize();
            if (minPacker == null || packer.calcPrice() < minPacker.calcPrice())
                minPacker = packer;
        }
        //REPLACE TO MIN_PACKER
        this.splice(0, this.length);
        for (var i = 0; i < minPacker.length; i++)
            this.push(minPacker[i]);
    };
    /**
     * <p> Calculate price of the wrappers. </p>
     */
    Packer.prototype.calcPrice = function () {
        var price = 0;
        for (var i = 0; i < this.length; i++)
            price += this[i].calcPrice();
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
    return Packer;
})(EntityArray);
/**
 * <p> A slave system for solving packer. </p>
 *
 * @inheritDoc
 * @author Jeongho Nam
 */
var PackerSlaveSystem = (function (_super) {
    __extends(PackerSlaveSystem, _super);
    /**
     * <p> Construct from ip and port of the master. </p>
     */
    function PackerSlaveSystem(ip, port) {
        _super.call(this);
        this.ip = ip;
        this.port = port;
    }
    /**
     * <p> Optimize for find packing solution with segmentation index. </p>
     *
     * @param xml XML object represents metadata of products and wrappers.
     * @param start Start index of cases.
     * @param size Size of cases to retrieve.
     */
    PackerSlaveSystem.prototype.optimize = function (xml, start, size) {
        var packer = new Packer();
        packer.construct(xml);
        packer.optimize(start, size);
        trace("optimize number of " + size + " cases from #" + start);
        trace(packer.toXML().toHTML());
        this.sendData(new Invoke("replyOptimization", packer));
    };
    return PackerSlaveSystem;
})(SlaveSystem);
/// <reference path="../FaceAPI.ts" />
/// <reference path="IJSonEntity.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var basic;
        (function (basic) {
            /**
             * An entity representing coordinates X and Y.
             *
             * @author Jeongho Nam
             */
            var Point = (function (_super) {
                __extends(Point, _super);
                /* --------------------------------------------------------
                    CONSTRUCTORS
                -------------------------------------------------------- */
                /**
                 * Construct from a XML tag name.
                 */
                function Point(tag) {
                    if (tag === void 0) { tag = ""; }
                    _super.call(this);
                    this.tag = tag;
                    this.x = 0;
                    this.y = 0;
                }
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
                Point.prototype.TAG = function () {
                    return this.tag;
                };
                Point.prototype.toXML = function () {
                    var xml = _super.prototype.toXML.call(this);
                    xml.eraseProperty("tag");
                    return xml;
                };
                return Point;
            })(Entity);
            basic.Point = Point;
        })(basic = faceapi.basic || (faceapi.basic = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="../basic/Point.ts" />
/// <reference path="../basic/IJSonEntity.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
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
            })(faceapi.basic.Point);
            face.FaceRectangle = FaceRectangle;
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="FaceRectangle.ts" />
/// <reference path="../basic/IFaceAPI.ts" />
/// <reference path="FacePairArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face_1) {
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
                    this.registered = false;
                    this.face = null;
                }
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
                FacePair.prototype.insertToServer = function () {
                    this.pairArray.insertFaceToServer(this);
                };
                FacePair.prototype.eraseFromServer = function () {
                    this.pairArray.eraseFaceFromServer(this);
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
                 * <p> Set rectangle data.
                 * Constructs members of FaceRectangle, basic class of the FacePair.
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
            })(face_1.FaceRectangle);
            face_1.FacePair = FacePair;
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="IFaceAPI.ts" />
/// <reference path="../FaceAPI.ts" />
/// <reference path="FaceRectangle.ts" />
///     <reference path="FacePair.ts" />
/// <reference path="../basic/IGroup.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face_2) {
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
                    _super.call(this);
                    this.id = "";
                    this.name = name;
                    this.registered = false;
                }
                FacePairArray.prototype.createChild = function (xml) {
                    return new face_2.FacePair(this);
                };
                /* --------------------------------------------------------
                    OPERATORS
                -------------------------------------------------------- */
                FacePairArray.prototype.push = function () {
                    var items = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        items[_i - 0] = arguments[_i];
                    }
                    if (this.isRegistered() == false)
                        this.insertToServer();
                    for (var i = 0; i < items.length; i++) {
                        if (items[i] instanceof face_2.FacePair == false) {
                            var pair = new face_2.FacePair(this);
                            if (items[i] instanceof face_2.Face)
                                pair.setFile(items[i]);
                            else
                                pair.setRectangle(items[i]);
                            // 서버에 등록
                            pair.insertToServer();
                            // 대치
                            items[i] = pair;
                        }
                    }
                    return _super.prototype.push.apply(this, items);
                };
                FacePairArray.prototype.splice = function (start, end) {
                    var items = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        items[_i - 2] = arguments[_i];
                    }
                    // Remove the elements from Face-API server.
                    for (var i = start; i < Math.min(start + end, this.length); i++)
                        this[i].eraseFromServer();
                    // To return
                    var output = _super.prototype.splice.call(this, start, end);
                    this.push.apply(this, items);
                    return output;
                };
                /* --------------------------------------------------------
                    INTERACTION WITH FACE API SERVER
                -------------------------------------------------------- */
                /**
                 * An abstract method to inserting the FacePairArray to the Face-API server.
                 */
                FacePairArray.prototype.insertToServer = function () {
                    // TO BE OVERRIDEN
                };
                /**
                 * An abstract method to removing the FacePairArray from the Face-API server.
                 */
                FacePairArray.prototype.eraseFromServer = function () {
                    // TO BE OVERRIDEN
                    // ...
                    this.registered = false;
                };
                /**
                 * An abstract method inserting the child FacePair instance to the Face-API server.
                 *
                 * @param face A newly inserted FacePair object.
                 */
                FacePairArray.prototype.insertFaceToServer = function (face) {
                    // TO BE OVERRIDEN
                };
                /**
                 * An abstract method removing the child FacePair instance from the Face-API server.
                 *
                 * @param face A just removed FacePair object.
                 */
                FacePairArray.prototype.eraseFaceFromServer = function (face) {
                    // TO BE OVERRIDEN
                    // ...
                    face.setID("");
                };
                /* --------------------------------------------------------
                    GETTERS & SETTERS
                -------------------------------------------------------- */
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
                /**
                 * Get id.
                 */
                FacePairArray.prototype.getID = function () {
                    return this.id;
                };
                /**
                 * Get name.
                 */
                FacePairArray.prototype.getName = function () {
                    return this.name;
                };
                FacePairArray.prototype.isRegistered = function () {
                    return this.registered;
                };
                /**
                 * Set name and notify it to the Face-API server.
                 *
                 * @param name New name.
                 */
                FacePairArray.prototype.setName = function (name) {
                    this.name = name;
                };
                /* --------------------------------------------------------
                    EXPORTERS
                -------------------------------------------------------- */
                FacePairArray.prototype.CHILD_TAG = function () {
                    return "facePair";
                };
                return FacePairArray;
            })(EntityArray);
            face_2.FacePairArray = FacePairArray;
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="../face/FacePairArray.ts" />
/// <reference path="PersonGroup.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var person;
        (function (person) {
            /**
             * <p> A FacePairArray for representing a person. </p>
             *
             * <p> References </p>
             * <ul>
             *  <li> Creating a Person: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523c </li>
             *  <li> Identify: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395239 </li>
             * </ul>
             *
             * @inheritDoc
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
                Person.prototype.insertToServer = function () {
                    if (this.group.isRegistered() == false)
                        this.group.insertToServer();
                    var this_ = this;
                    trace("Person::insertToServer", this.name, this.group.getID());
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons", "POST", null, //{"personGroupId": this.group.getID()},
                    { "name": this.name, "userData": "" }, function (data) {
                        this_.id = data["personId"];
                        this_.registered = true;
                    });
                };
                /**
                 * Remove the FaceList from the Face-API server.
                 *
                 * <ul>
                 *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523d </li>
                 * </ul>
                 */
                Person.prototype.eraseFromServer = function () {
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id, "DELETE", {
                        "personGroupId": this.group.getID(),
                        "personId": this.id
                    }, null, null // NOTHING TO DO ESPECIALLY
                    );
                    this.id = "";
                    _super.prototype.eraseFromServer.call(this);
                };
                /**
                 * Insert a child FacePair instance to the Face-API server
                 *
                 * <ul>
                 *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523b </li>
                 * </ul>
                 */
                Person.prototype.insertFaceToServer = function (face) {
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces", "POST", {
                        "personGroupId": this.group.getID(),
                        "personId": this.id,
                        "targetFace": face.getX() + "," + face.getY() + "," + face.getWidth() + "," + face.getHeight(),
                        "userData": ""
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
                 *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523e </li>
                 * </ul>
                 */
                Person.prototype.eraseFaceFromServer = function (face) {
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.group.getID() + "/persons/" + this.id + "/persistedFaces/" + face.getID(), "DELETE", {
                        "personGroupId": this.group.getID(),
                        "personId": this.id,
                        "persistedFaceId": face.getID()
                    }, null, null);
                    _super.prototype.eraseFaceFromServer.call(this, face);
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
                    });
                };
                /* --------------------------------------------------------
                    EXPORTERS
                -------------------------------------------------------- */
                Person.prototype.TAG = function () {
                    return "person";
                };
                return Person;
            })(faceapi.face.FacePairArray);
            person.Person = Person;
        })(person = faceapi.person || (faceapi.person = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path='../../basic/IJSonEntity.ts' />
/// <referench path='FaceLandmark.ts' />
/// <referench path='Eyebrows.ts' />
/// <referench path='Nose.ts' />
/// <referench path='Mouth.ts' />
/// <referench path='Face.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face_3) {
            var landmark;
            (function (landmark) {
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
                        this.eyeBrows = new landmark.Eyebrows(this);
                        this.eyes = new landmark.Eyes(this);
                        this.nose = new landmark.Nose(this);
                        this.mouth = new landmark.Mouth(this);
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
                })(Entity);
                landmark.FaceLandmarks = FaceLandmarks;
            })(landmark = face_3.landmark || (face_3.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path="../../basic/IJSonEntity.ts" />
/// <reference path='FaceAttributes.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var attribute;
            (function (attribute) {
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
                })(Entity);
                attribute.FaceAttribute = FaceAttribute;
            })(attribute = face.attribute || (face.attribute = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path='FaceAttribute.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var attribute;
            (function (attribute) {
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
                })(attribute.FaceAttribute);
                attribute.FacialHair = FacialHair;
            })(attribute = face.attribute || (face.attribute = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path='FaceAttribute.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var attribute;
            (function (attribute) {
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
                })(attribute.FaceAttribute);
                attribute.HeadPose = HeadPose;
            })(attribute = face.attribute || (face.attribute = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path='../../basic/IJSonEntity.ts' />
/// <reference path="FaceAttribute.ts" />
/// <reference path="FacialHair.ts" />
/// <reference path="HeadPose.ts" />
/// <reference path="../Face.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face_4) {
            var attribute;
            (function (attribute) {
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
                        this.facialHair = new attribute.FacialHair(this);
                        this.headPose = new attribute.HeadPose(this);
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
                })(Entity);
                attribute.FaceAttributes = FaceAttributes;
            })(attribute = face_4.attribute || (face_4.attribute = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="Picture.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var picture;
        (function (picture) {
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
                PictureArray.prototype.createChild = function (xml) {
                    return new picture.Picture(this, xml.getProperty("url"));
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
                    for (var i = 0; i < this.length; i++)
                        if (this[i].getURL() == url)
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
                    for (var i = 0; i < this.length; i++)
                        if (this[i].getURL() == url)
                            return this[i];
                    throw Error("out of range");
                };
                /* --------------------------------------------------------
                    EXPORTERS
                -------------------------------------------------------- */
                PictureArray.prototype.TAG = function () {
                    return "pictureArray";
                };
                PictureArray.prototype.CHILD_TAG = function () {
                    return "picture";
                };
                return PictureArray;
            })(EntityArray);
            picture.PictureArray = PictureArray;
        })(picture = faceapi.picture || (faceapi.picture = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="../face/Face.ts" />
/// <reference path="../basic/IJSONEntity.ts" />
/// <reference path="PictureArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var picture;
        (function (picture) {
            /**
             * <p> A picture entity who containing Face entities. </p>
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
                }
                Picture.prototype.constructByJSON = function (val) {
                    this.splice(0, this.length); // CLEAR
                    var array = val;
                    for (var i = 0; i < array.length; i++) {
                        var face = new faceapi.face.Face(this);
                        face.constructByJSON(array[i]);
                        this.push(face);
                    }
                };
                Picture.prototype.createChild = function (xml) {
                    return new faceapi.face.Face(this);
                };
                /* --------------------------------------------------------
                    GETTERS
                -------------------------------------------------------- */
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
                    this.splice(0, this.length);
                    var this_ = this;
                    // DETECT CHILDREN(FACES) AND CONSTRUCT THEM
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/detect", "POST", {
                        "returnFaceId": "true",
                        "returnFaceLandmarks": "true",
                        "returnFaceAttributes": "age,gender,smile,facialHair,headPose",
                    }, { "url": this.url }, function (data) {
                        this_.constructByJSON(data);
                    });
                };
                /* --------------------------------------------------------
                    EXPORTERS
                -------------------------------------------------------- */
                Picture.prototype.TAG = function () {
                    return "person";
                };
                Picture.prototype.CHILD_TAG = function () {
                    return "face";
                };
                return Picture;
            })(EntityArray);
            picture.Picture = Picture;
        })(picture = faceapi.picture || (faceapi.picture = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="FaceRectangle.ts" />
/// <reference path="../basic/IJSonEntity.ts" />
/// <reference path="landmark/FaceLandmarks.ts" />
/// <reference path="attribute/FaceAttributes.ts" />
/// <reference path="../person/Person.ts" />
/// <reference path="../person/PersonGroup.ts" />
/// <reference path="../result/CandidatePersonArray.ts" />
/// <reference path="../picture/Picture.ts" />
/**
 * A face entity.
 *
 * @author Jeongho Nam
 */
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face_5) {
            var Face = (function (_super) {
                __extends(Face, _super);
                /* --------------------------------------------------------
                    CONTRUCTORS
                -------------------------------------------------------- */
                /**
                 * Constructor from Picture.
                 *
                 * @param picture A picture that containing the Face.
                 */
                function Face(picture) {
                    _super.call(this);
                    this.picture = picture;
                    this.person = null;
                    this.id = "";
                    this.landmarks = new face_5.landmark.FaceLandmarks(this);
                    this.attributes = new face_5.attribute.FaceAttributes(this);
                }
                Face.prototype.construct = function (xml) {
                    _super.prototype.construct.call(this, xml);
                    this.person = null;
                    if (xml.has("person") == false)
                        return;
                    var person = xml.get("person")[0];
                    var personName = person.getProperty("name");
                    var personGroupID = person.getProperty("groupID");
                };
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
                    return personGroup.identify(this, maxCandidates);
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
                        return new Pair(true, 1.0);
                    var pair = new Pair(false, -1.0);
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/verify", "POST", null, { "faceId1": this.id, "faceId2": face.id }, function (data) {
                        var isIdentical = data["isIdentical"];
                        var confidence = data["confidence"];
                        pair = new Pair(isIdentical, confidence);
                    });
                    return pair;
                };
                /* --------------------------------------------------------
                    GETTERS & SETTERS
                -------------------------------------------------------- */
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
                    EXPORTERS
                -------------------------------------------------------- */
                Face.prototype.TAG = function () {
                    return "face";
                };
                Face.prototype.toXML = function () {
                    var xml = _super.prototype.toXML.call(this);
                    xml.push(this.landmarks.toXML(), this.attributes.toXML());
                    return xml;
                };
                return Face;
            })(face_5.FaceRectangle);
            face_5.Face = Face;
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="CandidatePerson.ts" />
/// <referench path="../basic/IJSONEntity.ts" />
/// <reference path="../face/Face.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var result;
        (function (result) {
            /**
             * An array and parent of CandidatePerson.
             *
             * @author Jeongho Nam
             */
            var CandidatePersonArray = (function (_super) {
                __extends(CandidatePersonArray, _super);
                /* --------------------------------------------------------
                    CONTRUCTORS
                -------------------------------------------------------- */
                /**
                 * Construct from a FaceAPI, Face and PersonGroup.
                 *
                 * @param api A facade controller and factory class for Face-API.
                 * @param face A face who wanted to find its owner.
                 * @param personGroup A group of Person, candidates of owner.
                 */
                function CandidatePersonArray(api, face, personGroup) {
                    if (face === void 0) { face = null; }
                    if (personGroup === void 0) { personGroup = null; }
                    _super.call(this);
                    this.api = api;
                    this.face = face;
                    this.personGroup = personGroup;
                }
                CandidatePersonArray.prototype.construct = function (xml) {
                    this.face = null;
                    this.personGroup = null;
                    // SET FACE
                    if (xml.hasProperty("faceID") == true) {
                        var faceID = xml.getProperty("faceID");
                        var pictureArray = this.api.getPictureArray();
                        for (var i = 0; i < pictureArray.length; i++) {
                            var picture = pictureArray[i];
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
                    this.splice(0, this.length); // CLEAR
                    var array = data["candidates"];
                    for (var i = 0; i < array.length; i++) {
                        var candidatePerson = new result.CandidatePerson(this);
                        candidatePerson.constructByJSON(array[i]);
                        this.push(candidatePerson);
                    }
                };
                CandidatePersonArray.prototype.createChild = function (xml) {
                    if (xml.hasProperty("personID") == true)
                        return new result.CandidatePerson(this);
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
            })(EntityArray);
            result.CandidatePersonArray = CandidatePersonArray;
        })(result = faceapi.result || (faceapi.result = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="Person.ts" />
/// <reference path="../basic/IGroup.ts" />
/// <reference path="../result/CandidatePersonArray.ts" />
/// <reference path="PersonGroupArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var person;
        (function (person) {
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
                    this.trained = false;
                    this.registered = false;
                    this.listeners = new Map();
                }
                PersonGroup.prototype.createChild = function (xml) {
                    return new person.Person(this, xml.getProperty("name"));
                };
                /* --------------------------------------------------------
                    OPERATORS
                -------------------------------------------------------- */
                PersonGroup.prototype.push = function () {
                    var items = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        items[_i - 0] = arguments[_i];
                    }
                    if (this.isRegistered() == false)
                        this.insertToServer();
                    for (var i = 0; i < items.length; i++)
                        items[i].insertToServer();
                    return _super.prototype.push.apply(this, items);
                };
                PersonGroup.prototype.splice = function (start, deleteCount) {
                    var items = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        items[_i - 2] = arguments[_i];
                    }
                    var i;
                    for (i = start; i < Math.min(start + deleteCount, this.length); i++)
                        items[i].eraseFromServer();
                    for (i = 0; i < items.length; i++)
                        items[i].insertToServer();
                    return _super.prototype.splice.apply(this, [start, deleteCount].concat(items));
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
                        this.insertToServer();
                    // 학습 수행
                    var this_ = this;
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id + "/train", "POST", null, //{"personGroupId": this.id},
                    null, function (data) {
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
                        trace("on progress", status);
                        if (status == "succeeded") {
                            this_.trained = true;
                            this_.dispatchEvent(new Event("complete"));
                        }
                        else if (status == "failed") {
                            var errorEvent = new ErrorEvent();
                            errorEvent.message = data["message"];
                            this_.dispatchEvent(errorEvent);
                        }
                        else {
                            // 50ms 후에 재 확인
                            setTimeout(PersonGroup.checkTrainStatus, 50, this_);
                        }
                    }, false // ASYNCHRONOUSLY
                    );
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
                        throw new Error("Not trained.");
                    var this_ = this;
                    var candidatePersonArray = new faceapi.result.CandidatePersonArray(this.groupArray.getAPI(), face, this);
                    trace("PersonGroup::identify", this.id, face.getID(), maxCandidates);
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/identify", "POST", null, {
                        "personGroupId": this.id,
                        "faceIds": [face.getID()],
                        "maxNumOfCandidatesReturned": maxCandidates
                    }, function (data) {
                        candidatePersonArray.constructByJSON(data);
                    });
                    return candidatePersonArray;
                };
                /**
                 * Insert the PersonGroup to the Face-API server.
                 *
                 * <ul>
                 *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395244 </li>
                 * </ul>
                 */
                PersonGroup.prototype.insertToServer = function () {
                    // 식별자 번호 발급
                    if (this.id == "")
                        this.id = faceapi.FaceAPI.issueID("person_group");
                    var this_ = this;
                    trace("PersonGroup::insertToServer");
                    // 서버에 등록
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "PUT", null, //{"personGroupId": this.id},
                    { "name": this.name, "userData": "" }, function (data) {
                        this_.registered = true;
                    });
                };
                /**
                 * Remove the PersonGroup from the Face-API server.
                 *
                 * <ul>
                 *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395245 </li>
                 * </ul>
                 */
                PersonGroup.prototype.eraseFromServer = function () {
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/persongroups/" + this.id, "DELETE", { "personGroupId": this.id }, null, null);
                    this.trained = false;
                    this.registered = false;
                };
                /* --------------------------------------------------------
                    EVENT LISTENERS
                -------------------------------------------------------- */
                PersonGroup.prototype.hasEventListener = function (type) {
                    return this.listeners.has(type);
                };
                PersonGroup.prototype.addEventListener = function (type, listener) {
                    if (this.listeners.has(type) == false)
                        this.listeners.set(type, new Set());
                    var listenerSet = this.listeners.get(type);
                    listenerSet.insert(listener);
                };
                PersonGroup.prototype.removeEventListener = function (type, listener) {
                    if (this.listeners.has(type) == false)
                        return;
                    var listenerSet = this.listeners.get(type);
                    listenerSet.erase(listener);
                };
                PersonGroup.prototype.dispatchEvent = function (event) {
                    if (this.listeners.has(event.type) == false)
                        return;
                    var listenerSet = this.listeners.get(event.type);
                    for (var it = listenerSet.begin(); it.equals(listenerSet.end()) == false; it = it.next())
                        it.value(event);
                };
                /* --------------------------------------------------------
                    GETTERS & SETTERS
                -------------------------------------------------------- */
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
                PersonGroup.prototype.TAG = function () {
                    return "personGroup";
                };
                PersonGroup.prototype.CHILD_TAG = function () {
                    return "person";
                };
                return PersonGroup;
            })(EntityArray);
            person.PersonGroup = PersonGroup;
        })(person = faceapi.person || (faceapi.person = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="PersonGroup.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var person;
        (function (person) {
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
                PersonGroupArray.prototype.createChild = function (xml) {
                    return new person.PersonGroup(this, xml.getProperty("name"));
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
                PersonGroupArray.prototype.TAG = function () {
                    return "personGroupArray";
                };
                PersonGroupArray.prototype.CHILD_TAG = function () {
                    return "personGroup";
                };
                return PersonGroupArray;
            })(EntityArray);
            person.PersonGroupArray = PersonGroupArray;
        })(person = faceapi.person || (faceapi.person = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="../face/FacePairArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var facelist;
        (function (facelist) {
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
                 * Insert the FaceList to the Face-API server.
                 *
                 * <ul>
                 *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524b </li>
                 * </ul>
                 */
                FaceList.prototype.insertToServer = function () {
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
                        this_.registered = true;
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
                FaceList.prototype.eraseFromServer = function () {
                    // READY
                    var url = "https://api.projectoxford.ai/face/v1.0/facelists/" + this.id;
                    var method = "DELETE";
                    var params = { "faceListId": this.id };
                    // SEND
                    faceapi.FaceAPI.query(url, method, params, null, null);
                    _super.prototype.eraseFromServer.call(this);
                };
                /**
                 * Insert a child FacePair instance to the Face-API server
                 *
                 * <ul>
                 *  <li> Reference: https://dev.projectoxford.ai/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395250 </li>
                 * </ul>
                 */
                FaceList.prototype.insertFaceToServer = function (face) {
                    if (this.isRegistered() == false)
                        this.insertToServer();
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
                FaceList.prototype.eraseFaceFromServer = function (face) {
                    faceapi.FaceAPI.query("https://api.projectoxford.ai/face/v1.0/facelists/" + this.id + "/persistedFaces/" + face.getID(), "DELETE", {
                        "faceListId": this.id,
                        "persistedFaceId": face.getID()
                    }, null, null);
                    _super.prototype.eraseFaceFromServer.call(this, face);
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
            })(faceapi.face.FacePairArray);
            facelist.FaceList = FaceList;
        })(facelist = faceapi.facelist || (faceapi.facelist = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="FaceList.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var facelist;
        (function (facelist) {
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
                    return new facelist.FaceList(this, xml.getProperty("name"));
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
            })(EntityArray);
            facelist.FaceListArray = FaceListArray;
        })(facelist = faceapi.facelist || (faceapi.facelist = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../SamchonFramework.ts" />
/// <reference path="../../jquery.d.ts" />
/// <reference path="person/PersonGroupArray.ts" />
/// <reference path="facelist/FaceListArray.ts" />
/// <reference path="picture/PictureArray.ts" />
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
                this.personGroupArray = new faceapi.person.PersonGroupArray(this);
                this.faceListArray = new faceapi.facelist.FaceListArray(this);
                this.pictureArray = new faceapi.picture.PictureArray(this);
            }
            /**
             * Factory method of PersonGroup.
             *
             * @param name Name of a new PersonGroup
             */
            FaceAPI.prototype.createPersonGroup = function (name) {
                var personGroup = new faceapi.person.PersonGroup(this.personGroupArray, name);
                this.personGroupArray.push(personGroup);
                return personGroup;
            };
            /**
             * Factory method of FaceList.
             *
             * @apram name Name of a new FaceList.
             */
            FaceAPI.prototype.createFaceList = function (name) {
                var faceList = new faceapi.facelist.FaceList(this.faceListArray, name);
                this.faceListArray.push(faceList);
                return faceList;
            };
            /**
             * Factory method of Picture.
             *
             * @apram url URL-address of a new Picture.
             */
            FaceAPI.prototype.createPicture = function (url) {
                var picture = new faceapi.picture.Picture(this.pictureArray, url);
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
            FaceAPI.prototype.TAG = function () {
                return "faceAPI";
            };
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
                    return "b072c71311d144388ac2527a5f06ffca";
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Query a formed-statement to Face-API server.
             *
             * @param url https address to query
             * @param method One of them (GET, POST, UPDATE, DELETE, PATCH)
             * @param params A pre-parameter
             * @param data A post-parameter (body)
             * @param success A method to be processed after the sending query is succeded.
             * @param async Whether to send query asynchronously. Default is false (synchronous query).
             */
            FaceAPI.query = function (url, method, params, data, success, async) {
                if (async === void 0) { async = false; }
                $.ajax({
                    url: url + (params == null ? "" : "?" + $.param(params)),
                    beforeSend: function (xhrObj) {
                        // Request headers
                        xhrObj.setRequestHeader("Content-Type", "application/json");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", FaceAPI.CERTIFICATION_KEY);
                    },
                    type: method,
                    async: async,
                    data: (data == null) ? "" : JSON.stringify(data),
                    success: function (data, textStatus, xhr) {
                        if (success != null)
                            success.apply(null, [data]);
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        trace(JSON.stringify(jqXHR), url);
                    }
                });
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
        })(Entity);
        faceapi.FaceAPI = FaceAPI;
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../FaceAPI.ts" />
/// <reference path="../basic/IJSONEntity.ts" />
/// <reference path="../person/Person.ts" />
/// <reference path="CandidatePersonArray.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var result;
        (function (result) {
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
            })(Entity);
            result.CandidatePerson = CandidatePerson;
        })(result = faceapi.result || (faceapi.result = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="hiswill/faceapi/FaceAPI.ts" />
var api = hiswill.faceapi;
function main() {
    var faceAPI = new api.FaceAPI();
    var picture = faceAPI.createPicture("http://samchon.org/download/group_others2.jpg");
    picture.detect();
    trace("Detected");
    //var faceList = faceAPI.createFaceList("other_group");
    var personGroup = faceAPI.createPersonGroup("others");
    for (var i = 0; i < 3; i++) {
        var face = picture[i];
        //faceList.push(face);
        var person = new api.person.Person(personGroup, "my_name_" + (i + 1));
        personGroup.push(person);
        person.push(face);
    }
    trace("Registered");
    personGroup.addEventListener("complete", function (ev) {
        trace("Trained");
        var face = picture[0];
        var candidates = personGroup.identify(face, 2);
        trace("Identified", candidates.toXML());
    });
    personGroup.train();
}
/// <reference path="../../FaceAPI.ts" />
/// <reference path="../../basic/IJSonEntity.ts" />
/// <reference path="FaceLandmarks.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
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
                })(Entity);
                landmark.FaceLandmark = FaceLandmark;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path="FaceLandmark.ts" />
/// <reference path="Eye.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
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
                        this.left = new landmark.Eye(this, faceapi.Direction.LEFT);
                        this.right = new landmark.Eye(this, faceapi.Direction.RIGHT);
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
                })(landmark.FaceLandmark);
                landmark.Eyes = Eyes;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path="../../basic/IJSonEntity.ts" />
/// <reference path="../../basic/Point.ts" />
/// <reference path="Eyes.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
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
                        this.top = new faceapi.basic.Point("top");
                        this.bottom = new faceapi.basic.Point("bottom");
                        this.inner = new faceapi.basic.Point("inner");
                        this.outer = new faceapi.basic.Point("outer");
                        this.pupil = new landmark.Pupil(this);
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
                })(Entity);
                landmark.Eye = Eye;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path="FaceLandmark.ts" />
/// <reference path="Eyebrow.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
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
                        this.left = new landmark.Eyebrow(this, faceapi.Direction.LEFT);
                        this.right = new landmark.Eyebrow(this, faceapi.Direction.RIGHT);
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
                })(landmark.FaceLandmark);
                landmark.Eyebrows = Eyebrows;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path="../../basic/IJSonEntity.ts" />
/// <reference path="../../basic/Point.ts" />
/// <reference path="Eyebrows.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
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
                        this.inner = new faceapi.basic.Point("inner");
                        this.outer = new faceapi.basic.Point("outer");
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
                })(Entity);
                landmark.Eyebrow = Eyebrow;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="FaceAPI.ts" />
/// <reference path="basic/IJSONEntity.ts" />
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
                    else if (entity[key] instanceof Entity || entity[key] instanceof EntityArray) {
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
/// <reference path="../../FaceAPI.ts" />
/// <reference path='FaceLandmark.ts' />
/// <reference path='Lip.ts' />
/// <reference path='../../basic/Point.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
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
                        this.lip = new landmark.Lip(this);
                        this.left = new faceapi.basic.Point("left");
                        this.right = new faceapi.basic.Point("right");
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
                })(landmark.FaceLandmark);
                landmark.Mouth = Mouth;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path='../../basic/IJSonEntity.ts' />
/// <reference path='../../basic/Point.ts' />
/// <reference path='Mouth.ts' />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
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
                        this.upperTop = new faceapi.basic.Point("upperTop");
                        this.upperBottom = new faceapi.basic.Point("upperBottom");
                        this.underTop = new faceapi.basic.Point("underTop");
                        this.underBottom = new faceapi.basic.Point("underBottom");
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
                })(Entity);
                landmark.Lip = Lip;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path="FaceLandmark.ts" />
/// <reference path="../../basic/Point.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
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
                        this.tip = new faceapi.basic.Point("tip");
                        this.leftRoot = new faceapi.basic.Point("leftRoot");
                        this.rightRoot = new faceapi.basic.Point("rightRoot");
                        this.leftAlarTop = new faceapi.basic.Point("leftAlarTop");
                        this.rightAlarTop = new faceapi.basic.Point("rightAlarTop");
                        this.leftAlarOutTip = new faceapi.basic.Point("leftAlarOutTip");
                        this.rightAlarOutTip = new faceapi.basic.Point("rightAlarOutTip");
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
                })(landmark.FaceLandmark);
                landmark.Nose = Nose;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
/// <reference path="../../FaceAPI.ts" />
/// <reference path="../../basic/Point.ts" />
/// <reference path="Eye.ts" />
var hiswill;
(function (hiswill) {
    var faceapi;
    (function (faceapi) {
        var face;
        (function (face) {
            var landmark;
            (function (landmark) {
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
                })(faceapi.basic.Point);
                landmark.Pupil = Pupil;
            })(landmark = face.landmark || (face.landmark = {}));
        })(face = faceapi.face || (faceapi.face = {}));
    })(faceapi = hiswill.faceapi || (hiswill.faceapi = {}));
})(hiswill || (hiswill = {}));
//# sourceMappingURL=FaceAPI.js.map