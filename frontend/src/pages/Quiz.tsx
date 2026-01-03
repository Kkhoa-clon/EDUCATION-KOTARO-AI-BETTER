import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Button,
  Grid,
  Alert,
  CircularProgress,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import RefreshIcon from '@mui/icons-material/Refresh'
import api from '../services/api'

interface Question {
  id: string
  question: string
  answers: string[]
  correctAnswer: string
}

const Quiz = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [config, setConfig] = useState({
    amount: '5',
    category: '',
    difficulty: '',
    type: 'multiple', // default to multiple choice
  })

  const startQuiz = async () => {
    setLoading(true)
    try {
      const response = await api.post('/api/quiz/generate', {
        amount: parseInt(config.amount),
        category: config.category || undefined,
        difficulty: config.difficulty || undefined,
        type: config.type || undefined,
      })
      setQuestions(response.data.questions)
      setCurrentQuestionIndex(0)
      setSelectedAnswer('')
      setShowFeedback(false)
      setScore(0)
      setShowResult(false)
    } catch (error) {
      console.error('Failed to generate quiz:', error)
      // Handle error, maybe show alert
      alert(error.response?.data?.message || 'Không thể tạo câu hỏi. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const checkAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer('')
      setShowFeedback(false)
    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setQuestions([])
    setCurrentQuestionIndex(0)
    setSelectedAnswer('')
    setShowFeedback(false)
    setScore(0)
    setShowResult(false)
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 200px)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          Kiểm Tra Kiến Thức
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
          Test kiến thức của bạn với các câu hỏi từ OpenTDB
        </Typography>

        {questions.length === 0 && !showResult && (
          <Card sx={{ p: 4 }}>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Số câu hỏi</InputLabel>
                <Select
                  value={config.amount}
                  onChange={(e) => setConfig({ ...config, amount: e.target.value })}
                  label="Số câu hỏi"
                >
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="15">15</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Chủ đề</InputLabel>
                <Select
                  value={config.category}
                  onChange={(e) => setConfig({ ...config, category: e.target.value })}
                  label="Chủ đề"
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="9">Kiến thức chung</MenuItem>
                  <MenuItem value="10">Giải trí: Sách</MenuItem>
                  <MenuItem value="11">Giải trí: Phim</MenuItem>
                  <MenuItem value="12">Giải trí: Nhạc</MenuItem>
                  <MenuItem value="13">Giải trí: Nhạc kịch & Sân khấu</MenuItem>
                  <MenuItem value="14">Giải trí: Truyền hình</MenuItem>
                  <MenuItem value="15">Giải trí: Trò chơi điện tử</MenuItem>
                  <MenuItem value="16">Giải trí: Trò chơi bàn</MenuItem>
                  <MenuItem value="17">Khoa học & Tự nhiên</MenuItem>
                  <MenuItem value="18">Khoa học: Máy tính</MenuItem>
                  <MenuItem value="19">Khoa học: Toán học</MenuItem>
                  <MenuItem value="20">Thần thoại</MenuItem>
                  <MenuItem value="21">Thể thao</MenuItem>
                  <MenuItem value="22">Địa lý</MenuItem>
                  <MenuItem value="23">Lịch sử</MenuItem>
                  <MenuItem value="24">Chính trị</MenuItem>
                  <MenuItem value="25">Nghệ thuật</MenuItem>
                  <MenuItem value="26">Người nổi tiếng</MenuItem>
                  <MenuItem value="27">Động vật</MenuItem>
                  <MenuItem value="28">Phương tiện</MenuItem>
                  <MenuItem value="29">Giải trí: Truyện tranh</MenuItem>
                  <MenuItem value="30">Khoa học: Thiết bị</MenuItem>
                  <MenuItem value="31">Giải trí: Anime & Manga Nhật</MenuItem>
                  <MenuItem value="32">Giải trí: Hoạt hình</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Loại câu hỏi</InputLabel>
                <Select
                  value={config.type}
                  onChange={(e) => setConfig({ ...config, type: e.target.value })}
                  label="Loại câu hỏi"
                >
                  <MenuItem value="multiple">Trắc nghiệm (4 lựa chọn)</MenuItem>
                  <MenuItem value="boolean">Đúng/Sai</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Độ khó</InputLabel>
                <Select
                  value={config.difficulty}
                  onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
                  label="Độ khó"
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="easy">Dễ</MenuItem>
                  <MenuItem value="medium">Trung bình</MenuItem>
                  <MenuItem value="hard">Khó</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                size="large"
                onClick={startQuiz}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Đang tải câu hỏi...' : 'Bắt đầu'}
              </Button>
            </Stack>
          </Card>
        )}

        {currentQuestion && !showResult && (
          <Card sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={((currentQuestionIndex + 1) / questions.length) * 100}
                  sx={{ mb: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Câu {currentQuestionIndex + 1} / {questions.length}
                </Typography>
              </Box>

              <Typography variant="h5" component="h2" sx={{ minHeight: 60 }}>
                {currentQuestion.question}
              </Typography>

              <Grid container spacing={2}>
                {currentQuestion.answers.map((answer, index) => {
                  const isCorrect = answer === currentQuestion.correctAnswer
                  const isSelected = selectedAnswer === answer
                  const isWrong = isSelected && !isCorrect

                  let buttonColor: 'primary' | 'error' | 'inherit' = 'inherit'
                  let variant: 'contained' | 'outlined' = 'outlined'

                  if (showFeedback) {
                    if (isCorrect) {
                      buttonColor = 'primary'
                      variant = 'contained'
                    } else if (isWrong) {
                      buttonColor = 'error'
                      variant = 'contained'
                    }
                  }

                  return (
                    <Grid item xs={12} sm={6} key={index}>
                      <Button
                        fullWidth
                        variant={variant}
                        color={buttonColor}
                        onClick={() => checkAnswer(answer)}
                        disabled={showFeedback}
                        sx={{
                          py: 2,
                          minHeight: 60,
                          textTransform: 'none',
                          fontSize: '1rem',
                        }}
                      >
                        {answer}
                      </Button>
                    </Grid>
                  )
                })}
              </Grid>

              {showFeedback && (
                <Alert
                  severity={selectedAnswer === currentQuestion.correctAnswer ? 'success' : 'error'}
                  icon={
                    selectedAnswer === currentQuestion.correctAnswer ? <CheckCircleIcon /> : <CancelIcon />
                  }
                >
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    '🎉 Chính xác!'
                  ) : (
                    <>
                      Đáp án đúng là: <strong>{currentQuestion.correctAnswer}</strong>
                    </>
                  )}
                </Alert>
              )}

              {showFeedback && (
                <Button variant="contained" size="large" onClick={nextQuestion} fullWidth>
                  {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
                </Button>
              )}
            </Stack>
          </Card>
        )}

        {showResult && (
          <Card sx={{ p: 6, textAlign: 'center' }}>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h1" sx={{ fontSize: '4rem' }}>
                🏆
              </Typography>
              <Typography variant="h3" component="h2" fontWeight="bold">
                Bạn đúng {score} trên tổng {questions.length} câu!
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Điểm số: {((score / questions.length) * 100).toFixed(0)}%
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={restartQuiz}
                startIcon={<RefreshIcon />}
                sx={{ px: 4 }}
              >
                Làm lại
              </Button>
            </Stack>
          </Card>
        )}
      </Container>
    </Box>
  )
}

export default Quiz
