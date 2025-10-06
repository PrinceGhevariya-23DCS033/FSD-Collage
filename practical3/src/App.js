import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to charusat Clock</h1>
        <div className="time-display">
          <h2>{formatDate(currentTime)}</h2>
          <h3>{formatTime(currentTime)}</h3>
        </div>
        <p>Time updates every second using setInterval</p>
      </header>
    </div>
  );
}

export default App;
