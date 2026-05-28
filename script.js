// Get the element, add a click listener...
const numberBtns = document.getElementById("number-buttons");
const operatorBtns = document.getElementById("operator-buttons");
const clearBtn = document.getElementById("clear");
const display = document.getElementById("display-area");

let firstNumber = "";
let secondNumber = "";
let operator = "";

let hasCalculated = false;

numberBtns.addEventListener("click", inputNumbers);
operatorBtns.addEventListener("click", addOperator);
clearBtn.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  operator = "";

  display.textContent = "";
});

/* function inputNumbers(e) {
  const target = e.target;
  let currentDisplay = display.textContent;

  if (target.nodeName == "BUTTON") {
    switch (target.parentNode.id) {
      case "number-buttons":
        if (currentDisplay == "Display here") {
          currentDisplay = target.value;
        } else {
          currentDisplay += target.value;
        }
        break;
      case "operator-buttons":
        if (currentDisplay !== "Display here") {
          if (target.id !== "equals") {
            if (firstNumber == "") {
              firstNumber = display.textContent;
              currentDisplay = "";
              operator = target.id;
            } else if (secondNumber == "") {
              secondNumber = display.textContent;
              currentDisplay = calculate(firstNumber, secondNumber, operator);
              firstNumber = display.textContent;
              secondNumber = "";
            } else {
              console.log("Number two was not cleared");
            }
          } else {
            if (firstNumber == "") {
              firstNumber = display.textContent;
              currentDisplay = firstNumber;
            } else if (secondNumber == "") {
              secondNumber = display.textContent;
              currentDisplay = calculate(firstNumber, secondNumber, operator);
              firstNumber = currentDisplay;
              secondNumber = "";
            } else {
              console.log("Number two was not cleared");
            }
          }
        }
        break;
    }
  }
  display.textContent = currentDisplay;
  console.log(firstNumber);
  console.log(secondNumber);
} */

function inputNumbers(e) {
  let currentDisplay = display.textContent;

  if (e.target.nodeName == "BUTTON") {
    let number = e.target.value;
    if (currentDisplay == "Display here" || hasCalculated) {
      currentDisplay = number;
      hasCalculated = false;
    } else {
      currentDisplay += number;
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

  switch (operator) {
    case "plus":
      console.log(`${numberOne} + ${numberTwo}`);
      return numberOne + numberTwo;
      break;
    case "minus":
      console.log(`${numberOne} - ${numberTwo}`);
      return numberOne - numberTwo;
      break;
    case "mult":
      console.log(`${numberOne} * ${numberTwo}`);
      return numberOne * numberTwo;
      break;
    case "slash":
      console.log(`${numberOne} / ${numberTwo}`);
      return numberOne / numberTwo;
      break;
    default:
      return numberOne;
  }
}
