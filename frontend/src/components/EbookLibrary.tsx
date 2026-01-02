import { useState, useEffect } from 'react'

interface Book {
  id: number
  title: string
  author: string
  description: string
  category: string
  language: string
  type: string
  year: number
  pages: number
  rating: number
  downloads: number
  url: string
  cover: string
  tags: string[]
}

const EbookLibrary = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    language: '',
    type: '',
    year: ''
  })
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showReader, setShowReader] = useState(false)

  useEffect(() => {
    loadBooks()
  }, [])

  useEffect(() => {
    filterBooks()
  }, [filters, books])

  const loadBooks = async () => {
    try {
      const response = await fetch('/data/ebooks.json')
      if (!response.ok) throw new Error('Failed to load books')
      const data = await response.json()
      setBooks(data)
      setFilteredBooks(data)
    } catch (error) {
      console.error('Error loading books:', error)
    }
  }

  const filterBooks = () => {
    let filtered = [...books]

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(book =>
        `${book.title} ${book.author} ${book.description} ${book.tags.join(' ')}`.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.category) {
      filtered = filtered.filter(book => book.category === filters.category)
    }

    if (filters.language) {
      filtered = filtered.filter(book => book.language === filters.language)
    }

    if (filters.type) {
      filtered = filtered.filter(book => book.type === filters.type)
    }

    if (filters.year) {
      filtered = filtered.filter(book => book.year === parseInt(filters.year))
    }

    setFilteredBooks(filtered)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      language: '',
      type: '',
      year: ''
    })
  }

  const openReader = (book: Book) => {
    setSelectedBook(book)
    setShowReader(true)
  }

  const closeReader = () => {
    setShowReader(false)
    setSelectedBook(null)
  }

  const downloadBook = (book: Book) => {
    const link = document.createElement('a')
    link.href = book.url
    link.download = `${book.title} - ${book.author}.${book.type.toLowerCase()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <>
        {Array(fullStars).fill(0).map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">☆</span>}
        {Array(emptyStars).fill(0).map((_, i) => (
          <span key={i} className="text-gray-400">☆</span>
        ))}
      </>
    )
  }

  const stats = {
    total: filteredBooks.length,
    downloads: filteredBooks.reduce((sum, book) => sum + book.downloads, 0),
    avgRating: filteredBooks.length > 0
      ? (filteredBooks.reduce((sum, book) => sum + book.rating, 0) / filteredBooks.length).toFixed(1)
      : '0.0'
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-banner">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Thư Viện Ebook</h1>
          <p className="text-text-secondary text-lg">
            Khám phá kho sách điện tử miễn phí về khoa học tự nhiên
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="🔍 Tìm kiếm theo tên sách, tác giả, từ khóa..."
              className="flex-1 bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-green"
            />
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-accent-green/20 hover:bg-accent-green/30 rounded-lg transition-colors"
            >
              ✕ Xóa bộ lọc
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="bg-primary-dark border border-accent-green/30 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-green"
            >
              <option value="">📂 Tất cả thể loại</option>
              <option value="Tiểu thuyết">📖 Tiểu thuyết</option>
              <option value="Giáo trình">📚 Giáo trình</option>
              <option value="Khoa học">🔬 Khoa học</option>
              <option value="Công nghệ">💻 Công nghệ</option>
            </select>

            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="bg-primary-dark border border-accent-green/30 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-green"
            >
              <option value="">🌍 Tất cả ngôn ngữ</option>
              <option value="Tiếng Việt">🇻🇳 Tiếng Việt</option>
              <option value="Tiếng Anh">🇺🇸 Tiếng Anh</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="bg-primary-dark border border-accent-green/30 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-green"
            >
              <option value="">📄 Tất cả định dạng</option>
              <option value="PDF">📄 PDF</option>
              <option value="EPUB">📱 EPUB</option>
            </select>

            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="bg-primary-dark border border-accent-green/30 rounded-lg px-3 py-2 focus:outline-none focus:border-accent-green"
            >
              <option value="">📅 Tất cả năm</option>
              {Array.from({ length: 25 }, (_, i) => 2023 - i).map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">{stats.total}</div>
            <div className="text-text-secondary">Tổng số sách</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">{stats.downloads.toLocaleString()}</div>
            <div className="text-text-secondary">Lượt tải</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">{stats.avgRating}</div>
            <div className="text-text-secondary">Đánh giá TB</div>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="glass p-12 text-center">
            <p className="text-text-secondary text-xl">Không tìm thấy sách nào phù hợp</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <div key={book.id} className="glass p-4 hover:scale-105 transition-transform">
                <div className="mb-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo-Photoroom.png'
                    }}
                  />
                  <span className="inline-block px-2 py-1 bg-accent-green/20 text-accent-green rounded text-sm">
                    {book.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
                <p className="text-text-secondary text-sm mb-2">Tác giả: {book.author}</p>
                <p className="text-text-secondary text-xs mb-3 line-clamp-2">{book.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  {generateStars(book.rating)}
                  <span className="text-sm">{book.rating}</span>
                  <span className="text-text-secondary text-sm ml-auto">{book.pages} trang</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openReader(book)}
                    className="flex-1 px-4 py-2 bg-accent-green hover:bg-accent-green-hover rounded-lg font-semibold transition-colors"
                  >
                    📖 Đọc
                  </button>
                  <button
                    onClick={() => downloadBook(book)}
                    className="px-4 py-2 bg-accent-green/20 hover:bg-accent-green/30 rounded-lg transition-colors"
                  >
                    ⬇️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reader Modal */}
        {showReader && selectedBook && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeReader}
          >
            <div
              className="bg-secondary-dark rounded-lg w-full max-w-6xl h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-accent-green/20">
                <h3 className="text-xl font-bold">{selectedBook.title}</h3>
                <button
                  onClick={closeReader}
                  className="text-text-secondary hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              <iframe
                src={
                  selectedBook.type === 'PDF'
                    ? `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(selectedBook.url)}`
                    : selectedBook.url
                }
                className="flex-1 w-full"
                title={selectedBook.title}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EbookLibrary
