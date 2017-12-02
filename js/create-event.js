$(document).ready(() => {

    //loading the navigationbar.
    SDK.User.loadNav();

    // The code which is fired if the create event button is pressed on.
    $("#createEvent-button").click(() => {

        //Making constants of the input from the user.
        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputEventDescription").val();
        const owner_id = SDK.User.current();

        //The create event call to the server, which sends the input from the user. If the event is created the event will be stored in the database.
        SDK.Event.createEvent(owner_id, title, startDate, endDate, description, (err) => {

            if (err && err.xhr.status === 400) {
                window.alert("Fejl! tjek indtastede værdier");
            }
            else if (err) {
                console.log("Oups");
            }
            else {
                window.location.href = "events.html";
            }
        });
    });

    // This is the code which is fired if the return button is pressed on. The user will be returned to events page.
    $("#return-button").click(() => {
        window.location.href = "events.html";
    });
});