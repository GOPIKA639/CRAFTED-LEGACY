const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'content.json');

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (e) {
    console.error('Failed to read content file', e);
    return {};
  }
}

function writeData(obj) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Failed to write content file', e);
    return false;
  }
}

app.get('/api/content', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/api/content', (req, res) => {
  const content = req.body || {};
  const ok = writeData(content);
  if (!ok) return res.status(500).json({ success: false });
  return res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Content server running on port ${PORT}`);
});
