const Footer = () => {
  return (
    <footer className="bg-secondary-dark py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-accent-green mb-4">KOTARO AI</h3>
            <p className="text-text-secondary">
              Nền tảng giáo dục số tích hợp trí tuệ nhân tạo
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2 text-text-secondary">
              <li><a href="https://github.com/Kkhoa-clon/EDUCATION-KOTARO-AI" className="hover:text-accent-green">GitHub</a></li>
              <li><a href="/lien-he" className="hover:text-accent-green">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Thông tin</h4>
            <p className="text-text-secondary text-sm">
              © 2025 EDUCATION KOTARO AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
