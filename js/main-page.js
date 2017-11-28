$(document).ready(() => {

    //This is the code which is fired when the login button is pressed on.
    $("#login-button").click(() => {
        //making constants of the inuts from the user to login.
        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        //The logincall to the server which gives the serve the input from the users. If the user is authorized he/she will reach the homepage.
        SDK.User.login(password, email, (err, data) => {
            debugger;
            if (err && err.xhr.status === 401) {
                window.alert("Forkert brugernavn eller kode");
            }
            else if (err) {
                console.log("Oups!")
            }
            else {
                window.location.href = "home-page.html";
            }
        });
    });

    //This is the code which is fired if the create user button is pressed on. The person will then reach the create user page.
    $("#createuser-button").click(() => {
        window.location.href = "create-user.html";
    });
});