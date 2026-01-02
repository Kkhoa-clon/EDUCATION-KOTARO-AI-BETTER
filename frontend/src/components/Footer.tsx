const Footer = () => {
  const footerStyle: React.CSSProperties = {
    background: '#2a2b36',
    padding: '3rem 1rem',
    marginTop: '5rem',
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#73d239',
    marginBottom: '1rem',
  }

  const textStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: 1.6,
  }

  const linkStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.75)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  }

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }

  const listItemStyle: React.CSSProperties = {
    marginBottom: '0.5rem',
  }

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          <div>
            <h3 style={titleStyle}>KOTARO AI</h3>
            <p style={textStyle}>
              Nền tảng giáo dục số tích hợp trí tuệ nhân tạo
            </p>
          </div>
          <div>
            <h4 style={{ ...titleStyle, fontSize: '1.125rem' }}>Liên kết</h4>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                <a href="https://github.com/Kkhoa-clon/EDUCATION-KOTARO-AI" 
                   style={linkStyle}
                   target="_blank"
                   rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li style={listItemStyle}>
                <a href="/lien-he" style={linkStyle}>Liên hệ</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ ...titleStyle, fontSize: '1.125rem' }}>Thông tin</h4>
            <p style={{ ...textStyle, fontSize: '0.875rem' }}>
              © 2025 EDUCATION KOTARO AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
