'use server'

// NOTE: In a production environment, always use environment variables for API keys
const API_KEY = 'AIzaSyD7Mm9SV3aCYnG5HdBibCoBwoth8TYpLW4'

export async function chat(messages) {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        contents: messages.map(message => ({
          role: message.role === 'user' ? 'USER' : 'MODEL',
          parts: [{ text: message.content }]
        }))
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text
    } else if (data.error) {
      throw new Error(data.error.message || 'Unknown error occurred')
    } else {
      throw new Error('Unexpected response format from Gemini API')
    }
  } catch (error) {
    console.error('Error in chat function:', error)
    return `Error: ${error.message}`
  }
}