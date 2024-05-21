const inputDisplayElement = document.querySelector('.input-display');

//dont allow to paste in display
inputDisplayElement.addEventListener('paste', (event) => {
    event.preventDefault();
});

//dont allow typing in display
inputDisplayElement.addEventListener('keydown', (event) => {
    event.preventDefault();
});

const acButtonElement = document.querySelector('.ac-button');
acButtonElement.addEventListener('click', () => {
    calculator.reset();
});

const percentButton = document.querySelector('.percentage-button');
percentButton.addEventListener('click', () => {
    calculator.calculate('%');
});

const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
    calculator.removeValueFromDisplay();
});

const divideButton = document.querySelector('.divide-button');
divideButton.addEventListener('click', () => {
    calculator.calculate('/');
});

const multiplyButton = document.querySelector('.multiply-button');
multiplyButton.addEventListener('click', () => {
    calculator.calculate('*');
});

const minusButton = document.querySelector('.minus-button');
minusButton.addEventListener('click', () => {
    calculator.calculate('-');
});

const plusButton = document.querySelector('.plus-button');
plusButton.addEventListener('click', () => {
    calculator.calculate('+');
});

const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', () => {
    calculator.calculate('=');
});

const dotButton = document.querySelector('.dot-button');
dotButton.addEventListener('click', () => {
    calculator.addValueToDisplay('.');
});

for (let i = 0; i < 10; i++) {
    const numberButton = document.querySelector(`.number-${i}-button`);
    numberButton.addEventListener('click', () => {
        calculator.addValueToDisplay(i);
    });
}

const doubleZeroButton = document.querySelector('.double-0-button');
doubleZeroButton.addEventListener('click', () => {
    calculator.addValueToDisplay('0');
    calculator.addValueToDisplay('0');
});

const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = '*';
const DIVIDE = '/';
const PERCENTAGE = '%';
const EQUALS = '=';

const calculator = {
    isNewNumber: true,
    isDotAllowed: true,
    operands: [],
    operators: [],

    reset: function () {
        this.resetToEnterNewOperand();
        this.operands = [];
        this.operators = [];
        inputDisplayElement.value = '0';
    },

    resetToEnterNewOperand: function () {
        this.isNewNumber = true;
        this.isDotAllowed = true;
    },

    multiply: function () {
        return this.operands.reduce((a, b) => parseFloat(a) * parseFloat(b));
    },

    divide: function () {
        return this.operands.reduce((a, b) => parseFloat(a) / parseFloat(b));
    },

    add: function () {
        return this.operands.reduce((a, b) => parseFloat(a) + parseFloat(b));
    },

    subtract: function () {
        return this.operands.reduce((a, b) => parseFloat(a) - parseFloat(b));
    },

    percentage: function () {
        return parseFloat(this.operands[0]) / 100;
    },

    calculate: function (operation) {

        if (!this.isNewNumber) {
            this.operands.push(inputDisplayElement.value);
        }

        this.resetToEnterNewOperand();
        let result = 0;

        let previousOperator = null;
        if (this.operators.length == 1) {
            previousOperator = this.operators.pop();
        } else {
            previousOperator = operation;
        }

        switch (previousOperator) {
            case ADD:
                result = this.add();
                break;
            case SUBTRACT:
                result = this.subtract();
                break;
            case MULTIPLY:
                result = this.multiply();
                break;
            case DIVIDE:
                result = this.divide();
                break;
            case PERCENTAGE:
                result = this.percentage();
                break;
            case EQUALS:
                result = this.operands[0];
                break;
        }

        this.operators.push(operation);

        inputDisplayElement.value = result;

        this.operands = [result];
        return result;

    },

    addValueToDisplay: function (value) {
        if (this.isNewNumber === true) {
            inputDisplayElement.value = '';
            this.isNewNumber = false;
        }

        if (value === '.' && this.isDotAllowed === true) {
            this.isDotAllowed = false;
            if (inputDisplayElement.value === '') {
                inputDisplayElement.value = '0';
            }
            inputDisplayElement.value += value;
        } else if (value === '.' && this.isDotAllowed === false) {
            return;
        } else if (inputDisplayElement.value === '0' && value === '0') {
            return;
        } else if (inputDisplayElement.value === '0' && value !== '0' && value !== '.') {
            inputDisplayElement.value = '';
            inputDisplayElement.value += value;
        } else {
            inputDisplayElement.value += value;
        }

    },

    removeValueFromDisplay: function () {

        if (this.isNewNumber === true) {
            return false;
        }

        inputDisplayElement.value = inputDisplayElement.value.slice(0, -1);
        if (inputDisplayElement.value.indexOf('.') === -1) {
            this.isDotAllowed = true;
        }
        if (inputDisplayElement.value === '') {
            inputDisplayElement.value = '0';
            this.isNewNumber = true;
        }

        return true;
    }
};

calculator.reset();
