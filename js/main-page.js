$(document).ready(() => {

    SDK.User.loadNav();

    $("#login-button").click(() => {

        window.alert("Hejsa");
        window.location.href = "home-page.html"

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        SDK.User.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err) {
                console.log("BAd stuff happened")
            } else {
                window.location.href = "my-page.html";
            }
        });

    });

    $("#createuser-button").click(() => {

        window.location.href = "create-user.html";
    });
});