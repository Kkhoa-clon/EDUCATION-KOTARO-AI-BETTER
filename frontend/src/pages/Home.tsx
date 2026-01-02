import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-banner relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent-green/20 rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="glass p-12 max-w-4xl mx-auto animate-slide-in-up">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green/10 border border-accent-green/30 rounded-full mb-6">
                <span>🚀</span>
                <span className="text-accent-green text-sm font-semibold">AI-Powered Education</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                <span className="block">EDUCATION</span>
                <span className="block text-accent-green">KOTARO AI</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-text-secondary mb-8">
                Tương lai của giáo dục khoa học
              </p>
              
              <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
                Khám phá vũ trụ tri thức với <span className="text-accent-green font-semibold">Trí tuệ nhân tạo</span> tiên tiến
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-green mb-2">100+</div>
                  <div className="text-text-secondary">Thí nghiệm ảo</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-green mb-2">10000+</div>
                  <div className="text-text-secondary">Tài liệu học tập</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-green mb-2">100+</div>
                  <div className="text-text-secondary">Tiện ích học tập</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/chatbot"
                  className="px-8 py-4 bg-gradient-to-r from-accent-green to-accent-blue rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-accent-green/30"
                >
                  🤖 Trải nghiệm AI ngay →
                </Link>
                <Link
                  to="#features"
                  className="px-8 py-4 border-2 border-accent-green/40 rounded-full font-semibold hover:bg-accent-green/10 transition-colors"
                >
                  Khám phá tính năng ↓
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Tính Năng Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">Trợ Lý AI</h3>
              <p className="text-text-secondary">
                Trả lời tự động, hỗ trợ học tập 24/7 với Gemini AI
              </p>
            </div>
            <div className="glass p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Thư Viện Số</h3>
              <p className="text-text-secondary">
                Hàng ngàn tài liệu, ebook chất lượng cao
              </p>
            </div>
            <div className="glass p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-2">Thí Nghiệm Ảo</h3>
              <p className="text-text-secondary">
                Mô phỏng 2D/3D các thí nghiệm khoa học
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
