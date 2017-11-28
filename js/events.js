$(document).ready(() => {

    //Loading the navigationbar.
    SDK.User.loadNav();
    //creating constant of the event list in the events.html page.
    const $eventList = $("#event-list");


    //The find alle events call to the server, which returns the found events from the database.
    SDK.Event.findAllEvents((err, events) => {

        //Making a foreach loop to get all the events into the events.html page.
        //Every events will get the same look because they are all inserted into eventHtml constant.
        events.forEach((event) => {
            const eventHtml = `
        <div class="col-lg-4 book-container">
            <div class="panel panel-default">
            
                <div class="panel-heading">
                    <h3 class="panel-title">${event.title}</h3>
                </div>
                
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                      <dt>Oprettet</dt>
                      <dd>${event.created}</dd>
                        <dt>Startdato</dt>
                        <dd>${event.startDate}</dd>
                        <dt>Slutdato</dt>
                        <dd>${event.endDate}</dd>
                        <dt>Beskrivelse</dt>
                        <dd>${event.description}</dd>
                      </dl>
                    </div>
                </div>
                
                <div class="panel-footer">
                    <div class="row">
                            <button class="btn btn-default this-button" data-event-id="${event.id}">Flere detaljer</button>
                    </div>
                </div>
            </div>
            
        </div>`;
            $eventList.append(eventHtml);
        });


        //This is the code which is fired when the "flere detaljer" button is fired.
        $(".this-button").click(function () {

            //making costants so it is possible to get the attached event to the button.
            const eventId = $(this).data("event-id");
            const ownerId = $(this).data(events.owner);
            const event = events.find((event) => event.id === eventId);

            //Storing the eventId to the chosen event for later use.
            SDK.Storage.persist("chosenEventId", eventId);

            // Getting the page where the chosen event is showed with posts.
            window.location.href = "specific-event.html";
        });
    });

    //This is the code which is fired when the create event button is pressed on.
    //The user will be taking to the create event page. Where he/she will be able to create a new event.
    $("#createEvent-button").click(() => {
        window.location.href = "create-event.html";
    });
});