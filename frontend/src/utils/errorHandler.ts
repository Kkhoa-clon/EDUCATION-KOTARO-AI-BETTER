export class ApiError extends Error {
  statusCode?: number
  status?: string

  constructor(message: string, statusCode?: number, status?: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.status = status
  }
}

export const handleError = (error: any): string => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.message || error.response.data?.error || 'Lỗi không xác định'
    return message
  } else if (error.request) {
    // Request made but no response
    return 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet.'
  } else {
    // Something else happened
    return error.message || 'Đã xảy ra lỗi không xác định'
  }
}

export const showError = (message: string) => {
  // TODO: Integrate với toast notification library
  console.error('[ERROR]', message)
  alert(message) // Temporary - sẽ thay bằng toast
}
