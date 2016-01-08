/// <reference path="hiswill/faceapi/FaceAPI.ts" />

import api = hiswill.faceapi;

function main(): void
{
    var faceAPI: api.FaceAPI = new api.FaceAPI();

    var picture = faceAPI.createPicture("http://samchon.org/download/group_others2.jpg");
    picture.detect();

    trace("Detected");

    //var faceList = faceAPI.createFaceList("other_group");
    var personGroup = faceAPI.createPersonGroup("others");

    for (var i: number = 0; i < 3; i++)
    {
        var face = picture[i];

        //faceList.push(face);

        var person = new api.person.Person(personGroup, "my_name_" + (i+1));
        personGroup.push(person);
        person.push(face);
    }

    trace("Registered");

    personGroup.addEventListener("complete",
        function(ev: Event): void
        {
            trace("Trained");

            var face = picture[0];
            var candidates = personGroup.identify(face, 2);

            trace("Identified", candidates.toXML());
        }
    );

    personGroup.train();
}