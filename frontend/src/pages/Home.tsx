import { Link } from 'react-router-dom'

const Home = () => {
  const pageStyle: React.CSSProperties = {
    paddingTop: '4rem',
  }

  const heroStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1c1d26 25%, #2a2b36 50%, #1c1d26 75%, #0f0f23 100%)',
    position: 'relative',
    overflow: 'hidden',
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    position: 'relative',
    zIndex: 10,
  }

  const cardStyle: React.CSSProperties = {
    background: 'rgba(15, 15, 35, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '25px',
    border: '1px solid rgba(115, 210, 57, 0.3)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
    padding: '3rem',
    textAlign: 'center',
  }

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(115, 210, 57, 0.1)',
    border: '1px solid rgba(115, 210, 57, 0.3)',
    borderRadius: '9999px',
    marginBottom: '1.5rem',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
    fontWeight: 900,
    marginBottom: '1.5rem',
    color: '#ffffff',
  }

  const accentStyle: React.CSSProperties = {
    color: '#73d239',
  }

  const subtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '2rem',
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '3rem',
    maxWidth: '42rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginBottom: '3rem',
  }

  const statStyle: React.CSSProperties = {
    textAlign: 'center',
  }

  const statNumberStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#73d239',
    marginBottom: '0.5rem',
  }

  const statLabelStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.75)',
  }

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: 'center',
  }

  const primaryButtonStyle: React.CSSProperties = {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #73d239, #059669)',
    borderRadius: '9999px',
    fontWeight: 600,
    textDecoration: 'none',
    color: '#fff',
    transition: 'transform 0.3s ease',
    boxShadow: '0 10px 30px rgba(115, 210, 57, 0.3)',
  }

  const secondaryButtonStyle: React.CSSProperties = {
    padding: '1rem 2rem',
    border: '2px solid rgba(115, 210, 57, 0.4)',
    borderRadius: '9999px',
    fontWeight: 600,
    textDecoration: 'none',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  }

  const featuresStyle: React.CSSProperties = {
    padding: '5rem 1rem',
    background: 'linear-gradient(135deg, #1c1d26 0%, #2a2b36 100%)',
  }

  const featuresTitleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#fff',
  }

  const featuresGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  }

  const featureCardStyle: React.CSSProperties = {
    ...cardStyle,
    padding: '1.5rem',
    transition: 'transform 0.3s ease',
  }

  const featureIconStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  }

  const featureTitleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#fff',
  }

  const featureTextStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.75)',
  }

  return (
    <div style={pageStyle}>
      <section style={heroStyle}>
        <div style={containerStyle}>
          <div style={cardStyle}>
            <div style={badgeStyle}>
              <span>🚀</span>
              <span style={{ color: '#73d239', fontSize: '0.875rem', fontWeight: 600 }}>AI-Powered Education</span>
            </div>
            
            <h1 style={titleStyle}>
              <span style={{ display: 'block' }}>EDUCATION</span>
              <span style={{ ...accentStyle, display: 'block' }}>KOTARO AI</span>
            </h1>
            
            <p style={subtitleStyle}>
              Tương lai của giáo dục khoa học
            </p>
            
            <p style={descriptionStyle}>
              Khám phá vũ trụ tri thức với <span style={{ color: '#73d239', fontWeight: 600 }}>Trí tuệ nhân tạo</span> tiên tiến
            </p>

            <div style={statsGridStyle}>
              <div style={statStyle}>
                <div style={statNumberStyle}>100+</div>
                <div style={statLabelStyle}>Thí nghiệm ảo</div>
              </div>
              <div style={statStyle}>
                <div style={statNumberStyle}>10000+</div>
                <div style={statLabelStyle}>Tài liệu học tập</div>
              </div>
              <div style={statStyle}>
                <div style={statNumberStyle}>100+</div>
                <div style={statLabelStyle}>Tiện ích học tập</div>
              </div>
            </div>

            <div style={buttonContainerStyle}>
              <Link to="/chatbot" style={primaryButtonStyle}>
                🤖 Trải nghiệm AI ngay →
              </Link>
              <a href="#features" style={secondaryButtonStyle}>
                Khám phá tính năng ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={featuresStyle}>
        <div style={containerStyle}>
          <h2 style={featuresTitleStyle}>
            Tính Năng Nổi Bật
          </h2>
          <div style={featuresGridStyle}>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🤖</div>
              <h3 style={featureTitleStyle}>Trợ Lý AI</h3>
              <p style={featureTextStyle}>
                Trả lời tự động, hỗ trợ học tập 24/7 với Gemini AI
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>📚</div>
              <h3 style={featureTitleStyle}>Thư Viện Số</h3>
              <p style={featureTextStyle}>
                Hàng ngàn tài liệu, ebook chất lượng cao
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🔬</div>
              <h3 style={featureTitleStyle}>Thí Nghiệm Ảo</h3>
              <p style={featureTextStyle}>
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
