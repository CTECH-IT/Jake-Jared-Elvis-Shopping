(function (window) {
    'use strict';

const Server_URL = 'http://saturn.rochesterschools.org:8080/json';

let App = window.App;
let Checklist = App.Checklist;
let Truck = App.Truck;
let DataStore = App.DataStore;
let RemoteDataStore = App.RemoteDataStore;
let FormHandler = App.FormHandler;
let Validation = App.Validation; 

formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);