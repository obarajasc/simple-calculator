const inputDisplayElement = document.querySelector('.input-display');
const acButtonElement = document.querySelector('.ac-button');

acButtonElement.addEventListener('click', () => {
    inputDisplayElement.value = '';
    calculator.reset();
});

const percentButton = document.querySelector('.percentage-button');
percentButton.addEventListener('click', () => {
    if (calculator.isNewNumber === false) {
        calculator.operands.push(inputDisplayElement.value);
        inputDisplayElement.value = calculator.percentage();
        calculator.reset();
    }
});

const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
    if (calculator.isNewNumber === false) {
        inputDisplayElement.value = inputDisplayElement.value.slice(0, -1);
    }
});

const divideButton = document.querySelector('.divide-button');
divideButton.addEventListener('click', () => {
    assignOperand(calculator.divide);
});

const multiplyButton = document.querySelector('.multiply-button');
multiplyButton.addEventListener('click', () => {
    assignOperand(calculator.multiply);
});

const minusButton = document.querySelector('.minus-button');
minusButton.addEventListener('click', () => {
    assignOperand(calculator.subtract);
});

const plusButton = document.querySelector('.plus-button');
plusButton.addEventListener('click', () => {
    assignOperand(calculator.add);
});

const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', () => {
    assignOperand(calculator.result);
});

const dotButton = document.querySelector('.dot-button');
dotButton.addEventListener('click', () => {
    if(calculator.isNewNumber === true){
        inputDisplayElement.value = '0.';
        calculator.isNewNumber = false;
    }else if(calculator.isNewNumber === false && (inputDisplayElement.value).indexOf('.') === -1){
        inputDisplayElement.value += '.';
    }
});

for (let i = 0; i < 10; i++) {
    const numberButton = document.querySelector(`.number-${i}-button`);
    numberButton.addEventListener('click', () => {
        if (calculator.isNewNumber) {
            inputDisplayElement.value = '';
            calculator.isNewNumber = false;
        }
        inputDisplayElement.value += i;
    });
}

const doubleZeroButton = document.querySelector('.double-0-button');
doubleZeroButton.addEventListener('click', () => {
    inputDisplayElement.value += '00';
    inputDisplayElement.value = parseFloat(inputDisplayElement.value);
});

function assignOperand(operator) {
    if (calculator.isNewNumber === false && inputDisplayElement.value !== '' && calculator.operands.length === 0) {

        calculator.operands.push(inputDisplayElement.value);
        calculator.isNewNumber = true;
        calculator.operators.push(operator);

    } else if (calculator.isNewNumber === false && inputDisplayElement.value !== '' && calculator.operands.length === 1) {
        calculator.operands.push(inputDisplayElement.value);
        const result = calculator.calculate();
        inputDisplayElement.value = result;

        calculator.operands = [result];
        calculator.operators.push(operator);
        calculator.isNewNumber = true;
    } else if (calculator.isNewNumber === true) {
        calculator.operators.pop();
        calculator.operators.push(operator);
    }
}

const calculator = {
    isNewNumber: true,
    operands: [],
    operators: [],

    reset: function () {
        this.typingNewNumber = true;
        this.operands = [];
        this.operators = [];
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

    result: function () {
        if (this.operands.length === 2) {
            return this.calculate();
        }
    },

    calculate: function () {
        const operation = this.operators.pop();
        switch (operation) {
            case this.add:
                return this.add();
            case this.subtract:
                return this.subtract();
            case this.multiply:
                return this.multiply();
            case this.divide:
                return this.divide();
            case this.percentage:
                return this.percentage();
        }

    }
};



console.log(inputDisplayElement.value === '');
