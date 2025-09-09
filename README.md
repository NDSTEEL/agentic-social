# Agentic Social 🎙️

Voice-first social media automation system using MCP-based AI agents for natural content creation and brand management.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd agentic-social
npm run setup

# Start development
npm run dev
```

## 🏗️ Architecture

```
Voice Input → ElevenLabs STT → MCP Agent → Tool Execution → Content Generation → Visual Dashboard
```

### Core Technologies
- **Voice**: ElevenLabs STT/TTS for natural conversation
- **AI Agents**: MCP protocol with Claude/GPT-4
- **Content**: Kie.ai unified API (images, videos, music)
- **Backend**: Node.js 20 + TypeScript + Express.js + Socket.io
- **Frontend**: Next.js 14 + React 18 + Tailwind CSS
- **Database**: PostgreSQL 15 + Redis 7

## 📁 Project Structure

```
agentic-social/
├── apps/
│   ├── api/                    # Backend API
│   └── web/                    # Frontend dashboard
├── packages/
│   ├── shared/                 # Shared types and utilities
│   ├── mcp-tools/              # MCP tool definitions
│   └── config/                 # Shared configurations
├── specs/                      # Feature specifications
├── templates/                  # Spec-kit templates
└── .github/workflows/          # CI/CD pipelines
```

## 🎯 Development Workflow

### Spec-Driven Development
1. **Specify**: Create detailed specs in `specs/` directory
2. **Plan**: Generate implementation plans using templates
3. **Tasks**: Break down into actionable development tasks
4. **Deploy**: Every task completion → immediate UI availability

### CI/CD Strategy
- **Feature Branches**: Auto-deploy to Vercel preview URLs
- **Staging**: Full integration testing with real APIs
- **Production**: Automated deployment with health checks

```bash
# Development workflow
git checkout -b feature/voice-interface-setup
# Develop feature
git push origin feature/voice-interface-setup
# → Auto-deploys to: https://agentic-social-git-voice-interface-setup.vercel.app
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start all services
npm run build           # Build all packages
npm run test            # Run all tests

# Testing
npm run test:unit       # Unit tests
npm run test:integration # Integration tests
npm run test:e2e        # End-to-end tests
npm run test:performance # Performance tests

# Quality
npm run lint            # Code linting
npm run type-check      # TypeScript checking
npm run format          # Code formatting

# Database
npm run db:migrate      # Run migrations
```

## 🔧 Environment Setup

### Required API Keys
```bash
# ElevenLabs (Voice processing)
ELEVENLABS_API_KEY=sk-...

# Kie.ai (Content generation)
KIEAI_API_KEY=ka-...

# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

### Development Environment
```bash
# Copy environment template
cp .env.example .env.local

# Start local services
docker-compose up -d

# Run migrations
npm run db:migrate
```

## 🎤 Voice Interface Usage

### Basic Voice Commands
- "Create a LinkedIn post about our new product"
- "Generate 5 Instagram images for our campaign"
- "Show me trending hashtags in tech"
- "Schedule this post for tomorrow at 9 AM"

### Voice Session Flow
1. **Start Session**: Click voice button or say "Hey Assistant"
2. **Natural Conversation**: Speak your content requests
3. **Real-time Feedback**: See visual updates as AI processes
4. **Approve/Edit**: Use voice or visual controls to refine
5. **Schedule/Post**: Deploy content to social platforms

## 🤖 MCP Tools

### Available Tools
- **knowledge_base**: Brand voice, assets, company information
- **competitive_intelligence**: Trend analysis, competitor insights
- **content_generation**: Multi-modal content via Kie.ai
- **brand_validation**: Content compliance checking
- **platform_optimization**: Social platform adaptations
- **approval_workflow**: Review and scheduling management

### Adding New Tools
```typescript
// packages/mcp-tools/src/my-tool.ts
export const myTool: MCPTool = {
  name: "my_tool",
  description: "Description of what this tool does",
  parameters: {
    type: "object",
    properties: {
      input: { type: "string" }
    },
    required: ["input"]
  },
  handler: async (params) => {
    // Tool implementation
    return { success: true, data: result };
  }
};
```

## 📊 Monitoring

### Health Checks
- **API**: `GET /api/health`
- **Database**: `GET /api/health/db`
- **Voice**: `GET /api/health/voice`
- **Integrations**: `GET /api/health/integrations`

### Performance Targets
- Voice recognition accuracy: >95%
- Response latency: <3 seconds
- Content generation: <30 seconds
- System uptime: >99.5%

## 🚀 Deployment

### Environments
- **Development**: Local Docker setup
- **Feature Staging**: Vercel preview URLs
- **Integration Staging**: Full AWS + Vercel stack
- **Production**: Auto-scaled AWS ECS + Vercel

### Deployment Triggers
- Feature branch push → Preview deployment
- Merge to `staging` → Staging deployment
- Merge to `main` → Production deployment

## 🔒 Security

### Voice Data
- Audio encrypted at rest
- Auto-deletion after 24 hours
- Session-based access control
- No persistent voice storage

### API Security
- JWT authentication
- Rate limiting (100 req/min)
- Input validation with Zod
- CORS protection

## 📝 Contributing

1. **Review Specs**: Check `specs/` for current feature specifications
2. **Create Branch**: `git checkout -b feature/your-feature`
3. **Follow Templates**: Use templates in `templates/` directory
4. **Test First**: Write tests before implementation
5. **Deploy Preview**: Push for auto-deployment
6. **Request Review**: Create PR with preview URL

## 📚 Documentation

- **API Docs**: Auto-generated from OpenAPI specs
- **MCP Tools**: Documentation in `packages/mcp-tools/`
- **Architecture**: Detailed specs in `specs/` directory
- **Deployment**: See `DEPLOYMENT-STRATEGY.md`

## 🆘 Support

- **Issues**: GitHub Issues for bugs and features
- **Discussions**: GitHub Discussions for questions
- **Slack**: `#agentic-social-dev` for development
- **Alerts**: `#agentic-social-alerts` for production issues

---

Built with ❤️ using Agent OS and GitHub Spec-Kit methodologies.