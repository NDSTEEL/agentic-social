import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agentic Social - Voice-First Content Creation',
  description: 'Create social media content using natural voice commands powered by AI agents',
  keywords: ['AI', 'social media', 'voice interface', 'content creation', 'automation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="app-container">
          {children}
        </div>
      </body>
    </html>
  )
}