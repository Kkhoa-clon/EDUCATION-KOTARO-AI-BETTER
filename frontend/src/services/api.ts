import axios from 'axios'

const API_BASE_URL = (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Gemini API
export const geminiApi = {
  chat: async (data: {
    message?: string
    chatHistory?: any[]
    systemPrompt?: string
    fileData?: { data: string; mime_type: string }
  }) => {
    const response = await api.post('/api/gemini/chat', data)
    // Backend returns { status: 'success', text: ... }
    return { text: response.data.text || response.data.response || '' }
  },
  diagram: async (description: string) => {
    const response = await api.post('/api/gemini/diagram', { description })
    // Backend returns { status: 'success', mermaidCode: ... }
    return { mermaidCode: response.data.mermaidCode || '' }
  },
}

// NASA API
export const nasaApi = {
  getRovers: async () => {
    const response = await api.get('/api/nasa/rovers')
    // Backend returns { status: 'success', data: ... }
    return { rovers: response.data.data || [] }
  },
  getPhotos: async (params: {
    rover: string
    camera?: string
    earth_date?: string
    sol?: number
  }) => {
    const response = await api.get('/api/nasa/photos', { params })
    // Backend returns { status: 'success', data: ... }
    return { photos: response.data.data || [] }
  },
}

// Email API
export const emailApi = {
  send: async (data: {
    user_email: string
    message: string
    recaptcha_token?: string
  }) => {
    const response = await api.post('/api/email/send', data)
    return response.data
  },
}

export default api
