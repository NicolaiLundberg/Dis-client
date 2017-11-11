$(document).ready(() => {

    SDK.User.loadNav();

    $("#createEvent-button").click(() => {

        window.alert("Event Oprettet!");


    });

    $("#return-button").click(() => {

        window.location.href = "events.html";
    });
});