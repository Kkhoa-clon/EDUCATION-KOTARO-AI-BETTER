# AI Coding Assistant Instructions for EDUCATION KOTARO AI

## Project Overview
This is a Vietnamese educational AI platform with a React frontend and Node.js/Express backend. The platform provides AI-assisted learning tools, digital library, astronomy exploration with NASA APIs, virtual experiments, and quiz functionality.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite, located in `frontend/`
- **Backend**: Node.js + Express, located in `backend/`
- **Styling**: Material-UI (MUI) with `sx` prop for component styling
- **Routing**: React Router for frontend navigation
- **Data**: Static JSON files in `frontend/public/data/` for subject content

## Key Directories & Files
- `frontend/src/pages/`: Page components (Home, Quiz, subject pages)
- `frontend/src/components/`: Reusable components (Header, Footer, Chatbot)
- `frontend/src/services/api.ts`: API client for backend calls
- `backend/routes/`: API route handlers (gemini.js, nasa.js, email.js, quiz.js)

## Development Workflow
- Run both servers: `npm run dev` (from root, uses concurrently)
- Frontend dev: `cd frontend && npm run dev` (port 5173)
- Backend dev: `cd backend && npm run dev` (port 5000)
- Build: `npm run build` (builds both frontend and backend)

## Coding Patterns
### Frontend Components
Use MUI components with `sx` prop for styling:
```tsx
<Box sx={{ padding: 2, backgroundColor: 'primary.main' }}>
  <Typography variant="h4">Content</Typography>
</Box>
```

### API Calls
Use the API service in `frontend/src/services/api.ts`:
```tsx
import api from '../services/api'
const response = await api.post('/gemini/chat', { message })
```

### Page Structure
Pages follow this pattern:
```tsx
const PageName = () => {
  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Content */}
      </Container>
    </Box>
  )
}
```

### Backend Routes
Routes handle API requests with error handling:
```js
router.post('/endpoint', async (req, res) => {
  try {
    // Implementation
    res.json({ status: 'success', data })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
})
```

## External APIs
- **Gemini AI**: For chatbot functionality (`/api/gemini/chat`)
- **NASA APIs**: APOD images, solar system data
- **OpenTDB**: Quiz questions (processed by backend at `/api/quiz/generate`)
- **EmailJS**: Contact form (called directly from frontend)

## Data Management
- Educational content in Vietnamese
- Static data served from `frontend/public/`

## Quiz System
- Backend processes OpenTDB API data: decodes HTML entities, translates to Vietnamese, shuffles answers
- Supports all OpenTDB categories, difficulties, and question types (multiple choice / true-false)
- Frontend calls `/api/quiz/generate` with config parameters

## Common Tasks
- Adding new pages: Create in `pages/`, add route in `App.tsx`
- Implementing backend features: Follow existing route patterns in `backend/routes/`
- Styling: Use MUI `sx` prop, reference theme colors
- API integration: Add to `api.ts` for frontend calls
- Quiz customization: Update categories in Quiz.tsx, add processing logic in quiz.js

## Notes
- Backend routes are implemented (contrary to some documentation)
- Use Vietnamese for UI text and educational content
- Follow MUI design system for consistent styling
- Test API endpoints at `/api/health` for backend status
- Quiz questions are automatically translated to Vietnamese by backend