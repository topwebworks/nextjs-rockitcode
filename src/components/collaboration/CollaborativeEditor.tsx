// Week 6: Collaborative Code Editor
// Real-time collaborative coding environment with Socket.io

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { io, Socket } from 'socket.io-client'

interface CollaboratorUser {
  id: string
  name: string
  avatar?: string
  cursor?: {
    line: number
    column: number
  }
  isActive: boolean
}

interface CodeChange {
  type: 'insert' | 'delete' | 'replace'
  position: number
  content: string
  userId: string
  timestamp: number
}

interface CollaborativeEditorProps {
  sessionId?: string
  initialCode?: string
  language?: string
  readOnly?: boolean
  onCodeChange?: (code: string) => void
  className?: string
}

export function CollaborativeEditor({
  sessionId = 'default',
  initialCode = '',
  language = 'javascript',
  readOnly = false,
  onCodeChange,
  className
}: CollaborativeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [collaborators, setCollaborators] = useState<CollaboratorUser[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { user } = useUser()

  // Initialize Socket.io connection
  useEffect(() => {
    if (!user) return

    const socketInstance = io('/api/collaboration', {
      query: {
        sessionId,
        userId: user.id,
        userName: user.user_metadata?.full_name || user.email || 'Anonymous'
      }
    })

    socketInstance.on('connect', () => {
      setIsConnected(true)
      console.log('Connected to collaboration server')
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
      console.log('Disconnected from collaboration server')
    })

    socketInstance.on('collaborators-updated', (users: CollaboratorUser[]) => {
      setCollaborators(users.filter(u => u.id !== user.id))
    })

    socketInstance.on('code-change', (change: CodeChange) => {
      if (change.userId !== user.id) {
        applyCodeChange(change)
      }
    })

    socketInstance.on('cursor-update', (update: { userId: string, cursor: { line: number, column: number } }) => {
      if (update.userId !== user.id) {
        setCollaborators(prev => 
          prev.map(collab => 
            collab.id === update.userId 
              ? { ...collab, cursor: update.cursor }
              : collab
          )
        )
      }
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [user, sessionId])

  // Apply code changes from other users
  const applyCodeChange = (change: CodeChange) => {
    setCode(prevCode => {
      let newCode = prevCode
      
      switch (change.type) {
        case 'insert':
          newCode = prevCode.slice(0, change.position) + change.content + prevCode.slice(change.position)
          break
        case 'delete':
          newCode = prevCode.slice(0, change.position) + prevCode.slice(change.position + change.content.length)
          break
        case 'replace':
          // For simple replace, we'll treat it as delete + insert
          const deleteLength = change.content.split('|')[0]?.length || 0
          const insertContent = change.content.split('|')[1] || ''
          newCode = prevCode.slice(0, change.position) + insertContent + prevCode.slice(change.position + deleteLength)
          break
      }
      
      return newCode
    })
  }

  // Handle local code changes
  const handleCodeChange = (newCode: string) => {
    if (readOnly) return

    const oldCode = code
    setCode(newCode)
    onCodeChange?.(newCode)

    // Send change to other collaborators
    if (socket && user) {
      const change: CodeChange = {
        type: 'replace', // Simplified - in real app would do more precise diff
        position: 0,
        content: `${oldCode.length}|${newCode}`,
        userId: user.id,
        timestamp: Date.now()
      }

      socket.emit('code-change', change)
    }
  }

  // Handle cursor position updates
  const handleCursorChange = () => {
    if (!textareaRef.current || !socket || !user) return

    const textarea = textareaRef.current
    const position = textarea.selectionStart
    const textBeforeCursor = textarea.value.substring(0, position)
    const lines = textBeforeCursor.split('\n')
    
    const cursor = {
      line: lines.length,
      column: lines[lines.length - 1].length
    }

    socket.emit('cursor-update', { cursor })
  }

  // Start a new collaboration session
  const startSession = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/collaboration/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          code,
          language
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Collaboration session started:', data.sessionId)
      }
    } catch (error) {
      console.error('Failed to start collaboration session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCollaboratorColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800', 
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800'
    ]
    return colors[index % colors.length]
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Collaboration Status */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                🤝 Collaborative Editor
                <Badge 
                  variant="outline" 
                  className={`${isConnected ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'}`}
                >
                  {isConnected ? 'Connected' : 'Disconnected'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Session: {sessionId} • Language: {language}
              </CardDescription>
            </div>
            
            {!isConnected && (
              <Button 
                onClick={startSession} 
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? 'Starting...' : 'Start Session'}
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Active Collaborators */}
        {collaborators.length > 0 && (
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active collaborators:</span>
              {collaborators.map((collaborator, index) => (
                <Badge 
                  key={collaborator.id}
                  className={getCollaboratorColor(index)}
                >
                  {collaborator.name}
                  {collaborator.cursor && (
                    <span className="ml-1 text-xs opacity-70">
                      L{collaborator.cursor.line}:C{collaborator.cursor.column}
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Code Editor */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onSelect={handleCursorChange}
              onKeyUp={handleCursorChange}
              onMouseUp={handleCursorChange}
              className={`w-full h-96 p-4 font-mono text-sm border-0 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                readOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
              }`}
              placeholder={`Enter your ${language} code here...`}
              readOnly={readOnly}
            />
            
            {/* Collaboration indicators */}
            {collaborators.some(c => c.cursor) && (
              <div className="absolute top-4 right-4 space-y-1">
                {collaborators
                  .filter(c => c.cursor && c.isActive)
                  .map((collaborator, index) => (
                    <div 
                      key={collaborator.id}
                      className={`px-2 py-1 rounded text-xs ${getCollaboratorColor(index)}`}
                    >
                      {collaborator.name} editing
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Session Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{collaborators.length}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{code.split('\n').length}</div>
              <div className="text-sm text-gray-600">Lines of Code</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{code.length}</div>
              <div className="text-sm text-gray-600">Characters</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? '🟢' : '🔴'}
              </div>
              <div className="text-sm text-gray-600">Connection</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CollaborativeEditor
