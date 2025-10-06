import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [lastOperation, setLastOperation] = useState(null);

  
  const handleNumber = (num) => {
    if (display === '0' || lastOperation) {
      setDisplay(num);
      setLastOperation(null);
    } else {
      setDisplay(display + num);
    }
  };

  
  const handleDecimal = () => {
    if (!display.includes('.') && !lastOperation) {
      setDisplay(display + '.');
    } else if (lastOperation) {
      setDisplay('0.');
      setLastOperation(null);
    }
  };

  
  const handleOperation = (op) => {
    setLastOperation(op);
    
    
    if (expression) {
      try {
      
        const result = eval(expression + display);
        setExpression(result + op);
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }
    } else {
      setExpression(display + op);
    }
  };

  
  const calculateResult = () => {
    if (expression) {
      try {
        
        const result = eval(expression + display);
        setDisplay(result.toString());
        setExpression('');
        setLastOperation('=');
      } catch (error) {
        setDisplay('Error');
      }
    }
  };

  
  const clearDisplay = () => {
    setDisplay('0');
    setExpression('');
    setLastOperation(null);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="current-value">{display}</div>
      </div>
      <div className="buttons">
        <div className="button-row">
          <button onClick={() => handleOperation('/')}>/</button>
          <button onClick={() => handleOperation('*')}>×</button>
          <button onClick={() => handleOperation('+')}>+</button>
          <button onClick={() => handleOperation('-')}>−</button>
          <button onClick={clearDisplay}>DEL</button>
        </div>
        <div className="number-pad">
          <button onClick={() => handleNumber('7')}>7</button>
          <button onClick={() => handleNumber('8')}>8</button>
          <button onClick={() => handleNumber('9')}>9</button>
          <button onClick={() => handleNumber('4')}>4</button>
          <button onClick={() => handleNumber('5')}>5</button>
          <button onClick={() => handleNumber('6')}>6</button>
          <button onClick={() => handleNumber('1')}>1</button>
          <button onClick={() => handleNumber('2')}>2</button>
          <button onClick={() => handleNumber('3')}>3</button>
          <button onClick={() => handleNumber('0')}>0</button>
          <button onClick={handleDecimal}>.</button>
          <button onClick={calculateResult}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
