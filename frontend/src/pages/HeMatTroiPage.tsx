import { useEffect, useState } from 'react'

const HeMatTroiPage = () => {
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
          <h1 style={heroTitleStyle}>Hệ Mặt Trời</h1>
          <p style={heroSubtitleStyle}>
            Khám phá vũ trụ với công cụ tương tác 3D từ NASA. 
            Trải nghiệm Hệ Mặt Trời như chưa từng có với công nghệ Eyes on the Solar System.
          </p>
        </div>
      </section>

      <div style={nasaContainerStyle}>
        <div style={nasaHeaderStyle}>
          <h2 style={{ fontSize: '1.5em', margin: 0, fontWeight: 300 }}>NASA Eyes on the Solar System</h2>
          <p style={{ fontSize: '0.9em', margin: '0.5em 0 0 0', opacity: 0.8 }}>Công cụ tương tác 3D chính thức từ NASA</p>
        </div>
        
        <div style={iframeWrapperStyle}>
          <div style={loadingOverlayStyle}>
            <div style={spinnerStyle}></div>
          </div>
          <iframe
            src="https://eyes.nasa.gov/apps/solar-system/#/home"
            allowFullScreen
            style={iframeStyle}
            onLoad={() => setLoading(false)}
            title="NASA Eyes on the Solar System"
          />
        </div>
      </div>

      <div style={infoPanelStyle}>
        <h3 style={infoTitleStyle}>Tính năng nổi bật</h3>
        <ul style={featureListStyle}>
          <li style={featureItemStyle}>
            <strong>Khám phá 3D:</strong> Tương tác với các hành tinh, vệ tinh và tiểu hành tinh trong không gian 3D
          </li>
          <li style={featureItemStyle}>
            <strong>Dữ liệu thời gian thực:</strong> Theo dõi vị trí chính xác của các thiên thể trong Hệ Mặt Trời
          </li>
          <li style={featureItemStyle}>
            <strong>Thông tin chi tiết:</strong> Tìm hiểu về kích thước, khối lượng, quỹ đạo và đặc điểm của từng thiên thể
          </li>
          <li style={featureItemStyle}>
            <strong>Mô phỏng chuyển động:</strong> Quan sát chuyển động của các hành tinh theo thời gian thực
          </li>
          <li style={{ ...featureItemStyle, borderBottom: 'none' }}>
            <strong>Giao diện thân thiện:</strong> Dễ dàng điều hướng và tương tác trên mọi thiết bị
          </li>
        </ul>
        
        <h3 style={{ ...infoTitleStyle, marginTop: '2em' }}>Hướng dẫn sử dụng</h3>
        <p style={{ lineHeight: 1.6, marginBottom: '1em' }}>
          Sử dụng chuột để xoay, thu phóng và di chuyển trong không gian 3D. 
          Click vào các thiên thể để xem thông tin chi tiết. 
          Sử dụng thanh điều khiển để điều chỉnh tốc độ thời gian và quan sát chuyển động của các hành tinh.
        </p>
      </div>
    </div>
  )
}

export default HeMatTroiPage
