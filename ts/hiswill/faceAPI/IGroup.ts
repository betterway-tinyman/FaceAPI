/// <reference path="IFaceAPI.ts" />

/// <reference path="../../samchon/protocol/IEntity.ts" />

namespace hiswill.faceapi
{
    /**
     * An interface for classes who are interacting with Face-API server and whose children
     * also interact with the Face-API server, when they are inserted or removed, too.
     *
     * @author Jeongho Nam
     */
    export interface IGroup<_Ty>
        extends IFaceAPI, protocol.IEntity
    {
        push(...items: _Ty[]): number;
        //{
        //    for (var i: number = 0; i < items.length; i++)
        //        insertToServer(items[i]);

        //    super.push(items);
        //}
    
        //splice(start: number, end?: number, ...items: _Ty[]): _Ty[];
        //{
        //    var i: number;
        //    for (i = start; i < start + end; i++)
        //        this.eraseFromServer(this.at(i));
        
        //    for (i = 0; i < items.length; i++)
        //        this.insertToServer(items[i]);

        //    super.splice(
        //}
    }
}