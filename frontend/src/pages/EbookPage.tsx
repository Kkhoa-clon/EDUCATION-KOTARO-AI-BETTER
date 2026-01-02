import LegacyPage from '../components/LegacyPage'

/**
 * Ebook page - loads the legacy HTML page
 * This maintains the original functionality from the old project
 */
const EbookPage = () => {
  return (
    <LegacyPage 
      htmlPath="/trang-chu/thu-vien/ebook.html"
      scripts={['/assets/js/ebook.js']}
    />
  )
}

export default EbookPage
