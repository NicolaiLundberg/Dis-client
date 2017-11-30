$(document).ready(() => {

    //Loading the navigationbar.
    SDK.User.loadNav();

    //Creating a constant for the userlist in the users.html page.
    const $userlist = $("#user-list");

    //This is the server call to get alle users in the database.
    SDK.User.findAll((err, users) => {
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
            <div id="load-test"></div>
            </div>
                `
            );
        });
    });
});
