const display = document.getElementById('display');
let expression = '';

const updateDisplay = () => {
  display.textContent = expression || '0';
};

const sanitize = (value) => {
  return value.replace(/[^0-9.+\-*/]/g, '');
};

const calculate = () => {
  if (!expression) return;
  const safeExpression = sanitize(expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'));
  try {
    const result = Function(`"use strict"; return (${safeExpression})`)();
    expression = String(result);
  } catch (error) {
    expression = 'Error';
  }
};

const appendValue = (value) => {
  if (expression === 'Error') expression = '';
  if (value === '.' && expression.endsWith('.')) return;
  expression += value;
};

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
      appendValue(number);
      updateDisplay();
      return;
    }

    switch (action) {
      case 'clear':
        expression = '';
        updateDisplay();
        break;
      case 'delete':
        expression = expression.slice(0, -1);
        updateDisplay();
        break;
      case 'operator':
        appendValue(button.textContent);
        updateDisplay();
        break;
      case 'equals':
        calculate();
        updateDisplay();
        break;
    }
  });
});

const keyMap = {
  'Enter': 'equals',
  '=': 'equals',
  'Backspace': 'delete',
  'Delete': 'clear',
  'Escape': 'clear',
  'c': 'clear',
  'C': 'clear',
};

const operators = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
};

window.addEventListener('keydown', (event) => {
  const key = event.key;
  if (keyMap[key]) {
    event.preventDefault();
    const action = keyMap[key];

    if (action === 'clear') {
      expression = '';
    } else if (action === 'delete') {
      expression = expression.slice(0, -1);
    } else if (action === 'equals') {
      calculate();
    }

    updateDisplay();
    return;
  }

  if (operators[key]) {
    event.preventDefault();
    appendValue(operators[key]);
    updateDisplay();
    return;
  }

  if (/^[0-9.]$/.test(key)) {
    event.preventDefault();
    appendValue(key);
    updateDisplay();
  }
});
