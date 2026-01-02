import { useState } from 'react'
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
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'

const ChatbotComponent = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    {
      text: 'Xin chào! Tôi là Kotaro AI, trợ lý học tập của bạn. Tôi có thể giúp bạn trả lời câu hỏi về khoa học, toán học, vật lý, hóa học và nhiều lĩnh vực khác. Hãy đặt câu hỏi để bắt đầu!',
      sender: 'bot',
    },
  ])

  const handleSend = () => {
    if (!message.trim()) return

    setMessages([...messages, { text: message, sender: 'user' }])
    setMessage('')

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Cảm ơn bạn đã hỏi! Tính năng này đang được phát triển. Vui lòng quay lại sau.',
          sender: 'bot',
        },
      ])
    }, 1000)
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700} textAlign="center" sx={{ mb: 4 }}>
          Trợ Lý AI
        </Typography>

        <Card sx={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              p: 3,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
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
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'background.paper',
                    color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                </Paper>
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
