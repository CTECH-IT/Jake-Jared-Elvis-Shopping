(function (window) {
    'use strict'
    let App = window.App || {};
    let $ = window.jQuery;

    let totalPrice = 0;
    let totalPriceWithModifier = 0;//do not judge me for this name, it is literally 5 am

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addClickHandler = function (func) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    };

    CheckList.prototype.addRow = function (sushiOrder) {
        this.removeRow(sushiOrder.emailAddress);
        var rowElement = new Row(sushiOrder);
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-sushi-order="checkbox"]')
            .remove();
    };

    function Row(sushiOrder) {
        let $div = $('<div></div>', {
            'data-sushi-order': 'checkbox',
            'class': 'checkbox'
        });
        let $label = $('<label></label>');
        let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: sushiOrder.emailAddress
        });

        let description = ' ' + sushiOrder.amount + ', ';

        if (sushiOrder.mega) {
            description += sushiOrder.mega + ', ';
            totalPrice += 15;
        }
        if (sushiOrder.cali) {
            description += sushiOrder.cali + ', ';
            totalPrice += 1;
        }
        if (sushiOrder.hirame) {
            description += sushiOrder.hirame + ', ';
            totalPrice += 1.50;
        }
        if (sushiOrder.bincho) {
            description += sushiOrder.bincho + ', ';
            totalPrice += 1.50;
        }
        if (sushiOrder.ahi) {
            description += sushiOrder.ahi + ', ';
            totalPrice += 1;//for some reason if i put this as 15 cents extra it immidietly adds 0.0000000006 cents to the total
        }
        if (sushiOrder.aji) {
            description += sushiOrder.aji + ', ';
            totalPrice += 1.5;
        }

        totalPriceWithModifier = totalPrice * sushiOrder.amount; 

        if (sushiOrder.sides) {
            description += sushiOrder.sides + ' ';
            totalPriceWithModifier += 5;
        }

        description += ' (' + sushiOrder.emailAddress + ') ';

        description += '(Delivery Instructions: ';

        if(sushiOrder.deliveryInstructions) {
            description += sushiOrder.deliveryInstructions;
        } 
        else {
            description += 'none';
        }

        description += ') total price: $' + totalPriceWithModifier

        totalPrice = 0;
        totalPriceWithModifier = 0;

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;;
    }


    App.CheckList = CheckList;
    window.App = App;

})(window);