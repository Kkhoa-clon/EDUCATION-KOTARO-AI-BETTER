import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: 'rgba(28, 29, 38, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(115, 210, 57, 0.2)',
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  }

  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem',
  }

  const logoStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#73d239',
    textDecoration: 'none',
  }

  const desktopNavStyle: React.CSSProperties = {
    display: 'none',
    alignItems: 'center',
    gap: '1.5rem',
  }

  const navLinkStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.75)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  }

  const mobileButtonStyle: React.CSSProperties = {
    display: 'block',
    background: 'none',
    border: 'none',
    color: '#73d239',
    fontSize: '1.5rem',
    cursor: 'pointer',
  }

  const mobileNavStyle: React.CSSProperties = {
    display: isMenuOpen ? 'block' : 'none',
    padding: '1rem 0',
  }

  const mobileLinkStyle: React.CSSProperties = {
    display: 'block',
    padding: '0.5rem 1rem',
    color: 'rgba(255, 255, 255, 0.75)',
    textDecoration: 'none',
  }

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={navStyle}>
          <Link to="/" style={logoStyle}>
            KOTARO AI
          </Link>

          <nav style={{ ...desktopNavStyle, display: 'none' }} className="desktop-nav">
            <a href="https://github.com/Kkhoa-clon/EDUCATION-KOTARO-AI" 
               style={navLinkStyle}
               target="_blank"
               rel="noopener noreferrer">
              Mã Nguồn Mở
            </a>
            
            <Link to="/thu-vien" style={navLinkStyle}>
              Thư Viện
            </Link>

            <Link to="/chatbot" style={navLinkStyle}>
              Trợ Lý Sen
            </Link>

            <Link to="/thien-van" style={navLinkStyle}>
              Thiên Văn Học
            </Link>

            <Link to="/quiz" style={navLinkStyle}>
              Tạo Câu Hỏi
            </Link>
          </nav>

          <button
            style={mobileButtonStyle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        <nav style={mobileNavStyle}>
          <Link to="/chatbot" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>
            Trợ Lý Sen
          </Link>
          <Link to="/thu-vien" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>
            Thư Viện
          </Link>
          <Link to="/thien-van" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>
            Thiên Văn Học
          </Link>
          <Link to="/quiz" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>
            Tạo Câu Hỏi
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
