$(document).ready(() => {

    //Loading the navigationbar.
    //SDK.User.loadNav();

    //Creating a constant for the userlist in the users.html page.
    const $userlist = $("#user-list");

    //This is the server call to get alle users in the database.
    SDK.User.findAll((err, users) => {

        // This is a foreach loop which will get all the users and put their information into the userlist.
        // Reference: line 14 - 36 this code is created with inspiration from DISbook project handed out by the exerciseteacher Jesper.
        users.forEach((user) => {

            $userlist.append(`
<div class="row">
        <div class="co-lg-6">
            <div class="page-header">
            <table>
            <tr>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.gender}</td>
                <td>${user.major}</td>
                <td>${user.semester}</td>
                <td>${user.description}</td>
            </tr>
            </table>
           
            </div>
                `
            );
        });
    });
    //<div id="load-test"></div>
});
