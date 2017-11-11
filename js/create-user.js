$(document).ready(() => {

    SDK.User.loadNav();

    $("#createuser-button").click(() => {

        window.alert("Oprettet!");
        window.location.href = "main-page.html";

    });

    $("#return-button").click(() => {

        window.location.href = "main-page.html";
    });
});