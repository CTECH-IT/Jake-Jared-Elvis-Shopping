(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-sushi-order="form"]';
    const CHECKLIST_SELECTOR = '[data-sushi-order="checklist"]';
    const SERVER_URL = 'http://saturn.rochesterschools.org:8080/json';//where the fuck was this link pulled outta

    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let RemoteDataStore = App.RemoteDataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;//there was a lowercase l instead of capital and that was causing all of the problems. i figured this at 2:15.
    let Validation = App.Validation;

    let remoteDS = new RemoteDataStore(SERVER_URL);
    let myTruck = new Truck('12345', remoteDS);
    let checkList = new CheckList(CHECKLIST_SELECTOR);

    window.myTruck = myTruck;

    let formHandler = new FormHandler(FORM_SELECTOR);

    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);

})(window); 