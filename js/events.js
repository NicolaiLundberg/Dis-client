$(document).ready(() => {


    SDK.User.loadNav();
    const $eventList = $("#event-list");


    SDK.Event.findAllEvents((err, events) => {

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


        $(".this-button").click(function () {

            const eventId = $(this).data("event-id");
            const ownerId = $(this).data(events.owner);
            const event = events.find((event) => event.id === eventId);

            SDK.Storage.persist("chosenEventId", eventId);


            window.location.href = "specific-event.html";

        });
    });

    $("#showEvent-button").click(() => {


    });

    $("#createEvent-button").click(() => {
        window.location.href = "create-event.html";
    });


});