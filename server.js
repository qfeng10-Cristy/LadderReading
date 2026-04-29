const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(express.json({ limit: '50mb' }));

// Test route â€” open this in browser to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', claude: !!API_KEY });
});

// Claude proxy â€” receives request from browser, forwards to Anthropic
app.post('/api/chat', (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({
      error: { message: 'ANTHROPIC_API_KEY not set. Add it in Render â†’ Environment.' }
    });
  }

  const payload = JSON.stringify({
    model: 'claude-sonnet-4-5',
    max_tokens: req.body.max_tokens || 800,
    system: req.body.system || '',
    messages: req.body.messages || []
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01'
    }
  };

  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      // Forward Anthropic's response exactly as-is
      res.status(response.statusCode)
         .set('Content-Type', 'application/json')
         .send(data);
    });
  });

  request.on('error', (e) => {
    res.status(502).json({ error: { message: 'Proxy error: ' + e.message } });
  });

  request.write(payload);
  request.end();
});

// Serve static files â€” works whether index.html is in root or public/
const publicDir = path.join(__dirname, 'public');
const staticDir = fs.existsSync(path.join(publicDir, 'index.html')) ? publicDir : __dirname;
app.use(express.static(staticDir));
app.get('*', (_, res) => res.sendFile(path.join(staticDir, 'index.html')));

app.listen(PORT, () => console.log(`Ladder running on port ${PORT}`));
