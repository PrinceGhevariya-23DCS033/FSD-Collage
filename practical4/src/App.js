import { useState } from 'react';
import './App.css';

function App() {
  
  const [count, setCount] = useState(0);
  
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  

  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(count - 1);
  };
  
  const reset = () => {
    setCount(0);
  };
  
  const incrementFive = () => {
    setCount(count + 5);
  };

  return (
    <div className="counter-app">
      <h1>Counter App</h1>
      
      <div className="counter-section">
        <h2>Count: {count}</h2>
        <div className="button-group">
          <button onClick={reset}>Reset</button>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={incrementFive}>Increment 5</button>
        </div>
      </div>
      
      <div className="name-section">
        <h2>Welcome to CHARUSAT!!!</h2>
        <div className="input-group">
          <label>First Name: </label>
          <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label>Last Name: </label>
          <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        
        <div className="name-display">
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
