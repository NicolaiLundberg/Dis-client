$(document).ready(() => {

    SDK.User.loadNav();

    $("#createEvent-button").click(() => {

        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputEventDescription").val();
        const owner_id = 3;

        SDK.Event.createEvent(owner_id, title, startDate, endDate, description, (err) => {



        });
        window.alert("Event Oprettet!");


    });

    $("#return-button").click(() => {

        window.location.href = "events.html";
    });
});