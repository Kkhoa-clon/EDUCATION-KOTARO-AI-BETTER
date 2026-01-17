import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
// Import model-viewer từ package
import '@google/model-viewer'

// Khai báo type cho model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<any, any>
    }
  }
}

interface ARModel {
  name: string
  filename: string
  platform: 'android' | 'ios'
  extension: string
  displayName: string
}

// Danh sách mô hình có sẵn (hardcode từ thư mục backend)
const AVAILABLE_MODELS: ARModel[] = [
  {
    name: 'h2o',
    filename: 'h2o.glb',
    platform: 'android',
    extension: '.glb',
    displayName: 'Phân tử H₂O',
  },
  {
    name: 'h2o',
    filename: 'h2o.usdz',
    platform: 'ios',
    extension: '.usdz',
    displayName: 'Phân tử H₂O',
  },
]

const VR: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ARModel | null>(null)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const [isARActive, setIsARActive] = useState(false)
  const [error, setError] = useState<string>('')
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const modelViewerRef = useRef<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Helper function để lấy API base URL
  const getApiBaseUrl = () => {
    const envUrl = (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL
    if (envUrl) {
      return envUrl
    }
    return window.location.origin
  }

  // Lấy danh sách mô hình phù hợp với thiết bị
  const getAvailableModels = (): ARModel[] => {
    const ua = navigator.userAgent || navigator.vendor
    if (/iPhone|iPad|iPod/i.test(ua)) {
      return AVAILABLE_MODELS.filter(m => m.platform === 'ios')
    } else if (/Android/i.test(ua)) {
      return AVAILABLE_MODELS.filter(m => m.platform === 'android')
    }
    // Desktop: hiển thị tất cả
    return AVAILABLE_MODELS
  }

  const availableModels = getAvailableModels()

  // Khởi tạo mô hình mặc định
  useEffect(() => {
    if (availableModels.length > 0 && !selectedModel) {
      setSelectedModel(availableModels[0])
    }
  }, [])

  // Yêu cầu quyền camera và khởi tạo stream
  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const constraints = {
          video: {
            facingMode: 'environment', // Sử dụng camera sau
            width: { ideal: 1280 },
            height: { ideal: 720 },
          }
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        setCameraStream(stream)
        setCameraPermission(true)
        
        // Gán stream vào video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          // Đảm bảo video được play
          videoRef.current.setAttribute('playsinline', 'true')
          videoRef.current.setAttribute('webkit-playsinline', 'true')
          
          // Chờ video sẵn sàng rồi mới play
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(err => {
              console.error('Error playing video:', err)
            })
          }
          
          // Thử play ngay
          videoRef.current.play().catch(err => {
            console.error('Error playing video immediately:', err)
          })
        }
        return true
      } else {
        setError('Trình duyệt không hỗ trợ truy cập camera.')
        setCameraPermission(false)
        return false
      }
    } catch (err: any) {
      console.error('Camera permission error:', err)
      setCameraPermission(false)
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Vui lòng cấp quyền camera để sử dụng tính năng AR.')
      } else if (err.name === 'NotFoundError') {
        setError('Không tìm thấy camera. Vui lòng kiểm tra thiết bị.')
      } else {
        setError('Không thể truy cập camera. Vui lòng kiểm tra cài đặt trình duyệt.')
      }
      return false
    }
  }

  // Dừng camera stream
  const stopCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      setCameraStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  // Mở AR view
  const openAR = async () => {
    if (!selectedModel) {
      setError('Vui lòng chọn một mô hình để xem AR.')
      return
    }

    // Yêu cầu quyền camera trước
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      return
    }

    setError('')
    setIsARActive(true)
  }

  // Đóng AR view
  const closeAR = () => {
    stopCameraStream()
    setIsARActive(false)
    setCameraPermission(null)
  }

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      stopCameraStream()
    }
  }, [])

  const detectPlatform = () => {
    const ua = navigator.userAgent || navigator.vendor
    if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS'
    if (/Android/i.test(ua)) return 'Android'
    return 'Desktop'
  }

  // Lấy URL của mô hình
  const getModelUrl = (model: ARModel) => {
    const apiBaseUrl = getApiBaseUrl()
    return `${apiBaseUrl}/api/ar/${model.platform}/${model.filename}`
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mô phỏng AR
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Chọn mô hình và xem trong thực tế ảo với camera
        </Typography>
      </Box>

      {availableModels.length === 0 ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Không có mô hình nào khả dụng cho thiết bị này. Vui lòng thêm file .glb (Android) hoặc .usdz (iOS) vào thư mục backend.
        </Alert>
      ) : (
        <Paper elevation={3} sx={{ p: 4 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="model-select-label">Chọn mô hình</InputLabel>
            <Select
              labelId="model-select-label"
              id="model-select"
              value={selectedModel?.filename || ''}
              label="Chọn mô hình"
              onChange={(e) => {
                const model = availableModels.find(m => m.filename === e.target.value)
                setSelectedModel(model || null)
              }}
            >
              {availableModels.map((model) => (
                <MenuItem key={model.filename} value={model.filename}>
                  {model.displayName} ({model.platform.toUpperCase()})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {cameraPermission === false && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              ⚠️ Quyền camera bị từ chối. Vui lòng cấp quyền để sử dụng AR.
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Thiết bị:</strong> {detectPlatform()}
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={openAR}
              disabled={!selectedModel}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                minWidth: '200px',
              }}
            >
              🚀 Xem AR với Camera
            </Button>
          </Box>

          <Paper variant="outlined" sx={{ p: 2, mt: 3, bgcolor: 'grey.50' }}>
            <Typography variant="subtitle2" gutterBottom>
              <strong>Lưu ý:</strong>
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Ứng dụng sẽ yêu cầu quyền truy cập camera để hiển thị AR"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Di chuyển thiết bị để quét không gian xung quanh"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="iOS: Sử dụng file .usdz (AR Quick Look)"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Android: Sử dụng file .glb (Google Scene Viewer)"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Đảm bảo thiết bị hỗ trợ AR và có đủ ánh sáng"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            </List>
          </Paper>
        </Paper>
      )}

      {/* AR Dialog */}
      <Dialog
        open={isARActive}
        onClose={closeAR}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: 'black',
            m: 0,
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', height: '100%' }}>
          <IconButton
            onClick={closeAR}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1000,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedModel && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Video element để hiển thị camera feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                webkit-playsinline="true"
                x5-playsinline="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1,
                  backgroundColor: '#000',
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(err => {
                      console.error('Error playing video after metadata loaded:', err)
                    })
                  }
                }}
              />

              {/* Model viewer overlay trên camera */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              >
              {selectedModel.platform === 'android' ? (
                <model-viewer
                  ref={modelViewerRef}
                  src={getModelUrl(selectedModel)}
                  alt={selectedModel.displayName}
                  ar
                  ar-modes="webxr scene-viewer"
                  camera-controls
                  touch-action="none"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                  }}
                  ar-scale="auto"
                  ar-placement="floor"
                  interaction-policy="allow-when-focused"
                  environment-image="neutral"
                  shadow-intensity="1"
                  preload="auto"
                  loading="eager"
                />
              ) : (
                <model-viewer
                  ref={modelViewerRef}
                  src={getModelUrl(selectedModel)}
                  alt={selectedModel.displayName}
                  ar
                  ar-modes="webxr quick-look"
                  camera-controls
                  touch-action="none"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                  }}
                  ios-src={getModelUrl(selectedModel)}
                  ar-scale="auto"
                  ar-placement="floor"
                  interaction-policy="allow-when-focused"
                  environment-image="neutral"
                  shadow-intensity="1"
                  preload="auto"
                  loading="eager"
                />
              )}
              </Box>
            </Box>
          )}

          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.6)',
              px: 3,
              py: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              {selectedModel?.displayName}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              Di chuyển thiết bị để quét không gian và đặt mô hình
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default VR
