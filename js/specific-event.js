$(document).ready(() => {

    const $specificEvent = $("#specificEvent-list");
    const $PostList = $("#post-list");

    SDK.Event.findEvent((err, event) => {

        const specificEventHtml = `

      <div class="page-header">
        <h1 align="CENTER">${event.title}</h1>
      </div>`;

        $specificEvent.append(specificEventHtml);

        const eventPosts = event.posts;

        eventPosts.forEach((eventPost) => {

            SDK.Storage.persist("postOwnerId", eventPost.owner.id);

            SDK.User.findUser((err, user) => {

                console.log(eventPost.owner.id);

                $PostList.append(postsHtml = `

                    <div class="col-lg-12 post-container" >
                        <div class="panel panel-default">
                            <div class="panel-heading" align="CENTER">
                            <h3 class="panel-title">${eventPost.id}</h3>
                                <h3 class="panel-title">${user}</h3>
                            </div>
                            
                            <div class="panel-body">
                                <div class="col-lg-12">
                                  <dl>
                                  <dt>Oprettet</dt>
                                  <dd>${eventPost.created}</dd>
                                  <dt>Indhold</dt>
                                  <dd>${eventPost.content}</dd>
                                  </dl>
                                </div>
                            </div>
                            
                            <div class="panel-footer" align="RIGHT">
                                <div class="row">
                                        <button class="btn btn-default thisPost-button" id="thisPost-button" data-post-comments="${eventPost.id}" >Kommentarer</button>
                                </div>
                            </div>
                        </div>
                        
                       </div>`);

                SDK.Storage.remove("postOwnerId");

                $(".thisPost-button").unbind().click(function () {
                    $("#comment-modal").modal("toggle");
                    const postId = $(this).data("post-comments");
                    SDK.Storage.persist("chosenPostId", postId);

                });
           });
        });
    });


    $("#newPost-button").click(function () {

        const ownerId = SDK.Storage.load("userId");
        const content = $("#inputNewPost").val();
        const eventId = SDK.Storage.load("chosenEventId");

        SDK.Post.createPost(ownerId, content, eventId, (err, data) => {
        });
        window.location.href = "specific-event.html";
    });


    $("#return-button").click(function () {
        window.location.href = "events.html";
    });


    $("#comment-modal").on("shown.bs.modal", () => {

        SDK.Post.findComments((err, post) => {
            const postComments = post.comments;

            postComments.forEach((post) => {

                const $modalTbody = $("#modal-tbody");

                $modalTbody.append(`
                 <dl>
                      <dt>${post.owner.id}</dt><dd>${post.content}</dd>     
                 </dl>
                 `);
            });
        });
    });


    $("#comment-modal").on("hidden.bs.modal", function () {
        $("#modal-tbody").html("");
    });


    $("#newComment-button").click(function () {

        const ownerId = SDK.Storage.load("userId");
        const content = $("#inputNewComment").val();
        const parentId = SDK.Storage.load("chosenPostId");

        SDK.Post.createComment(ownerId, content, parentId, (err, data) => {
        });
        $("#comment-modal").modal("toggle");
    });
});