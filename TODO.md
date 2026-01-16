# TODO: Replace Gemini with Ollama in Kotaro AI

## Completed Tasks
- [x] Update backend/package.json: Remove @google/generative-ai, add node-fetch
- [x] Replace backend/routes/gemini.js with Ollama API integration using Qwen 2.5 Coder 7B model
- [x] Update frontend/src/components/Chatbot.tsx to call /api/gemini/chat instead of simulating responses
- [x] Install backend dependencies
- [x] Change model from Mistral to Qwen 2.5 Coder 7B as per user preference

## Next Steps
- [x] Ollama server is already running
- [x] Qwen 2.5 Coder 7B model is available
- [x] Frontend is running on http://localhost:5174/
- [ ] Start backend server: `cd backend && npm run dev`
- [ ] Test the chatbot functionality by sending messages
