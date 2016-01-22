declare namespace samchon.protocol {
    class Entity implements IEntity {
        constructor();
        construct(xml: library.XML): void;
        TAG(): string;
        key(): any;
        toXML(): library.XML;
    }
}
declare namespace std {
    class Exception {
        protected message: string;
        constructor();
        constructor(what: string);
        what(): string;
    }
    class LogicError extends Exception {
        constructor(what: string);
    }
    class DomainError extends LogicError {
        constructor(what: string);
    }
    class InvalidArgument extends LogicError {
        constructor(what: string);
    }
    class LengthError extends LogicError {
        constructor(what: string);
    }
    class OutOfRange extends LogicError {
        constructor(what: string);
    }
    class AbstractMethodError extends LogicError {
        constructor(what: string);
    }
    class RuntimeError extends Exception {
        constructor(what: string);
    }
    class OverflowError extends RuntimeError {
        constructor(what: string);
    }
    class UnderflowError extends RuntimeError {
        constructor(what: string);
    }
    class RangeError extends RuntimeError {
        constructor(what: string);
    }
    class SystemError extends RuntimeError {
        constructor(what: string);
    }
}
declare namespace std {
    class Iterator<T> {
        protected source: Container<T>;
        constructor(source: Container<T>);
        prev(): Iterator<T>;
        next(): Iterator<T>;
        advance(n: number): Iterator<T>;
        equals<U extends T>(obj: Iterator<U>): boolean;
        getSource(): Container<T>;
        value: T;
    }
    class PairIterator<K, T> extends Iterator<Pair<K, T>> {
        constructor(source: PairContainer<K, T>);
        prev(): PairIterator<K, T>;
        next(): PairIterator<K, T>;
        equals<U extends T>(obj: PairIterator<K, U>): boolean;
        first: K;
        second: T;
    }
}
declare namespace std {
    interface IContainer<T> {
        assign(begin: Iterator<T>, end: Iterator<T>): void;
        clear(): void;
        push<U extends T>(...items: U[]): number;
        erase(position: Iterator<T>): Iterator<T>;
        erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
        begin(): Iterator<T>;
        end(): Iterator<T>;
        size(): number;
        empty(): boolean;
    }
    class Container<T> implements IContainer<T> {
        constructor();
        constructor(container: IContainer<T>);
        constructor(begin: Iterator<T>, end: Iterator<T>);
        assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        clear(): void;
        push<U extends T>(...items: U[]): number;
        erase(position: Iterator<T>): Iterator<T>;
        erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
        begin(): Iterator<T>;
        end(): Iterator<T>;
        size(): number;
        empty(): boolean;
    }
    class PairContainer<K, T> extends Container<Pair<K, T>> {
        constructor();
        assign<U extends T>(begin: PairIterator<K, U>, end: PairIterator<K, U>): void;
        clear(): void;
        size(): number;
        begin(): PairIterator<K, T>;
        end(): PairIterator<K, T>;
        find(key: K): PairIterator<K, T>;
        has(key: K): boolean;
        get(key: K): T;
        erase(key: K): number;
        erase(it: PairIterator<K, T>): PairIterator<K, T>;
        erase<U extends T>(begin: PairIterator<K, U>, end: PairIterator<K, U>): PairIterator<K, T>;
    }
}
declare namespace std {
    class Vector<T> extends Array<T> implements IContainer<T> {
        constructor();
        constructor(items: Array<T>);
        constructor(n: number);
        constructor(size: number, val: T);
        constructor(container: IContainer<T>);
        constructor(begin: Iterator<T>, end: Iterator<T>);
        assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        assign(size: number, val: T): void;
        clear(): void;
        begin(): Iterator<T>;
        end(): Iterator<T>;
        size(): number;
        empty(): boolean;
        at(index: number): T;
        front(): T;
        back(): T;
        pushBack(element: T): void;
        set(index: number, val: T): T;
        popBack(): void;
        insert(position: Iterator<T>, val: T): Iterator<T>;
        insert(position: Iterator<T>, size: number, val: T): Iterator<T>;
        insert<U extends T>(position: Iterator<T>, begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
        erase(it: Iterator<T>): Iterator<T>;
        erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
    }
    class VectorIterator<T> extends Iterator<T> {
        private index;
        constructor(source: Vector<T>, index: number);
        vector: Vector<T>;
        value: T;
        equals<U extends T>(obj: Iterator<U>): boolean;
        getIndex(): number;
        prev(): Iterator<T>;
        next(): Iterator<T>;
        advance(n: number): Iterator<T>;
    }
}
declare namespace std {
    interface IMap<_Kty, _Ty> {
        has(key: _Kty): boolean;
        get(key: _Kty): _Ty;
    }
}
declare namespace std {
    class Pair<_Ty1, _Ty2> {
        first: _Ty1;
        second: _Ty2;
        constructor(first: _Ty1, second: _Ty2);
        equals(obj: Pair<_Ty1, _Ty2>): boolean;
        toString(): string;
    }
}
declare namespace std {
    class UnorderedMap<K, T> extends PairContainer<K, T> {
        private data_;
        constructor();
        assign(begin: PairIterator<K, T>, end: PairIterator<K, T>): void;
        clear(): void;
        data(): Vector<Pair<K, T>>;
        size(): number;
        find(key: K): PairIterator<K, T>;
        has(key: K): boolean;
        get(key: K): T;
        begin(): PairIterator<K, T>;
        end(): PairIterator<K, T>;
        insert(pair: Pair<K, T>): Pair<PairIterator<K, T>, boolean>;
        insert(hint: PairIterator<K, T>, pair: Pair<K, T>): PairIterator<K, T>;
        insert<L extends K, U extends T>(begin: PairIterator<L, U>, end: PairIterator<L, U>): void;
        private insertByKey(pair);
        private insertByHint(hint, pair);
        private insertByRange<L, U>(begin, end);
        erase(key: K): number;
        erase(it: PairIterator<K, T>): PairIterator<K, T>;
        erase<U extends T>(begin: PairIterator<K, U>, end: PairIterator<K, U>): PairIterator<K, T>;
        private eraseByKey(key);
        private eraseByIterator(it);
        private eraseByRange(begin, end);
        set(key: K, value: T): void;
        pop(key: K): T;
        equals(obj: UnorderedMap<K, T>): boolean;
        toString(): string;
    }
    class UnorderedMapIterator<_Kty, _Ty> extends PairIterator<_Kty, _Ty> {
        private index;
        constructor(source: UnorderedMap<_Kty, _Ty>, index: number);
        private map;
        first: _Kty;
        second: _Ty;
        getIndex(): number;
        equals(obj: PairIterator<_Kty, _Ty>): boolean;
        prev(): PairIterator<_Kty, _Ty>;
        next(): PairIterator<_Kty, _Ty>;
    }
}
declare namespace samchon.library {
    class XMLList extends std.Vector<XML> {
        constructor();
        toString(level?: number): string;
        toHTML(level?: number): string;
    }
}
declare namespace samchon.library {
    class StringUtil {
        static tab(size: number): string;
        static htmlTab(size: number): string;
        static replaceAll(str: string, pairs: Array<std.Pair<string, string>>): string;
    }
}
declare namespace samchon.library {
    class XML extends std.UnorderedMap<string, XMLList> {
        private tag;
        private value;
        private properties;
        constructor(str?: string);
        private construct(str);
        private parseTag(str);
        private parseProperty(str);
        private parseValue(str);
        private parseChildren(str);
        getTag(): string;
        getValue(): any;
        hasProperty(key: string): boolean;
        getProperty(key: string): any;
        getPropertyMap(): std.UnorderedMap<string, any>;
        setTag(str: string): void;
        setValue(str: any): void;
        setProperty(key: string, value: any): void;
        eraseProperty(key: string): void;
        push(...xmls: XML[]): number;
        push(...xmlLists: XMLList[]): number;
        addAllProperties(xml: XML): void;
        clearProperties(): void;
        private calcMinIndex(...args);
        static decodeValue(str: string): string;
        static encodeValue(str: string): string;
        static decodeProperty(str: string): string;
        static encodeProperty(str: string): string;
        toString(level?: number): string;
        toHTML(level?: number): string;
    }
}
declare namespace samchon.protocol {
    interface IEntity {
        construct(xml: library.XML): any;
        key(): any;
        TAG(): string;
        toXML(): library.XML;
    }
}
declare namespace samchon.protocol {
    class EntityArray<Ety extends IEntity> extends std.Vector<Ety> implements std.IMap<string, Ety> {
        constructor();
        construct(xml: library.XML): void;
        protected createChild(xml: library.XML): Ety;
        key(): any;
        has(key: any): boolean;
        get(key: string): Ety;
        TAG(): string;
        CHILD_TAG(): string;
        toXML(): library.XML;
    }
}
declare namespace hiswill.faceapi {
    interface IJSONEntity extends samchon.protocol.IEntity {
        constructByJSON(val: any): void;
    }
}
declare namespace hiswill.faceapi {
    class Point extends samchon.protocol.Entity implements IJSONEntity {
        protected tag: string;
        protected x: number;
        protected y: number;
        constructor();
        constructor(tag: string);
        constructByJSON(val: any): void;
        getX(): number;
        getY(): number;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class FaceRectangle extends Point implements IJSONEntity {
        protected width: number;
        protected height: number;
        constructor();
        constructByJSON(obj: any): void;
        getWidth(): number;
        getHeight(): number;
    }
}
declare namespace samchon.library {
    interface IEventDispatcher {
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        addEventListener(type: string, listener: EventListener, thisArg: Object): void;
        removeEventListener(type: string, listener: EventListener, thisArg: Object): void;
    }
}
declare namespace hiswill.faceapi {
    interface IAsyncEntity extends samchon.protocol.IEntity, samchon.library.IEventDispatcher {
        isRegistered(): boolean;
        register(): void;
        unregister(): void;
    }
}
declare namespace hiswill.faceapi {
    class FacePair extends FaceRectangle implements IAsyncEntity {
        protected pairArray: FacePairArray;
        protected id: string;
        protected pictureURL: string;
        protected face: Face;
        protected eventDispatcher: samchon.library.EventDispatcher;
        protected registered: boolean;
        constructor(pairArray: FacePairArray);
        construct(xml: samchon.library.XML): void;
        register(): void;
        unregister(): void;
        setFile(face: Face): void;
        setRectangle(rectangle: FaceRectangle): void;
        setID(id: string): void;
        key(): string;
        getPairArray(): FacePairArray;
        getFace(): Face;
        getID(): string;
        getPictureURL(): string;
        isRegistered(): boolean;
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        addEventListener(type: string, listener: EventListener, thisArg?: Object): void;
        removeEventListener(type: string, listener: EventListener, thisArg?: Object): void;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class FacePairArray extends AsyncEntityArray<FacePair> {
        constructor(name?: string);
        protected createChild(xml: samchon.library.XML): FacePair;
        protected deductChild(rect: FaceRectangle): FacePair;
        registerFace(face: FacePair): void;
        unregisterFace(face: FacePair): void;
        insert(position: std.Iterator<FacePair>, val: FacePair): std.Iterator<FacePair>;
        insert(position: std.Iterator<FacePair>, size: number, val: FacePair): std.Iterator<FacePair>;
        insert<U extends FacePair>(position: std.Iterator<FacePair>, begin: std.Iterator<U>, end: std.Iterator<U>): std.Iterator<FacePair>;
        insert(position: std.Iterator<FacePair>, val: FaceRectangle): std.Iterator<FaceRectangle>;
        insert(position: std.Iterator<FacePair>, size: number, val: FaceRectangle): std.Iterator<FaceRectangle>;
        insert<U extends FaceRectangle>(position: std.Iterator<FacePair>, begin: std.Iterator<U>, end: std.Iterator<U>): std.Iterator<FacePair>;
        push(...items: FaceRectangle[]): number;
        key(): any;
        getFaceAPI(): FaceAPI;
        CHILD_TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class Person extends FacePairArray {
        protected group: PersonGroup;
        constructor(group: PersonGroup, name?: string);
        hasAsyncParent(): boolean;
        register(): void;
        unregister(): void;
        protected handleRegister(data: any): void;
        protected handleUnregister(): void;
        registerFace(face: FacePair): void;
        unregisterFace(face: FacePair): void;
        getGroup(): PersonGroup;
        setName(name: string): void;
        TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class CandidatePerson extends samchon.protocol.Entity implements IJSONEntity {
        protected personArray: CandidatePersonArray;
        protected person: Person;
        protected confidence: number;
        constructor(personArray: CandidatePersonArray);
        construct(xml: samchon.library.XML): void;
        constructByJSON(obj: any): void;
        getPersonArray(): CandidatePersonArray;
        getPerson(): Person;
        getConfidence(): number;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class FaceLandmarks extends samchon.protocol.Entity implements IJSONEntity {
        protected face: Face;
        protected eyeBrows: Eyebrows;
        protected eyes: Eyes;
        protected nose: Nose;
        protected mouth: Mouth;
        constructor(face: Face);
        constructByJSON(obj: any): void;
        getFace(): Face;
        getEyeBrows(): Eyebrows;
        getEyes(): Eyes;
        getNose(): Nose;
        getMouth(): Mouth;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class FaceAttribute extends samchon.protocol.Entity implements IJSONEntity {
        protected attributes: FaceAttributes;
        constructor(attributes: FaceAttributes);
        constructByJSON(val: any): void;
        getAttributes(): FaceAttributes;
    }
}
declare namespace hiswill.faceapi {
    class FacialHair extends FaceAttribute {
        protected mustache: number;
        protected beard: number;
        protected sideburns: number;
        constructor(attributes: FaceAttributes);
        getMustache(): number;
        getBeard(): number;
        getSideburns(): number;
        TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class HeadPose extends FaceAttribute {
        protected roll: number;
        protected pitch: number;
        protected yaw: number;
        constructor(attributes: FaceAttributes);
        getRoll(): number;
        getPitch(): number;
        getYaw(): number;
        TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class FaceAttributes extends samchon.protocol.Entity implements IJSONEntity {
        protected face: Face;
        protected age: number;
        protected gender: string;
        protected smile: number;
        protected facialHair: FacialHair;
        protected headPose: HeadPose;
        constructor(face: Face);
        constructByJSON(obj: any): void;
        getFace(): Face;
        getAge(): number;
        getGender(): string;
        getSmile(): number;
        getFacialHair(): FacialHair;
        getHeadPose(): HeadPose;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class SimilarFace extends samchon.protocol.Entity implements IJSONEntity {
        protected faceArray: SimilarFaceArray;
        protected facePair: FacePair;
        protected confidence: number;
        constructor(faceArray: SimilarFaceArray);
        construct(xml: samchon.library.XML): void;
        constructByJSON(data: any): void;
        getFaceArray(): SimilarFaceArray;
        getFacePair(): FacePair;
        getConfidence(): number;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class SimilarFaceArray extends samchon.protocol.EntityArray<SimilarFace> {
        protected api: FaceAPI;
        protected face: Face;
        protected faceList: FaceList;
        constructor(api: FaceAPI);
        constructor(face: Face, faceList: FaceList);
        construt(xml: samchon.library.XML): void;
        constructByJSON(val: any): void;
        protected createChild(xml: samchon.library.XML): SimilarFace;
        getAPI(): FaceAPI;
        getFace(): Face;
        getFaceList(): FaceList;
        TAG(): string;
        CHILD_TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class FaceList extends FacePairArray {
        protected listArray: FaceListArray;
        constructor(listArray: FaceListArray, name?: string);
        findSimilars(face: Face, maxCandidates: number): void;
        register(): void;
        unregister(): void;
        registerFace(face: FacePair): void;
        unregisterFace(face: FacePair): void;
        getAPI(): FaceAPI;
        getListArray(): FaceListArray;
        setName(name: string): void;
        TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class FaceReferArray extends samchon.protocol.EntityArray<Face> {
        constructor();
        construct(xml: samchon.library.XML): void;
        protected fetchChild(id: string): Face;
        TAG(): string;
        CHILD_TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class FaceGroup extends FaceReferArray implements IJSONEntity {
        protected groupArray: SimilarFaceGroupArray;
        constructor(groupArray: SimilarFaceGroupArray);
        constructByJSON(val: any): void;
        protected fetchChild(id: string): Face;
        getGroupArray(): SimilarFaceGroupArray;
    }
}
declare namespace hiswill.faceapi {
    class SimilarFaceGroup extends FaceGroup {
        constructor(groupArray: SimilarFaceGroupArray);
        TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class MessyFaceGroup extends FaceGroup {
        constructor(groupArray: SimilarFaceGroupArray);
        TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class SimilarFaceGroupArray extends samchon.protocol.EntityArray<SimilarFaceGroup> implements IJSONEntity {
        protected api: FaceAPI;
        protected faceArray: FaceReferArray;
        protected messyGroup: MessyFaceGroup;
        constructor(api: FaceAPI);
        constructor(faceArray: FaceReferArray);
        construct(xml: samchon.library.XML): void;
        constructByJSON(data: any): void;
        protected createChild(xml: samchon.library.XML): SimilarFaceGroup;
        getAPI(): FaceAPI;
        getFaceArray(): FaceReferArray;
        getMessyGroup(): MessyFaceGroup;
        TAG(): string;
        CHILD_TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace samchon {
    function trace(...args: any[]): void;
}
declare namespace samchon.library {
    class BasicEvent implements Event {
        static NONE: number;
        NONE: number;
        static CAPTURING_PHASE: number;
        CAPTURING_PHASE: number;
        static AT_TARGET: number;
        AT_TARGET: number;
        static BUBBLING_PHASE: number;
        BUBBLING_PHASE: number;
        private type_;
        private target_;
        private currentTarget_;
        protected trusted_: boolean;
        protected bubbles_: boolean;
        protected cancelable_: boolean;
        protected defaultPrevented_: boolean;
        protected cancelBubble_: boolean;
        private timeStamp_;
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        initEvent(type: string, bubbles: boolean, cancelable: boolean): void;
        preventDefault(): void;
        stopImmediatePropagation(): void;
        stopPropagation(): void;
        type: string;
        target: EventTarget;
        currentTarget: EventTarget;
        srcElement: Element;
        isTrusted: boolean;
        bubbles: boolean;
        cancelable: boolean;
        eventPhase: number;
        defaultPrevented: boolean;
        cancelBubble: boolean;
        timeStamp: number;
        returnValue: boolean;
    }
}
declare namespace std {
    class Bind<Listener extends Function, This extends Object> {
        protected func: Listener;
        protected thisArg: This;
        constructor(func: Listener, thisArg: This);
        apply(...args: any[]): any;
        equals<U extends Listener, T extends This>(obj: Bind<U, T>): boolean;
    }
}
declare namespace samchon.library {
    class EventDispatcher implements IEventDispatcher {
        protected target: IEventDispatcher;
        protected listeners: std.UnorderedMap<string, std.UnorderedSet<std.Bind<EventListener, Object>>>;
        constructor();
        constructor(target: IEventDispatcher);
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        addEventListener(type: string, listener: EventListener, thisArg?: Object): void;
        removeEventListener(type: string, listener: EventListener, thisArg?: Object): void;
    }
}
declare namespace hiswill.faceapi {
    class PictureArray extends samchon.protocol.EntityArray<Picture> {
        protected api: FaceAPI;
        constructor(api: FaceAPI);
        protected createChild(xml: samchon.library.XML): Picture;
        getAPI(): FaceAPI;
        hasURL(url: string): boolean;
        getByURL(url: string): Picture;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class Picture extends samchon.protocol.EntityArray<Face> implements IJSONEntity, samchon.library.IEventDispatcher {
        protected pictureArray: PictureArray;
        protected url: string;
        protected eventDispatcher: samchon.library.EventDispatcher;
        constructor(pictureArray: PictureArray, url?: string);
        constructByJSON(val: any): void;
        protected createChild(xml: samchon.library.XML): Face;
        key(): any;
        getPictureArray(): PictureArray;
        getURL(): string;
        detect(): void;
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        addEventListener(type: string, listener: EventListener, thisArg?: Object): void;
        removeEventListener(type: string, listener: EventListener, thisArg?: Object): void;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class Face extends FaceRectangle implements IJSONEntity, samchon.library.IEventDispatcher {
        protected picture: Picture;
        protected person: Person;
        protected id: string;
        protected landmarks: FaceLandmarks;
        protected attributes: FaceAttributes;
        protected eventDispatcher: samchon.library.EventDispatcher;
        constructor(picture: Picture);
        construct(xml: samchon.library.XML): void;
        constructByJSON(obj: any): void;
        identify(personGroup: PersonGroup, maxCandidates?: number): void;
        findSimilars(faceList: FaceList, maxCandidates: number): void;
        findSimilarGroups(faceArray: Array<Face>): void;
        private handleTrain(event);
        private handleIdentity(event);
        private handleFindSimilar(event);
        equals(face: Face): std.Pair<boolean, number>;
        key(): any;
        getID(): string;
        getPicture(): Picture;
        getPerson(): Person;
        getLandmarks(): FaceLandmarks;
        getAttributes(): FaceAttributes;
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        addEventListener(type: string, listener: EventListener, thisArg?: Object): void;
        removeEventListener(type: string, listener: EventListener, thisArg?: Object): void;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class CandidatePersonArray extends samchon.protocol.EntityArray<CandidatePerson> implements IJSONEntity {
        protected api: FaceAPI;
        protected face: Face;
        protected personGroup: PersonGroup;
        constructor(api: FaceAPI);
        constructor(face: Face, personGroup: PersonGroup);
        construct(xml: samchon.library.XML): void;
        constructByJSON(data: any): void;
        protected createChild(xml: samchon.library.XML): CandidatePerson;
        getAPI(): FaceAPI;
        getFace(): Face;
        getPersonGroup(): PersonGroup;
        TAG(): string;
        CHILD_TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class PersonGroup extends AsyncEntityArray<Person> {
        protected groupArray: PersonGroupArray;
        protected id: string;
        protected name: string;
        protected registered: boolean;
        protected trained: boolean;
        constructor(groupArray: PersonGroupArray, name?: string);
        protected createChild(xml: samchon.library.XML): Person;
        train(): void;
        private static checkTrainStatus(this_);
        identify(face: Face, maxCandidates?: number): void;
        register(): void;
        unregister(): void;
        protected handleRegister(data: any): void;
        protected handleUnregister(): void;
        key(): any;
        getGroupArray(): PersonGroupArray;
        getID(): string;
        getName(): string;
        isRegistered(): boolean;
        isTrained(): boolean;
        setName(name: string): void;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class PersonGroupArray extends AsyncEntityParent<PersonGroup> {
        protected api: FaceAPI;
        constructor(api: FaceAPI);
        protected createChild(xml: samchon.library.XML): PersonGroup;
        getAPI(): FaceAPI;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class FaceListArray extends samchon.protocol.EntityArray<FaceList> {
        protected api: FaceAPI;
        constructor(api: FaceAPI);
        protected createChild(xml: samchon.library.XML): FaceList;
        getAPI(): FaceAPI;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class FaceAPI extends samchon.protocol.Entity {
        protected personGroupArray: PersonGroupArray;
        protected faceListArray: FaceListArray;
        protected pictureArray: PictureArray;
        constructor();
        createPersonGroup(name: string): PersonGroup;
        createFaceList(name: string): FaceList;
        createPicture(url: string): Picture;
        getPersonGroupArray(): PersonGroupArray;
        getFaceListArray(): FaceListArray;
        getPictureArray(): PictureArray;
        TAG(): string;
        toXML(): samchon.library.XML;
        private static CERTIFICATION_KEY;
        static query(url: string, method: string, params: Object, data: Object): boolean;
        static query(url: string, method: string, params: Object, data: Object, success: Function): void;
        static query(url: string, method: string, params: Object, data: Object, success: Function, async: boolean): void;
        static query<T extends Object>(url: string, method: string, params: Object, data: Object, success: std.Bind<Function, T>): void;
        private static sequence;
        static issueID(prefix: string): string;
    }
}
declare namespace hiswill.faceapi {
    class AsyncEntityParent<T extends IAsyncEntity> extends samchon.protocol.EntityArray<T> implements samchon.library.IEventDispatcher {
        protected eventDispatcher: samchon.library.EventDispatcher;
        protected queueingList: std.Vector<T>;
        constructor();
        push(...items: T[]): number;
        insert(position: std.Iterator<T>, val: T): std.Iterator<T>;
        insert(position: std.Iterator<T>, size: number, val: T): std.Iterator<T>;
        insert<U extends T>(position: std.Iterator<T>, begin: std.Iterator<U>, end: std.Iterator<U>): std.Iterator<T>;
        protected inserted(item: T): void;
        protected erased(item: T): void;
        protected handleRegisterChild(event: ContainerEvent): void;
        protected handleUnregisterChild(event: ContainerEvent): void;
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        addEventListener(type: string, listener: EventListener, thisArg?: Object): void;
        removeEventListener(type: string, listener: EventListener, thisArg?: Object): void;
    }
}
declare namespace hiswill.faceapi {
    class AsyncEntityArray<T extends IAsyncEntity> extends AsyncEntityParent<T> implements IAsyncEntity {
        protected id: string;
        protected name: string;
        protected registered: boolean;
        constructor(name?: string);
        key(): any;
        hasAsyncParent(): boolean;
        getID(): string;
        getName(): string;
        setName(name: string): void;
        protected inserted(item: T): void;
        protected handleRegister(data: any): void;
        protected handleUnregister(): void;
        protected handleRegisterChild(event: ContainerEvent): void;
        isRegistered(): boolean;
        register(): void;
        unregister(): void;
    }
}
declare namespace hiswill.faceapi {
    class FaceEvent extends samchon.library.BasicEvent {
        static REGISTER: string;
        static UNREGISTER: string;
        static DETECT: string;
        static TRAIN: string;
        constructor(type: string);
    }
}
declare namespace hiswill.faceapi {
    class ContainerEvent extends FaceEvent {
        static ADD: string;
        static REMOVE: string;
        protected item_: IAsyncEntity;
        constructor(type: string, item: IAsyncEntity);
        item: IAsyncEntity;
    }
}
declare namespace hiswill.faceapi {
    class FaceLandmark extends samchon.protocol.Entity implements IJSONEntity {
        protected landmarks: FaceLandmarks;
        constructor(landmarks: FaceLandmarks);
        constructByJSON(val: any): void;
        getLandmarks(): FaceLandmarks;
    }
}
declare namespace hiswill.faceapi {
    class Eyes extends FaceLandmark {
        protected left: Eye;
        protected right: Eye;
        constructor(landmarks: FaceLandmarks);
        constructByJSON(obj: any): void;
        getLeft(): Eye;
        getRight(): Eye;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class Eye extends samchon.protocol.Entity implements IJSONEntity {
        protected eyes: Eyes;
        protected direction: number;
        protected top: Point;
        protected bottom: Point;
        protected inner: Point;
        protected outer: Point;
        protected pupil: Pupil;
        constructor(eyes: Eyes, direction: number);
        constructByJSON(obj: any): void;
        getEyes(): Eyes;
        getOpposite(): Eye;
        getTop(): Point;
        getBottom(): Point;
        getInner(): Point;
        getOuter(): Point;
        getPupil(): Pupil;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class Eyebrows extends FaceLandmark {
        protected left: Eyebrow;
        protected right: Eyebrow;
        constructor(landmarks: FaceLandmarks);
        constructByJSON(obj: any): void;
        getLeft(): Eyebrow;
        getRight(): Eyebrow;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class Eyebrow extends samchon.protocol.Entity implements IJSONEntity {
        protected eyeBrows: Eyebrows;
        protected direction: number;
        protected inner: Point;
        protected outer: Point;
        constructor(eyeBrows: Eyebrows, direction: number);
        constructByJSON(obj: any): void;
        getEyeBrows(): Eyebrows;
        getOpposite(): Eyebrow;
        getInner(): Point;
        getOuter(): Point;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class FindSimilarEvent extends FaceEvent {
        static FIND: string;
        protected faceList_: FaceList;
        protected face_: Face;
        protected maxCandidates_: number;
        protected similars_: SimilarFaceArray;
        constructor(faceList: FaceList, face: Face, maxCandidates: number, similars: SimilarFaceArray);
        faceList: FaceList;
        face: Face;
        maxCandidates: number;
        similars: SimilarFaceArray;
    }
}
declare namespace hiswill.faceapi {
    class FindSimilarGroupEvent extends FaceEvent {
        static FIND: string;
        protected faceArray_: Array<Face>;
        protected similarGroups_: SimilarFaceGroupArray;
        constructor(faceArray: Array<Face>, similarGroups: SimilarFaceGroupArray);
        faceArray: Array<Face>;
        similarGroups: SimilarFaceGroupArray;
    }
}
declare namespace hiswill.faceapi {
    class Global {
        static fetch(entity: samchon.protocol.IEntity, json: Object): void;
    }
    class Direction {
        static LEFT: number;
        static RIGHT: number;
    }
}
declare namespace hiswill.faceapi {
    class IdentifyEvent extends FaceEvent {
        static IDENTIFY: string;
        protected personGroup_: PersonGroup;
        protected face_: Face;
        protected maxCandidates_: number;
        protected candidates_: CandidatePersonArray;
        constructor(personGroup: PersonGroup, face: Face, maxCandidates: number, candidates: CandidatePersonArray);
        personGroup: PersonGroup;
        face: Face;
        maxCandidates: number;
        candidates: CandidatePersonArray;
    }
}
declare namespace hiswill.faceapi {
    class Mouth extends FaceLandmark {
        protected lip: Lip;
        protected left: Point;
        protected right: Point;
        constructor(landmarks: FaceLandmarks);
        constructByJSON(obj: any): void;
        getLip(): Lip;
        getLeft(): Point;
        getRight(): Point;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class Lip extends samchon.protocol.Entity implements IJSONEntity {
        protected mouth: Mouth;
        protected upperTop: Point;
        protected upperBottom: Point;
        protected underTop: Point;
        protected underBottom: Point;
        constructor(mouth: Mouth);
        constructByJSON(obj: any): void;
        getMouth(): Mouth;
        getUpperTop(): Point;
        getUpperBottom(): Point;
        getUnderTop(): Point;
        getUnderBottom(): Point;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class Nose extends FaceLandmark {
        protected tip: Point;
        protected leftRoot: Point;
        protected rightRoot: Point;
        protected leftAlarTop: Point;
        protected rightAlarTop: Point;
        protected leftAlarOutTip: Point;
        protected rightAlarOutTip: Point;
        constructor(landmarks: FaceLandmarks);
        constructByJSON(obj: any): void;
        getTip(): Point;
        getLeftRoot(): Point;
        getRightRoot(): Point;
        getLeftAlarTop(): Point;
        getRightAlarTop(): Point;
        getLeftAlarOutTip(): Point;
        getRightAlarOutTip(): Point;
        TAG(): string;
        toXML(): samchon.library.XML;
    }
}
declare namespace hiswill.faceapi {
    class Pupil extends Point {
        protected eye: Eye;
        constructor(eye: Eye);
        getEye(): Eye;
        TAG(): string;
    }
}
declare namespace hiswill.faceapi {
    class TestUnit {
        protected api: FaceAPI;
        constructor();
        protected detect(): void;
        protected constructPersonGroups(picture: Picture): void;
        protected train(personGroup: PersonGroup): void;
        protected identify(face: Face, personGroup: PersonGroup): void;
        protected handleDetect(event: FaceEvent): void;
        protected handleInsertion(event: ContainerEvent): void;
        protected handleTrain(event: FaceEvent): void;
        protected handleIdentify(event: IdentifyEvent): void;
    }
}
declare namespace std {
    class List<T> extends Container<T> {
        protected begin_: ListIterator<T>;
        protected end_: ListIterator<T>;
        protected size_: number;
        constructor();
        constructor(items: Array<T>);
        constructor(size: number, val: T);
        constructor(container: IContainer<T>);
        constructor(begin: Iterator<T>, end: Iterator<T>);
        assign(size: number, val: T): void;
        assign(begin: Iterator<T>, end: Iterator<T>): void;
        clear(): void;
        begin(): Iterator<T>;
        end(): Iterator<T>;
        size(): number;
        front(): T;
        back(): T;
        push(...args: T[]): number;
        pushFront(val: T): void;
        pushBack(val: T): void;
        popFront(): void;
        popBack(): void;
        insert(myEnd: Iterator<T>, it: Iterator<T>): Iterator<T>;
        insert(myEnd: Iterator<T>, begin: Iterator<T>, end: Iterator<T>): Iterator<T>;
        erase(it: Iterator<T>): Iterator<T>;
        erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;
    }
    class ListIterator<T> extends Iterator<T> {
        protected value_: T;
        protected prev_: ListIterator<T>;
        protected next_: ListIterator<T>;
        constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T);
        setPrev(prev: ListIterator<T>): void;
        setNext(next: ListIterator<T>): void;
        equals(obj: Iterator<T>): boolean;
        prev(): Iterator<T>;
        next(): Iterator<T>;
        value: T;
    }
}
declare namespace samchon.example.container {
    function main(): void;
    function handleEvent(event: library.BasicEvent): void;
}
declare namespace samchon.example.entity {
    function main(): void;
}
declare namespace samchon.example.packer {
    interface Instance extends protocol.IEntity {
        getName(): string;
        getPrice(): number;
        getVolume(): number;
        getWeight(): number;
    }
}
declare namespace samchon.example.packer {
    class ProductArray extends protocol.EntityArray<Product> {
        constructor();
        protected createChild(xml: library.XML): Product;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace samchon.example.packer {
    class Wrapper extends ProductArray implements Instance {
        protected name: string;
        protected price: number;
        protected volume: number;
        protected weight: number;
        constructor();
        constructor(wrapper: Wrapper);
        constructor(name: string, price: number, volume: number, weight: number);
        protected createChild(xml: library.XML): Product;
        tryInsert(product: Product): boolean;
        getName(): string;
        getPrice(): number;
        getVolume(): number;
        getWeight(): number;
        TAG(): string;
    }
}
declare namespace samchon.example.packer {
    class WrapperArray extends protocol.EntityArray<Wrapper> {
        private reserved;
        private sample;
        constructor(sample?: Wrapper);
        construct(xml: library.XML): void;
        protected createChild(xml: library.XML): Wrapper;
        tryInsert(product: Product): boolean;
        optimize(): void;
        calcPrice(): number;
        getSample(): Wrapper;
        TAG(): string;
        CHILD_TAG(): string;
        toXML(): library.XML;
    }
}
declare namespace samchon.example.packer {
    class Packer extends protocol.EntityArray<WrapperArray> {
        protected productArray: ProductArray;
        constructor(obj?: any);
        protected createChild(xml: library.XML): WrapperArray;
        optimize(start?: number, size?: number): void;
        calcPrice(): number;
        TAG(): string;
        CHILD_TAG(): string;
        static main(): void;
    }
}
declare namespace samchon.example.packer {
    class Product extends protocol.Entity implements Instance {
        protected name: string;
        protected price: number;
        protected volume: number;
        protected weight: number;
        constructor();
        constructor(name: string, price: number, volume: number, weight: number);
        getName(): string;
        getPrice(): number;
        getVolume(): number;
        getWeight(): number;
        TAG(): string;
    }
}
declare namespace samchon {
    class Global {
    }
}
declare namespace samchon.library {
}
declare namespace samchon.library {
    class CaseGenerator {
        protected size_: number;
        protected n_: number;
        protected r_: number;
        constructor(n: number, r: number);
        size(): number;
        n(): number;
        r(): number;
        at(index: number): Array<number>;
    }
}
declare namespace samchon.library {
    class CombinedPermutationGenerator extends CaseGenerator {
        private dividerArray;
        constructor(n: number, r: number);
        at(index: number): Array<number>;
    }
}
declare namespace samchon.library {
    class PermuationGenerator extends CaseGenerator {
        constructor(n: number, r: number);
        at(index: number): Array<number>;
    }
}
declare namespace samchon.library {
    class FactorialGenerator extends PermuationGenerator {
        constructor(n: number);
    }
}
declare namespace samchon.library {
    class ProgressEvent extends BasicEvent {
        static PROGRESS: string;
        protected numerator_: number;
        protected denominator_: number;
        constructor(type: string, numerator: number, denominator: number);
        numerator: number;
        denominator: number;
    }
}
declare namespace samchon.protocol {
    class InvokeParameter extends Entity {
        protected name: string;
        protected type: string;
        protected value: any;
        constructor();
        constructor(name: string, val: any);
        constructor(name: string, type: string, val: any);
        construct(xml: library.XML): void;
        key(): any;
        getName(): string;
        getType(): string;
        getValue(): any;
        TAG(): string;
        toXML(): library.XML;
    }
}
declare namespace samchon.protocol {
    class Invoke extends EntityArray<InvokeParameter> {
        protected listener: string;
        constructor(listener: string);
        constructor(invoke: Invoke);
        constructor(xml: library.XML);
        constructor(listener: string, begin: std.Iterator<InvokeParameter>, end: std.Iterator<InvokeParameter>);
        constructor(listener: string, ...parameters: any[]);
        protected createChild(xml: library.XML): InvokeParameter;
        getListener(): string;
        getArguments(): Array<any>;
        apply(obj: IProtocol): boolean;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace samchon.protocol {
    interface IProtocol {
        replyData(invoke: Invoke): void;
        sendData(invoke: Invoke): void;
    }
}
declare namespace std {
    class UnorderedSet<K> extends Container<K> {
        private data_;
        constructor();
        constructor(items: Array<K>);
        constructor(container: IContainer<K>);
        constructor(begin: Iterator<K>, end: Iterator<K>);
        assign<U extends K>(begin: Iterator<U>, end: Iterator<U>): void;
        clear(): void;
        insert(key: K): Pair<Iterator<K>, boolean>;
        insert(hint: Iterator<K>, val: K): Pair<Iterator<K>, boolean>;
        insert<U extends K>(begin: Iterator<U>, end: Iterator<U>): void;
        erase(key: K): number;
        erase(it: Iterator<K>): Iterator<K>;
        erase(begin: Iterator<K>, end: Iterator<K>): Iterator<K>;
        begin(): Iterator<K>;
        end(): Iterator<K>;
        find(key: K): Iterator<K>;
        data(): Vector<K>;
        size(): number;
        has(key: K): boolean;
        equals(obj: UnorderedSet<K>): boolean;
    }
    class UnorderedSetIterator<K> extends Iterator<K> {
        private index;
        constructor(source: UnorderedSet<K>, index: number);
        value: K;
        private set;
        equals(obj: Iterator<K>): boolean;
        getIndex(): number;
        prev(): Iterator<K>;
        next(): Iterator<K>;
    }
}
declare namespace samchon.protocol {
    class ExternalSystemRole extends Entity implements IProtocol {
        protected system: ExternalSystem;
        protected name: string;
        protected sendListeners: std.UnorderedSet<string>;
        constructor(system: ExternalSystem);
        construct(xml: library.XML): void;
        getName(): string;
        hasSendListener(key: string): boolean;
        sendData(invoke: Invoke): void;
        replyData(invoke: Invoke): void;
        TAG(): string;
        toXML(): library.XML;
    }
}
declare namespace samchon.protocol {
    class ServerConnector implements IProtocol {
        private parent;
        private socket;
        private str;
        onopen: Function;
        constructor(parent: IProtocol);
        connect(ip: string, port: number): void;
        sendData(invoke: Invoke): void;
        replyData(invoke: Invoke): void;
        private handleConnect(event);
        private handleReply(event);
    }
}
declare namespace samchon.protocol {
    class ExternalSystem extends EntityArray<ExternalSystemRole> implements IProtocol {
        protected driver: ServerConnector;
        protected name: string;
        protected ip: string;
        protected port: number;
        constructor();
        start(): void;
        key(): any;
        getName(): string;
        getIP(): string;
        getPort(): number;
        sendData(invoke: Invoke): void;
        replyData(invoke: Invoke): void;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace samchon.protocol {
    class ExternalSystemArray extends EntityArray<ExternalSystem> implements IProtocol {
        constructor();
        start(): void;
        hasRole(key: string): boolean;
        getRole(key: string): ExternalSystemRole;
        sendData(invoke: Invoke): void;
        replyData(invoke: Invoke): void;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace samchon.protocol {
    class InvokeHistory extends Entity {
        protected uid: number;
        protected listener: string;
        protected startTime: Date;
        protected endTime: Date;
        constructor(invoke: Invoke);
        notifyEnd(): void;
        TAG(): string;
        toXML(): library.XML;
        toInvoke(): Invoke;
    }
}
declare namespace samchon.protocol.service {
    class Movie implements IProtocol {
        protected application: Application;
        replyData(invoke: Invoke): void;
        sendData(invoke: Invoke): void;
    }
}
declare namespace samchon.protocol.service {
    class Application implements IProtocol {
        protected socket: ServerConnector;
        protected movie: Movie;
        constructor(movie: Movie, ip: string, port: number);
        private handleConnect(event);
        replyData(invoke: Invoke): void;
        sendData(invoke: Invoke): void;
    }
}
declare namespace samchon.protocol.service {
}
declare namespace samchon.protocol.slave {
    class SlaveSystem extends ExternalSystem {
        constructor();
        replyData(invoke: Invoke): void;
    }
}
declare namespace std {
    type IDictionary<_Ty> = IMap<string, _Ty>;
}
declare namespace std {
    class Map<K, T> extends PairContainer<K, T> {
        protected data_: TreeNode<Pair<K, T>>;
        protected size_: number;
        constructor(...args: any[]);
    }
}
declare namespace std {
    class Set<T> extends Container<T> {
        protected data_: TreeNode<T>;
        constructor();
        constructor(array: Array<T>);
        constructor(container: Container<T>);
        constructor(begin: Iterator<T>, end: Iterator<T>);
        assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        clear(): void;
        begin(): Iterator<T>;
        end(): Iterator<T>;
        data(): TreeNode<T>;
        size(): number;
        insert(key: T): std.Pair<Iterator<T>, boolean>;
        insert(hint: Iterator<T>, key: T): Iterator<T>;
        insert(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;
        erase(it: Iterator<T>): Iterator<T>;
        erase(key: T): number;
        erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
    }
    class SetIterator<Key> extends Iterator<Key> {
        private set;
        private node;
        constructor(source: Set<Key>, node: TreeNode<Key>);
        equals<U extends Key>(obj: Iterator<U>): boolean;
        value: Key;
        prev(): Iterator<Key>;
        next(): Iterator<Key>;
    }
}
declare namespace std {
    class TreeNode<T> {
        protected parent: TreeNode<T>;
        protected leftChild: TreeNode<T>;
        protected rightChild: TreeNode<T>;
        protected value: T;
        constructor(parent: TreeNode<T>, value: T);
        getParent(): TreeNode<T>;
        getLeftChild(): TreeNode<T>;
        getRightChild(): TreeNode<T>;
        getValue(): T;
        size(): number;
        prev(): TreeNode<T>;
        next(): TreeNode<T>;
        front(): TreeNode<T>;
        back(): TreeNode<T>;
        setLeft(node: TreeNode<T>): void;
        setRight(node: TreeNode<T>): void;
        setValue(value: T): void;
    }
}
