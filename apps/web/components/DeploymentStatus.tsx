'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react'

interface Task {
  id: string
  name: string
  status: 'pending' | 'in_progress' | 'completed' | 'error'
  terminal: number
  startTime?: Date
  completedTime?: Date
  description: string
  previewUrl?: string
}

const MOCK_TASKS: Task[] = [
  {
    id: 'auth-db',
    name: 'Authentication & Database',
    status: 'pending',
    terminal: 1,
    description: 'User auth system + PostgreSQL schema setup'
  },
  {
    id: 'voice-processing',
    name: 'Voice Processing Engine',
    status: 'pending', 
    terminal: 2,
    description: 'ElevenLabs STT/TTS integration + voice I/O'
  },
  {
    id: 'mcp-agent',
    name: 'MCP Agent Framework',
    status: 'pending',
    terminal: 3, 
    description: 'MCP protocol + Claude integration + NLP parser'
  },
  {
    id: 'realtime-backend',
    name: 'Real-time Backend',
    status: 'pending',
    terminal: 4,
    description: 'WebSocket setup + Express API + Socket.io'
  },
  {
    id: 'frontend-dashboard',
    name: 'Frontend Dashboard',
    status: 'pending',
    terminal: 5,
    description: 'Voice UI components + real-time updates'
  },
  {
    id: 'integration-testing',
    name: 'Integration & Testing',
    status: 'pending',
    terminal: 6,
    description: 'Integration testing + CI/CD monitoring'
  }
]

export default function DeploymentStatus() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates (will be replaced with WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      // This will connect to WebSocket for real task updates
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'in_progress':
        return 'bg-blue-50 border-blue-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const totalTasks = tasks.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Zap className="h-6 w-6 text-blue-500" />
          <span>Live Development Status</span>
        </h2>
        <div className="text-sm text-gray-500">
          Last update: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>Phase 1 Progress</span>
          <span>{completedTasks}/{totalTasks} tasks completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${getStatusColor(task.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">{task.name}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">
                  Terminal {task.terminal}
                </div>
                {task.status === 'completed' && task.previewUrl && (
                  <a 
                    href={task.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    View Preview →
                  </a>
                )}
              </div>
            </div>
            
            {task.status === 'in_progress' && (
              <div className="mt-2 text-xs text-blue-600">
                🔄 Development in progress...
              </div>
            )}
            
            {task.status === 'completed' && (
              <div className="mt-2 text-xs text-green-600">
                ✅ Deployed and available in UI
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">🎯 How This Works</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Each terminal develops one component in parallel</li>
          <li>• Completed tasks immediately deploy to this UI</li>
          <li>• Watch features appear live as development progresses</li>
          <li>• Click preview links to test individual features</li>
        </ul>
      </div>
    </div>
  )
}