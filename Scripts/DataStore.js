(function (window) {
    'use strict'

    let App = window.App || {};

    function DataStore() {
        console.log('running the DataStore function...');
        this.data = {};
    }

    App.DataStore = DataStore;
    window.App = App;

})(window);