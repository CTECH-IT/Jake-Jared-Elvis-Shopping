(function (window) {
    'use strict'
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote url supplied.');
        }
        this.serverUrl = url;
    }

    RemoteDataStore.prototype.get = function (key, cb) {
        //makes a get call to the server, but pass an email
        //so it returns just one order
        // then call the function "cb" on the response
        $.get(this.serverUrl + '?emailAddress=' + key, function (serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    };

    RemoteDataStore.prototype.remove = function (key) {
        //call the server url using the ajax 'DELETE' command
        $.ajax(this.serverUrl + '?emailAddress=' + key, { type: 'DELETE' });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);