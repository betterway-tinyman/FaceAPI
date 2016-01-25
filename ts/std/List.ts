﻿/// <reference path="Container.ts" />

/// <reference path="ListIterator.ts" />

namespace std
{
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
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/list/list/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    export class List<T>
        extends Container<T>
    {
        /**
         * An iterator of beginning.
         */
        protected begin_: ListIterator<T>;

        /**
         * An iterator of end. 
         */
        protected end_: ListIterator<T>;

        /**
         * Number of elements in the List.
         */
        protected size_: number;

        /* =========================================================
		    CONSTRUCTORS & SEMI-CONSTRUCTORS
                - CONSTRUCTORS
                - ASSIGN & CLEAR
	    ============================================================
            CONSTURCTORS
        --------------------------------------------------------- */
        /**
         * Default Constructor
         */
        public constructor();

        /**
         * Construct from arguments. 
         *
         * @param args
         */
        public constructor(items: Array<T>);
        
        public constructor(size: number, val: T);

        /**
         * Copy Constructor. 
         *
         * @param container
         */
        public constructor(container: IContainer<T>);

        /**
         * Construct from begin and end iterators. 
         *
         * @param begin
         * @param end
         */
        public constructor(begin: Iterator<T>, end: Iterator<T>);

        public constructor(...args: any[])
        {
            super();

            if (args.length == 0)
            {
                this.clear();
            }
            else if (args.length == 1 && args[0] instanceof Array)
            {
                var array: Array<T> = args[0];

                this.clear();
                this.push(...array);
            }
            else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof Container))
            {
                var container: IContainer<T> = args[0];

                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
            {
                var begin: Iterator<T> = args[0];
                var end: Iterator<T> = args[1];

                this.assign(begin, end);
            }
            else if (args.length == 2 && typeof args[0] == "number")
            {
                var size: number = args[0];
                var val: T = <T>args[1];

                this.assign(size, val);
            }
        }

        /* ---------------------------------------------------------
		    ASSIGN & CLEAR
	    --------------------------------------------------------- */
        public assign(size: number, val: T): void;

        /**
         * @inheritdoc
         */
        public assign(begin: Iterator<T>, end: Iterator<T>): void;

        public assign(par1: number | Iterator<T>, par2: T | Iterator<T>): void
        {
            if (par1 instanceof Iterator && par2 instanceof Iterator)
            {
                // PARAMETERS
                var begin: Iterator<T> = par1;
                var end: Iterator<T> = par2;

                // BODY
                var prev: ListIterator<T> = null;
                var item: ListIterator<T>;
            
                var it = begin;
            
                while (true)
                {
                    // CONSTRUCT ELEMENT ITEM
                    item = new ListIterator<T>
                            (
                                this, 
                                prev, 
                                null, 
                                (it != end ? it.value : null)
                            );

                    // SET PREVIOUS NEXT POINTER
                    if (prev != null)
                        prev.setNext(item);

                    // CONSTRUCT BEGIN AND END
                    if (it == begin)
                        this.begin_ = item;
                    else if (it == end)
                    {
                        this.end_ = item;
                        break;
                    }

                    // ADD COUNTS AND STEP TO THE NEXT
                    this.size_++;
                    it = it.next();
                }
            }
        }

        /**
         * @inheritdoc
         */
        public clear(): void
        {
            var it = new ListIterator(this, null, null, null);
            it.setPrev(it);
            it.setNext(it);

            this.begin_ = it;
            this.end_ = it;

            this.size_ = 0;
        }
        
        /* ---------------------------------------------------------
		    ACCESSORS
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public begin(): Iterator<T>
        {
            return this.begin_;
        }

        /**
         * @inheritdoc
         */
        public end(): Iterator<T>
        {
            return this.end_;
        }

        /**
         * @inheritdoc
         */
        public size(): number
        {
            return this.size_;
        }
        
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
        public front(): T
        {
            return this.begin_.value;
        }

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
        public back(): T
        {
            return this.end_.prev().value;
        }

        /* =========================================================
		    ELEMENTS I/O
                - ITERATOR FACTORY
                - PUSH & POP
                - INSERT
                - ERASE
	    ============================================================
		    PUSH & POP
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public push(...items: T[]): number 
        {
            for (var i: number = 0; i < items.length; i++)
                this.pushBack(items[i]);
            
            return this.size();
        }
        
        /**
         * <p> Insert element at beginning. </p>
         *
         * <p> Inserts a new element at the beginning of the list, right before its current first element.
         * This effectively increases the container size by one. </p>
         *
         * @param val Value to be inserted as an element.
         */
        public pushFront(val: T): void
        {
            var item: ListIterator<T> = new ListIterator(this, null, this.begin_, val);

            // CONFIGURE BEGIN AND NEXT
            this.begin_.setPrev(item);

            if (this.size_ == 0) 
            {
                // IT WAS EMPTY
                this.end_ = new ListIterator(this, item, item, null);
                item.setNext(this.end_);
            }
            else
                this.end_.setNext(item);

            // SET
            this.begin_ = item;
            this.size_++;
        }

        /**
         * <p> Add element at the end. </p> 
         *
         * <p> Adds a new element at the lend of the <code>List</code> container, after its current last
         * element.This effectively increases the container size by one. </p>
         *
         * @param val Value to be inserted as an element.
         */
        public pushBack(val: T): void
        {
            var prev: ListIterator<T> = <ListIterator<T>>this.end_.prev();
            var item: ListIterator<T> = new ListIterator(this, <ListIterator<T>>this.end_.prev(), this.end_, val);
            
            prev.setNext(item);
            this.end_.setPrev(item);

            if (this.empty() == true)
            {
                this.begin_ = item;
                item.setPrev(this.end_);
            }
            this.size_++;
        }

        /**
         * <p> Delete first element. </p>
         * 
         * <p> Removes first last element in the List container, effectively reducing the container 
         * <code>size</code> by one. </p>
         */
        public popFront(): void
        {
            this.erase(this.begin_);
        }

        /**
         * <p> Delete last element. </p>
         * 
         * <p> Removes the last element in the List container, effectively reducing the container 
         * <code>size</code> by one. </p>
         */
        public popBack(): void
        {
            this.erase(this.end_.prev());
        }
        
        /* ---------------------------------------------------------
		    INSERT
	    --------------------------------------------------------- */
        /**
         * <p> Insert an element. </p>
         *
         * <p> The container is extended by inserting a new element before the element at the specified 
         * <code>position</code>. This effectively increases the List size by the amount of elements inserted. </p>
         *
         * <p> Unlike other standard sequence containers, <code>List</code> is specifically designed to be 
         * efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
         *
         * <p> The arguments determine how many elements are inserted and to which values they are initialized. </p>
         *
         * @param position Position in the container where the new element is inserted.
         *                 <code>iterator</code> is a member type, defined as a <code>bidirectional iterator</code>
         *                 type that points to elements.
         * @param val Value to be inserted as an element.
         *
         * @return An iterator that points to the newly inserted element <code>val</code>.
         */
        public insert(position: Iterator<T>, val: T): Iterator<T>;

        /**
         * <p> Insert elements by repeated filling. </p> 
         *
         * @param position Position in the container where the new elements are inserted.
         *                 <code>iterator</code> is a member type, defined as a <code>bidirectional iterator</code>
         *                 type that points to elements.
         * @param size Number of elements to insert.
         * @param val Value to be inserted as an element.
         *
         * @return An iterator that points to the first of the newly inserted elements.
         */
        public insert(position: Iterator<T>, size: number, val: T): Iterator<T>;

        /**
         * 
         * @param position Position in the container where the new elements are inserted.
         *                 <code>iterator</code> is a member type, defined as a <code>bidirectional iterator</code>
         *                 type that points to elements.
         * @param begin An iterator specifying range of the begining element.
         * @param end An iterator specifying range of the ending element.
         *
         * @return An iterator that points to the first of the newly inserted elements.
         */
        public insert(position: Iterator<T>, begin: Iterator<T>, end: Iterator<T>): Iterator<T>;

        public insert(...args: any[]): Iterator<T>
        {
            if (args.length = 2)
                return this.insertByVal(args[0], args[1]);
            else if (args.length == 3 && typeof args[1] == "number")
                return this.insertByRepeatingVal(args[0], args[1], args[2]);
            else
                return this.insertByRange(args[0], args[1], args[2]);
        }

        private insertByVal(position: Iterator<T>, val: T): Iterator<T>
        {
            // SHIFT TO INSERT OF THE REPEATING VAL
            return this.insertByRepeatingVal(position, 1, val);
        }
        private insertByRepeatingVal(position: Iterator<T>, size: number, val: T): Iterator<T>
        {
            if (this != position.getSource())
                throw new InvalidArgument("Parametric iterator is not this container's own.");
            
            var prev: ListIterator<T> = <ListIterator<T>>position.prev();
            var first: ListIterator<T> = null;
            
            for (var i: number = 0; i < size; i++)
            {
                // CONSTRUCT ITEM, THE NEW ELEMENT
                var item: ListIterator<T> = new ListIterator(this, prev, null, val);
                
                if (i == 0)         first = item;
                if (prev != null)   prev.setNext(item);
                
                // SHIFT CURRENT ITEM TO PREVIOUS
                prev = item;
            }

            // IF WAS EMPTY, VAL IS THE BEGIN
            if (this.empty() == true)
                this.begin_ = first;

            // CONNECT BETWEEN LAST AND POSITION
            prev.setNext(<ListIterator<T>>position);
            (<ListIterator<T>>position).setPrev(prev);

            this.size_ += size;
            
            return first;
        }
        private insertByRange(position: Iterator<T>, begin: Iterator<T>, end: Iterator<T>): Iterator<T>
        {
            if (this != position.getSource())
                throw new InvalidArgument("Parametric iterator is not this container's own.");

            var prev: ListIterator<T> = <ListIterator<T>>position.prev();
            var first: ListIterator<T> = null;

            var size: number = 0;

            for (var it = begin; it.equals(end) == false; it = it.next())
            {
                // CONSTRUCT ITEM, THE NEW ELEMENT
                var item: ListIterator<T> = new ListIterator(this, prev, null, it.value);

                if (size == 0)      first = item;
                if (prev != null)   prev.setNext(item);

                // SHIFT CURRENT ITEM TO PREVIOUS
                prev = item;
                size++;
            }

            // IF WAS EMPTY, FIRST ELEMENT IS THE BEGIN
            if (this.empty() == true)
                this.begin_ = first;

            // CONNECT BETWEEN LAST AND POSITION
            prev.setNext(<ListIterator<T>>position);
            (<ListIterator<T>>position).setPrev(prev);

            this.size_ += size;

            return first;
        }

        /* ---------------------------------------------------------
		    ERASE
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public erase(it: Iterator<T>): Iterator<T>;
        
        /**
         * @inheritdoc
         */
        public erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;

        public erase(...args: any[]): Iterator<T>
        {
            if (args.length == 1)
                return this.eraseByIterator(args[0]);
            else if (args.length == 2)
                return this.eraseByRange(args[0], args[1]);
        }
        private eraseByIterator(it: Iterator<T>): Iterator<T>
        {
            return this.eraseByRange(it, it.next());
        }
        private eraseByRange(begin: Iterator<T>, end: Iterator<T>): Iterator<T>
        {
            if (this != begin.getSource() || begin.getSource() != end.getSource())
                throw new InvalidArgument("Parametric iterator is not this container's own.");

            // FIND PREV AND NEXT
            var prev: ListIterator<T> = <ListIterator<T>>begin.prev();
            var next: ListIterator<T> = <ListIterator<T>>end;

            // CALCULATE THE SIZE
            var size: number = 0;

            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;

            // SHRINK
            prev.setNext(next);
            next.setPrev(prev);

            this.size_ -= size;

            return prev;
        }
    }
}