import { useEffect, useState } from 'react'

const TraiDatPage = () => {
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
    transition: 'all 0.3s ease',
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
    transition: 'opacity 0.5s ease',
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
          <h1 style={heroTitleStyle}>Trái Đất</h1>
          <p style={heroSubtitleStyle}>
            Khám phá hành tinh xanh của chúng ta qua mô phỏng 3D NASA. 
            Tìm hiểu về khí hậu, địa chất, đại dương và sự sống trên Trái Đất!
          </p>
        </div>
      </section>

      <div style={nasaContainerStyle}>
        <div style={nasaHeaderStyle}>
          <h2 style={{ fontSize: '1.5em', margin: 0, fontWeight: 300 }}>NASA Eyes on the Earth</h2>
          <p style={{ fontSize: '0.9em', margin: '0.5em 0 0 0', opacity: 0.8 }}>Khám phá Trái Đất từ không gian</p>
        </div>
        
        <div style={iframeWrapperStyle}>
          <div style={loadingOverlayStyle}>
            <div style={spinnerStyle}></div>
          </div>
          <iframe
            src="https://eyes.nasa.gov/apps/earth/#/"
            allowFullScreen
            style={iframeStyle}
            onLoad={() => setLoading(false)}
            title="NASA Eyes on the Earth"
          />
        </div>
      </div>

      <div style={infoPanelStyle}>
        <h3 style={infoTitleStyle}>Về Trái Đất</h3>
        <p style={{ lineHeight: 1.6, marginBottom: '1em' }}>
          Trái Đất là hành tinh duy nhất trong hệ mặt trời có sự sống. 
          Việc nghiên cứu Trái Đất giúp chúng ta bảo vệ môi trường, dự báo thiên tai và hiểu rõ hơn về vị trí của con người trong vũ trụ.
        </p>
        <ul style={featureListStyle}>
          <li style={featureItemStyle}>
            <strong>Khám phá các hệ sinh thái, đại dương, khí hậu:</strong> Tìm hiểu về sự đa dạng sinh học và các vùng địa lý trên Trái Đất.
          </li>
          <li style={featureItemStyle}>
            <strong>Hiện tượng tự nhiên và tác động con người:</strong> Nghiên cứu các hiện tượng tự nhiên, biến đổi khí hậu và tác động của con người lên môi trường.
          </li>
          <li style={{ ...featureItemStyle, borderBottom: 'none' }}>
            <strong>Mô phỏng 3D tương tác:</strong> Trải nghiệm mô phỏng 3D trực tiếp từ NASA.
          </li>
        </ul>
        <h3 style={{ ...infoTitleStyle, marginTop: '2em' }}>Hướng dẫn sử dụng</h3>
        <p style={{ lineHeight: 1.6, marginBottom: '1em' }}>
          Sử dụng chuột để xoay, thu phóng và di chuyển trong không gian 3D. 
          Click vào các khu vực trên Trái Đất để xem thông tin chi tiết. 
          Sử dụng thanh điều khiển để điều chỉnh góc nhìn và khám phá các vùng khác nhau trên hành tinh xanh.
        </p>
      </div>
    </div>
  )
}

export default TraiDatPage
