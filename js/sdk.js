//creating a constant of SDK, so it will be possible to call methods from other .js pages.
const SDK = {

    //initializing the serverURL to connect with the server.
    //Reference: line 6 - 31, this code is taken from DISbook project handed out by the exerciseteacher Jesper.
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),

            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },


    // All the server calls regarding the events: createEvent, findAllEvents, findEvent.
    Event: {
        createEvent: (owner_id, title, startDate, endDate, description, cb) => {
            SDK.request({
                data: {
                    owner_id: owner_id,
                    title: title,
                    startDate: startDate,
                    endDate: endDate,
                    description: description
                },
                // url to reach the  userEndpoint on the server.
                url: "/events",
                // POST method because the user creates a new event.
                method: "POST",
                //The header which sends Bearer + token to get access to create a new event. without this the user wont be able to create a event
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                },
            }, (err, data) => {
                    if (err) return cb(err);
                    cb(null, data);
            }, cb)
        },

        findAllEvents: (cb) => {
            SDK.request({

                method: "GET",
                url: "/events",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                },
            }, cb)
        },

        findEvent: (cb) => {
            SDK.request({
                method: "GET",
                url: "/events/" + SDK.Storage.load("chosenEventId"),
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                },

            }, cb)
        },
    },

    //All the server calls regarding posts and comments: createPost, createComment, findComments.
    Post: {

        createPost: (ownerId, content, eventId, cb) => {
            SDK.request({
                data: {
                    owner: ownerId,
                    content: content,
                    event: eventId,
                },
                url: "/posts",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, cb)
        },

        createComment: (ownerId, content, parentId, cb) => {
            SDK.request({
                data: {
                    owner: ownerId,
                    content: content,
                    parent: parentId,
                },
                url: "/posts",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, cb)
        },

        findComments: (cb) => {
            SDK.request({
                method: "GET",
                url: "/posts/" + SDK.Storage.load("chosenPostId"),
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, cb)
        },
    },

    //All server calls regarding users: createUser, findAll, findUser, current, logout, login, loadNav.
    User: {

        createUser: (password, firstName, lastName, email, description, gender, major, semester, cb) => {
            SDK.request({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    email: email,
                    gender: gender,
                    major: major,
                    semester: semester,
                    description: description
                },
                url: "/users",
                method: "POST"
            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            }, cb);
        },

        findAll: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/users/",
                    headers: {
                        Authorization: "Bearer " + SDK.Storage.load("token")
                    }
                },
                cb);
        },

        findUser: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/users/" + SDK.Storage.load("postOwnerId"),
                    headers: {
                        Authorization: "Bearer " + SDK.Storage.load("token")
                    }

                },
                cb);

        },

        current: () => {
            return SDK.Storage.load("userId");
        },

        // Logout function which removes all from the localstorage and returns the user to the main page.
        logOut: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("chosenEventId");
            SDK.Storage.remove("chosenPostId");
            SDK.Storage.remove("postOwnerId");
            window.location.href = "main-page.html";
        },

        login: (password, email, cb) => {
            SDK.request({
                data: {
                    password: password,
                    email: email
                },
                url: "/auth",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, (err, data) => {
                if (err) return cb(err);

                // Reference: line 202 - 209 https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
                let token = data;

                var base64Url = token.split('.')[0];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                console.log(JSON.parse(window.atob(base64)));

                SDK.Storage.persist("userId", JSON.parse(window.atob(base64)).kid);
                SDK.Storage.persist("token", data);

                cb(null, data);
            }, cb);
        },

        // Reference: line 215 - 222 this code is taken from DISbook handed out by exerciseteacher Jesper.
        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentUser = SDK.User.current();

                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            });
        }
    },

    //These methods is used for localstorage. To store things that are used later.
    // Reference: line 2257- 245 this code is taken from DISbook exerciseteacher Jesper.
    Storage: {
        prefix: "CafeNexusSDK",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)

        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        },
    },
};
