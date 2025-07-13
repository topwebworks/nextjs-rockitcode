// Week 6: AI Learning Assistant Component
// Interactive AI assistant for personalized learning support

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AIMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    type: 'code_review' | 'explanation' | 'hint' | 'general'
    context?: string
  }
}

interface AIAssistantProps {
  lessonId?: string
  context?: string
  className?: string
}

export function AIAssistant({ lessonId, context, className }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI learning assistant. I can help you with code reviews, explain concepts, provide hints, and guide your learning journey. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useUser()

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const sendMessage = async (messageContent: string, messageType: 'general' | 'code_review' | 'explanation' | 'hint' = 'general') => {
    if (!messageContent.trim() || !user) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date(),
      metadata: { type: messageType, context }
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      let response
      
      switch (messageType) {
        case 'explanation':
          response = await fetch('/api/ai/explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              concept: messageContent,
              context,
              lessonId
            })
          })
          break
          
        case 'hint':
          response = await fetch('/api/ai/hint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              problem: context || 'General programming help',
              userCode: messageContent,
              language: 'javascript',
              difficulty: 5,
              lessonId
            })
          })
          break
          
        default:
          // For general conversation, we'll use a simple chat endpoint
          response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: messageContent,
              context,
              lessonId,
              history: messages.slice(-5) // Send last 5 messages for context
            })
          })
      }

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: AIMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.explanation?.explanation || data.hint?.hint || data.response || 'I apologize, but I could not process your request.',
          timestamp: new Date(),
          metadata: { type: messageType, context }
        }
        
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error('Failed to get AI response')
      }
    } catch (error) {
      console.error('AI Assistant error:', error)
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or rephrase your question.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'explain':
        setInput('Can you explain ')
        break
      case 'review':
        setInput('Please review this code: ')
        break
      case 'hint':
        setInput('I need a hint for ')
        break
      case 'path':
        sendMessage('What should I learn next?', 'general')
        break
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      // Detect message type based on content
      let messageType: 'general' | 'code_review' | 'explanation' | 'hint' = 'general'
      
      if (input.toLowerCase().includes('explain') || input.toLowerCase().includes('what is')) {
        messageType = 'explanation'
      } else if (input.toLowerCase().includes('review') || input.toLowerCase().includes('feedback')) {
        messageType = 'code_review'
      } else if (input.toLowerCase().includes('hint') || input.toLowerCase().includes('help with')) {
        messageType = 'hint'
      }
      
      sendMessage(input, messageType)
    }
  }

  if (!isExpanded) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsExpanded(true)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="lg"
        >
          🤖
        </Button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Card className="w-96 h-[500px] shadow-xl border-2 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">AI Learning Assistant</CardTitle>
              <CardDescription>Get help with coding and learning</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex flex-col h-[400px]">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('explain')}
              disabled={isLoading}
            >
              📚 Explain
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('review')}
              disabled={isLoading}
            >
              🔍 Review Code
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('hint')}
              disabled={isLoading}
            >
              💡 Get Hint
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('path')}
              disabled={isLoading}
            >
              🎯 Learning Path
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 border'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-1 opacity-70 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 border rounded-lg px-3 py-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about coding..."
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AIAssistant
