let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

// Function to update the display
function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
}

// Function to handle digit input
function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

// Function to handle decimal point input
function inputDecimal(dot) {
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
    updateDisplay();
}

// Function to handle operator input
function setOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

// Object to perform calculations
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

// Function to calculate the result
function calculateResult() {
    if (operator === null || waitingForSecondOperand) return;

    const inputValue = parseFloat(displayValue);
    const result = performCalculation[operator](firstOperand, inputValue);
    displayValue = String(result);
    firstOperand = result;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Function to clear the display
function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
}
