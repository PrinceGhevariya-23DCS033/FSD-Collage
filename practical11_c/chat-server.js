const WebSocket = require('ws');
const http = require('http');

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

console.log('Chat server starting...');

wss.on('connection', function connection(ws) {
  console.log('New client connected');
  
  ws.on('message', function incoming(data) {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'join') {
        // Store client with username
        clients.set(ws, message.username);
        console.log(`${message.username} joined the chat`);
        
        // Send updated user list to all clients
        broadcastUserList();
        
        // Send welcome message
        broadcast({
          type: 'message',
          username: 'System',
          text: `${message.username} joined the chat`,
          timestamp: new Date().toISOString()
        });
      } 
      else if (message.type === 'message') {
        // Broadcast message to all clients
        console.log(`${message.username}: ${message.text}`);
        broadcast({
          type: 'message',
          username: message.username,
          text: message.text,
          timestamp: message.timestamp
        });
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', function() {
    const username = clients.get(ws);
    if (username) {
      console.log(`${username} left the chat`);
      clients.delete(ws);
      
      // Send updated user list to all clients
      broadcastUserList();
      
      // Send leave message
      broadcast({
        type: 'message',
        username: 'System',
        text: `${username} left the chat`,
        timestamp: new Date().toISOString()
      });
    }
  });

  ws.on('error', function(error) {
    console.error('WebSocket error:', error);
  });
});

function broadcast(message) {
  const messageStr = JSON.stringify(message);
  clients.forEach((username, client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

function broadcastUserList() {
  const userList = Array.from(clients.values());
  const message = JSON.stringify({
    type: 'userList',
    users: userList
  });
  
  clients.forEach((username, client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, function() {
  console.log(`Chat server is running on port ${PORT}`);
  console.log(`WebSocket server is ready for connections`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
