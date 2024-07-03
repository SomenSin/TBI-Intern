const display = document.getElementsByClassName("ans-display")[0];
const btn = document.getElementsByClassName("grid-item");
const operationSign = document.getElementsByClassName("operation-sign")[0];

let sum = 0,
  sumDisplay = "0",
  firstOperand = null,
  secondOperand = null,
  isDecimal = false,
  isActive = false,
  operation = null;

updateDisplay(sumDisplay);

const copyButton = document.getElementById('copy-button');

copyButton.addEventListener('click', function () {
    const textToCopy = display.innerText;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy';
            }, 1000);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
        });
});

// Event listener for numeric buttons
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    addToDisplay(btn[i].value);
  });
}

function addToDisplay(val) {
  if (Number.isInteger(parseFloat(val))) {
    addNum(val);
  } else if (val === ".") {
    addDecimal();
  } else if (val === "C") {
    clearAll();
  } else if (val === "Back") {
    backspace();
  } else {
    setOperation(val);
  }
  updateDisplay(sumDisplay);
}

function addDecimal() {
  if (!isDecimal) {
    isDecimal = true;
    sumDisplay += ".";
    isActive = true;
  }
}

function addNum(val) {
  if (!isActive) {
    if (val !== "0") {
      sumDisplay = val;
      isActive = true;
    } else {
    }
  } else {
    sumDisplay += val;
  }
}

function backspace() {
  if (sumDisplay[sumDisplay.length - 1] === ".") {
    isDecimal = false;
  }
  sumDisplay = sumDisplay.slice(0, -1);
  if (sumDisplay === "") {
    sumDisplay = 0;
    isActive = false;
  }
}
function clearAll() {
  sum = 0;
  sumDisplay = 0;
  isDecimal = false;
  isActive = false;
  operation = "";
  operationSign.innerText = "";
  updateDisplay("");
}
function setOperation(opr) {
  operationSign.innerText = opr;
  if (firstOperand === null) {
    firstOperand = parseFloat(sumDisplay);
    operation = opr;
    isDecimal = false;
    isActive = false;
  } else if (secondOperand === null) {
    secondOperand = parseFloat(sumDisplay);
    calculateResult();
    operation = opr;
    isDecimal = false;
    isActive = false;   
  }
}
function calculateResult() {
  console.log(firstOperand, " ", secondOperand);

  switch (operation) {
    case "+":
      sumDisplay = (firstOperand + secondOperand).toString();
      break;
    case "-":
      sumDisplay = (firstOperand - secondOperand).toString();
      break;
    case "*":
      sumDisplay = (firstOperand * secondOperand).toString();
      break;
    case "/":
      sumDisplay = (firstOperand / secondOperand).toString();
      break;
    case "%":
      sumDisplay = (firstOperand % secondOperand).toString();
      break;
  }
  firstOperand = parseFloat(sumDisplay);
  secondOperand = null;
  isActive = false;
}

function updateDisplay(value) {
  display.innerText = value;
}
