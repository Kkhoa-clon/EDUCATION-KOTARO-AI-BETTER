import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from '@mui/material'
import {
  PhotoCamera,
  CalendarToday,
  SmartToy as RobotIcon,
  Science as ScienceIcon,
  Visibility as VisibilityIcon,
  Explore as ExploreIcon,
} from '@mui/icons-material'

interface Photo {
  id: number
  img_src: string
  earth_date: string
  rover: {
    name: string
    landing_date: string
    launch_date: string
    status: string
  }
  camera: {
    name: string
    full_name: string
  }
}

const RobotSaoHoaPage = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedRover, setSelectedRover] = useState('curiosity')
  const [selectedCamera, setSelectedCamera] = useState('fhaz')
  const [selectedSol, setSelectedSol] = useState(1000)

  const rovers = [
    { name: 'curiosity', fullName: 'Curiosity Rover' },
    { name: 'perseverance', fullName: 'Perseverance Rover' },
    { name: 'opportunity', fullName: 'Opportunity Rover' },
    { name: 'spirit', fullName: 'Spirit Rover' },
  ]

  const cameras = [
    { name: 'fhaz', fullName: 'Front Hazard Avoidance Camera' },
    { name: 'rhaz', fullName: 'Rear Hazard Avoidance Camera' },
    { name: 'mast', fullName: 'Mast Camera' },
    { name: 'chemcam', fullName: 'Chemistry and Camera Complex' },
    { name: 'mahli', fullName: 'Mars Hand Lens Imager' },
    { name: 'mardi', fullName: 'Mars Descent Imager' },
    { name: 'navcam', fullName: 'Navigation Camera' },
    { name: 'pancam', fullName: 'Panoramic Camera' },
    { name: 'minites', fullName: 'Miniature Thermal Emission Spectrometer' },
  ]

  const fetchPhotos = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `http://localhost:5000/api/mars/rovers/${selectedRover}/photos?sol=${selectedSol}&camera=${selectedCamera}&page=1`
      )
      const data = await response.json()
      if (data.photos) {
        setPhotos(data.photos.slice(0, 12)) // Limit to 12 photos for better performance
      } else {
        setPhotos([])
        setError('Không tìm thấy ảnh cho các tham số đã chọn')
      }
    } catch (err) {
      setError('Không thể tải dữ liệu từ NASA')
      console.error('Error fetching Mars photos:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPhotos()
  }, [selectedRover, selectedCamera, selectedSol])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 200px)' }}>
      <Box
        sx={{
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.success.main}10 50%, ${theme.palette.primary.main}10 100%)`,
          py: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 300 }}>
            Robot Sao Hỏa
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Khám phá Sao Hỏa với robot Curiosity và Perseverance của NASA. Tìm hiểu về địa hình, khí hậu và sứ mệnh khám phá hành tinh đỏ!
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Controls */}
        <Box sx={{ mb: 4 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Robot</InputLabel>
              <Select
                value={selectedRover}
                label="Robot"
                onChange={(e) => setSelectedRover(e.target.value)}
              >
                {rovers.map((rover) => (
                  <MenuItem key={rover.name} value={rover.name}>
                    {rover.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Máy ảnh</InputLabel>
              <Select
                value={selectedCamera}
                label="Máy ảnh"
                onChange={(e) => setSelectedCamera(e.target.value)}
              >
                {cameras.map((camera) => (
                  <MenuItem key={camera.name} value={camera.name}>
                    {camera.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sol</InputLabel>
              <Select
                value={selectedSol}
                label="Sol"
                onChange={(e) => setSelectedSol(Number(e.target.value))}
              >
                <MenuItem value={1000}>1000</MenuItem>
                <MenuItem value={2000}>2000</MenuItem>
                <MenuItem value={3000}>3000</MenuItem>
                <MenuItem value={4000}>4000</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" onClick={fetchPhotos} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Tải ảnh'}
            </Button>
          </Stack>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Photos Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {photos.map((photo) => (
              <Grid item xs={12} sm={6} md={4} key={photo.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={photo.img_src}
                    alt={`Mars photo by ${photo.rover.name}`}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {photo.rover.name}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <Chip
                        icon={<PhotoCamera />}
                        label={photo.camera.full_name}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<CalendarToday />}
                        label={`Sol ${selectedSol}`}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Ngày chụp: {new Date(photo.earth_date).toLocaleDateString('vi-VN')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && photos.length === 0 && !error && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Không có ảnh nào được tìm thấy cho các tham số đã chọn.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default RobotSaoHoaPage
