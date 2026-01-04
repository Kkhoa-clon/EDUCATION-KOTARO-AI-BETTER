import { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ScienceIcon from '@mui/icons-material/Science'
import BiotechIcon from '@mui/icons-material/Biotech'
import CalculateIcon from '@mui/icons-material/Calculate'
import PsychologyIcon from '@mui/icons-material/Psychology'
import RefreshIcon from '@mui/icons-material/Refresh'
import LaunchIcon from '@mui/icons-material/Launch'

interface Experiment {
  name: string
  url: string
}

const experiments = {
  'Vật Lý': [
    { name: 'Sự Nổi Cơ Bản', url: 'https://phet.colorado.edu/sims/html/buoyancy-basics/latest/buoyancy-basics_vi.html' },
    { name: 'Hình Dạng Phân Tử', url: 'https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_vi.html' },
    { name: 'Sóng Trên 1 Sợi Dây', url: 'https://phet.colorado.edu/sims/html/density/latest/density_vi.html' },
    { name: 'Máy Phát Điện', url: 'https://phet.colorado.edu/sims/html/generator/latest/generator_vi.html' },
    { name: 'Nam Châm Và Nam Châm Điện', url: 'https://phet.colorado.edu/sims/html/magnets-and-electromagnets/latest/magnets-and-electromagnets_vi.html' },
    { name: 'Phòng Thí Nghiệm Điện Từ Faraday', url: 'https://phet.colorado.edu/sims/html/faradays-electromagnetic-lab/latest/faradays-electromagnetic-lab_vi.html' },
    { name: 'Phòng Thí Nghiệm Đạn Từ', url: 'https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_vi.html' },
    { name: 'Sóng Âm', url: 'https://phet.colorado.edu/sims/html/sound-waves/latest/sound-waves_vi.html' },
    { name: 'Máy Vẽ Đồ Thị Vi Tích Phân', url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_vi.html' },
    { name: 'Mật Độ', url: 'https://phet.colorado.edu/sims/html/density/latest/density_vi.html' },
    { name: 'Quang Hình Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/geometric-optics-basics/latest/geometric-optics-basics_vi.html' },
    { name: 'Quang Hình', url: 'https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_vi.html' },
    { name: 'Bộ Lắp Ráp Mạch AC', url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_vi.html' },
    { name: 'Bộ Lắp Ráp Mạch AC Phòng Thí Nghiệm Ảo', url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac-virtual-lab/latest/circuit-construction-kit-ac-virtual-lab_vi.html' },
    { name: 'Kiểu Chuẩn Tắt', url: 'https://phet.colorado.edu/sims/html/normal-modes/latest/normal-modes_vi.html' },
    { name: 'Tổng Hợp Sóng', url: 'https://phet.colorado.edu/sims/html/fourier-making-waves/latest/fourier-making-waves_vi.html' },
    { name: 'Lực Hấp Dẫn Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/gravity-force-lab-basics/latest/gravity-force-lab-basics_vi.html' },
    { name: 'Sóng', url: 'https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_vi.html' },
    { name: 'Giao Thoa Sóng', url: 'https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_vi.html' },
    { name: 'Định Luật Comlomb', url: 'https://phet.colorado.edu/sims/html/coulombs-law/latest/coulombs-law_vi.html' },
    { name: 'Con Lắc Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/masses-and-springs-basics/latest/masses-and-springs-basics_vi.html' },
    { name: 'Năng Lượng Các Dạng Và Sự Chuyển Hóa', url: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_vi.html' },
    { name: 'Con Lắc Lò Xò', url: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_vi.html' },
    { name: 'Tụ Điện Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/capacitor-lab-basics/latest/capacitor-lab-basics_vi.html' },
    { name: 'Con Lắc', url: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_vi.html' },
    { name: 'Chuyển Động Của Đạn Tử', url: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_vi.html' },
    { name: 'Lực Hấp Dẫn Và Quỹ Đạo', url: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_vi.html' },
    { name: 'Định Luật Hooke', url: 'https://phet.colorado.edu/sims/html/hookes-law/latest/hookes-law_vi.html' },
    { name: 'Mô Hình Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-model-algebra/latest/area-model-algebra_vi.html' },
    { name: 'Số Thập Phần Với Mô Hình Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-model-decimals/latest/area-model-decimals_vi.html' },
    { name: 'Phép Nhân Với Mô Hình Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-model-multiplication/latest/area-model-multiplication_vi.html' },
    { name: 'Giới Thiệu Mô Hình Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-model-introduction/latest/area-model-introduction_vi.html' },
    { name: 'Định Luật Ohm', url: 'https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_vi.html' },
    { name: 'Điện Trở', url: 'https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_vi.html' },
    { name: 'Khúc Xạ Ánh Sáng', url: 'https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_vi.html' },
    { name: 'Công Viên Ván Trược', url: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_vi.html' },
    { name: 'Tạo Dựng Phân Tử', url: 'https://phet.colorado.edu/sims/html/build-a-molecule/latest/build-a-molecule_vi.html' },
    { name: 'Cộng Phương Trình Vector', url: 'https://phet.colorado.edu/sims/html/vector-addition-equations/latest/vector-addition-equations_vi.html' },
    { name: 'Cộng Vector', url: 'https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_vi.html' },
    { name: 'Vẽ Đường Cong Thực Nghiệm', url: 'https://phet.colorado.edu/sims/html/curve-fitting/latest/curve-fitting_vi.html' },
    { name: 'Sự Khuyết Tán', url: 'https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_vi.html' },
    { name: 'Giới Thiệu Chất Khí', url: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_vi.html' },
    { name: 'Tính Chất Của Khí', url: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_vi.html' },
    { name: 'Quang Phổ Của Thể Đen', url: 'https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum_vi.html' },
    { name: 'Đồ Thị Hàm Số Bậc 2', url: 'https://phet.colorado.edu/sims/html/graphing-quadratics/latest/graphing-quadratics_vi.html' },
    { name: 'Đẳng Thức 2 Biến', url: 'https://phet.colorado.edu/sims/html/equality-explorer-two-variables/latest/equality-explorer-two-variables_vi.html' },
    { name: 'Đẳng Thức Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/equality-explorer-basics/latest/equality-explorer-basics_vi.html' },
    { name: 'Đẳng Thức', url: 'https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_vi.html' },
    { name: 'Đại Số Với Mô Hình Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-model-algebra/latest/area-model-algebra_vi.html' },
    { name: 'Đồ Thị Hàm Số Tuyến Tính', url: 'https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_vi.html' },
    { name: 'Cân Bằng', url: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_vi.html' },
    { name: 'Áp Suất', url: 'https://phet.colorado.edu/sims/html/under-pressure/latest/under-pressure_vi.html' },
    { name: 'Ma Sát', url: 'https://phet.colorado.edu/sims/html/friction/latest/friction_vi.html' },
    { name: 'Lực Và Chuyển Động', url: 'https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_vi.html' },
    { name: 'John Travoltage', url: 'https://phet.colorado.edu/sims/html/john-travoltage/latest/john-travoltage_vi.html' },
    { name: 'Tương Tác Nguyên Tử', url: 'https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions_vi.html' },
    { name: 'Điện Tích Và Điện Trường', url: 'https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_vi.html' },
    { name: 'Táng Xạ Rutherford', url: 'https://phet.colorado.edu/sims/html/rutherford-scattering/latest/rutherford-scattering_vi.html' },
    { name: 'Đồng Tử Nguyên Tử Khối', url: 'https://phet.colorado.edu/sims/html/isotopes-and-atomic-mass/latest/isotopes-and-atomic-mass_vi.html' },
    { name: 'Vòng Tròn Lượng Giác', url: 'https://phet.colorado.edu/sims/html/trig-tour/latest/trig-tour_vi.html' },
    { name: 'Phân Tử Và Ánh Sáng', url: 'https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_vi.html' },
    { name: 'Hồi Quy Bình Phương Cực Tiểu', url: 'https://phet.colorado.edu/sims/html/least-squares-regression/latest/least-squares-regression_vi.html' },
    { name: 'Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_vi.html' },
    { name: 'Đồ Thị Độ Dốc Đoạn Chắn', url: 'https://phet.colorado.edu/sims/html/graphing-slope-intercept/latest/graphing-slope-intercept_vi.html' },
    { name: 'Đồ Thị Hàm Số', url: 'https://phet.colorado.edu/sims/html/function-builder-basics/latest/function-builder-basics_vi.html' },
    { name: 'Sân Chơi Tỷ Lệ', url: 'https://phet.colorado.edu/sims/html/proportion-playground/latest/proportion-playground_vi.html' },
    { name: 'Tỷ Xuất Đơn Vị', url: 'https://phet.colorado.edu/sims/html/unit-rates/latest/unit-rates_vi.html' },
    { name: 'Trạng Thái Của Vật Chất Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_vi.html' },
    { name: 'Xác Xuất Plinko', url: 'https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability_vi.html' },
    { name: 'Tạo Ra 10', url: 'https://phet.colorado.edu/sims/html/make-a-ten/latest/make-a-ten_vi.html' },
    { name: 'Va Chạm', url: 'https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab_vi.html' },
    { name: 'Đường Thẳng Số Khoảng Cách', url: 'https://phet.colorado.edu/sims/html/number-line-distance/latest/number-line-distance_vi.html' },
    { name: 'Tỷ Số Và Tỷ Lệ', url: 'https://phet.colorado.edu/sims/html/ratio-and-proportion/latest/ratio-and-proportion_vi.html' },
    { name: 'Đường Thẳng Số Các Phép Toán', url: 'https://phet.colorado.edu/sims/html/number-line-operations/latest/number-line-operations_vi.html' },
    { name: 'Đường Thẳng Số Nguyên', url: 'https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers_vi.html' },
    { name: 'Đường Thẳng Số Tuyến Tính', url: 'https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_vi.html' },
    { name: 'Đồ Thị Hàm Số Tuyến Tính', url: 'https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_vi.html' },
  ],
  'Hóa Học': [
    { name: 'Dung Dịch Acid-Base', url: 'https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_vi.html' },
    { name: 'Thang Đo pH', url: 'https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_vi.html' },
    { name: 'Nồng Độ', url: 'https://phet.colorado.edu/sims/html/concentration/latest/concentration_vi.html' },
    { name: 'Định Luật Beer', url: 'https://phet.colorado.edu/sims/html/beers-law-lab/latest/beers-law-lab_vi.html' },
    { name: 'Nồng Độ Mol', url: 'https://phet.colorado.edu/sims/html/molarity/latest/molarity_vi.html' },
    { name: 'Chất Phản Ứng, Sản Phẩm, Phần Dư', url: 'https://phet.colorado.edu/sims/html/reactants-products-and-leftovers/latest/reactants-products-and-leftovers_vi.html' },
  ],
  'Sinh Học': [
    { name: 'Chọn Lọc Tự Nhiên', url: 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_vi.html' },
    { name: 'Biểu Hiện Gene Điều Cơ Bản', url: 'https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_vi.html' },
    { name: 'Cực Tính Của Phân Tử', url: 'https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity_vi.html' },
    { name: 'Neuron', url: 'https://phet.colorado.edu/sims/html/neuron/latest/neuron_vi.html' },
    { name: 'Thị Giác Màu', url: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_vi.html' },
  ],
  'Toán Học': [
    { name: 'Tạo Dựng Hạt Nhân', url: 'https://phet.colorado.edu/sims/html/build-a-nucleus/latest/build-a-nucleus_vi.html' },
    { name: 'Định Luật Kepler', url: 'https://phet.colorado.edu/sims/html/keplers-laws/latest/keplers-laws_vi.html' },
    { name: 'Thái Dương Hệ', url: 'https://phet.colorado.edu/sims/html/my-solar-system/latest/my-solar-system_vi.html' },
    { name: 'Hiệu Ứng Nhà Kính', url: 'https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_vi.html' },
    { name: 'Phân Bố Mẫu Của Đạn', url: 'https://phet.colorado.edu/sims/html/projectile-sampling-distributions/latest/projectile-sampling-distributions_vi.html' },
    { name: 'Tâm Và Tính Biến Đổi', url: 'https://phet.colorado.edu/sims/html/center-and-variability/latest/center-and-variability_vi.html' },
    { name: 'Tứ Giác', url: 'https://phet.colorado.edu/sims/html/quadrilateral/latest/quadrilateral_vi.html' },
    { name: 'So Sánh Số', url: 'https://phet.colorado.edu/sims/html/number-compare/latest/number-compare_vi.html' },
    { name: 'Vui Đùa Với Con Số', url: 'https://phet.colorado.edu/sims/html/number-play/latest/number-play_vi.html' },
    { name: 'Phân Số Hỗn Số', url: 'https://phet.colorado.edu/sims/html/fractions-mixed-numbers/latest/fractions-mixed-numbers_vi.html' },
    { name: 'Phân Số Phần Giới Thiệu', url: 'https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_vi.html' },
    { name: 'Tạo Ra Một Phân Số', url: 'https://phet.colorado.edu/sims/html/build-a-fraction/latest/build-a-fraction_vi.html' },
    { name: 'Phân Số : Đẳng Thức', url: 'https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality_vi.html' },
    { name: 'Số Học', url: 'https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic_vi.html' },
  ],
}

const Lab2DPage = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
    setSearchTerm('')
  }

  const handleExperimentClick = (experiment: Experiment) => {
    setSelectedExperiment(experiment)
    setModalOpen(true)
    setIsLoading(true)
    // Simulate loading time for better UX
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedExperiment(null)
    setIsLoading(false)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 500)
  }

  const handleOpenInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const categories = Object.keys(experiments)
  const categoryIcons = {
    'Vật Lý': <ScienceIcon />,
    'Hóa Học': <BiotechIcon />,
    'Sinh Học': <PsychologyIcon />,
    'Toán Học': <CalculateIcon />,
  }

  const currentExperiments = experiments[categories[selectedTab] as keyof typeof experiments]
  const filteredExperiments = currentExperiments.filter(experiment =>
    experiment.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 25%, #10b981 50%, #059669 75%, #047857 100%)',
          color: 'white',
          py: 4,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" textAlign="center" sx={{ mb: 3, fontWeight: 700 }}>
            Thí Nghiệm Ảo - PhET Simulations
          </Typography>
          <Typography variant="h6" textAlign="center" sx={{ mb: 4, opacity: 0.9 }}>
            Khám phá các thí nghiệm vật lý, hóa học, sinh học và toán học tương tác
          </Typography>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: 'white',
                fontWeight: 600,
                minHeight: 48,
                borderRadius: 2,
                mx: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'white',
              },
            }}
          >
            {categories.map((category) => (
              <Tab
                key={category}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {categoryIcons[category as keyof typeof categoryIcons]}
                    {category}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Search and Controls */}
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <TextField
            fullWidth
            placeholder={`Tìm kiếm thí nghiệm ${categories[selectedTab]}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'background.paper',
              }
            }}
          />
          <Chip
            label={`${filteredExperiments.length} thí nghiệm`}
            color="primary"
            variant="outlined"
          />
        </Box>

        {selectedExperiment && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Đang chạy:</strong> {selectedExperiment.name}
            </Typography>
          </Alert>
        )}
      </Container>

      {/* Experiments Grid */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {filteredExperiments.map((experiment: Experiment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={experiment.name}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(34, 197, 94, 0.3)',
                    borderColor: 'primary.main',
                  },
                  border: '2px solid transparent',
                  background: selectedExperiment?.name === experiment.name
                    ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
                    : 'background.paper',
                }}
                onClick={() => handleExperimentClick(experiment)}
              >
                <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2 }}>
                    {categoryIcons[categories[selectedTab] as keyof typeof categoryIcons]}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                      mb: 2,
                      lineHeight: 1.3,
                      flexGrow: 1
                    }}
                  >
                    {experiment.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Mở trong tab mới">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenInNewTab(experiment.url)
                        }}
                        sx={{ color: 'primary.main' }}
                      >
                        <LaunchIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredExperiments.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy thí nghiệm nào phù hợp với "{searchTerm}"
            </Typography>
          </Box>
        )}
      </Container>

      {/* Modal for Experiment */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              height: '80vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                {selectedExperiment?.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Làm mới">
                  <IconButton onClick={handleRefresh}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Mở trong tab mới">
                  <IconButton onClick={() => selectedExperiment && handleOpenInNewTab(selectedExperiment.url)}>
                    <LaunchIcon />
                  </IconButton>
                </Tooltip>
                <IconButton onClick={handleCloseModal}>
                  <Typography variant="h6">×</Typography>
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
              {isLoading && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 10,
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={60} sx={{ mb: 2 }} />
                    <Typography variant="h6" color="primary">
                      Đang tải thí nghiệm...
                    </Typography>
                  </Box>
                </Box>
              )}
              {selectedExperiment && (
                <iframe
                  src={selectedExperiment.url}
                  title="PhET Simulation"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    backgroundColor: '#fff',
                    display: 'block',
                  }}
                  onLoad={() => setIsLoading(false)}
                />
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default Lab2DPage
