$(document).ready(() => {

    // creating constants of the lists which will be put into the specific-event.html.
    const $specificEvent = $("#specificEvent-list");
    const $PostList = $("#post-list");

    // this is the servercall which will find the chosen event in the database and return it to the user.
    SDK.Event.findEvent((err, event) => {

        // creating a html constant which will get the chosen eventtitle and put it into the specificEvent-list.
        // Reference: line 12 - 68 this code is created with inspiration from DISbook handed out by the exerciseteacher Jesper.
        const specificEventHtml = `

      <div class="page-header">
        <h1 align="CENTER">${event.title}</h1>
      </div>`;

        $specificEvent.append(specificEventHtml);

        const eventPosts = event.posts;

        // This is a foreach loop which will get alle posts to the specific event and put it into the post-list in the specific-event.html.
        eventPosts.forEach((eventPost) => {

            SDK.Storage.persist("postOwnerId", eventPost.owner.id);

            // this is the servercall which find the user who made the posts in the specific event.
            SDK.User.findUser((err, user) => {

                $PostList.append(postsHtml = `

                    <div class="col-lg-12 post-container" >
                        <div class="panel panel-default">
                            <div class="panel-heading" align="CENTER">
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

                // This is the code which is fired when one of the comments button is pressed on which will store the chosenPostId in the localstorage for later use.
                // A modal will be shown with the comments to the chosen post.
                $(".thisPost-button").unbind().click(function () {
                    $("#comment-modal").modal("toggle");
                    const postId = $(this).data("post-comments");
                    SDK.Storage.persist("chosenPostId", postId);
                });
            });
        });
    });

    // This is the code which will be fired when the new post button is pressed on.
    $("#newPost-button").click(function () {

        // Making constants of the input from user but also the event id and the user id.
        const ownerId = SDK.Storage.load("userId");
        const content = $("#inputNewPost").val();
        const eventId = SDK.Storage.load("chosenEventId");

        // This is the servercall which creates a new post, this post will be stored in the database. After the page will be refreshed so the user can see the new post.
        SDK.Post.createPost(ownerId, content, eventId, (err, data) => {
        });
        window.location.href = "specific-event.html";
    });

    // This code is fired when the return button is pressed on. The user will return the the events page.
    $("#return-button").click(function () {
        window.location.href = "events.html";
    });

    // This code will be fired when the modal is shown.
    // Reference: line 92 - 117 created with inspiration from DISbook handed out by the exerciseteacher Jesper.
    $("#comment-modal").on("shown.bs.modal", () => {

        // The servercall to get the comments to the chosen post.
        SDK.Post.findComments((err, post) => {

            // This is a foreach loop which will take all the comments to the specific event and put it into the modal body.
            post.comments.forEach((post) => {

                SDK.Storage.persist("postOwnerId", post.owner.id);

                // This is the servercall to get the users who have made the comments.
                SDK.User.findUser((err, user) => {

                    const $modalTbody = $("#modal-tbody");

                    $modalTbody.append(`
                 <dl>
                      <dt>${user}</dt>
                      <dt>${post.created}</dt>
                      <dd>${post.content}</dd>     
                 </dl>
                 `);
                });

            });
        });
    });


    $("#comment-modal").on("hidden.bs.modal", function () {
        $("#modal-tbody").html("");
    });

    // This is the code which is fired when the new comment button is pressed on.
    $("#newComment-button").click(function () {

        // Making constants of the input from the user, but also the chosenPostId and the userId.
        const ownerId = SDK.Storage.load("userId");
        const content = $("#inputNewComment").val();
        const parentId = SDK.Storage.load("chosenPostId");

        // This is the servercall to make a new comment. If the new comment is created then it will be stored in the database.
        SDK.Post.createComment(ownerId, content, parentId, (err, data) => {
        });
        $("#comment-modal").modal("toggle");
    });
});