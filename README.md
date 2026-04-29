# Ladder — AI Study Reader (Gemini Edition)

## Get a free Gemini API key
1. Go to https://aistudio.google.com
2. Sign in with your Google account
3. Click "Get API Key" — it's free, no credit card needed

## Run locally
```bash
npm install
GEMINI_API_KEY=your_key_here node server.js
# Open http://localhost:3000
```

## Deploy to Render.com (free)
1. Push this folder to a GitHub repo
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variable: `GEMINI_API_KEY` = your free Gemini key
7. Click Deploy — live at e.g. https://ladder-app.onrender.com

## Install as phone app (PWA)
Once deployed:
- **iPhone**: Open URL in Safari → Share → "Add to Home Screen"
- **Android**: Open in Chrome → three-dot menu → "Install App"

## Environment variables
| Variable        | Description                        |
|-----------------|------------------------------------|
| `GEMINI_API_KEY` | Free key from aistudio.google.com |
| `PORT`           | Port to listen on (default: 3000) |
