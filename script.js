// Get the element, add a click listener...
const numberBtns = document.getElementById("number-buttons");
const operatorBtns = document.getElementById("operator-buttons");
const clearBtn = document.getElementById("clear");
const decimalBtn = document.getElementById("dot");
const display = document.getElementById("display-area");

let firstNumber = "";
let secondNumber = "";
let operator = "";

let hasCalculated = false;

numberBtns.addEventListener("click", inputNumbers);
operatorBtns.addEventListener("click", addOperator);
decimalBtn.addEventListener("click", () => {
  let currentDisplay = display.textContent;

  if (!currentDisplay.includes(".")) {
    if (currentDisplay == "Display here" || hasCalculated) {
      currentDisplay = "0.";
      hasCalculated = false;
    } else {
      if (currentDisplay.length < 20) {
        currentDisplay += ".";
      }
    }

    display.textContent = currentDisplay;
  }
});
clearBtn.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  operator = "";

  display.textContent = "";
});

function inputNumbers(e) {
  let currentDisplay = display.textContent;

  if (e.target.nodeName == "BUTTON") {
    let number = e.target.value;
    if (currentDisplay == "Display here" || hasCalculated) {
      currentDisplay = number;
      hasCalculated = false;
    } else {
      if (currentDisplay.length < 20) {
        currentDisplay += number;
      }
    }

    display.textContent = currentDisplay;
  }
}

function addOperator(e) {
  let currentDisplay = display.textContent == "" ? 0 : display.textContent;

  if (firstNumber == "") {
    firstNumber = currentDisplay;
    operator = e.target.id;
    console.log("The operator clicked was: " + operator);
    console.log("The current first number is: " + firstNumber);

    currentDisplay = "";
  } else if (secondNumber == "") {
    secondNumber = currentDisplay;
    console.log("The current second number is: " + secondNumber);

    if (e.target.id == "equals") {
      hasCalculated = true;
      currentDisplay = calculate(firstNumber, secondNumber, operator);
      console.log("This operator should not be equals: " + operator);
    } else {
      hasCalculated = false;
      currentDisplay = calculate(firstNumber, secondNumber, operator);
      operator = e.target.id;
      console.log(
        "This operator should be the same as the one clicked: " + operator,
      );
    }
    firstNumber = "";
    secondNumber = "";
    operator = "";
    console.log("After calculations, first number is: " + firstNumber);
    console.log("After calculations, second number is: " + secondNumber);
  }

  display.textContent = currentDisplay;
}

function calculate(x, y, operator) {
  let numberOne = Number(x);
  let numberTwo = Number(y);
  let result = 0;

  switch (operator) {
    case "plus":
      result = numberOne + numberTwo;
      result = result.length > 18 ? result.toFixed(17) : result;
      break;
    case "minus":
      result = numberOne - numberTwo;
      result = result.length > 18 ? result.toFixed(17) : result;
      break;
    case "mult":
      result = numberOne * numberTwo;
      result = result.length > 18 ? result.toFixed(17) : result;
      break;
    case "slash":
      result = numberOne / numberTwo;
      result = result.length > 18 ? result.toFixed(17) : result;
      break;
    default:
      result = numberOne;
  }
  return result;
}
