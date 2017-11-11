$(document).ready(() => {

    SDK.User.loadNav();

    $("#showEvent-button").click(() => {

        $("#event-modal").modal("toggle");

    });

    $("#createuser-button").click(() => {

        window.location.href = "create-user.html";
    });
});