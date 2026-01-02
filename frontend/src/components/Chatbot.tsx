import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked'
import mermaid from 'mermaid'
import { geminiApi } from '../services/api'
import { handleError, showError } from '../utils/errorHandler'

interface ChatMessage {
  role: 'user' | 'model'
  parts: Array<{ text?: string; inline_data?: { data: string; mime_type: string } }>
  content?: string // For display
  fileData?: { data: string; mime_type: string }
}

const VIETNAMESE_SYSTEM_PROMPT = `Bạn là Kotaro AI - một trợ lý AI thông minh và thân thiện. Hãy luôn trả lời bằng tiếng Việt một cách tự nhiên, dễ hiểu và hữu ích. 

QUY TẮC QUAN TRỌNG:
1. LUÔN LUÔN trả lời bằng tiếng Việt, không bao giờ dùng tiếng Anh
2. Ngay cả khi người dùng hỏi bằng tiếng Anh, bạn vẫn phải trả lời bằng tiếng Việt
3. Sử dụng ngôn ngữ thân thiện, gần gũi như đang nói chuyện với bạn
4. Trả lời chi tiết và hữu ích, nhưng không quá dài dòng
5. Nếu được hỏi về code, hãy giải thích bằng tiếng Việt trước, sau đó mới đưa code
6. Khi gặp câu hỏi khó, hãy chia nhỏ vấn đề và giải thích từng bước
7. Luôn tỏ ra nhiệt tình và sẵn sàng giúp đỡ
8. Sử dụng emoji phù hợp để tạo cảm giác thân thiện

TÍNH CÁCH: Thân thiện, kiên nhẫn, hài hước nhẹ nhàng, và luôn muốn giúp đỡ người dùng.

LƯU Ý: Đây là yêu cầu bắt buộc - KHÔNG BAO GIỜ trả lời bằng tiếng Anh, chỉ dùng tiếng Việt.`

const DEFAULT_BOT_AVATAR = 'https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg'

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [fileData, setFileData] = useState<{ data: string; mime_type: string } | null>(null)
  const [showDiagramModal, setShowDiagramModal] = useState(false)
  const [diagramDescription, setDiagramDescription] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  // Initialize Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      }
    })
  }, [])

  // Show welcome message on mount
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      role: 'model',
      parts: [{ text: "Xin chào! Tôi là Kotaro AI 🤖\n\nTôi có thể giúp bạn:\n• Trả lời các câu hỏi về kiến thức\n• Giải thích code và lập trình\n• Tạo sơ đồ với lệnh /taosodo\n• Phân tích hình ảnh bạn gửi\n• Và nhiều thứ khác!\n\nHãy hỏi tôi bất cứ điều gì bạn muốn nhé! 😊" }],
      content: "Xin chào! Tôi là Kotaro AI 🤖\n\nTôi có thể giúp bạn:\n• Trả lời các câu hỏi về kiến thức\n• Giải thích code và lập trình\n• Tạo sơ đồ với lệnh /taosodo\n• Phân tích hình ảnh bạn gửi\n• Và nhiều thứ khác!\n\nHãy hỏi tôi bất cứ điều gì bạn muốn nhé! 😊"
    }
    setMessages([welcomeMessage])
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages])

  // Render markdown to HTML
  const renderMarkdown = (text: string): string => {
    try {
      // Check if JSON
      const jsonObj = JSON.parse(text)
      return `<pre class="json-block"><code class="json">${JSON.stringify(jsonObj, null, 2)}</code></pre>`
    } catch (e) {
      // Not JSON, render as markdown
      const html = marked.parse(text, {
        breaks: true,
        gfm: true,
        headerIds: false,
        mangle: false
      })
      return html
    }
  }

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      showError('Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WEBP)')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      const base64String = result.split(',')[1]
      setFileData({
        data: base64String,
        mime_type: file.type
      })
    }
    reader.readAsDataURL(file)
  }

  // Check and handle /taosodo command
  const checkSoDoCommand = (message: string): boolean => {
    const trimmed = message.trim()
    if (trimmed.toLowerCase().startsWith('/taosodo')) {
      const content = trimmed.substring('/taosodo'.length).trim()
      if (content) {
        setDiagramDescription(content)
        setShowDiagramModal(true)
        setTimeout(() => {
          handleGenerateDiagram(content)
        }, 500)
        return true
      }
    }
    return false
  }

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isProcessing) return

    const messageText = inputMessage.trim()
    if (!messageText && !fileData) {
      messageInputRef.current?.focus()
      return
    }

    // Check for /taosodo command
    if (messageText && checkSoDoCommand(messageText)) {
      setInputMessage('')
      setFileData(null)
      return
    }

    setIsProcessing(true)

    // Add user message to UI
    const userMessage: ChatMessage = {
      role: 'user',
      parts: messageText ? [{ text: messageText }] : [],
      content: messageText || (fileData ? 'Đã gửi ảnh để AI phân tích' : ''),
      fileData: fileData || undefined
    }
    setMessages(prev => [...prev, userMessage])

    // Add to chat history
    const historyMessage: ChatMessage = {
      role: 'user',
      parts: [
        ...(messageText ? [{ text: messageText }] : []),
        ...(fileData ? [{ inline_data: fileData }] : [])
      ]
    }
    const newChatHistory = [...chatHistory, historyMessage]
    setChatHistory(newChatHistory)

    // Clear input
    setInputMessage('')
    setFileData(null)

    // Show thinking indicator
    const thinkingMessage: ChatMessage = {
      role: 'model',
      parts: [],
      content: 'thinking'
    }
    setMessages(prev => [...prev, thinkingMessage])

    try {
      // Call API
      const response = await geminiApi.chat({
        message: messageText || undefined,
        chatHistory: newChatHistory,
        systemPrompt: VIETNAMESE_SYSTEM_PROMPT,
        fileData: fileData || undefined
      })

      const responseText = response.text || response.response || ''

      // Remove thinking message and add response
      setMessages(prev => {
        const filtered = prev.filter(m => m.content !== 'thinking')
        return [...filtered, {
          role: 'model',
          parts: [{ text: responseText }],
          content: responseText
        }]
      })

      // Add to chat history
      setChatHistory([...newChatHistory, {
        role: 'model',
        parts: [{ text: responseText }]
      }])

      // Render Mermaid diagrams if any
      setTimeout(() => {
        renderMermaidDiagrams()
      }, 100)

    } catch (error: any) {
      const errorMessage = handleError(error)
      showError(errorMessage)
      
      // Remove thinking message and add error
      setMessages(prev => {
        const filtered = prev.filter(m => m.content !== 'thinking')
        return [...filtered, {
          role: 'model',
          parts: [],
          content: `❌ Lỗi: ${errorMessage}`
        }]
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Render Mermaid diagrams
  const renderMermaidDiagrams = () => {
    const mermaidElements = document.querySelectorAll('.mermaid')
    mermaidElements.forEach((element, index) => {
      const code = element.textContent || ''
      if (code.trim()) {
        const id = `mermaid-${Date.now()}-${index}`
        mermaid.render(id, code).then(({ svg }) => {
          element.innerHTML = svg
        }).catch(err => {
          console.error('Mermaid render error:', err)
        })
      }
    })
  }

  // Generate diagram
  const handleGenerateDiagram = async (description: string) => {
    try {
      const response = await geminiApi.diagram(description)
      if (response.mermaidCode) {
        // Add diagram to chat
        const diagramMessage: ChatMessage = {
          role: 'model',
          parts: [],
          content: `📊 Sơ đồ đã tạo:\n\n\`\`\`mermaid\n${response.mermaidCode}\n\`\`\``
        }
        setMessages(prev => [...prev, diagramMessage])
        
        // Render diagram
        setTimeout(() => {
          renderMermaidDiagrams()
        }, 100)
      }
    } catch (error: any) {
      showError(handleError(error))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-banner pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-secondary-dark/80 backdrop-blur-md border-r border-accent-green/20 p-4 hidden md:block">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-accent-green mb-2">KOTARO AI</h3>
            <p className="text-sm text-text-secondary">Trợ lý học tập thông minh</p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-accent-green/10 rounded-lg">
              <div className="font-semibold mb-1">Giải phương trình Hóa Học</div>
              <div className="text-text-secondary text-xs">Ví dụ: H2 + O2 = H2O</div>
            </div>
            <div className="p-3 bg-accent-green/10 rounded-lg">
              <div className="font-semibold mb-1">Lý giải hiện tượng Vật Lý</div>
              <div className="text-text-secondary text-xs">Ví dụ: Lực hấp dẫn, định luật Ohm</div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-secondary-dark/80 backdrop-blur-md border-b border-accent-green/20 p-4 flex items-center gap-4">
            <img 
              src={DEFAULT_BOT_AVATAR} 
              alt="Bot Avatar" 
              className="w-10 h-10 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_BOT_AVATAR
              }}
            />
            <h2 className="text-xl font-bold">Trợ Lý Sen</h2>
          </div>

          {/* Chat Body */}
          <div 
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'model' && (
                  <img
                    src={DEFAULT_BOT_AVATAR}
                    alt="Bot"
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_BOT_AVATAR
                    }}
                  />
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-accent-green/20 text-white'
                      : 'bg-secondary-dark/80 text-white'
                  }`}
                >
                  {message.content === 'thinking' ? (
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-accent-green rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-accent-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-accent-green rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  ) : message.fileData ? (
                    <div>
                      <img
                        src={`data:${message.fileData.mime_type};base64,${message.fileData.data}`}
                        alt="Uploaded"
                        className="max-w-full rounded mb-2"
                      />
                      {message.content && (
                        <div
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                          className="prose prose-invert max-w-none"
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content || '') }}
                      className="prose prose-invert max-w-none"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="border-t border-accent-green/20 p-4 bg-secondary-dark/80">
            {fileData && (
              <div className="mb-2 flex items-center gap-2">
                <img
                  src={`data:${fileData.mime_type};base64,${fileData.data}`}
                  alt="Preview"
                  className="w-16 h-16 rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFileData(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-accent-green/20 hover:bg-accent-green/30 rounded-lg transition-colors"
                title="Gửi file"
              >
                📎
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDiagramModal(true)
                  setDiagramDescription('')
                }}
                className="px-4 py-2 bg-accent-green/20 hover:bg-accent-green/30 rounded-lg transition-colors"
                title="Tạo sơ đồ"
              >
                📊
              </button>

              <textarea
                ref={messageInputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 768) {
                    e.preventDefault()
                    handleSendMessage(e)
                  }
                }}
                placeholder="Nhập tin nhắn của bạn..."
                className="flex-1 bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 resize-none focus:outline-none focus:border-accent-green"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '200px' }}
              />

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-2 bg-accent-green hover:bg-accent-green-hover rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? '⏳' : '↑'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Diagram Modal */}
      {showDiagramModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-secondary-dark rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Tạo Sơ Đồ Khối</h3>
              <button
                onClick={() => setShowDiagramModal(false)}
                className="text-text-secondary hover:text-white"
              >
                ✕
              </button>
            </div>
            <textarea
              value={diagramDescription}
              onChange={(e) => setDiagramDescription(e.target.value)}
              placeholder="Nhập mô tả sơ đồ..."
              className="w-full bg-primary-dark border border-accent-green/30 rounded-lg px-4 py-2 mb-4 min-h-[100px]"
            />
            <button
              onClick={() => handleGenerateDiagram(diagramDescription)}
              disabled={!diagramDescription.trim() || isProcessing}
              className="w-full py-2 bg-accent-green hover:bg-accent-green-hover rounded-lg font-semibold disabled:opacity-50"
            >
              Tạo Sơ Đồ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
