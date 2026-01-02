import { useState, useEffect } from 'react'

interface Question {
  question: string
  correct_answer: string
  incorrect_answers: string[]
  all_answers: string[]
}

const scienceCategories = [
  { id: 17, name: "Khoa học & Tự nhiên" },
  { id: 18, name: "Khoa học: Máy tính" },
  { id: 19, name: "Khoa học: Toán học" },
  { id: 27, name: "Động vật" },
  { id: 30, name: "Khoa học: Thiết bị" }
]

const otherCategories = [
  { id: 9, name: "Kiến thức chung" },
  { id: 10, name: "Giải trí: Sách" },
  { id: 11, name: "Giải trí: Phim ảnh" },
  { id: 12, name: "Giải trí: Âm nhạc" },
  { id: 13, name: "Giải trí: Nhạc kịch & Sân khấu" },
  { id: 14, name: "Giải trí: Truyền hình" },
  { id: 15, name: "Giải trí: Trò chơi điện tử" },
  { id: 16, name: "Giải trí: Board Games" },
  { id: 20, name: "Thần thoại" },
  { id: 21, name: "Thể thao" },
  { id: 22, name: "Địa lý" },
  { id: 23, name: "Lịch sử" },
  { id: 24, name: "Chính trị" },
  { id: 25, name: "Nghệ thuật" },
  { id: 26, name: "Người nổi tiếng" },
  { id: 28, name: "Phương tiện" },
  { id: 29, name: "Giải trí: Truyện tranh" },
  { id: 31, name: "Giải trí: Anime & Manga Nhật Bản" },
  { id: 32, name: "Giải trí: Hoạt hình & Phim hoạt hình" }
]

const translateText = async (text: string, targetLang = 'vi'): Promise<string> => {
  if (!text || text.trim() === '') return ''
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`)
    const data = await res.json()
    return data[0].map((item: any[]) => item[0]).join('')
  } catch (e) {
    return text
  }
}

const translateArray = async (arr: string[]): Promise<string[]> => {
  return Promise.all(arr.map(t => translateText(t)))
}

const decodeHtml = (html: string): string => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

const QuizComponent = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [sessionToken, setSessionToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [config, setConfig] = useState({
    amount: '10',
    category: '',
    difficulty: '',
    type: ''
  })

  useEffect(() => {
    getSessionToken()
  }, [])

  const getSessionToken = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request')
      const data = await response.json()
      setSessionToken(data.token)
    } catch (error) {
      console.error('Lỗi lấy token:', error)
    }
  }

  const startQuiz = async () => {
    if (!config.amount || !sessionToken) return

    setLoading(true)
    try {
      let url = `https://opentdb.com/api.php?amount=${config.amount}&token=${sessionToken}`
      if (config.category) url += `&category=${config.category}`
      if (config.difficulty) url += `&difficulty=${config.difficulty}`
      if (config.type) url += `&type=${config.type}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.response_code === 0) {
        const rawQuestions = data.results.map((q: any) => ({
          question: decodeHtml(q.question),
          correct_answer: decodeHtml(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(decodeHtml)
        }))

        const translatedQuestions = await Promise.all(
          rawQuestions.map(async (q: any) => {
            const [questionVi, correctVi, ...incorrectVi] = await translateArray([
              q.question,
              q.correct_answer,
              ...q.incorrect_answers
            ])
            const allAnswers = [correctVi, ...incorrectVi]
            allAnswers.sort(() => Math.random() - 0.5)
            return {
              question: questionVi,
              correct_answer: correctVi,
              incorrect_answers: incorrectVi,
              all_answers: allAnswers
            }
          })
        )

        setQuestions(translatedQuestions)
        setCurrentQuestionIndex(0)
        setScore(0)
        setShowResult(false)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        alert('Lỗi lấy câu hỏi. Vui lòng thử lại.')
      }
    } catch (error) {
      alert('Lỗi lấy câu hỏi. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const checkAnswer = (answer: string) => {
    if (showFeedback) return
    setSelectedAnswer(answer)
    setShowFeedback(true)
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setQuestions([])
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const currentQuestion = questions[currentQuestionIndex]

  const pageStyle: React.CSSProperties = {
    paddingTop: '5rem',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1c1d26 25%, #2a2b36 50%, #1c1d26 75%, #0f0f23 100%)',
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  }

  const cardStyle: React.CSSProperties = {
    background: 'rgba(15, 15, 35, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '25px',
    border: '1px solid rgba(115, 210, 57, 0.3)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
    padding: '2rem',
    marginBottom: '2rem',
  }

  const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#ffffff',
  }

  const subtitleStyle: React.CSSProperties = {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: '1.125rem',
    marginBottom: '2rem',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#1c1d26',
    border: '1px solid rgba(115, 210, 57, 0.3)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: '#fff',
    fontSize: '1rem',
    marginBottom: '1rem',
  }

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'linear-gradient(135deg, #73d239, #5fb82f)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  const answerButtonStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem',
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={titleStyle}>Câu Hỏi Ngẫu Nhiên</h1>
          <p style={subtitleStyle}>Test kiến thức của bạn với các câu hỏi từ OpenTDB</p>
        </div>

        {questions.length === 0 && !showResult && (
          <div style={cardStyle}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>
                Số câu hỏi:
              </label>
              <select
                value={config.amount}
                onChange={(e) => setConfig({ ...config, amount: e.target.value })}
                style={inputStyle}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>
                Chủ đề:
              </label>
              <select
                value={config.category}
                onChange={(e) => setConfig({ ...config, category: e.target.value })}
                style={inputStyle}
              >
                <optgroup label="Khoa học tự nhiên">
                  {scienceCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Lĩnh vực khác">
                  {otherCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>
                Độ khó:
              </label>
              <select
                value={config.difficulty}
                onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
                style={inputStyle}
              >
                <option value="">Tất cả</option>
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>
                Loại câu hỏi:
              </label>
              <select
                value={config.type}
                onChange={(e) => setConfig({ ...config, type: e.target.value })}
                style={inputStyle}
              >
                <option value="">Tất cả</option>
                <option value="multiple">Nhiều lựa chọn</option>
                <option value="boolean">Đúng/Sai</option>
              </select>
            </div>

            <button
              onClick={startQuiz}
              disabled={loading}
              style={{ ...buttonStyle, opacity: loading ? 0.5 : 1 }}
            >
              {loading ? '⏳ Đang tải câu hỏi...' : '🚀 Bắt đầu'}
            </button>
          </div>
        )}

        {currentQuestion && !showResult && (
          <div style={cardStyle}>
            <div style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '1.125rem', color: '#fff' }}>
              Câu {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div style={{ marginBottom: '1.5rem', fontSize: '1.25rem', minHeight: '60px', color: '#fff' }}>
              {currentQuestion.question}
            </div>
            <div style={gridStyle}>
              {currentQuestion.all_answers.map((answer, index) => {
                const isCorrect = answer === currentQuestion.correct_answer
                const isSelected = selectedAnswer === answer
                const isWrong = isSelected && !isCorrect

                let buttonStyleFinal = { ...answerButtonStyle }
                if (showFeedback) {
                  if (isCorrect) {
                    buttonStyleFinal = { ...buttonStyleFinal, background: '#73d239', color: '#fff' }
                  } else if (isWrong) {
                    buttonStyleFinal = { ...buttonStyleFinal, background: '#e74c3c', color: '#fff' }
                  } else {
                    buttonStyleFinal = { ...buttonStyleFinal, background: 'rgba(28, 29, 38, 0.5)', color: 'rgba(255, 255, 255, 0.75)' }
                  }
                } else {
                  buttonStyleFinal = { ...buttonStyleFinal, background: 'rgba(115, 210, 57, 0.2)', color: '#fff' }
                }

                return (
                  <button
                    key={index}
                    onClick={() => checkAnswer(answer)}
                    disabled={showFeedback}
                    style={buttonStyleFinal}
                  >
                    {answer}
                  </button>
                )
              })}
            </div>
            {showFeedback && (
              <div style={{ marginBottom: '1rem' }}>
                {selectedAnswer === currentQuestion.correct_answer ? (
                  <div style={{ color: '#73d239', fontSize: '1.125rem' }}>🎉 Chính xác!</div>
                ) : (
                  <div style={{ color: '#e74c3c', fontSize: '1.125rem' }}>
                    Đáp án đúng là: <b>{currentQuestion.correct_answer}</b>
                  </div>
                )}
              </div>
            )}
            {showFeedback && (
              <button
                onClick={nextQuestion}
                style={buttonStyle}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
              </button>
            )}
          </div>
        )}

        {showResult && (
          <div style={{ ...cardStyle, textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>
              Bạn đúng {score} trên tổng {questions.length} câu!
            </div>
            <div style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '1.5rem' }}>
              Điểm số: {((score / questions.length) * 100).toFixed(0)}%
            </div>
            <button
              onClick={restartQuiz}
              style={buttonStyle}
            >
              Làm lại
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizComponent
