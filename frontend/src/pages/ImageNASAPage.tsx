import { useState, useEffect } from 'react'

interface APODData {
  title: string
  explanation: string
  url: string
  media_type: string
}

const ImageNASAPage = () => {
  const [apodData, setApodData] = useState<APODData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')

  const apiKey = "QjukGaZAtCoeMB9z9M2h36VG0gEauYpVOXLEPGyP"

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    setSelectedDate(`${year}-${month}-${day}`)
    fetchAPOD(`${year}-${month}-${day}`)
  }, [])

  const translateText = async (text: string): Promise<string> => {
    try {
      const res = await fetch('https://lingva.ml/api/v1/en/vi/' + encodeURIComponent(text))
      const data = await res.json()
      return data.translation || text
    } catch {
      return text
    }
  }

  const fetchAPOD = async (date?: string) => {
    setLoading(true)
    setError('')
    
    const dateStr = date || selectedDate
    if (dateStr) {
      const selected = new Date(dateStr)
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      if (selected > today) {
        setError('Ngày không hợp lệ! Vui lòng chọn ngày không lớn hơn ngày hiện tại.')
        setLoading(false)
        return
      }
    }

    try {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${dateStr ? `&date=${dateStr}` : ''}`
      const response = await fetch(url)
      const data = await response.json()

      if (data.media_type === 'image') {
        const [viTitle, viExplanation] = await Promise.all([
          translateText(data.title),
          translateText(data.explanation)
        ])
        
        setApodData({
          title: viTitle,
          explanation: viExplanation,
          url: data.url,
          media_type: data.media_type
        })
      } else {
        setError('Hôm nay không có hình ảnh, có thể là video.')
      }
    } catch (err) {
      setError('Lỗi tải dữ liệu! Vui lòng kiểm tra lại kết nối mạng.')
    } finally {
      setLoading(false)
    }
  }

  const handleToday = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`
    setSelectedDate(dateStr)
    fetchAPOD(dateStr)
  }

  const downloadImage = () => {
    if (!apodData?.url) return
    
    const a = document.createElement('a')
    a.href = apodData.url
    a.setAttribute('download', 'nasa-apod.jpg')
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const containerStyle: React.CSSProperties = {
    marginTop: '3.5rem',
    minHeight: 'calc(100vh - 3.5rem)',
    width: '100%',
    overflowX: 'hidden',
  }

  const heroStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(28, 29, 38, 0.7) 0%, rgba(39, 40, 51, 0.7) 50%, rgba(28, 29, 38, 0.7) 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '2rem 1rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const contentWrapperStyle: React.CSSProperties = {
    padding: '2rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  }

  const mainSectionStyle: React.CSSProperties = {
    background: 'rgba(39, 40, 51, 0.5)',
    borderRadius: '20px',
    padding: '2rem 1rem',
    marginBottom: '2rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(115, 210, 57, 0.1)',
  }

  const formGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
    maxWidth: '600px',
    margin: '0 auto',
  }

  const formInputStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    border: '1px solid rgba(115, 210, 57, 0.3)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontSize: '1rem',
  }

  const buttonStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #73d239, #5fb82f)',
    color: '#fff',
  }

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #4a4a4a, #2a2a2a)',
    color: '#fff',
  }

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    margin: '2rem 0',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    background: '#000',
    cursor: 'pointer',
  }

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'block',
    maxHeight: '70vh',
    objectFit: 'cover',
  }

  const buttonsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    margin: '2rem 0',
    flexWrap: 'wrap',
  }

  const apodButtonStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    border: '1px solid rgba(115, 210, 57, 0.5)',
    borderRadius: '8px',
    background: 'rgba(115, 210, 57, 0.1)',
    color: '#73d239',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  const descriptionStyle: React.CSSProperties = {
    marginTop: '2rem',
    padding: '2rem',
    background: 'rgba(28, 29, 38, 0.8)',
    borderRadius: '15px',
    border: '1px solid rgba(115, 210, 57, 0.1)',
    textAlign: 'left',
  }

  const modalStyle: React.CSSProperties = {
    display: showModal ? 'flex' : 'none',
    position: 'fixed',
    zIndex: 2000,
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  }

  const modalImgStyle: React.CSSProperties = {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
  }

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    fontSize: '3rem',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 2001,
  }

  return (
    <div style={containerStyle}>
      <section style={heroStyle}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 300, color: '#ffffff', marginBottom: '1rem' }}>
            Ảnh Thiên Văn Thời Gian Thực
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255, 255, 255, 0.8)' }}>
            Khám phá vũ trụ mỗi ngày với Ảnh Thiên Văn NASA (APOD)<br />
            Xem, tải về và tìm hiểu ý nghĩa các bức ảnh nổi bật từ NASA
          </p>
        </div>
      </section>

      <div style={contentWrapperStyle}>
        <section style={mainSectionStyle}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#73d239', marginBottom: '0.5rem', fontWeight: 300 }}>
              Ảnh Thiên Văn Trong Ngày với NASA
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>
              Tự động dịch sang tiếng Việt cho học sinh và người yêu thiên văn
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); fetchAPOD(); }} style={{ marginBottom: '2rem' }}>
            <div style={formGridStyle}>
              <div>
                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Chọn ngày
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={formInputStyle}
                  required
                />
              </div>
              <div>
                <button type="submit" style={primaryButtonStyle} disabled={loading}>
                  {loading ? 'Đang tải...' : 'Xem ảnh'}
                </button>
              </div>
              <div>
                <button type="button" onClick={handleToday} style={secondaryButtonStyle}>
                  Hôm nay
                </button>
              </div>
            </div>
          </form>

          <div style={{ textAlign: 'center' }}>
            {loading && <h3 style={{ color: '#73d239', fontSize: '1.5rem', minHeight: '2.5rem' }}>Đang tải...</h3>}
            
            {error && (
              <>
                <h3 style={{ color: '#e74c3c', fontSize: '1.5rem', minHeight: '2.5rem' }}>{error}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginTop: '1rem' }}>{error}</p>
              </>
            )}

            {apodData && !loading && !error && (
              <>
                <h3 style={{ color: '#73d239', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', marginBottom: '1.5rem', fontWeight: 300 }}>
                  {apodData.title}
                </h3>

                <div style={imageContainerStyle} onClick={() => setShowModal(true)}>
                  <img src={apodData.url} alt={apodData.title} style={imageStyle} />
                </div>

                <div style={buttonsContainerStyle}>
                  <button onClick={downloadImage} style={{ ...apodButtonStyle, background: 'linear-gradient(135deg, #73d239, #5fb82f)', color: '#fff' }}>
                    📥 Tải ảnh
                  </button>
                  <button onClick={() => setShowModal(true)} style={apodButtonStyle}>
                    🔍 Xem chi tiết
                  </button>
                </div>

                <div style={descriptionStyle}>
                  <h3 style={{ color: '#73d239', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginBottom: '1rem', fontWeight: 300 }}>
                    Mô Tả Về Hình Ảnh
                  </h3>
                  <p style={{ lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.9)', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                    {apodData.explanation}
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      <div style={modalStyle} onClick={() => setShowModal(false)}>
        <span style={closeButtonStyle} onClick={() => setShowModal(false)}>&times;</span>
        {apodData && <img src={apodData.url} alt={apodData.title} style={modalImgStyle} onClick={(e) => e.stopPropagation()} />}
      </div>
    </div>
  )
}

export default ImageNASAPage
