var firstValue = 0;
var lastOperator;
var SN = 10;
var sectorCount = 0;
var isCalcDeployed = false;
var isEqualEnter = false;
window.onload = function () {
    var input = document.getElementById('input');
    var clear = document.getElementById('clear');
    var numbers = document.getElementsByClassName('number');
    var operators = document.getElementsByClassName('operator');
    var open = document.getElementById('open');
    open.addEventListener('click', createButtons);

    var calculator = new Calculator();

    // ввод цифр
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function () {
            input.value = calculator.setValue(this.innerHTML);
        });
    }

    // операторы
    for (var i = 0; i < operators.length; i++) {
        //operators[i].addEventListener('click', operatorEventListenner);

        operators[i].addEventListener('click', function () {
            input.value = calculator[this.dataset.operand]();
        })
    }

    // очистка
    clear.addEventListener('click', function () {
        input.value = calculator.clear();

    })
}

function createButtons() {
    var open = document.getElementById('open');
    if (isCalcDeployed) {
        deleteOptionSectors();
        isCalcDeployed = false;
        open.innerHTML = '>';
    } else {
        open.innerHTML = '<';
        createSector('√', '^', 'sin', 'cos');
        createSector('+/-', '1/x', 'log', '.');
        createSector('ctg', 'tg', 'PI', 'e');
        createSector('n√', '| |', '', '');
        createSystemsButtons();
        isCalcDeployed = true;
    }
}

function createSector(firstChar, secondChar, thirdChar, fourthChar) {
    sectorCount++;
    var sector = document.createElement('div');
    sector.classList = 'operators createdOperators';
    var buttons = document.getElementById('btns');
    var chars = [firstChar, secondChar, thirdChar, fourthChar];
    var btns = [];
    for (var i = 0; i < 4; i++) {
        btns[i] = document.createElement('button');
        btns[i].classList = 'btn';
        btns[i].innerHTML = chars[i];
        btns[i].addEventListener('click', operatorEventListenner);
        sector.appendChild(btns[i]);
    }
    var calc = document.getElementById('calculator');
    var input = document.getElementById('input');
    calc.style.width = (420 + (120 * sectorCount)) + 'px';
    input.style.width = 100 + '%';
    buttons.appendChild(sector);
}

function operatorEventListenner() {
    var support = document.getElementById('support');
    var input = document.getElementById('input');
    switch (this.innerHTML) {
        /*
        case '+': 
            firstValue = input.value - 0;
            input.value = 0;
            lastOperator = '+';
            isEqualEnter = false;
            break;
        case '-':
            firstValue = input.value - 0;
            input.value = 0;
            lastOperator = '-';
            isEqualEnter = false;
            break;
        case '*':
            firstValue = input.value - 0;
            input.value = 0;
            lastOperator = '*';
            isEqualEnter = false;
            break;
        case '/':
            firstValue = input.value - 0;
            input.value = 0;
            lastOperator = '/';
            isEqualEnter = false;
            break;
        case 'n√':
            firstValue = input.value - 0;
            input.value = 0;
            lastOperator = 'n√';
            isEqualEnter = false;
            break;
            */
        case 'e':
            input.value = Math.E;
            isEqualEnter = false;
            break;
        case 'PI':
            input.value = Math.PI;
            isEqualEnter = false;
            break;
        /*
        case 'tg':
            input.value = Math.tan(input.value - 0);
            isEqualEnter = false;
            break;
        case 'ctg':
            input.value = 1 / Math.tan(input.value - 0);
            isEqualEnter = false;
            break;
            */
        case 'log':
            firstValue = input.value - 0;
            input.value = 0;
            support.innerHTML = `Введи число для логарифма по основанию ` + firstValue;
            lastOperator = 'log';
            isEqualEnter = false;
            break;
        /*
            case '.':
            if((input.value).indexOf('.') === -1){
                input.value += '.';
            }
            break;
        case '√':
            firstValue = 0;
            if(input.value >= 0) {
                input.value = Math.sqrt(input.value);
            }
            lastOperator = '';
            isEqualEnter = false;
            break;
        case '^':
            firstValue = input.value - 0;
            input.value = 0;
            lastOperator = '^';
            isEqualEnter = false;
            break;
        case '+/-':
            firstValue = 0;
            input.value = -input.value;
            lastOperator = '';
            break;
        case '| |':
            input.value = Math.abs(input.value - 0);
            break;
        case '1/x':
            firstValue = 0;
            if(input.value != 0){
                input.value = 1/(input.value - 0);
            } 
            lastOperator = '';
            isEqualEnter = false;
            break;
        case 'sin':
            firstValue = 0;
            input.value = Math.sin(input.value);
            lastOperator = '';
            isEqualEnter = false;
            break;
        case 'cos':
            firstValue = 0;
            input.value = Math.cos(input.value);
            lastOperator = '';
            isEqualEnter = false;
            break;
            */
        case '=':
            if (isEqualEnter) {
                break;
            } else {
                var a;
                isEqualEnter = true;
                switch (lastOperator) {
                    case '+':
                        a = (input.value - 0) + firstValue;
                        break;
                    case '-':
                        a = firstValue - (input.value - 0);
                        break;
                    case '*':
                        a = (input.value - 0) * firstValue;
                        break;
                    case '^':
                        a = Math.pow(firstValue, (input.value - 0));
                        break;
                    case 'n√':
                        a = Math.pow(firstValue, 1 / (input.value - 0));
                        break;
                    case '/':
                        if (firstValue != 0) {
                            a = firstValue / (input.value - 0);
                        } else {
                            support.innerHTML = 'Нельзя делить на ноль';
                        }
                        break;
                    case 'log':
                        if (firstValue > 0 && firstValue != 1) {
                            if (input.value > 0) {
                                a = Math.round(getBaseLog(firstValue, input.value - 0));
                            } else {
                                support.innerHTML = 'Число меньше 0';
                            }
                        } else {
                            support.innerHTML = 'Основание меньше 0 или равно 1';
                        }
                        break;
                }
                support.innerHTML = 'Подсказка';
                input.value = a;
                lastOperator = '';
                break;
            }
        case 'C':
            firstValue = 0;
            input.value = 0;
            lastOperator = '';
            support.innerHTML = 'Подсказка';
            break;
    }


}

function createSystemsButtons() {
    var input = document.getElementById('input');
    var systemBtns = document.createElement('div');
    systemBtns.id = 'systems';
    var radioSN = [16, 10, 8, 2];
    var labels = ['Hex', 'Dec', 'Oct', 'Bin'];
    var radioButtons = [];
    for (var i = 0; i < radioSN.length; i++) {
        var radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'radio';
        radioButton.classList = 'radio';
        radioButton.dataset.system = radioSN[i];
        if (i == 1) {
            radioButton.checked = true;
        }
        systemBtns.appendChild(radioButton);
        var label = document.createElement('label');
        label.innerHTML = labels[i];
        systemBtns.appendChild(label);
        radioButtons[i] = radioButton;
    }

    for (var i = 0; i < radioButtons.length; i++) {

        radioButtons[i].addEventListener('click', function () {
            var num = input.value;
            num = parseInt(num, SN);
            SN = this.dataset.system - 0;
            input.value = num.toString(SN);
        })

    }
    var buttons = document.getElementById('btns');
    buttons.appendChild(systemBtns);
}

function deleteOptionSectors() {
    var sections = document.getElementsByClassName('createdOperators');
    var system = document.getElementById('systems');
    console.log(sections.length);
    //sections.remove();
    for (var i = sections.length - 1; i >= 0; i--) {
        sections[i].remove();
    }
    system.remove();
    var calc = document.getElementById('calculator');
    var input = document.getElementById('input');
    input.style.width = 280 + 'px';
    calc.style.width = 420 + 'px';
    sectorCount = 0;
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
