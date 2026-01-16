import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Button,
  Chip,
  Stack,
  Avatar,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Alert,
  CardContent,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
  Fab,
} from '@mui/material'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import BiotechIcon from '@mui/icons-material/Biotech'
import CalculateIcon from '@mui/icons-material/Calculate'
import GrassIcon from '@mui/icons-material/Grass'
import ScienceIcon from '@mui/icons-material/Science'
import WavesIcon from '@mui/icons-material/Waves'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import ScaleIcon from '@mui/icons-material/Scale'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DnsIcon from '@mui/icons-material/Dns'
import FunctionsIcon from '@mui/icons-material/Functions'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import NumbersIcon from '@mui/icons-material/Numbers'
import BalanceIcon from '@mui/icons-material/Balance'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import VisibilityIcon from '@mui/icons-material/Visibility'
import HearingIcon from '@mui/icons-material/Hearing'
import TimelineIcon from '@mui/icons-material/Timeline'
import StraightenIcon from '@mui/icons-material/Straighten'
import SpeedIcon from '@mui/icons-material/Speed'
import LensIcon from '@mui/icons-material/Lens'
import BuildIcon from '@mui/icons-material/Build'
import AddIcon from '@mui/icons-material/Add'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot'
import GasMeterIcon from '@mui/icons-material/GasMeter'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import PsychologyIcon from '@mui/icons-material/Psychology'
import SolarPowerIcon from '@mui/icons-material/SolarPower'
import CloudIcon from '@mui/icons-material/Cloud'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SquareIcon from '@mui/icons-material/Square'
import SearchIcon from '@mui/icons-material/Search'
import AbcIcon from '@mui/icons-material/Abc'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import PieChartIcon from '@mui/icons-material/PieChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import MultilineChartIcon from '@mui/icons-material/MultilineChart'
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import SsidChartIcon from '@mui/icons-material/SsidChart'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AirIcon from '@mui/icons-material/Air'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import OpacityIcon from '@mui/icons-material/Opacity'
import GradientIcon from '@mui/icons-material/Gradient'
import PaletteIcon from '@mui/icons-material/Palette'
import BrushIcon from '@mui/icons-material/Brush'
import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import ColorizeIcon from '@mui/icons-material/Colorize'
import BlurOnIcon from '@mui/icons-material/BlurOn'
import BlurCircularIcon from '@mui/icons-material/BlurCircular'
import BlurLinearIcon from '@mui/icons-material/BlurLinear'
import FilterBAndWIcon from '@mui/icons-material/FilterBAndW'
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus'
import FilterDramaIcon from '@mui/icons-material/FilterDrama'
import FilterFramesIcon from '@mui/icons-material/FilterFrames'
import FilterHdrIcon from '@mui/icons-material/FilterHdr'
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterNoneIcon from '@mui/icons-material/FilterNone'
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift'
import FilterVintageIcon from '@mui/icons-material/FilterVintage'
import FlareIcon from '@mui/icons-material/Flare'
import FlashAutoIcon from '@mui/icons-material/FlashAuto'
import FlashOffIcon from '@mui/icons-material/FlashOff'
import FlipIcon from '@mui/icons-material/Flip'
import GifIcon from '@mui/icons-material/Gif'
import GifBoxIcon from '@mui/icons-material/GifBox'
import GrainIcon from '@mui/icons-material/Grain'
import GridOffIcon from '@mui/icons-material/GridOff'
import GridOnIcon from '@mui/icons-material/GridOn'
import HdrOffIcon from '@mui/icons-material/HdrOff'
import HdrOnIcon from '@mui/icons-material/HdrOn'
import HdrStrongIcon from '@mui/icons-material/HdrStrong'
import HdrWeakIcon from '@mui/icons-material/HdrWeak'
import HealingIcon from '@mui/icons-material/Healing'
import ImageIcon from '@mui/icons-material/Image'
import ImageAspectRatioIcon from '@mui/icons-material/ImageAspectRatio'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import IsoIcon from '@mui/icons-material/Iso'
import LandscapeIcon from '@mui/icons-material/Landscape'
import LeakAddIcon from '@mui/icons-material/LeakAdd'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LaunchIcon from '@mui/icons-material/Launch'
import RefreshIcon from '@mui/icons-material/Refresh'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Link } from 'react-router-dom'

interface Experiment {
  name: string
  url: string
  category: string
  description?: string
  isFavorite?: boolean
  icon?: any
}

const experiments = {
  'Vật Lý': [
    { name: 'Sự Nổi Cơ Bản', url: 'https://phet.colorado.edu/sims/html/buoyancy-basics/latest/buoyancy-basics_vi.html', category: 'Vật Lý', description: 'Khám phá nguyên lý nổi của vật thể trong chất lỏng', icon: WaterDropIcon },
    { name: 'Hình Dạng Phân Tử', url: 'https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_vi.html', category: 'Vật Lý', description: 'Học về cấu trúc và hình dạng của các phân tử', icon: DnsIcon },
    { name: 'Sóng Trên 1 Sợi Dây', url: 'https://phet.colorado.edu/sims/html/density/latest/density_vi.html', category: 'Vật Lý', description: 'Quan sát và nghiên cứu sự lan truyền của sóng', icon: WavesIcon },
    { name: 'Máy Phát Điện', url: 'https://phet.colorado.edu/sims/html/generator/latest/generator_vi.html', category: 'Vật Lý', description: 'Tìm hiểu nguyên lý hoạt động của máy phát điện', icon: ElectricBoltIcon },
    { name: 'Nam Châm Và Nam Châm Điện', url: 'https://phet.colorado.edu/sims/html/magnets-and-electromagnets/latest/magnets-and-electromagnets_vi.html', category: 'Vật Lý', description: 'Khám phá lực từ trường và nam châm điện', icon: FlashOnIcon },
    { name: 'Phòng Thí Nghiệm Điện Từ Faraday', url: 'https://phet.colorado.edu/sims/html/faradays-electromagnetic-lab/latest/faradays-electromagnetic-lab_vi.html', category: 'Vật Lý', description: 'Thực nghiệm về cảm ứng điện từ', icon: ElectricBoltIcon },
    { name: 'Phòng Thí Nghiệm Đạn Từ', url: 'https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_vi.html', category: 'Vật Lý', description: 'Phân tích chuyển động của vật thể ném', icon: ScatterPlotIcon },
    { name: 'Sóng Âm', url: 'https://phet.colorado.edu/sims/html/sound-waves/latest/sound-waves_vi.html', category: 'Vật Lý', description: 'Nghiên cứu đặc tính của sóng âm', icon: HearingIcon },
    { name: 'Máy Vẽ Đồ Thị Vi Tích Phân', url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_vi.html', category: 'Vật Lý', description: 'Trực quan hóa các khái niệm vi tích phân', icon: FunctionsIcon },
    { name: 'Mật Độ', url: 'https://phet.colorado.edu/sims/html/density/latest/density_vi.html', category: 'Vật Lý', description: 'Học về mật độ và sự nổi chìm của vật thể', icon: ScaleIcon },
    { name: 'Quang Hình Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/geometric-optics-basics/latest/geometric-optics-basics_vi.html', category: 'Vật Lý', description: 'Khám phá cơ bản về quang học hình học', icon: LensIcon },
    { name: 'Quang Hình', url: 'https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_vi.html', category: 'Vật Lý', description: 'Nghiên cứu sâu về quang học hình học', icon: LensIcon },
    { name: 'Bộ Lắp Ráp Mạch AC', url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_vi.html', category: 'Vật Lý', description: 'Xây dựng mạch điện xoay chiều', icon: BuildIcon },
    { name: 'Bộ Lắp Ráp Mạch AC Phòng Thí Nghiệm Ảo', url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac-virtual-lab/latest/circuit-construction-kit-ac-virtual-lab_vi.html', category: 'Vật Lý', description: 'Thí nghiệm ảo với mạch AC', icon: BuildIcon },
    { name: 'Kiểu Chuẩn Tắt', url: 'https://phet.colorado.edu/sims/html/normal-modes/latest/normal-modes_vi.html', category: 'Vật Lý', description: 'Học về các chế độ dao động chuẩn', icon: TimelineIcon },
    { name: 'Tổng Hợp Sóng', url: 'https://phet.colorado.edu/sims/html/fourier-making-waves/latest/fourier-making-waves_vi.html', category: 'Vật Lý', description: 'Tạo sóng từ các hàm cơ bản', icon: WavesIcon },
    { name: 'Lực Hấp Dẫn Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/gravity-force-lab-basics/latest/gravity-force-lab-basics_vi.html', category: 'Vật Lý', description: 'Khám phá lực hấp dẫn cơ bản', icon: SolarPowerIcon },
    { name: 'Sóng', url: 'https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_vi.html', category: 'Vật Lý', description: 'Giới thiệu về các loại sóng', icon: WavesIcon },
    { name: 'Giao Thoa Sóng', url: 'https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_vi.html', category: 'Vật Lý', description: 'Quan sát hiện tượng giao thoa sóng', icon: WavesIcon },
    { name: 'Định Luật Comlomb', url: 'https://phet.colorado.edu/sims/html/coulombs-law/latest/coulombs-law_vi.html', category: 'Vật Lý', description: 'Nghiên cứu lực tương tác giữa các điện tích', icon: ElectricBoltIcon },
    { name: 'Con Lắc Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/masses-and-springs-basics/latest/masses-and-springs-basics_vi.html', category: 'Vật Lý', description: 'Khám phá dao động của con lắc cơ bản', icon: TimelineIcon },
    { name: 'Năng Lượng Các Dạng Và Sự Chuyển Hóa', url: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_vi.html', category: 'Vật Lý', description: 'Học về các dạng năng lượng và chuyển hóa', icon: FlashOnIcon },
    { name: 'Con Lắc Lò Xò', url: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_vi.html', category: 'Vật Lý', description: 'Nghiên cứu dao động của hệ lò xo-khối lượng', icon: TimelineIcon },
    { name: 'Tụ Điện Phần Cơ Bản', url: 'https://phet.colorado.edu/sims/html/capacitor-lab-basics/latest/capacitor-lab-basics_vi.html', category: 'Vật Lý', description: 'Khám phá nguyên lý hoạt động của tụ điện', icon: ElectricBoltIcon },
    { name: 'Con Lắc', url: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_vi.html', category: 'Vật Lý', description: 'Thí nghiệm với con lắc vật lý', icon: TimelineIcon },
    { name: 'Chuyển Động Của Đạn Tử', url: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_vi.html', category: 'Vật Lý', description: 'Phân tích chuyển động của vật ném', icon: ScatterPlotIcon },
    { name: 'Lực Hấp Dẫn Và Quỹ Đạo', url: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_vi.html', category: 'Vật Lý', description: 'Nghiên cứu lực hấp dẫn và quỹ đạo', icon: SolarPowerIcon },
    { name: 'Định Luật Hooke', url: 'https://phet.colorado.edu/sims/html/hookes-law/latest/hookes-law_vi.html', category: 'Vật Lý', description: 'Khám phá định luật đàn hồi', icon: StraightenIcon },
    { name: 'Mô Hình Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-model-algebra/latest/area-model-algebra_vi.html', category: 'Vật Lý', description: 'Sử dụng mô hình diện tích trong đại số', icon: SquareIcon },
    { name: 'Số Thập Phần Với Mô Hình Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-model-decimals/latest/area-model-decimals_vi.html', category: 'Vật Lý', description: 'Học số thập phân qua mô hình diện tích', icon: SquareIcon },
    { name: 'Phép Nhân Với Mô Hình Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-model-multiplication/latest/area-model-multiplication_vi.html', category: 'Vật Lý', description: 'Học phép nhân qua mô hình diện tích', icon: SquareIcon },
    { name: 'Giới Thiệu Mô Hình Diện Tích', url: 'https://phet.colorado.edu/sims/html/area-model-introduction/latest/area-model-introduction_vi.html', category: 'Vật Lý', description: 'Giới thiệu về mô hình diện tích', icon: SquareIcon },
    { name: 'Định Luật Ohm', url: 'https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_vi.html', category: 'Vật Lý', description: 'Khám phá định luật Ohm', icon: ElectricBoltIcon },
    { name: 'Điện Trở', url: 'https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_vi.html', category: 'Vật Lý', description: 'Nghiên cứu điện trở trong dây dẫn', icon: ElectricBoltIcon },
    { name: 'Khúc Xạ Ánh Sáng', url: 'https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_vi.html', category: 'Vật Lý', description: 'Quan sát hiện tượng khúc xạ ánh sáng', icon: LensIcon },
    { name: 'Công Viên Ván Trược', url: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_vi.html', category: 'Vật Lý', description: 'Khám phá năng lượng trong công viên ván trượt', icon: SpeedIcon },
    { name: 'Tạo Dựng Phân Tử', url: 'https://phet.colorado.edu/sims/html/build-a-molecule/latest/build-a-molecule_vi.html', category: 'Vật Lý', description: 'Xây dựng các phân tử từ nguyên tử', icon: DnsIcon },
    { name: 'Cộng Phương Trình Vector', url: 'https://phet.colorado.edu/sims/html/vector-addition-equations/latest/vector-addition-equations_vi.html', category: 'Vật Lý', description: 'Giải phương trình cộng vector', icon: FunctionsIcon },
    { name: 'Cộng Vector', url: 'https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_vi.html', category: 'Vật Lý', description: 'Học cách cộng các vector', icon: FunctionsIcon },
    { name: 'Vẽ Đường Cong Thực Nghiệm', url: 'https://phet.colorado.edu/sims/html/curve-fitting/latest/curve-fitting_vi.html', category: 'Vật Lý', description: 'Vẽ đường cong phù hợp với dữ liệu', icon: ShowChartIcon },
    { name: 'Sự Khuyết Tán', url: 'https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_vi.html', category: 'Vật Lý', description: 'Quan sát hiện tượng khuếch tán', icon: AirIcon },
    { name: 'Giới Thiệu Chất Khí', url: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_vi.html', category: 'Vật Lý', description: 'Giới thiệu về tính chất của khí', icon: GasMeterIcon },
  ],
  'Hóa Học': [
    { name: 'Dung Dịch Acid-Base', url: 'https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_vi.html', category: 'Hóa Học', description: 'Khám phá dung dịch acid và base', icon: InvertColorsIcon },
    { name: 'Thang Đo pH', url: 'https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_vi.html', category: 'Hóa Học', description: 'Học về thang đo pH', icon: GasMeterIcon },
    { name: 'Nồng Độ', url: 'https://phet.colorado.edu/sims/html/concentration/latest/concentration_vi.html', category: 'Hóa Học', description: 'Nghiên cứu nồng độ dung dịch', icon: OpacityIcon },
    { name: 'Định Luật Beer', url: 'https://phet.colorado.edu/sims/html/beers-law-lab/latest/beers-law-lab_vi.html', category: 'Hóa Học', description: 'Khám phá định luật Beer', icon: ColorLensIcon },
    { name: 'Nồng Độ Mol', url: 'https://phet.colorado.edu/sims/html/molarity/latest/molarity_vi.html', category: 'Hóa Học', description: 'Hiểu về nồng độ mol', icon: BalanceIcon },
    { name: 'Chất Phản Ứng, Sản Phẩm, Phần Dư', url: 'https://phet.colorado.edu/sims/html/reactants-products-and-leftovers/latest/reactants-products-and-leftovers_vi.html', category: 'Hóa Học', description: 'Khám phá chất phản ứng, sản phẩm và phần dư', icon: WhatshotIcon },
  ],
  'Sinh Học': [
    { name: 'Chọn Lọc Tự Nhiên', url: 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_vi.html', category: 'Sinh Học', description: 'Khám phá quá trình chọn lọc tự nhiên', icon: TrendingUpIcon },
    { name: 'Biểu Hiện Gene Điều Cơ Bản', url: 'https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_vi.html', category: 'Sinh Học', description: 'Học về biểu hiện gene cơ bản', icon: DnsIcon },
    { name: 'Cực Tính Của Phân Tử', url: 'https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity_vi.html', category: 'Sinh Học', description: 'Nghiên cứu cực tính của phân tử', icon: GradientIcon },
    { name: 'Neuron', url: 'https://phet.colorado.edu/sims/html/neuron/latest/neuron_vi.html', category: 'Sinh Học', description: 'Khám phá cấu trúc và chức năng của neuron', icon: PsychologyIcon },
    { name: 'Thị Giác Màu', url: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_vi.html', category: 'Sinh Học', description: 'Hiểu về thị giác màu sắc', icon: VisibilityIcon },
  ],
  'Toán Học': [
    { name: 'Tạo Dựng Hạt Nhân', url: 'https://phet.colorado.edu/sims/html/build-a-nucleus/latest/build-a-nucleus_vi.html', category: 'Toán Học', description: 'Xây dựng hạt nhân nguyên tử', icon: DnsIcon },
    { name: 'Định Luật Kepler', url: 'https://phet.colorado.edu/sims/html/keplers-laws/latest/keplers-laws_vi.html', category: 'Toán Học', description: 'Khám phá định luật Kepler về chuyển động hành tinh', icon: SolarPowerIcon },
    { name: 'Thái Dương Hệ', url: 'https://phet.colorado.edu/sims/html/my-solar-system/latest/my-solar-system_vi.html', category: 'Toán Học', description: 'Mô phỏng hệ mặt trời', icon: SolarPowerIcon },
    { name: 'Hiệu Ứng Nhà Kính', url: 'https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_vi.html', category: 'Toán Học', description: 'Nghiên cứu hiệu ứng nhà kính', icon: CloudIcon },
    { name: 'Phân Bố Mẫu Của Đạn', url: 'https://phet.colorado.edu/sims/html/projectile-sampling-distributions/latest/projectile-sampling-distributions_vi.html', category: 'Toán Học', description: 'Phân tích phân bố mẫu của chuyển động vật ném', icon: ScatterPlotIcon },
    { name: 'Tâm Và Tính Biến Đổi', url: 'https://phet.colorado.edu/sims/html/center-and-variability/latest/center-and-variability_vi.html', category: 'Toán Học', description: 'Học về tâm và tính biến đổi của dữ liệu', icon: BarChartIcon },
    { name: 'Tứ Giác', url: 'https://phet.colorado.edu/sims/html/quadrilateral/latest/quadrilateral_vi.html', category: 'Toán Học', description: 'Khám phá các loại tứ giác', icon: SquareIcon },
    { name: 'So Sánh Số', url: 'https://phet.colorado.edu/sims/html/number-compare/latest/number-compare_vi.html', category: 'Toán Học', description: 'So sánh các số khác nhau', icon: NumbersIcon },
    { name: 'Vui Đùa Với Con Số', url: 'https://phet.colorado.edu/sims/html/number-play/latest/number-play_vi.html', category: 'Toán Học', description: 'Chơi đùa với các con số', icon: NumbersIcon },
    { name: 'Phân Số Hỗn Số', url: 'https://phet.colorado.edu/sims/html/fractions-mixed-numbers/latest/fractions-mixed-numbers_vi.html', category: 'Toán Học', description: 'Học về phân số hỗn số', icon: PieChartIcon },
    { name: 'Phân Số Phần Giới Thiệu', url: 'https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_vi.html', category: 'Toán Học', description: 'Giới thiệu về phân số', icon: PieChartIcon },
    { name: 'Tạo Ra Một Phân Số', url: 'https://phet.colorado.edu/sims/html/build-a-fraction/latest/build-a-fraction_vi.html', category: 'Toán Học', description: 'Xây dựng các phân số', icon: PieChartIcon },
    { name: 'Phân Số : Đẳng Thức', url: 'https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality_vi.html', category: 'Toán Học', description: 'Khám phá đẳng thức của phân số', icon: EqualizerIcon },
    { name: 'Số Học', url: 'https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic_vi.html', category: 'Toán Học', description: 'Luyện tập các phép tính số học', icon: CalculateIcon },
  ],
}

const resources = [
  {
    name: 'Vật Lý',
    icon: FlashOnIcon,
    color: '#22c55e',
    description: 'Khám phá các định luật vật lý từ cơ bản đến nâng cao với thí nghiệm ảo tương tác',
    count: experiments['Vật Lý'].length + ' thí nghiệm'
  },
  {
    name: 'Hóa Học',
    icon: BiotechIcon,
    color: '#10b981',
    description: 'Thí nghiệm hóa học ảo giúp hiểu về phản ứng, dung dịch và cấu trúc phân tử',
    count: experiments['Hóa Học'].length + ' thí nghiệm'
  },
  {
    name: 'Sinh Học',
    icon: GrassIcon,
    color: '#059669',
    description: 'Khám phá thế giới sinh học qua các mô phỏng về tế bào, di truyền và sinh thái',
    count: experiments['Sinh Học'].length + ' thí nghiệm'
  },
  {
    name: 'Toán Học',
    icon: CalculateIcon,
    color: '#047857',
    description: 'Thí nghiệm toán học tương tác giúp trực quan hóa các khái niệm toán học',
    count: experiments['Toán Học'].length + ' thí nghiệm'
  },
]

const Lab2DPage = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFavorites, setFilterFavorites] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedExperiment, setSelectedExperiment] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const categories = Object.keys(experiments)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Vật Lý':
        return <FlashOnIcon />
      case 'Hóa Học':
        return <BiotechIcon />
      case 'Sinh Học':
        return <GrassIcon />
      case 'Toán Học':
        return <CalculateIcon />
      default:
        return <ScienceIcon />
    }
  }

  const handleTabChange = (event: any, newValue: number) => {
    setSelectedTab(newValue)
  }

  const toggleFavorite = (experimentName: string) => {
    setFavorites(prev => 
      prev.includes(experimentName) 
        ? prev.filter(fav => fav !== experimentName)
        : [...prev, experimentName]
    )
  }

  const handleExperimentClick = (experiment: any) => {
    setSelectedExperiment(experiment)
    setModalOpen(true)
    setIsLoading(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedExperiment(null)
    setIsLoading(false)
  }

  const handleOpenInNewTab = (url: string) => {
    window.open(url, '_blank')
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredExperiments = experiments[categories[selectedTab] as keyof typeof experiments]?.filter((exp: any) => {
    const matchesSearch = exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFavorite = !filterFavorites || favorites.includes(exp.name)
    return matchesSearch && matchesFavorite
  }) || []

  const stats = [
    { label: 'Tổng thí nghiệm', value: Object.values(experiments).reduce((acc, cat) => acc + cat.length, 0).toString(), icon: '🧪' },
    { label: 'Môn học', value: '4', icon: '📚' },
    { label: 'Ngôn ngữ', value: 'Tiếng Việt', icon: '🇻🇳' },
    { label: 'Đánh giá', value: '4.8/5', icon: '⭐' },
  ]

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #86efac 75%, #4ade80 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(34, 197, 94, 0.05)',
        pointerEvents: 'none',
      },
      '@keyframes gradientShift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      }
    }}>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 25%, #10b981 50%, #059669 75%, #047857 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 12s ease infinite',
          color: 'white',
          py: 8,
          mb: 4,
          position: 'relative',
          borderRadius: '0 0 0 0',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
          },
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
            '33%': { transform: 'translate(-50%, -50%) rotate(120deg)' },
            '66%': { transform: 'translate(-50%, -50%) rotate(240deg)' },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            textAlign="center"
            sx={{
              mb: 4,
              fontWeight: 900,
              textShadow: '0 6px 30px rgba(0,0,0,0.4)',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            🚀 Thí Nghiệm Ảo - PhET Simulations
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              mb: 6,
              opacity: 0.95,
              fontWeight: 500,
              textShadow: '0 3px 15px rgba(0,0,0,0.3)',
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Khám phá vũ trụ khoa học qua các thí nghiệm tương tác 3D và 2D đầy hấp dẫn
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={3} key={category}>
                <Button
                  fullWidth
                  variant={selectedTab === index ? "contained" : "outlined"}
                  onClick={() => setSelectedTab(index)}
                  sx={{
                    py: 2,
                    px: 3,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    textTransform: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    minHeight: 80,
                    backgroundColor: selectedTab === index ? '#22c55e' : 'rgba(255, 255, 255, 0.15)',
                    color: selectedTab === index ? 'white' : 'white',
                    border: selectedTab === index ? '2px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: selectedTab === index ? '0 8px 30px rgba(34, 197, 94, 0.4)' : '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: selectedTab === index ? '#16a34a' : 'rgba(255, 255, 255, 0.25)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(34, 197, 94, 0.3)',
                    },
                  }}
                >
                  {getCategoryIcon(category)}
                  {category}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Search and Controls */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
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
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: '0 12px 48px rgba(34, 197, 94, 0.25)',
                  border: '2px solid rgba(34, 197, 94, 0.5)',
                  transform: 'translateY(-2px)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 16px 64px rgba(34, 197, 94, 0.3)',
                  border: '2px solid #22c55e',
                  transform: 'translateY(-2px)',
                },
              }
            }}
          />
          <Tooltip title={filterFavorites ? "Hiển thị tất cả" : "Chỉ hiển thị yêu thích"}>
            <IconButton
              onClick={() => setFilterFavorites(!filterFavorites)}
              sx={{
                color: filterFavorites ? 'error.main' : 'rgba(34, 197, 94, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: 4,
                p: 2,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 20px rgba(34, 197, 94, 0.15)',
                '&:hover': {
                  color: filterFavorites ? 'error.main' : '#22c55e',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  transform: 'translateY(-3px) scale(1.05)',
                  boxShadow: '0 8px 32px rgba(34, 197, 94, 0.25)',
                  border: '2px solid rgba(34, 197, 94, 0.5)',
                }
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Chip
            label={`${filteredExperiments.length} thí nghiệm`}
            color="primary"
            variant="outlined"
            sx={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
              border: '2px solid rgba(34, 197, 94, 0.4)',
              backdropFilter: 'blur(20px)',
              fontWeight: 700,
              px: 3,
              py: 1.5,
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(34, 197, 94, 0.2)',
              color: '#22c55e',
              fontSize: '0.95rem',
            }}
          />
        </Box>

        {selectedExperiment && (
          <Alert
            severity="info"
            sx={{
              mb: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
              border: '2px solid rgba(34, 197, 94, 0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(34, 197, 94, 0.2)',
              '& .MuiAlert-icon': {
                color: '#22c55e',
              }
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
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
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  borderRadius: 0,
                  overflow: 'hidden',
                  background: selectedExperiment?.name === experiment.name
                    ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.2) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: selectedExperiment?.name === experiment.name
                    ? '3px solid rgba(34, 197, 94, 0.6)'
                    : '2px solid rgba(34, 197, 94, 0.3)',
                  boxShadow: selectedExperiment?.name === experiment.name
                    ? '0 16px 48px rgba(34, 197, 94, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                    : '0 8px 32px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-16px) scale(1.03)',
                    boxShadow: '0 24px 64px rgba(34, 197, 94, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.5)',
                    border: '3px solid rgba(34, 197, 94, 0.7)',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, #22c55e, #16a34a, #10b981, #059669)',
                    opacity: selectedExperiment?.name === experiment.name ? 1 : 0.8,
                  },
                }}
                onClick={() => handleExperimentClick(experiment)}
              >
                <CardContent sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <Box sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.15) 100%)',
                    backdropFilter: 'blur(15px)',
                    border: '3px solid rgba(34, 197, 94, 0.3)',
                    mx: 'auto',
                    boxShadow: '0 8px 32px rgba(34, 197, 94, 0.25)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'scale(1.15) rotate(5deg)',
                      boxShadow: '0 12px 48px rgba(34, 197, 94, 0.4)',
                      border: '3px solid rgba(34, 197, 94, 0.5)',
                    }
                  }}>
                    {experiment.icon ? React.createElement(experiment.icon) : <ScienceIcon />}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                      lineHeight: 1.3,
                      flexGrow: 1,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {experiment.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 'auto' }}>
                    <Tooltip title={favorites.includes(experiment.name) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(experiment.name)
                        }}
                        sx={{
                          color: favorites.includes(experiment.name) ? '#ef4444' : 'rgba(34, 197, 94, 0.7)',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(15px)',
                          border: '2px solid rgba(34, 197, 94, 0.3)',
                          borderRadius: 2,
                          p: 1.5,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            color: favorites.includes(experiment.name) ? '#dc2626' : '#22c55e',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            transform: 'scale(1.15) rotate(10deg)',
                            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
                            border: '2px solid rgba(34, 197, 94, 0.5)',
                          }
                        }}
                      >
                        {favorites.includes(experiment.name) ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Mở trong tab mới">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenInNewTab(experiment.url)
                        }}
                        sx={{
                          color: 'rgba(34, 197, 94, 0.8)',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(15px)',
                          border: '2px solid rgba(34, 197, 94, 0.3)',
                          borderRadius: 2,
                          p: 1.5,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            color: '#22c55e',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            transform: 'scale(1.15) rotate(-10deg)',
                            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
                            border: '2px solid rgba(34, 197, 94, 0.5)',
                          }
                        }}
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

      {/* Scroll to Top FAB */}
      <Fade in={showScrollTop}>
        <Fab
          color="primary"
          size="large"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4)',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              transform: 'scale(1.1) rotate(360deg)',
              boxShadow: '0 12px 48px rgba(34, 197, 94, 0.6)',
            }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Fade>
    </Box>
  )
}

export default Lab2DPage
