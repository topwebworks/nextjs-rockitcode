'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGitHubSignIn = async () => {
    setIsLoading(true)
    
    try {
      const result = await signIn('github', { 
        callbackUrl: '/dashboard',
        redirect: false 
      })
      
      if (result?.ok) {
        router.push('/dashboard')
      } else {
        console.error('Sign-in failed:', result?.error)
      }
    } catch (error) {
      console.error('Sign-in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Welcome to Launch Pad</CardTitle>
          <CardDescription>
            Sign in to track your learning progress and earn achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={handleGitHubSignIn}
            disabled={isLoading}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
                Connecting...
              </>
            ) : (
              <>
                <span className="mr-2 h-5 w-5">🐙</span>
                Continue with GitHub
              </>
            )}
          </Button>
          
          <div className="text-center space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
            <p className="text-xs">
              We&apos;ll only access your public GitHub profile information
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
            <div className="space-y-1">
              <div className="text-2xl">📊</div>
              <p>Track Progress</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl">🏆</div>
              <p>Earn Badges</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl">🔥</div>
              <p>Build Streaks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
