import { useEffect, useState } from 'react';
import './App.css';

function App() {
  


  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");

  
  const [currentTime, setCurrentTime] = useState(new Date());

  
  const [feedback, setFeedback] = useState({
    Excellent: 0,
    Good: 0,
    Average: 0,
    Poor: 0
  });


  
  const [participantCount, setParticipantCount] = useState(0);

  // clock

useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 2000);
    return () => clearInterval(timer);
  }, []);





  //  feedback
  useEffect(() => {
    const categories = ["Excellent", "Good", "Average", "Poor"];
    const crowdTimer = setInterval(() => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setFeedback(prev => ({ ...prev, [randomCategory]: prev[randomCategory] + 1 }));
    }, 2000);
    return () => clearInterval(crowdTimer);
  }, []);

  // Format date/time
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

  
  const handleFeedback = (category) => {
    setFeedback(prev => ({ ...prev, [category]: prev[category] + 1 }));
    setParticipantCount(count => count + 1);
  };

 
  const increment = () => setParticipantCount(c => c + 1);
  const decrement = () => setParticipantCount(c => ( c - 1 ));
  const reset = () => setParticipantCount(0);
  const incrementByFive = () => setParticipantCount(c => c + 5);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Feedback Dashboard</h1>
        
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={{ marginRight: 10 }}
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={e => setSurname(e.target.value)}
          />
          
            <h2 style={{ marginTop: 20 }}>Welcome, {firstName} {surname}!</h2>
         
        </div>
        {/* Date and time */}
        <div className="time-display">
          <h3>{formatDate(currentTime)}</h3>
          <h4>{formatTime(currentTime)}</h4>
        </div>
        {/* Feedback panel */}
        <div style={{ margin: '30px 0' }}>
          <h3>Submit Your Feedback</h3>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 10 }}>
            {Object.keys(feedback).map(category => (
              <div key={category} style={{ textAlign: 'center' }}>
                <button onClick={() => handleFeedback(category)} style={{ padding: '10px 20px', fontWeight: 'bold' }}>{category}</button>
                <div style={{ marginTop: 8 }}>Total: {feedback[category]}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Participant feedback counter */}
        <div style={{ margin: '20px 0' }}>
          <h3>Your Feedback Count: {participantCount}</h3>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
            <button onClick={incrementByFive}>Increment by 5</button>
            
          </div>
        </div>
        <p style={{ marginTop: 30, color: 'white' }}>
          Time and feedbacks update live. feedback is updated  every 2 seconds.
        </p>
      </header>
    </div>
  );
}

export default App;
