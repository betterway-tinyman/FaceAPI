﻿/// <reference path="Container.ts" />

/// <reference path="SetIterator.ts" />
/// <reference path="List.ts" />

namespace std
{
    /**
     * Abstract Set.
     *
     * @author Jeongho Nam
     */
    export class AbstractSet<T>
        extends Container<T>
    {
        private data: List<T>;
        
        /* =========================================================
		    CONSTRUCTORS & SEMI-CONSTRUCTORS
                - CONSTRUCTORS
                - ASSIGN & CLEAR7
	    ============================================================
            CONSTURCTORS
        --------------------------------------------------------- */
        /**
         * Default Constructor.
         */
        public constructor();

        /**
         * Construct from elements.
         */
        public constructor(items: Array<T>);

        /**
         * Copy Constructor.
         */
        public constructor(container: IContainer<T>);

        /**
         * Construct from range iterators.
         */
        public constructor(begin: Iterator<T>, end: Iterator<T>);

        public constructor(...args: any[])
        {
            super();

            // INITIALIZATION
            this.data = new List<T>();
            
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array && args[0] instanceof Vector == false)
            {
                this.constructByArray(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof Container)
            {
                this.constructByContainer(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
            {
                this.constructByRange(args[0], args[1]);
            }
        }
        
        protected constructByArray(items: Array<T>): void
        {
            for (var i: number = 0; i < items.length; i++)
            {
                if (this.has(items[i]) == true)
                    continue;

                this.insert(items[i]);
            }
        }
        private constructByContainer(container: Container<T>): void
        {
            this.constructByRange(container.begin(), container.end());
        }
        private constructByRange(begin: Iterator<T>, end: Iterator<T>): void
        {
            this.assign(begin, end);
        }

        /* ---------------------------------------------------------
		    ASSIGN & CLEAR
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void
        {
            // INSERT
            for (var it = begin; it.equals(end) == false; it = it.next())
                this.insert(it.value);
        }

        /**
         * @inheritdoc
         */
        public clear(): void
        {
            this.data.clear();
        }

        /* =========================================================
		    ACCESSORS
                - ITERATORS
                - ELEMENTS
	    ============================================================
            ITERATOR
        --------------------------------------------------------- */
        /**
         * <p> Get iterator to element. </p>
         * 
         * <p> Searches the container for an element with <code>key</code> as value and returns an iterator to it 
         * if found, otherwise it returns an iterator to <code>end()</code> (the element past the end of the 
         * container). </p>
         *
         * <p> Another member function, <code>count()</code>, can be used to just check whether a particular 
         * element exists. </p>
         *
         * @param key Key to be searched for.
         *
         * @return An iterator to the element, if the specified value is found, 
         *         or <code>end()</code> if it is not found in the container.
         */
        public find(val: T): Iterator<T>
        {
            throw new AbstractMethodError("AbstractSet.find() is not overriden.");
        }

        /**
         * @inheritdoc
         */
        public begin(): Iterator<T>
        {
            return new SetIterator<T>(this, <ListIterator<T>>this.data.begin());
        }

        /**
         * @inheritdoc
         */
        public end(): Iterator<T>
        {
            return new SetIterator<T>(this, <ListIterator<T>>this.data.end());
        }

        /* ---------------------------------------------------------
		    ELEMENTS
	    --------------------------------------------------------- */
        /**
	     * <p> Whether have the item or not. </p>
	     * <p> Indicates whether a set has an item having the specified identifier. </p>
	     *
	     * @param key Key value of the element whose mapped value is accessed.
         *
	     * @return Whether the set has an item having the specified identifier.
	     */
        public has(val: T): boolean
        {
            return this.count(val) != 0;
        }

        /**
         * <p> Count elements with a specific key. </p>
         * <p> Searches the container for elements with a value of k and returns the number of elements found. </p>
         *
         * @param key Value of the elements to be counted.
         *
         * @return The number of elements in the container with a <code>key</code>.
         */
        public count(val: T): number
        {
            return (this.find(val).equals(this.end()) == false) ? 1 : 0;
        }

        /**
         * @inheritdoc
         */
        public size(): number
        {
            return this.data.size();
        }

        /* =========================================================
		    ELEMENTS I/O
                - INSERT
                - ERASE
                - POST-PROCESS
	    ============================================================
		    INSERT
	    --------------------------------------------------------- */
        public insert(val: T): Pair<Iterator<T>, boolean>;

        /**
         * <p> Insert element with hint. </p>
         *
         * <p> Extends the container by inserting new elements, effectively increasing the container size by the 
         * number of elements inserted. </p>
         *
         * @param hint Hint for the position where the element can be inserted.
         * @param key Value to be inserted as an elements.
         *
         * @return An iterator pointing to either the newly inserted element or 
         *         to the element that already had its same value in the set.
         */
        public insert(hint: Iterator<T>, val: T): Iterator<T>;

        /**
         * <p> Insert elements with a range of a container. </p>
         *
         * <p> Extends the container by inserting new elements, effectively increasing the container size by the 
         * number of elements inserted. </p>
         *
         * @param begin An iterator specifying range of the begining element.
         * @param end An iterator specifying range of the ending element.
         */
        public insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): void

        public insert(...args: any[]): any
        {
            if (args.length == 1)
                return this.insertByVal(args[0]);
            else if (args.length == 2 && args[0] instanceof Iterator)
            {
                if (args[1] instanceof Iterator && args[0].getSource() != this && args[1].getSource() != this)
                    return this.insertByRange(args[0], args[1]);
                else
                    return this.insertByHint(args[0], args[1]);
            }
        }

        private insertByVal(val: T): Pair<Iterator<T>, boolean>
        {
            // TEST WHETHER EXISTS
            var it = this.find(val);
            if (it.equals(this.end()) == false)
                return new Pair<Iterator<T>, boolean>(it, false);

            // INSERT
            this.data.pushBack(val);
            it = it.prev();

            // POST-PROCESS
            this.handleInsert(<SetIterator<T>>it);

            return new Pair<Iterator<T>, boolean>(it, true);
        }
        private insertByHint(hint: SetIterator<T>, val: T): Iterator<T>
        {
            // INSERT
            var listIterator = <ListIterator<T>>this.data.insert(hint.getListIterator(), val);
            
            // POST-PROCESS
            var it = new SetIterator(this, listIterator);
            this.handleInsert(it);

            return it;
        }
        protected insertByRange(begin: Iterator<T>, end: Iterator<T>): void
        {
            for (var it = begin; it.equals(end) == false; it = it.next())
            {
                this.insertByVal(it.value);

                //// INSERT TO MEMBER LIST
                //var listIterator = <ListIterator<T>>
                //    this.data.insert
                //    (
                //        this.data.end(),
                //        (<SetIterator<T>>begin).getListIterator(),
                //        (<SetIterator<T>>end).getListIterator()
                //    );

                //// POST-PROCESS
                //var myIt = new SetIterator<T>(this, listIterator);
                //this.handleInsert(myIt);
            }
        }

        /* ---------------------------------------------------------
		    ERASE
	    --------------------------------------------------------- */
        /**
         * <p> Erase an element. </p>
         * <p> Removes from the set container the elements whose value is <code>key</code>. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * @param key Value of the elements to be erased.
         *
         * @return Number of elements erased.
         */
        public erase(val: T): number;

        /**
         * @inheritdoc
         */
        public erase(it: Iterator<T>): Iterator<T>;

        /**
         * <p> Erase elements. </p>
         * <p> Removes from the set container a range of elements.. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * @param begin An iterator specifying a range of beginning to erase.
         * @param end An iterator specifying a range of end to erase.
         */
        public erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;

        public erase(...args: any[]): any
        {
            if (args.length == 1)
                if (args[0] instanceof Iterator && args[0].getSource() == this)
                    return this.eraseByIterator(args[0]);
                else
                    return this.eraseByKey(args[0]);
            else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
                return this.eraseByRange(args[0], args[1]);
        }

        private eraseByKey(val: T): number
        {
            // TEST WHETHER EXISTS
            var it = this.find(val);
            if (it.equals(this.end()) == true)
                return 0;

            // ERASE
            this.eraseByIterator(it);
            return 1;
        }
        private eraseByIterator(it: Iterator<T>): Iterator<T>
        {
            // ERASE
            var listIterator = <ListIterator<T>>this.data.erase((<SetIterator<T>>it).getListIterator());
            
            // POST-PROCESS
            this.handleErase(<SetIterator<T>>it);

            return new SetIterator<T>(this, listIterator);
        }
        private eraseByRange(begin: Iterator<T>, end: Iterator<T>): Iterator<T>
        {
            // ERASE
            var listIterator = <ListIterator<T>>
                this.data.erase
                (
                    (<SetIterator<T>>begin).getListIterator(), 
                    (<SetIterator<T>>end).getListIterator()
                );
            
            // POST-PROCESS
            for (var it = begin; it.equals(this.end()) == false; it = it.next())
                this.handleErase(<SetIterator<T>>it);

            return begin.prev();
        }

        /* ---------------------------------------------------------
		    POST-PROCESS
	    --------------------------------------------------------- */
        protected handleInsert(item: SetIterator<T>): void
        {
            throw new AbstractMethodError("AbstractSet.handleInsert() is not overriden.");
        }

        protected handleErase(item: SetIterator<T>): void
        {
            throw new AbstractMethodError("AbstractSet.handleErase() is not overriden.");
        }
    }
}