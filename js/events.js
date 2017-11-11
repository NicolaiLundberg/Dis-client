$(document).ready(() => {

    SDK.User.loadNav();

    $("#showEvent-button").click(() => {

        $("#event-modal").modal("toggle");

    });

    $("#createEvent-button").click(() => {

        window.location.href = "create-event.html";
    });


});