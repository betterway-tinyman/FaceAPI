var api = hiswill.faceAPI;
function main() {
    var faceAPI = new api.FaceAPI();
    var picture = faceAPI.createPicture("http://samchon.org/download/me.jpg");
    alert("#" + picture.length);
}
