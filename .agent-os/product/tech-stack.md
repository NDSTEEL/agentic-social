# Technical Stack

## Backend Architecture
**Application Framework:** Node.js 20 with Express.js
**Language:** TypeScript
**Real-time Communication:** Socket.io for live dashboard updates and voice room coordination
**Process Management:** PM2 for production deployment
**API Architecture:** RESTful APIs with GraphQL for complex queries

## Database Systems
**Primary Database:** PostgreSQL 15 for structured data (users, content, analytics)
**Cache & Sessions:** Redis 7 for session management, real-time data, and job queuing
**ORM:** Prisma for type-safe database operations and migrations
**Database Hosting:** AWS RDS for PostgreSQL, AWS ElastiCache for Redis

## Frontend Framework
**Application Framework:** Next.js 14 with App Router
**JavaScript Framework:** React 18 with TypeScript
**Build Strategy:** Server-side rendering with client-side hydration
**Import Strategy:** ES modules
**Package Manager:** npm
**Node Version:** 20 LTS

## UI & Styling
**CSS Framework:** TailwindCSS 4.0
**UI Component Library:** shadcn/ui components
**Icons:** Lucide React components
**Font Provider:** Google Fonts
**Font Loading:** Self-hosted for performance optimization

## Voice & AI Integration
**Speech Recognition:** ElevenLabs STT API for voice-to-text processing
**Text-to-Speech:** ElevenLabs TTS API for AI agent responses
**AI Agents:** MCP protocol with Claude 3.5 Sonnet and GPT-4 integration
**Content Generation:** Kie.ai unified API for multi-modal content (text, images, videos, music)
**Agent Architecture:** Modular MCP tools for specialized tasks

## Infrastructure & Hosting
**Application Hosting:** AWS ECS with Fargate for containerized deployment
**Database Hosting:** AWS RDS PostgreSQL with Multi-AZ deployment
**Asset Storage:** Cloudflare R2 for media files and generated content
**CDN:** Cloudflare for global content delivery
**Container Platform:** Docker for application containerization
**Load Balancing:** AWS Application Load Balancer

## Development & Deployment
**Code Repository:** GitHub with automated workflows
**CI/CD Platform:** GitHub Actions
**Deployment Strategy:** Blue-green deployment via AWS ECS
**Environment Management:** Multiple environments (development, staging, production)
**Secret Management:** AWS Secrets Manager for API keys and credentials
**Monitoring:** AWS CloudWatch with custom metrics and alerts

## External Services & APIs
**Voice Processing:** ElevenLabs API for STT/TTS functionality
**AI Models:** Anthropic Claude API and OpenAI GPT-4 API via MCP protocol
**Content Generation:** Kie.ai API for multi-modal content creation
**Social Media APIs:** Platform-specific APIs (Twitter, Instagram, LinkedIn, Facebook, TikTok)
**Analytics:** Custom analytics engine with social platform insights integration
**Email Service:** AWS SES for notifications and user communications