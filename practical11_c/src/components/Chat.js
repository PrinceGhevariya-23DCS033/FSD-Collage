import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);
  const ws = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isUsernameSet) {
      // Connect to WebSocket server
      ws.current = new WebSocket('ws://localhost:8080');
      
      ws.current.onopen = () => {
        console.log('Connected to chat server');
        // Send username to server
        ws.current.send(JSON.stringify({
          type: 'join',
          username: username
        }));
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'message') {
          setMessages(prev => [...prev, {
            id: Date.now(),
            username: data.username,
            text: data.text,
            timestamp: new Date(data.timestamp)
          }]);
        } else if (data.type === 'userList') {
          setOnlineUsers(data.users.filter(user => user !== username));
        }
      };

      ws.current.onclose = () => {
        console.log('Disconnected from chat server');
      };

      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    }
  }, [isUsernameSet, username]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && ws.current) {
      ws.current.send(JSON.stringify({
        type: 'message',
        text: newMessage,
        username: username,
        timestamp: new Date().toISOString()
      }));
      setNewMessage('');
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  if (!isUsernameSet) {
    return (
      <div className="chat-container">
        <div className="username-form">
          <h2>Join Chat</h2>
          <form onSubmit={handleUsernameSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="username-input"
              required
            />
            <button type="submit" className="join-btn">Join Chat</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-app">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h3>Live Chat</h3>
          <div className="user-info">
            <span className="username">{username}</span>
            <span className="status online">●</span>
          </div>
        </div>
        
        <div className="online-users">
          <h4>Online Users ({onlineUsers.length})</h4>
          <div className="users-list">
            {onlineUsers.map((user, index) => (
              <div 
                key={index} 
                className={`user-item ${selectedUser === user ? 'selected' : ''}`}
                onClick={() => handleUserSelect(user)}
              >
                <span className="user-avatar">{user.charAt(0).toUpperCase()}</span>
                <span className="user-name">{user}</span>
                <span className="user-status">●</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-features">
          <div className="feature-item">💬 Messages</div>
          <div className="feature-item">👥 Users</div>
          <div className="feature-item">🔔 Notifications</div>
          <div className="feature-item">⚙️ Settings</div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        <div className="chat-header">
          <h3>
            {selectedUser ? `Chat with ${selectedUser}` : 'General Chat'}
          </h3>
          <div className="chat-info">
            <span>{messages.length} messages</span>
          </div>
        </div>

        <div className="messages-container">
          <div className="messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.username === username ? 'own-message' : ''}`}
              >
                <div className="message-header">
                  <span className="message-author">{message.username}</span>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-text">{message.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
          />
          <button type="submit" className="send-btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
