(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-sushi-order="form"]';
    const Server_URL = 'http://saturn.rochesterschools.org:8080/json';

let App = window.App;
let Truck = App.Truck;
let Checklist = App.Checklist;
let DataStore = App.DataStore;
let RemoteDataStore = App.RemoteDataStore;
let FormHandler = App.FormHandler;
let Validation = App.Validation; 

let myTruck = new Truck('12345', new DataStore());

window.myTruck = myTruck


let formHandler = new FormHandler(FORM_SELECTOR);
formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
console.log(formHandler);

})(window);