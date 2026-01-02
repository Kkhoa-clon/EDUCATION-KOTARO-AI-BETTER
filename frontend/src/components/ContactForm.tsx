import { useState } from 'react'
import { emailApi } from '../services/api'
import { handleError, showError } from '../utils/errorHandler'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.user_email || !formData.message) {
      showError('Vui lòng điền đầy đủ thông tin')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.user_email)) {
      showError('Email không hợp lệ')
      return
    }

    setLoading(true)
    try {
      await emailApi.send({
        user_email: formData.user_email,
        message: formData.message
      })
      setSuccess(true)
      setFormData({ user_email: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (error: any) {
      showError(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-banner">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">Liên Hệ</h1>
          <p className="text-text-secondary text-lg">
            Nếu bạn gặp vấn đề hoặc cần hỗ trợ, hãy liên hệ với chúng tôi
          </p>
        </div>

        <div className="glass p-8">
          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
              ✅ Đã gửi thành công! Chúng tôi sẽ liên hệ lại sớm.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">
                Email của bạn:
              </label>
              <input
                type="email"
                id="email"
                value={formData.user_email}
                onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                placeholder="Nhập Email của bạn..."
                required
                className="w-full bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-green"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-semibold">
                Nội dung:
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                placeholder="Nội dung bạn cần hỗ trợ hoặc mô tả lỗi..."
                required
                className="w-full bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-green resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent-green hover:bg-accent-green-hover rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '⏳ Đang gửi...' : '📧 Gửi tin nhắn'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
