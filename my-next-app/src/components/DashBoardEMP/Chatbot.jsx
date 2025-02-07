'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, AlertCircle, Copy, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { GoogleGenerativeAI } from "@google/generative-ai"

// NOTE: In a production environment, always use environment variables for API keys
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBCuvpypc1y7oCKQZPfctEGtHx5r8edCfo'

const genAI = new GoogleGenerativeAI(API_KEY)

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 'initial', role: 'assistant', content: "Hello! I'm your AI assistant powered by Cricle AI Model. How can I help you today?" }
  ])    
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chatSession, setChatSession] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)

  useEffect(() => {
    const initChat = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })
        const chat = model.startChat({
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 8192,
          },
          history: [],
        })
        setChatSession(chat)
      } catch (error) {
        console.error('Error initializing chat:', error)
        setError('Failed to initialize chat. Please check your API key.')
      }
    }

    initChat()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || !chatSession) return

    const userMessage = { id: Date.now().toString(), role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const result = await chatSession.sendMessage(input)
      const responseText = result.response.text()
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: responseText }])
    } catch (error) {
      console.error('Error:', error)
      setError(error.message || 'An error occurred while processing your request.')
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: "I'm sorry, I encountered an error. Please try again later." }])
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 3000)
    })
  }

  const renderMessage = (message) => {
    if (message.role === 'user') {
      return <p>{message.content}</p>
    }

    return (
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const code = String(children).replace(/\n$/, '')
            return !inline && match ? (
              <div className="relative">
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {code}
                </SyntaxHighlighter>
                <button
                  onClick={() => copyToClipboard(code)}
                  className="absolute top-2 right-2 p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                >
                  {copiedCode === code ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {message.content}
      </ReactMarkdown>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="w-full bg-white shadow-md rounded-lg">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg p-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6" />
            Cricle AI Assistant
          </h2>
        </div>
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              <AlertCircle className="inline-block w-4 h-4 mr-2" />
              <span className="font-bold">Error:</span> {error}
            </div>
          )}
          <div className="h-[400px] overflow-y-auto mb-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 mb-4 ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    AI
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.role === 'assistant'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {renderMessage(message)}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={isLoading || !chatSession}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-md disabled:opacity-50"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}