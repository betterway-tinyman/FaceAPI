/// <reference path="hiswill/faceAPI/FaceAPI.ts" />

import api = hiswill.faceAPI;

function main(): void
{
    var faceAPI: api.FaceAPI = new api.FaceAPI();

    var picture = faceAPI.createPicture("http://samchon.org/download/group_others2.jpg");
    picture.detect();

    trace("Detected");

    //var faceList = faceAPI.createFaceList("other_group");
    var personGroup = faceAPI.createPersonGroup("others");

    for (var i: number = 0; i < 4; i++)
    {
        var face = picture[i];

        //faceList.push(face);

        var person = new api.person.Person(personGroup, "my_name_" + (i+1));
        personGroup.push(person);
        person.push(face);
    }

    trace("Registered");

    face = picture[2];

    var http:XMLHttpRequest;
    
    personGroup.train();
    window.setTimeout(identify, 500, personGroup, face);
}

function identify(personGroup: api.person.PersonGroup, face: api.face.Face): void
{
    var candidates = personGroup.identify(face, 2);

    for (var i: number = 0; i < candidates.length; i++) 
    {
        var person = candidates[i].first;
        var degree = candidates[i].second;

        trace(face.key(), person.key(), degree);
    }

    trace("Identified");
}