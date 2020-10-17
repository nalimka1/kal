function Calculator() {
    var value = 0;
    value2 = 0;
    var operation;

    this.setValue = function (symbol) {
        if (value) {
            value = (value.toString() + symbol) - 0;
        } else {
            value = symbol - 0;
        }
        return value;
    };

    this.clear = function () {
        value = 0;
        operation = null;
        return value;
    };

    this.add = function () {
        operation = 'add';
        if (value && value2) {
            value = value + value2;
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    this.sub = function () {
        operation = 'sub';
        if (value && value2) {
            value = value2 - value;
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    this.div = function () {
        operation = 'div';
        if (value && value2) {
            value = value2 / value;
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    this.mult = function () {
        operation = 'mult';
        if (value && value2) {
            value = value2 * value;
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    this.pow = function () {
        operation = 'pow';
        if (value && value2) {
            value = Math.pow(value2, value);
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    this.crn = function () {
        operation = 'crn';
        if (value && value2) {
            value = Math.pow(value2, 1 / value);
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    /*
    this.sin = function () {
        operation = 'sin';
        if (value && value2) {
            value = Math.sin(value);
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };
    */

    this.cos = function () {
        operation = 'cos';
        if (value && value2) {
            value = Math.cos(value);
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    this.sin = function () {
        operation = 'sin';

        value = Math.sin(value);

        return value;
    };

    this.cos = function () {
        operation = 'cos';

        value = Math.cos(value);

        return value;
    };

    this.tg = function () {
        operation = 'tg';

        value = Math.tan(value);

        return value;
    };

    this.ctg = function () {
        operation = 'ctg';

        value = 1 / Math.tan(value);

        return value;
    };

    this.znam = function () {
        operation = 'znam';
        if (value != 0) {
            value = 1 / value;
        } else {
            return value = 'Дебил';
        }
        return value;
    };

    this.tchk = function () {
        operation = 'tchk';
        value = value + ".";
        return value;
    };

    this.znak = function () {
        operation = 'znak';
        value = -value;
        return value;
    };

    this.mdl = function () {
        operation = 'mdl';
        value = Math.abs(value);
        return value;
    };

    this.znak = function () {
        operation = 'znak';
        value = -value;
        return value;
    };

    this.e = function () {
        operation = 'e';
        value = Math.pow(Math.E, value);
        return value;
    };

    this.PI = function () {
        operation = 'PI';
        value = Math.pow(Math.PI, value);
        return value;
    };

    this.log = function () {
        operation = 'log';
        if (value && value2) {
            value = Math.log(value) / Math.log(value2);
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    this.ln = function () {
        operation = 'ln';

        value = Math.log10(value);

        return value;
    };
    
    this.Hex = function () {
        operation = 'Hex';

        return value;
    };
/*
    this.Dec = function () {
        operation = 'Dec';

        value = ;

        return value;
    };

    this.Oct = function () {
        operation = 'Oct';

        value = ;

        return value;
    };

    this.Bin = function () {
        operation = 'Bin';

        value = ;

        return value;
    };
    */




    this.equal = function () {
        if (operation && this[operation] instanceof Function) {
            value = this[operation]();
            value2 = 0;
            operation = null;

        }
        return value;
    };

}