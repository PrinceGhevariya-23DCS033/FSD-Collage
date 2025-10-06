const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const COUNTER_PATH = path.join(__dirname, 'counter.json');

app.use(express.json());
app.use(express.static('public'));


const loadCount = () => {
  if (!fs.existsSync(COUNTER_PATH)) fs.writeFileSync(COUNTER_PATH, JSON.stringify({ count: 0 }));
  return JSON.parse(fs.readFileSync(COUNTER_PATH)).count;
};


const saveCount = (count) => {
  fs.writeFileSync(COUNTER_PATH, JSON.stringify({ count }));
};


app.get('/api/count', (req, res) => {
  res.json({ count: loadCount() });
});


app.post('/api/update', (req, res) => {
  const { count } = req.body;
  if (typeof count === 'number' && count >= 0) {
    saveCount(count);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid count' });
  }
});


app.post('/api/reset', (req, res) => {
  saveCount(0);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
