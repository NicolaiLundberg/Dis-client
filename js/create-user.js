$(document).ready(() => {

    //This is the code which is fires if the create user button is pressed on.
    $("#createuser-button").click(() => {

        // creating constants of the input which comes fro mthe new user.
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const password = $("#inputPassword").val();
        const email = $("#inputEmail").val();
        const gender = $("#inputGender").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();
        const description = $("#inputDescription").val();

        // The create user call to the server which sends the input from the new user to the server. If the user is created then the new user is stored in the database
        //and he/she will be able to login to the system.
        SDK.User.createUser(password, firstName, lastName, email, description, gender, major, semester, (err) => {
            if (err && err.xhr.status === 400) {
                window.alert("Fejl! tjek indtastede værdier");
            }
            else if (err) {
                console.log("Oups, something went wrong");
            }
            else {
                window.location.href = "main-page.html";
            }
        });
    });

    //This is the code fire if the return button is pressed on. Which returns the person to the main page.
    $("#return-button").click(() => {
        window.location.href = "main-page.html";
    });
});