import React, { useState } from "react";

const Calculator = (props) => {
  const [result, setResult] = useState(0);
  const [activeOperand, setActiveOperand] = useState(3); // + initially
  const operators = ["a", "b", "c", 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const operands = [
    { symbol: `/`, operation: (a, b) => a / b },
    { symbol: `*`, operation: (a, b) => a * b },
    { symbol: `-`, operation: (a, b) => a - b },
    { symbol: `+`, operation: (a, b) => a + b },
    { symbol: `=`, operation: (a, b) => (a === 0 ? b : a * 10 + b) },
  ];
  const operatorClick = (op) => {
    const operationMethod = operands[activeOperand].operation;
    const newResult = operationMethod(result, op);
    setResult(newResult);
    setActiveOperand(4);
  };

  const operationClick = (opIndex) => {
    setActiveOperand(opIndex);
  };
  return (
    <div className="container">
      <div className="result">{result}</div>
      <div className="buttons">
        <div className="operators">
          {operators.map((op) => {
            return (
              <button
                key={op}
                className="operator"
                onClick={() => operatorClick(op)}
              >
                {op}
              </button>
            );
          })}
        </div>
        <div className="operands">
          {operands.map(({ symbol, operation }, index) => {
            return (
              <button
                key={symbol}
                className="operand"
                onClick={() => operationClick(index)}
              >
                {symbol}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
