import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isListening, setIsListening] = useState(false);

  
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  
  const addTask = (e) => {
    e.preventDefault();
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


  const startEdit = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  
  const saveEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editValue } : task
    ));
    setEditId(null);
    setEditValue('');
  };

  // Voice input functionality
  const startVoiceInput = () => {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Simple, reliable settings
    recognition.continuous = false;  // Stop after one result
    recognition.interimResults = false;  // Only final results
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      console.log('Voice recognition started. Speak now...');
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log('Recognized:', result);
      
      if (result.trim()) {
        // Automatically add the task
        const newTask = {
          id: Date.now(),
          text: result.trim(),
          completed: false
        };
        
        setTasks(prevTasks => [...prevTasks, newTask]);
        console.log('Task added:', result.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone permission and try again.');
      } else if (event.error === 'no-speech') {
        alert('No speech detected. Please speak clearly and try again.');
      } else {
        alert('Speech recognition error. Please try again.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Voice recognition ended');
    };

    // Start recognition
    try {
      recognition.start();
    } catch (error) {
      setIsListening(false);
      alert('Failed to start voice recognition. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <h1>Get Things Done!</h1>
      
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="What is the task today?"
          className="task-input"
        />
        <button 
          type="button" 
          onClick={startVoiceInput} 
          className={`mic-button ${isListening ? 'listening' : ''}`}
          disabled={isListening}
        >
          {isListening ? '🎤' : '🎙️'}
        </button>
        <button type="submit" className="add-button">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Add one to get started!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item">
              {editId === task.id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => saveEdit(task.id)} className="save-btn">
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className={task.completed ? 'completed' : ''}>
                      {task.text}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => startEdit(task.id, task.text)} className="edit-btn">
                      ✏️
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="delete-btn">
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
