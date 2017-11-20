$(document).ready(() => {


    SDK.User.loadNav();
    const $userlist = $("#user-list");

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
