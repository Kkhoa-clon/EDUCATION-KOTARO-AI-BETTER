import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-dark/90 backdrop-blur-md border-b border-accent-green/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-accent-green">
            KOTARO AI
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="https://github.com/Kkhoa-clon/EDUCATION-KOTARO-AI" 
                  className="text-text-secondary hover:text-accent-green transition-colors">
              Mã Nguồn Mở
            </Link>
            
            <div className="relative group">
              <button className="text-text-secondary hover:text-accent-green transition-colors">
                Thư Viện
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-secondary-dark rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/thu-vien" className="block px-4 py-2 hover:bg-accent-green/10">Ebook</Link>
                <Link to="/thu-vien" className="block px-4 py-2 hover:bg-accent-green/10">Nghiên Cứu</Link>
                <Link to="/thu-vien" className="block px-4 py-2 hover:bg-accent-green/10">Vật Lý</Link>
                <Link to="/thu-vien" className="block px-4 py-2 hover:bg-accent-green/10">Hóa Học</Link>
                <Link to="/thu-vien" className="block px-4 py-2 hover:bg-accent-green/10">Sinh Học</Link>
              </div>
            </div>

            <Link to="/chatbot" className="text-text-secondary hover:text-accent-green transition-colors">
              Trợ Lý Sen
            </Link>

            <div className="relative group">
              <button className="text-text-secondary hover:text-accent-green transition-colors">
                Thiên Văn Học
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-secondary-dark rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/thien-van" className="block px-4 py-2 hover:bg-accent-green/10">Hệ Mặt Trời</Link>
                <Link to="/thien-van" className="block px-4 py-2 hover:bg-accent-green/10">Trái Đất</Link>
                <Link to="/thien-van" className="block px-4 py-2 hover:bg-accent-green/10">Robot Sao Hỏa</Link>
              </div>
            </div>

            <Link to="/quiz" className="text-text-secondary hover:text-accent-green transition-colors">
              Tạo Câu Hỏi
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-accent-green"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <Link to="/chatbot" className="block px-4 py-2 hover:bg-accent-green/10 rounded">
              Trợ Lý Sen
            </Link>
            <Link to="/thu-vien" className="block px-4 py-2 hover:bg-accent-green/10 rounded">
              Thư Viện
            </Link>
            <Link to="/thien-van" className="block px-4 py-2 hover:bg-accent-green/10 rounded">
              Thiên Văn Học
            </Link>
            <Link to="/quiz" className="block px-4 py-2 hover:bg-accent-green/10 rounded">
              Tạo Câu Hỏi
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
