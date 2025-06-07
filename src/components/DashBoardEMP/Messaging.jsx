'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, Phone, Video } from 'lucide-react'

export default function Messaging() {
  const [messages, setMessages] = useState([
    { text: "Hi there! How's the project going?", sender: "John" },
    { text: "It's going well, thanks for asking!", sender: "You" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }])
      setInput("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">Messaging</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end space-x-2 mb-4">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" /> Call
            </Button>
            <Button variant="outline" size="sm">
              <Video className="h-4 w-4 mr-2" /> Video
            </Button>
          </div>
          <div className="h-[300px] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-md">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  message.sender === "You" ? "bg-blue-100 text-blue-800 ml-auto" : "bg-gray-200 text-gray-800"
                } max-w-[70%]`}
              >
                <div className="font-semibold text-xs mb-1">{message.sender}</div>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="mr-2"
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}