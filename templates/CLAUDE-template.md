# Claude Code Template for {{PROJECT_NAME}}

## Context
You are working on **{{PROJECT_NAME}}**: {{PROJECT_DESCRIPTION}}

## Architecture
- **Voice Interface**: ElevenLabs STT/TTS for natural conversation
- **AI Agents**: MCP protocol with Claude/GPT-4 agents
- **Content Generation**: Kie.ai unified API for multi-modal content
- **Backend**: Node.js 20 + TypeScript + Express.js + Socket.io
- **Frontend**: Next.js 14 + React 18 + Tailwind CSS
- **Database**: PostgreSQL 15 + Redis 7 + Prisma ORM

## MCP Tools Available
- **knowledge_base**: Access brand voice, assets, company information
- **competitive_intelligence**: Analyze competitors and detect trends  
- **content_generation**: Generate images, videos, music using Kie.ai
- **brand_validation**: Validate content against brand guidelines
- **platform_optimization**: Optimize content for specific social platforms
- **approval_workflow**: Manage human review and scheduling

## Development Standards
- Use TypeScript strict mode
- Follow voice-first design principles
- Implement proper error handling for API integrations
- Use Zod for input validation
- Implement WebSocket for real-time voice interaction
- Follow MCP protocol standards for agent communication

## Testing Requirements
- Unit tests for MCP tools and services
- Integration tests for voice workflow
- E2E tests for complete user journeys
- Voice processing accuracy validation

## Voice-First Considerations
- Optimize responses for TTS (avoid special characters, use conversational language)
- Implement proper audio processing and storage
- Handle voice session management and cleanup
- Ensure low-latency voice processing (<3 seconds)

## Security & Privacy
- Encrypt audio data at rest
- Auto-delete temporary audio after 24 hours
- Implement voice session timeouts
- Validate all voice inputs for safety