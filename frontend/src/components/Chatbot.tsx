import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Chip,
  Button,
  Tooltip,
  Fade,
  Zoom,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import SettingsIcon from '@mui/icons-material/Settings'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import RefreshIcon from '@mui/icons-material/Refresh'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// MessageContent component for rendering markdown with syntax highlighting
const MessageContent = ({ content, sender }: { content: string; sender: 'user' | 'bot' }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '')
          const isInline = !match
          return !isInline && match ? (
            <Box sx={{ position: 'relative', mt: 1, mb: 1 }}>
              <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              <Tooltip title="Copy code">
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                  }}
                  onClick={() => navigator.clipboard.writeText(String(children))}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <code
              style={{
                backgroundColor: sender === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.875em',
              }}
              {...props}
            >
              {children}
            </code>
          )
        },
        p: ({ children }) => <Typography variant="body1" sx={{ mb: 1 }}>{children}</Typography>,
        h1: ({ children }) => <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>{children}</Typography>,
        h2: ({ children }) => <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>{children}</Typography>,
        h3: ({ children }) => <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>{children}</Typography>,
        ul: ({ children }) => <Box component="ul" sx={{ pl: 3, mb: 1 }}>{children}</Box>,
        ol: ({ children }) => <Box component="ol" sx={{ pl: 3, mb: 1 }}>{children}</Box>,
        li: ({ children }) => <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>{children}</Typography>,
        table: ({ children }) => (
          <Box sx={{ overflowX: 'auto', mb: 2 }}>
            <Box component="table" sx={{ minWidth: '100%', borderCollapse: 'collapse' }}>
              {children}
            </Box>
          </Box>
        ),
        th: ({ children }) => (
          <Box component="th" sx={{ p: 1, border: '1px solid', borderColor: 'divider', bgcolor: 'action.hover', fontWeight: 600 }}>
            {children}
          </Box>
        ),
        td: ({ children }) => (
          <Box component="td" sx={{ p: 1, border: '1px solid', borderColor: 'divider' }}>
            {children}
          </Box>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

const ChatbotComponent = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot'; timestamp?: Date }>>([
    {
      text: 'Xin chào! Tôi là Kotaro AI, trợ lý học tập của bạn. Tôi có thể giúp bạn trả lời câu hỏi về khoa học, toán học, vật lý, hóa học và nhiều lĩnh vực khác. Hãy đặt câu hỏi để bắt đầu!',
      sender: 'bot',
    },
  ])

  const [selectedModel, setSelectedModel] = useState('qwen2.5-coder:7b')
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  // Fetch available models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:11434/api/tags')
        const data = await response.json()
        if (data.models) {
          const modelNames = data.models.map((model: any) => model.name)
          setAvailableModels(modelNames)
          if (!modelNames.includes(selectedModel) && modelNames.length > 0) {
            setSelectedModel(modelNames[0])
          }
        }
      } catch (error) {
        console.error('Error fetching models:', error)
      }
    }
    fetchModels()
  }, [])

  const handleSend = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = message
    setMessages([...messages, { text: userMessage, sender: 'user', timestamp: new Date() }])
    setMessage('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      // Prepare messages for Ollama
      const ollamaMessages = [
        {
          role: "system",
          content: "You are Kotaro AI, a helpful AI assistant for education. Answer clearly and simply in Vietnamese. Use markdown formatting for code blocks, lists, tables, and structured content.",
        },
        ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        })),
        {
          role: "user",
          content: userMessage,
        },
      ]

      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          messages: ollamaMessages,
          stream: false,
        }),
      })

      const data = await response.json()

      if (data.message && data.message.content) {
        // Simulate typing effect
        const fullText = data.message.content
        let currentText = ''
        const typingSpeed = 30 // ms per character (faster for better UX)

        for (let i = 0; i < fullText.length; i++) {
          await new Promise(resolve => setTimeout(resolve, typingSpeed))
          currentText += fullText[i]
          setMessages((prev) => {
            const newMessages = [...prev]
            const lastMessage = newMessages[newMessages.length - 1]
            if (lastMessage.sender === 'bot') {
              lastMessage.text = currentText
            } else {
              newMessages.push({ text: currentText, sender: 'bot', timestamp: new Date() })
            }
            return newMessages
          })
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.',
            sender: 'bot',
            timestamp: new Date(),
          },
        ])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) => [
        ...prev,
        {
          text: 'Không thể kết nối đến Ollama. Vui lòng kiểm tra Ollama đang chạy trên port 11434.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleRegenerate = () => {
    // Remove last bot message and regenerate
    const lastBotIndex = messages.map((msg, index) => ({ msg, index })).reverse().find(({ msg }) => msg.sender === 'bot')?.index
    if (lastBotIndex !== undefined) {
      const newMessages = messages.slice(0, lastBotIndex)
      setMessages(newMessages)
      // Trigger send again with the last user message
      const lastUserMessage = newMessages.reverse().find(msg => msg.sender === 'user')
      if (lastUserMessage) {
        setMessage(lastUserMessage.text)
        handleSend()
      }
    }
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '0.02em',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                borderRadius: '2px',
              }
            }}
          >
            Trợ Lý AI
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              mt: 1,
              fontWeight: 500,
              opacity: 0.8
            }}
          >
            Hỗ trợ học tập thông minh với AI
          </Typography>
        </Box>

        <Card sx={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              p: 3,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <SmartToyIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Kotaro AI
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Trợ lý học tập thông minh
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Model AI</InputLabel>
                <Select
                  value={selectedModel}
                  label="Model AI"
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={isLoading}
                >
                  {availableModels.map((model) => (
                    <MenuItem key={model} value={model}>
                      {model}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Chip
                icon={<SettingsIcon />}
                label={isTyping ? 'Đang trả lời...' : 'Sẵn sàng'}
                color={isTyping ? 'warning' : 'success'}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>

          {isLoading && (
            <LinearProgress
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
              }}
            />
          )}

          <Box
            sx={{
              flexGrow: 1,
              p: 3,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'flex-start',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <Avatar sx={{ bgcolor: msg.sender === 'user' ? 'secondary.main' : 'primary.main', width: 32, height: 32 }}>
                  {msg.sender === 'user' ? 'U' : <SmartToyIcon sx={{ fontSize: 18 }} />}
                </Avatar>
                <Box sx={{ maxWidth: '70%' }}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: msg.sender === 'user' ? 'primary.main' : 'background.paper',
                      color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                      position: 'relative',
                    }}
                  >
                    {msg.sender === 'user' ? (
                      <Typography variant="body1">{msg.text}</Typography>
                    ) : (
                      <MessageContent content={msg.text} sender={msg.sender} />
                    )}

                    {msg.sender === 'bot' && (
                      <Fade in={!isTyping}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            mt: 1,
                            pt: 1,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Tooltip title="Copy message">
                            <IconButton size="small" onClick={() => handleCopyMessage(msg.text)}>
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Regenerate response">
                            <IconButton size="small" onClick={handleRegenerate} disabled={isLoading}>
                              <RefreshIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Good response">
                            <IconButton size="small" color="success">
                              <ThumbUpIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Bad response">
                            <IconButton size="small" color="error">
                              <ThumbDownIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Fade>
                    )}
                  </Paper>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                placeholder="Nhập câu hỏi của bạn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSend()
                  }
                }}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                  },
                }}
              />
              <IconButton color="primary" onClick={handleSend} sx={{ bgcolor: 'background.paper' }}>
                <SendIcon />
              </IconButton>
            </Stack>
          </Box>
        </Card>
      </Container>
    </Box>
  )
}

export default ChatbotComponent
