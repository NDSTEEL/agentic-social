'use client'

import { useState } from 'react'
import { Mic, MicOff, Zap, MessageSquare, Image, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Agentic Social</h1>
            </div>
            <div className="text-sm text-gray-600">
              Voice-First Content Creation
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Create Social Content with Your Voice
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Speak naturally to generate social media posts, images, and videos. 
            Our AI agents handle the rest - from trend analysis to brand compliance.
          </p>
          
          {/* Voice Interface */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-12">
            <div className="flex flex-col items-center space-y-6">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                {isRecording ? (
                  <MicOff className="h-10 w-10" />
                ) : (
                  <Mic className="h-10 w-10" />
                )}
              </button>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isRecording ? 'Listening...' : 'Click to start voice session'}
                </h3>
                <p className="text-gray-600">
                  Try: "Create a LinkedIn post about AI trends"
                </p>
              </div>

              {transcript && (
                <div className="w-full bg-gray-50 rounded-lg p-4 text-left">
                  <p className="text-gray-700 italic">"{transcript}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <h3 className="text-xl font-semibold">Voice-First Interface</h3>
            </div>
            <p className="text-gray-600">
              Speak naturally to create content. No typing, no complex menus - 
              just natural conversation with AI agents.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Image className="h-8 w-8 text-purple-500" />
              <h3 className="text-xl font-semibold">Multi-Modal Generation</h3>
            </div>
            <p className="text-gray-600">
              Generate images, videos, and music using state-of-the-art AI models. 
              Perfect for engaging social media content.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <h3 className="text-xl font-semibold">Trend Intelligence</h3>
            </div>
            <p className="text-gray-600">
              Real-time competitive analysis and trend detection. 
              Stay ahead with data-driven content strategies.
            </p>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">🚧 Development Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Voice Interface Foundation</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                In Progress
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">MCP Agent Framework</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                Planned
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Content Generation System</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                Planned
              </span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              <strong>🎯 CI/CD Active:</strong> Every completed task automatically deploys to this interface. 
              Watch progress in real-time as features become available!
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">
            Built with Agent OS + GitHub Spec-Kit • {' '}
            <a 
              href="https://github.com/NDSTEEL/agentic-social" 
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}