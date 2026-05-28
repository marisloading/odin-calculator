// Get the element, add a click listener...
const numberBtns = document.getElementById("number-buttons");
const operatorBtns = document.getElementById("operator-buttons");
const clearBtn = document.getElementById("clear");
const decimalBtn = document.getElementById("dot");
const deleterBtn = document.getElementById("del");
const display = document.getElementById("display-area");

const audio = new Audio("button_press.mp3");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let currentDisplay = display.textContent;

let hasCalculated = false;

document.addEventListener("keydown", function (event) {
  const operatorKeys = "+-/*=";
  let keyPressed = event.key;

  if (keyPressed == "Enter" || keyPressed == " ") {
    addOperator("=");
  } else if (keyPressed >= 0 && keyPressed <= 9) {
    console.log("Key pressed is a number: " + keyPressed);
    inputNumbers(keyPressed);
  } else if (operatorKeys.includes(keyPressed)) {
    console.log("Key pressed is an operator: " + keyPressed);
    addOperator(keyPressed);
  } else if (keyPressed == "Delete" || keyPressed == "c") {
    console.log("Key pressed clears: " + keyPressed);
    clearDisplay();
  } else if (keyPressed == "Backspace") {
    console.log("Key pressed deletes: " + keyPressed);
    delPrev();
  } else if (keyPressed == ".") {
    console.log("Key pressed creates decimal: " + keyPressed);
    addDecimal();
  } else {
    console.log("Key is not accepted: " + keyPressed);
  }
});

numberBtns.addEventListener("click", (e) => {
  currentDisplay = display.textContent;

  if (e.target.nodeName == "BUTTON") {
    audio.currentTime = 0;
    audio.play();
    let number = e.target.value;
    inputNumbers(number);
  }
});
operatorBtns.addEventListener("click", (e) => {
  if (e.target.nodeName == "BUTTON") {
    audio.currentTime = 0;
    audio.play();
    currentDisplay = display.textContent == "" ? 0 : display.textContent;

    addOperator(e.target.id);
  }
});
decimalBtn.addEventListener("click", addDecimal);

clearBtn.addEventListener("click", clearDisplay);

deleterBtn.addEventListener("click", delPrev);

function inputNumbers(number) {
  if (currentDisplay == "Display here" || hasCalculated) {
    currentDisplay = number;
    hasCalculated = false;
  } else {
    if (currentDisplay.length < 18) {
      currentDisplay += number;
    }
  }

  display.textContent = currentDisplay;
}

function addOperator(op) {
  if (operator == "" && (op == "equals" || op == "=")) {
  } else {
    if (firstNumber == "") {
      firstNumber = currentDisplay;
      operator = op;

      currentDisplay = "";
    } else if (secondNumber == "") {
      secondNumber = currentDisplay;

      if (op == "equals" || op == "=") {
        hasCalculated = true;
        currentDisplay = calculate(firstNumber, secondNumber, operator);
      } else {
        hasCalculated = false;
        currentDisplay = calculate(firstNumber, secondNumber, operator);
        operator = op;
        console.log(operator);
      }
      if (hasCalculated) {
        firstNumber = "";
        secondNumber = "";
        operator = "";
      } else {
        firstNumber = currentDisplay;
        console.log(firstNumber);
        secondNumber = "";
        console.log(secondNumber);
        console.log(operator);
        currentDisplay = "";
      }
    }

    display.textContent = currentDisplay;
  }
}

function calculate(x, y, operator) {
  const regex = RegExp("/[^0-9\.]+/g");
  console.log("number one: " + x);
  console.log("number two: " + y);
  if (regex.test(y)) {
    y = y.replace(regex, "");
  }
  if (regex.test(x)) {
    x = x.replace(regex, "");
  }
  let numberOne = Number(x);
  let numberTwo = Number(y);
  let result = 0;

  console.log(operator);
  console.log(operator == "+");

  switch (operator) {
    case "plus":
    case "+":
      console.log("plus case");
      result = numberOne + numberTwo;
      break;
    case "minus":
    case "-":
      console.log("minus case");
      console.log(numberOne + numberTwo);
      result = numberOne - numberTwo;
      break;
    case "mult":
    case "*":
      console.log("mult case");
      result = numberOne * numberTwo;
      break;
    case "slash":
    case "/":
      console.log("slash case");
      result = numberOne / numberTwo;
      break;
    default:
      console.log("default case");
      result = numberOne;
  }
  console.log(result);
  result = result.toString();
  console.log("Result's length: " + result.length);

  if (result.length > 18) {
    result = Number(result);
    result = result.toFixed(17);
  } else {
    result = Number(result);
  }

  if (result == 420 || result == 69) {
    result = result + " (nice)";
  } else if (!isFinite(result)) {
    result = "alright calm down";
  }
  return result;
}

function addDecimal() {
  audio.currentTime = 0;
  audio.play();
  currentDisplay = display.textContent;

  if (!currentDisplay.includes(".")) {
    if (currentDisplay.length < 18) {
      currentDisplay += currentDisplay == "" ? "0." : ".";
    }

    display.textContent = currentDisplay;
  } else if (hasCalculated) {
    currentDisplay = "0.";
    hasCalculated = false;

    display.textContent = currentDisplay;
  }
}

function clearDisplay() {
  audio.currentTime = 0;
  audio.play();
  firstNumber = "";
  secondNumber = "";
  operator = "";
  hasCalculated = false;
  currentDisplay = "";

  display.textContent = "";
}

function delPrev() {
  audio.currentTime = 0;
  audio.play();
  currentDisplay = display.textContent;
  currentDisplay = currentDisplay.slice(0, -1);

  display.textContent = currentDisplay;
}
