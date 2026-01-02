if (errorData && errorData.error && typeof errorData.error.message === 'string') {
  let errorMessage = errorData.error.message;
} else {
  let errorMessage = 'Lỗi không xác định từ API';
}

let responseText: string | undefined;
if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
  responseText = data.candidates[0].content.parts[0].text.trim();
}

if (!responseText) throw new Error(errorMessage);

// Thay đổi mermaidCode từ any sang string
import dotenv from 'dotenv';









































































