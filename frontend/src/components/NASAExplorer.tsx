import { useState, useEffect } from 'react'
import { nasaApi } from '../services/api'
import { handleError, showError } from '../utils/errorHandler'

interface Rover {
  id: number
  name: string
  landing_date: string
  launch_date: string
  status: string
  max_sol: number
  max_date: string
  total_photos: number
  cameras: Array<{ name: string; full_name: string }>
}

interface Photo {
  id: number
  sol: number
  camera: { name: string; full_name: string }
  img_src: string
  earth_date: string
  rover: { name: string; status: string }
}

const NASAExplorer = () => {
  const [rovers, setRovers] = useState<Rover[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selectedRover, setSelectedRover] = useState<string>('')
  const [selectedCamera, setSelectedCamera] = useState<string>('')
  const [earthDate, setEarthDate] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    loadRovers()
  }, [])

  const loadRovers = async () => {
    try {
      setLoading(true)
      const response = await nasaApi.getRovers()
      setRovers(response.rovers || [])
    } catch (error: any) {
      showError(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  const searchPhotos = async () => {
    if (!selectedRover || !earthDate) {
      showError('Vui lòng chọn rover và ngày')
      return
    }

    try {
      setLoading(true)
      const response = await nasaApi.getPhotos({
        rover: selectedRover,
        camera: selectedCamera || undefined,
        earth_date: earthDate
      })
      setPhotos(response.photos || [])
    } catch (error: any) {
      showError(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  const getAvailableCameras = () => {
    if (!selectedRover) return []
    const rover = rovers.find(r => r.name.toLowerCase() === selectedRover.toLowerCase())
    return rover?.cameras || []
  }

  const minDate = rovers.length > 0
    ? rovers.reduce((min, r) => r.landing_date < min ? r.landing_date : min, rovers[0].landing_date)
    : ''
  const maxDate = rovers.length > 0
    ? rovers.reduce((max, r) => r.max_date > max ? r.max_date : max, rovers[0].max_date)
    : ''

  return (
    <div className="pt-20 min-h-screen bg-gradient-banner">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">Robot Thám Hiểm Sao Hỏa</h1>
          <p className="text-text-secondary text-lg">
            Khám phá hình ảnh từ các tàu thám hiểm Mars Rover của NASA
          </p>
        </div>

        {/* Search Form */}
        <div className="glass p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <select
              value={selectedRover}
              onChange={(e) => {
                setSelectedRover(e.target.value)
                setSelectedCamera('')
              }}
              className="bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-green"
            >
              <option value="">Chọn Rover</option>
              {rovers.map(rover => (
                <option key={rover.id} value={rover.name}>
                  {rover.name} ({rover.status})
                </option>
              ))}
            </select>

            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              disabled={!selectedRover}
              className="bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-green disabled:opacity-50"
            >
              <option value="">Tất cả Camera</option>
              {getAvailableCameras().map(camera => (
                <option key={camera.name} value={camera.name}>
                  {camera.full_name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={earthDate}
              onChange={(e) => setEarthDate(e.target.value)}
              min={minDate}
              max={maxDate}
              className="bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-green"
            />

            <button
              onClick={searchPhotos}
              disabled={loading || !selectedRover || !earthDate}
              className="px-6 py-2 bg-accent-green hover:bg-accent-green-hover rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '⏳ Đang tải...' : '🔍 Tìm kiếm'}
            </button>
          </div>

          {minDate && maxDate && (
            <p className="text-text-secondary text-sm">
              Phạm vi ngày: {minDate} đến {maxDate}
            </p>
          )}
        </div>

        {/* Photos Grid */}
        {photos.length > 0 && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">
              Tìm thấy {photos.length} ảnh
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map(photo => (
                <div
                  key={photo.id}
                  className="glass p-4 hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.img_src}
                    alt={`${photo.rover.name} - ${photo.earth_date}`}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <div className="text-sm space-y-1">
                    <p><span className="text-accent-green font-semibold">Rover:</span> {photo.rover.name}</p>
                    <p><span className="text-accent-green font-semibold">Camera:</span> {photo.camera.name}</p>
                    <p><span className="text-accent-green font-semibold">Ngày:</span> {photo.earth_date}</p>
                    <p><span className="text-accent-green font-semibold">Sol:</span> {photo.sol}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {photos.length === 0 && !loading && selectedRover && earthDate && (
          <div className="glass p-12 text-center">
            <p className="text-text-secondary text-xl">
              Không tìm thấy ảnh cho ngày này. Vui lòng thử ngày khác.
            </p>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="bg-secondary-dark rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
          >
              <div className="flex justify-between items-center p-4 border-b border-accent-green/20">
                <h3 className="text-xl font-bold">
                  {selectedPhoto.rover.name} - {selectedPhoto.earth_date}
                </h3>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-text-secondary hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <img
                  src={selectedPhoto.img_src}
                  alt={selectedPhoto.earth_date}
                  className="w-full rounded-lg mb-4"
                />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-accent-green font-semibold">Rover:</span> {selectedPhoto.rover.name}
                  </div>
                  <div>
                    <span className="text-accent-green font-semibold">Camera:</span> {selectedPhoto.camera.full_name}
                  </div>
                  <div>
                    <span className="text-accent-green font-semibold">Ngày Trái Đất:</span> {selectedPhoto.earth_date}
                  </div>
                  <div>
                    <span className="text-accent-green font-semibold">Sol:</span> {selectedPhoto.sol}
                  </div>
                </div>
                <a
                  href={selectedPhoto.img_src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-6 py-2 bg-accent-green hover:bg-accent-green-hover rounded-lg font-semibold transition-colors"
                >
                  Xem kích thước đầy đủ →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NASAExplorer
