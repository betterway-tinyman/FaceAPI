namespace hiswill.faceAPI 
{
    /**
     * JSON을 통하여 멤버가 구성되는 엔티티를 위한 인터페이스.
     *
     * @author 남정호
     */
    export interface IJSONEntity 
    {
        /**
         * JSON 개체를 통해 멤버를 구성.
         */
        constructByJSON(val: any): void;
    }
}