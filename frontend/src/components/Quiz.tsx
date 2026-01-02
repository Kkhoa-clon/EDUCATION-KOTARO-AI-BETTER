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
        showError('Lỗi lấy câu hỏi. Vui lòng thử lại.')
      }
    } catch (error) {
      showError('Lỗi lấy câu hỏi. Vui lòng thử lại.')
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

  const showError = (message: string) => {
    alert(message)
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="pt-20 min-h-screen bg-gradient-banner">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">Câu Hỏi Ngẫu Nhiên</h1>
          <p className="text-text-secondary text-lg">Test kiến thức của bạn với các câu hỏi từ OpenTDB</p>
        </div>

        {questions.length === 0 && !showResult && (
          <div className="glass p-8">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold">Số câu hỏi:</label>
                <select
                  value={config.amount}
                  onChange={(e) => setConfig({ ...config, amount: e.target.value })}
                  className="w-full bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-green"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Chủ đề:</label>
                <select
                  value={config.category}
                  onChange={(e) => setConfig({ ...config, category: e.target.value })}
                  className="w-full bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-green"
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
                <label className="block mb-2 font-semibold">Độ khó:</label>
                <select
                  value={config.difficulty}
                  onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
                  className="w-full bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-green"
                >
                  <option value="">Tất cả</option>
                  <option value="easy">Dễ</option>
                  <option value="medium">Trung bình</option>
                  <option value="hard">Khó</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Loại câu hỏi:</label>
                <select
                  value={config.type}
                  onChange={(e) => setConfig({ ...config, type: e.target.value })}
                  className="w-full bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-green"
                >
                  <option value="">Tất cả</option>
                  <option value="multiple">Nhiều lựa chọn</option>
                  <option value="boolean">Đúng/Sai</option>
                </select>
              </div>

              <button
                onClick={startQuiz}
                disabled={loading}
                className="w-full py-3 bg-accent-green hover:bg-accent-green-hover rounded-lg font-semibold disabled:opacity-50 transition-colors"
              >
                {loading ? '⏳ Đang tải câu hỏi...' : '🚀 Bắt đầu'}
              </button>
            </div>
          </div>
        )}

        {currentQuestion && !showResult && (
          <div className="glass p-8">
            <div className="mb-4 font-semibold text-lg">
              Câu {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className="mb-6 text-xl min-h-[60px]">
              {currentQuestion.question}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {currentQuestion.all_answers.map((answer, index) => {
                const isCorrect = answer === currentQuestion.correct_answer
                const isSelected = selectedAnswer === answer
                const isWrong = isSelected && !isCorrect

                let buttonClass = "px-6 py-3 rounded-lg font-semibold transition-colors "
                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass += "bg-green-500 text-white"
                  } else if (isWrong) {
                    buttonClass += "bg-red-500 text-white"
                  } else {
                    buttonClass += "bg-primary-dark/50 text-text-secondary"
                  }
                } else {
                  buttonClass += "bg-accent-green/20 hover:bg-accent-green/30 text-white"
                }

                return (
                  <button
                    key={index}
                    onClick={() => checkAnswer(answer)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    {answer}
                  </button>
                )
              })}
            </div>
            {showFeedback && (
              <div className="mb-4">
                {selectedAnswer === currentQuestion.correct_answer ? (
                  <div className="text-green-400 text-lg">🎉 Chính xác!</div>
                ) : (
                  <div className="text-red-400 text-lg">
                    Đáp án đúng là: <b>{currentQuestion.correct_answer}</b>
                  </div>
                )}
              </div>
            )}
            {showFeedback && (
              <button
                onClick={nextQuestion}
                className="w-full py-3 bg-accent-green hover:bg-accent-green-hover rounded-lg font-semibold transition-colors"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
              </button>
            )}
          </div>
        )}

        {showResult && (
          <div className="glass p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <div className="text-3xl font-bold mb-4">
              Bạn đúng {score} trên tổng {questions.length} câu!
            </div>
            <div className="text-xl text-text-secondary mb-6">
              Điểm số: {((score / questions.length) * 100).toFixed(0)}%
            </div>
            <button
              onClick={restartQuiz}
              className="px-8 py-3 bg-accent-green hover:bg-accent-green-hover rounded-lg font-semibold transition-colors"
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
