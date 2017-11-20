$(document).ready(() => {



SDK.User.myInfo();
    SDK.User.loadNav();
    const $eventList = $("#event-list");

    SDK.Event.findAllEvents((err, events) =>{

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
                        <div class="col-lg-8 text-right">
                            <button class="btn btn-default">Flere detaljer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

            $eventList.append(eventHtml);
    });

    $("#showEvent-button").click(() => {

        $("#event-modal").modal("toggle");

    });

    $("#createEvent-button").click(() => {
        window.location.href = "create-event.html";
    });



});
});