import axios from 'axios'

// Cache để tránh duplicate requests
const requestCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 60000 // 1 phút

// Trong development, sử dụng relative path để đi qua Vite proxy
// Trong production, sử dụng VITE_API_URL nếu có, nếu không thì dùng relative path
const getBaseURL = () => {
  const envUrl = (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL
  if (envUrl) {
    return envUrl
  }
  // Development mode: sử dụng relative path để đi qua Vite proxy
  // Production: cũng dùng relative path nếu frontend và backend cùng domain
  return ''
}

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 giây timeout
})

// Helper function để check cache
const getCachedResponse = (url: string, params?: any) => {
  const cacheKey = `${url}${params ? JSON.stringify(params) : ''}`
  const cached = requestCache.get(cacheKey)
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

// Helper function để set cache
const setCachedResponse = (url: string, params: any, data: any) => {
  const cacheKey = `${url}${params ? JSON.stringify(params) : ''}`
  requestCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  })
}

// Response interceptor để cache responses và xử lý rate limit errors
api.interceptors.response.use(
  (response) => {
    // Cache GET responses
    if (response.config.method === 'get') {
      setCachedResponse(
        response.config.url || '',
        response.config.params,
        response.data
      )
    }
    return response
  },
  (error) => {
    // Xử lý ngrok rate limit error
    if (error.response?.status === 429 || 
        error.response?.data?.includes('ngrok') ||
        error.message?.includes('ngrok')) {
      console.warn('⚠️ Ngrok rate limit reached. Please wait a moment before retrying.')
      // Có thể hiển thị thông báo cho user
    }
    
    return Promise.reject(error)
  }
)

// Export cache helpers để sử dụng trong các API functions
export const cacheHelpers = {
  get: getCachedResponse,
  set: setCachedResponse,
  clear: () => requestCache.clear(),
}

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
    // Check cache trước
    const cached = getCachedResponse('/api/nasa/rovers')
    if (cached) {
      return { rovers: cached.data || [] }
    }
    
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
    // Check cache trước
    const cached = getCachedResponse('/api/nasa/photos', params)
    if (cached) {
      return { photos: cached.data || [] }
    }
    
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
