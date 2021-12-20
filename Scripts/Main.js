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

    remoteDS.getAll(function(orders) {
        Object.entries(orders).forEach((entry) => {
            const [key, value] = entry;
            console.log(`** ${key}: ${value} **`);
            Object.entries(value).forEach((field) => {
              const [k, v] = field;
              console.log(`----- ${k}: ${v}`);
            });
          });
          
      
        });   
    

    let formHandler = new FormHandler(FORM_SELECTOR);

    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);

})(window); 

/*
elvis's sleep deptrivation notes

i have no idea how i actually got this working
there were many small bugs that kept it from functioning
suddenly it worked, but it didnt show any information other than email
i realized that i needed to add different descriptions to the checklist
and then changed the sides to a dropdown
then added an amount dropdown
then added both of those to the description
and then i added every single one of the sushi checkboxes into the description inside of an if statement asking if the checkbox was selected
after i got that eventually working i added a price to each of the checkboxes, and then made it add the prices of all sushi rolls together, then multiply it by the amount of rolls selected
then added the final number to the checklist description
i need sleep
its 5 am
whats that bright thing in the sky?
*/

