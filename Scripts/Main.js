(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-sushi-order="form"]';
    const Server_URL = 'http://saturn.rochesterschools.org:8080/json';

let App = window.App;
let Truck = App.Truck;
let DataStore = App.DataStore;
let Checklist = App.Checklist;
let RemoteDataStore = App.RemoteDataStore;
let FormHandler = App.FormHandler;
let Validation = App.Validation; 

let myTruck = new Truck('12345', new DataStore());

window.myTruck = myTruck
formHandler.addInputHandler(Validation.isCompanyEmail);

let formHandler = new FormHandler(FORM_SELECTOR);
formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
console.log(formHandler);

})(window);s