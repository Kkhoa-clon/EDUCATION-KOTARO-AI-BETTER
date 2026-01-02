import { useEffect, useState } from 'react'

const TieuHanhTinhPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const containerStyle: React.CSSProperties = {
    marginTop: '3.5em',
    minHeight: 'calc(100vh - 3.5em)',
    display: 'flex',
    flexDirection: 'column',
  }

  const heroStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #1c1d26 0%, #272833 50%, #1c1d26 100%)',
    padding: '4em 2em',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  }

  const heroTitleStyle: React.CSSProperties = {
    fontSize: '3em',
    fontWeight: 300,
    color: '#ffffff',
    marginBottom: '0.5em',
    textShadow: '0 2px 10px rgba(115, 210, 57, 0.3)',
  }

  const heroSubtitleStyle: React.CSSProperties = {
    fontSize: '1.2em',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '2em',
    lineHeight: 1.6,
  }

  const nasaContainerStyle: React.CSSProperties = {
    flex: 1,
    position: 'relative',
    background: '#000',
    borderRadius: '15px',
    margin: '2em',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
  }

  const nasaHeaderStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #73d239, #8ee63e)',
    color: '#000',
    padding: '1em 2em',
    textAlign: 'center',
    fontWeight: 300,
  }

  const iframeWrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 300px)',
    minHeight: '500px',
  }

  const iframeStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    background: '#000',
  }

  const loadingOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#000',
    display: loading ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  }

  const spinnerStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    border: '3px solid rgba(115, 210, 57, 0.3)',
    borderTop: '3px solid #73d239',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  }

  const infoPanelStyle: React.CSSProperties = {
    background: 'rgba(39, 40, 51, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    margin: '2em',
    padding: '2em',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  }

  const infoTitleStyle: React.CSSProperties = {
    color: '#73d239',
    fontSize: '1.5em',
    marginBottom: '1em',
    fontWeight: 300,
  }

  const featureListStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
  }

  const featureItemStyle: React.CSSProperties = {
    padding: '0.5em 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    paddingLeft: '1.5em',
  }

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <section style={heroStyle}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={heroTitleStyle}>Tiểu Hành Tinh</h1>
          <p style={heroSubtitleStyle}>
            Khám phá các tiểu hành tinh, thiên thạch và các vật thể nhỏ trong hệ mặt trời. 
            Tìm hiểu về nguồn gốc, đặc điểm và vai trò của chúng trong vũ trụ!
          </p>
        </div>
      </section>

      <div style={nasaContainerStyle}>
        <div style={nasaHeaderStyle}>
          <h2 style={{ fontSize: '1.5em', margin: 0, fontWeight: 300 }}>NASA Eyes on Asteroids</h2>
          <p style={{ fontSize: '0.9em', margin: '0.5em 0 0 0', opacity: 0.8 }}>Khám phá các tiểu hành tinh và thiên thạch</p>
        </div>
        
        <div style={iframeWrapperStyle}>
          <div style={loadingOverlayStyle}>
            <div style={spinnerStyle}></div>
          </div>
          <iframe
            src="https://eyes.nasa.gov/apps/asteroids/#/home"
            allowFullScreen
            style={iframeStyle}
            onLoad={() => setLoading(false)}
            title="NASA Eyes on Asteroids"
          />
        </div>
      </div>

      <div style={infoPanelStyle}>
        <h3 style={infoTitleStyle}>Về Tiểu Hành Tinh</h3>
        <p style={{ lineHeight: 1.6, marginBottom: '1em' }}>
          Tiểu hành tinh là các thiên thể nhỏ quay quanh Mặt Trời, chủ yếu nằm ở vành đai giữa Sao Hỏa và Sao Mộc. 
          Chúng giúp các nhà khoa học nghiên cứu về sự hình thành và tiến hóa của hệ mặt trời.
        </p>
        <ul style={featureListStyle}>
          <li style={featureItemStyle}>
            <strong>Khám phá hàng ngàn tiểu hành tinh và thiên thạch:</strong> Tìm hiểu về các vật thể nhỏ trong hệ mặt trời.
          </li>
          <li style={featureItemStyle}>
            <strong>Va chạm và nguy cơ:</strong> Nghiên cứu các vụ va chạm, nguy cơ tiềm ẩn với Trái Đất.
          </li>
          <li style={{ ...featureItemStyle, borderBottom: 'none' }}>
            <strong>Mô phỏng 3D tương tác:</strong> Trải nghiệm mô phỏng 3D trực tiếp từ NASA.
          </li>
        </ul>
        <h3 style={{ ...infoTitleStyle, marginTop: '2em' }}>Hướng dẫn sử dụng</h3>
        <p style={{ lineHeight: 1.6, marginBottom: '1em' }}>
          Sử dụng chuột để xoay, thu phóng và di chuyển trong không gian 3D. 
          Click vào các tiểu hành tinh để xem thông tin chi tiết. 
          Sử dụng thanh điều khiển để điều chỉnh góc nhìn và khám phá các vật thể khác nhau.
        </p>
      </div>
    </div>
  )
}

export default TieuHanhTinhPage
