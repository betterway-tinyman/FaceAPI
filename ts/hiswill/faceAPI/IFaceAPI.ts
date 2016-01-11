namespace hiswill.faceapi
{
    /**
     * An interface for classes who are interacting with Face-API server.
     *
     * @author Jeongho Nam
     */
    export interface IFaceAPI
    {
        // protected registered: bool

        /**
         * Test whether the instance is registered on the Face-API server.
         */
        isRegistered(): boolean;
        //{ 
        //    return this.registered; 
        //}

        /**
         * Insert the instance to the Face-API server.
         */
        insertToServer(): void;

        /**
         * Remove the instance from the Face-API server.
         */
        eraseFromServer(): void;
    }
}