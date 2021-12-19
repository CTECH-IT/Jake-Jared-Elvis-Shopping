(function (window) {
    'use strict'
    let App = window.App || {};
    let $ = window.jQuery;

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
        }
        if (sushiOrder.cali) {
            description += sushiOrder.cali + ', ';
        }
        if (sushiOrder.hirame) {
            description += sushiOrder.hirame + ', ';
        }
        if (sushiOrder.bincho) {
            description += sushiOrder.bincho + ', ';
        }
        if (sushiOrder.ahi) {
            description += sushiOrder.ahi + ', ';
        }
        if (sushiOrder.aji) {
            description += sushiOrder.aji + ', ';
        }


        if (sushiOrder.sides) {
            description += sushiOrder.sides + ' ';
        }



        description += ' (' + sushiOrder.emailAddress + ')';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;;
    }


    App.CheckList = CheckList;
    window.App = App;

})(window);