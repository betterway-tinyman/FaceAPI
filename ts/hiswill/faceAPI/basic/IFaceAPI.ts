namespace hiswill.faceAPI.basic
{
    export interface IFaceAPI
    {
        // protected registered: bool

        isRegistered(): boolean;
        //{ 
        //    return this.registered; 
        //}

        insertToServer(): void;
        eraseFromServer(): void;
    }
}