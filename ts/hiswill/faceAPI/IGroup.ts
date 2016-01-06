/// <reference path="IFaceAPI.ts" />

namespace hiswill.faceAPI 
{
    export interface IGroup<_Ty>
        extends IFaceAPI, 
                Array<_Ty>
    {
        push(...items: _Ty[]): number;
        //{
        //    for (var i: number = 0; i < items.length; i++)
        //        insertToServer(items[i]);

        //    super.push(items);
        //}
    
        splice(start: number, end?: number, ...items: _Ty[]): _Ty[];
        //{
        //    var i: number;
        //    for (i = start; i < start + end; i++)
        //        this.eraseFromServer(this[i]);
        
        //    for (i = 0; i < items.length; i++)
        //        this.insertToServer(items[i]);

        //    super.splice(
        //}
    }
}