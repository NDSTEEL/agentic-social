# Agentic Social - Complete Setup Requirements for Claude Code

## Project Overview
**Project Name:** Agentic Social  
**Description:** Voice-first social media automation system using MCP-based AI agents  
**Architecture:** Node.js backend, React frontend, PostgreSQL database, ElevenLabs voice, Kie.ai content generation

---

## Environment Configuration

### Deployment Target
- **Primary:** Docker containers on AWS ECS
- **Database:** AWS RDS PostgreSQL + ElastiCache Redis
- **File Storage:** Cloudflare R2
- **CDN:** Cloudflare

### Environment Structure
```
Development: Local Docker Compose
Staging: AWS ECS (single instance)
Production: AWS ECS (auto-scaling)
```

---

## Technology Stack Requirements

### Backend
- **Runtime:** Node.js 20 LTS
- **Language:** TypeScript 5.x
- **Framework:** Express.js with Socket.io
- **Database:** PostgreSQL 15 + Redis 7
- **ORM:** Prisma
- **Queue:** Bull/BullMQ
- **Testing:** Jest + Supertest
- **Validation:** Zod
- **Authentication:** JWT with refresh tokens

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Audio:** Web Audio API
- **WebSocket:** Socket.io-client
- **Testing:** Vitest + Testing Library

### Infrastructure
- **Containerization:** Docker + Docker Compose
- **Orchestration:** AWS ECS with Fargate
- **Load Balancer:** AWS ALB
- **Monitoring:** AWS CloudWatch + Sentry
- **CI/CD:** GitHub Actions

---

## Project Structure

```
agentic-social/
├── apps/
│   ├── api/                    # Backend API
│   │   ├── src/
│   │   │   ├── agents/         # MCP agents
│   │   │   ├── tools/          # MCP tools
│   │   │   ├── integrations/   # External APIs
│   │   │   ├── services/       # Business logic
│   │   │   ├── routes/         # API endpoints
│   │   │   ├── middleware/     # Express middleware
│   │   │   ├── types/          # TypeScript types
│   │   │   └── utils/          # Utilities
│   │   ├── prisma/             # Database schema
│   │   ├── tests/              # API tests
│   │   └── Dockerfile
│   └── web/                    # Frontend app
│       ├── app/                # Next.js app router
│       ├── components/         # React components
│       ├── hooks/              # Custom hooks
│       ├── stores/             # Zustand stores
│       ├── lib/                # Utilities
│       ├── types/              # TypeScript types
│       └── Dockerfile
├── packages/
│   ├── shared/                 # Shared types and utilities
│   ├── mcp-tools/              # MCP tool definitions
│   └── config/                 # Shared configurations
├── infrastructure/
│   ├── docker-compose.yml      # Local development
│   ├── aws/                    # AWS CloudFormation/CDK
│   └── github/                 # GitHub Actions
├── docs/                       # Documentation
└── scripts/                    # Build and deployment scripts
```

---

## Database Configuration

### PostgreSQL Schema
```sql
-- Core user management
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  plan_type VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Voice sessions
CREATE TABLE voice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  start_time TIMESTAMP DEFAULT NOW(),
  end_time TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active',
  agent_voice_id VARCHAR(100),
  metadata JSONB
);

-- Conversation messages
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES voice_sessions(id) ON DELETE CASCADE,
  message_type VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  audio_url VARCHAR(500),
  transcript_confidence DECIMAL(3,2),
  timestamp TIMESTAMP DEFAULT NOW(),
  tool_calls JSONB
);

-- Knowledge base
CREATE TABLE brand_voices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  tone_descriptors TEXT[],
  writing_rules TEXT[],
  banned_phrases TEXT[],
  sample_content JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  original_name VARCHAR(255),
  file_url VARCHAR(500) NOT NULL,
  metadata JSONB,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Content generation
CREATE TABLE content_generation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  voice_prompt TEXT NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  platforms TEXT[],
  brand_voice_id UUID REFERENCES brand_voices(id),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES content_generation_requests(id) ON DELETE CASCADE,
  content_url VARCHAR(500),
  platform VARCHAR(50),
  metadata JSONB,
  brand_compliance_score DECIMAL(3,2),
  approval_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- MCP tools tracking
CREATE TABLE mcp_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  parameters_schema JSONB,
  is_enabled BOOLEAN DEFAULT true
);

CREATE TABLE tool_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES voice_sessions(id),
  tool_name VARCHAR(100) REFERENCES mcp_tools(name),
  input_parameters JSONB,
  output_result JSONB,
  execution_time_ms INTEGER,
  executed_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Integrations

### ElevenLabs Configuration
```typescript
interface ElevenLabsConfig {
  apiKey: string;
  voiceId: string;
  model: 'eleven_monolingual_v1';
  outputFormat: 'mp3';
  voiceSettings: {
    stability: 0.75;
    similarity_boost: 0.85;
    style: 0.5;
    use_speaker_boost: true;
  };
}

// Endpoints needed:
// POST /v1/speech-to-text
// POST /v1/text-to-speech/{voice_id}
// GET /v1/voices
```

### Kie.ai Configuration
```typescript
interface KieAIConfig {
  apiKey: string;
  baseUrl: 'https://api.kie.ai';
  endpoints: {
    imageGeneration: '/v1/image/generate';
    videoGeneration: '/v1/video/generate';
    musicGeneration: '/v1/music/generate';
  };
  defaultModels: {
    image: 'midjourney-v7';
    video: 'veo-3-fast';
    music: 'suno-v4';
  };
}
```

---

## MCP Tool Specifications

### Knowledge Base Tool
```json
{
  "name": "knowledge_base",
  "description": "Access brand voice, assets, and company information",
  "parameters": {
    "type": "object",
    "properties": {
      "query": { "type": "string" },
      "category": { 
        "type": "string", 
        "enum": ["brand_voice", "assets", "company_info", "faqs"] 
      }
    },
    "required": ["query"]
  }
}
```

### Content Generation Tool
```json
{
  "name": "content_generation",
  "description": "Generate images, videos using Kie.ai",
  "parameters": {
    "type": "object",
    "properties": {
      "type": { "type": "string", "enum": ["image", "video"] },
      "prompt": { "type": "string" },
      "platform": { "type": "string" },
      "brandVoiceId": { "type": "string" },
      "variations": { "type": "number", "default": 1 }
    },
    "required": ["type", "prompt"]
  }
}
```

### Competitive Intelligence Tool
```json
{
  "name": "competitive_intelligence",
  "description": "Analyze competitors and detect trends",
  "parameters": {
    "type": "object",
    "properties": {
      "action": { 
        "type": "string", 
        "enum": ["trending_content", "competitor_analysis", "hashtag_trends"] 
      },
      "platform": { "type": "string", "enum": ["instagram", "linkedin", "twitter"] },
      "timeframe": { "type": "string", "enum": ["24h", "7d", "30d"] }
    },
    "required": ["action"]
  }
}
```

### Brand Validation Tool
```json
{
  "name": "brand_validation",
  "description": "Validate content against brand guidelines",
  "parameters": {
    "type": "object",
    "properties": {
      "contentId": { "type": "string" },
      "contentType": { "type": "string" },
      "platform": { "type": "string" }
    },
    "required": ["contentId"]
  }
}
```

---

## Environment Variables

### Development (.env.local)
```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/agentic_social_dev"
REDIS_URL="redis://localhost:6379"

# Authentication
JWT_SECRET="dev-secret-key"
JWT_REFRESH_SECRET="dev-refresh-secret"

# ElevenLabs
ELEVENLABS_API_KEY="your-dev-key"
ELEVENLABS_VOICE_ID="default-voice-id"

# Kie.ai
KIEAI_API_KEY="your-dev-key"

# File Storage
CLOUDFLARE_R2_ACCESS_KEY="your-access-key"
CLOUDFLARE_R2_SECRET_KEY="your-secret-key"
CLOUDFLARE_R2_BUCKET="agentic-social-dev"

# Other
NODE_ENV="development"
API_URL="http://localhost:3001"
WEB_URL="http://localhost:3000"
```

### Production
```bash
# Use AWS Secrets Manager for production
DATABASE_URL="${AWS_SECRET:database_url}"
ELEVENLABS_API_KEY="${AWS_SECRET:elevenlabs_key}"
# etc...
```

---

## API Endpoints Structure

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
DELETE /api/auth/logout
```

### Voice Sessions
```
POST /api/voice/sessions
GET /api/voice/sessions/:id
DELETE /api/voice/sessions/:id
POST /api/voice/sessions/:id/message
```

### Content Generation
```
POST /api/content/generate
GET /api/content/requests/:id/status
GET /api/content/:id
POST /api/content/:id/approve
```

### Knowledge Base
```
GET /api/knowledge/brand-voices
POST /api/knowledge/brand-voices
GET /api/knowledge/assets
POST /api/knowledge/assets
```

### MCP Tools
```
GET /api/mcp/tools
POST /api/mcp/tools/:name/execute
```

---

## WebSocket Events

### Client to Server
```typescript
'voice_start': { sessionId: string; settings: VoiceSettings };
'voice_chunk': { audioData: string; chunkIndex: number };
'voice_end': { sessionId: string };
```

### Server to Client
```typescript
'transcript_partial': { transcript: string; confidence: number };
'transcript_final': { transcript: string; messageId: string };
'agent_response': { text: string; audioUrl: string; visualUpdates: any[] };
'content_generated': { contentId: string; previewUrl: string };
```

---

## Testing Strategy

### Backend Testing
- **Unit Tests:** Services, utilities, helpers
- **Integration Tests:** API endpoints, database operations
- **E2E Tests:** Voice workflow, content generation flow

### Frontend Testing
- **Component Tests:** Individual React components
- **Integration Tests:** User interactions, API calls
- **E2E Tests:** Complete user workflows

---

## Security Requirements

### Authentication
- JWT tokens with 15-minute expiry
- Refresh tokens with 30-day expiry
- Rate limiting: 100 requests/minute per IP
- CORS: Allow frontend domain only

### Data Protection
- Encrypt audio files at rest
- Auto-delete temporary audio after 24 hours
- Hash passwords with bcrypt (12 rounds)
- Validate all inputs with Zod schemas

---

## Performance Requirements

### API Response Times
- Voice message processing: < 3 seconds
- Content generation: < 30 seconds
- Database queries: < 500ms
- File uploads: < 10 seconds

### Scaling Targets
- Support 100 concurrent voice sessions
- Handle 1000 API requests/minute
- Store 10GB content per month
- 99.9% uptime target

---

## Docker Configuration

### docker-compose.yml
```yaml
version: '3.8'
services:
  api:
    build: ./apps/api
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/agentic_social
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  web:
    build: ./apps/web
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3001

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=agentic_social
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

---

## Initial Dependencies

### Backend (package.json)
```json
{
  "name": "agentic-social-api",
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.7.2",
    "@prisma/client": "^5.6.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4",
    "bull": "^4.11.4",
    "ioredis": "^5.3.2",
    "axios": "^1.6.0",
    "multer": "^1.4.5-lts.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "@types/node": "^20.8.0",
    "typescript": "^5.2.2",
    "ts-node": "^10.9.1",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "prisma": "^5.6.0"
  }
}
```

### Frontend (package.json)
```json
{
  "name": "agentic-social-web",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "socket.io-client": "^4.7.2",
    "zustand": "^4.4.6",
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.2",
    "zod": "^3.22.4",
    "tailwindcss": "^3.3.5",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.2.2",
    "vitest": "^0.34.6",
    "@testing-library/react": "^13.4.0"
  }
}
```

---

## Monitoring & Logging

### Logging Configuration
```typescript
// Winston logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
});
```

### Health Check Endpoints
```
GET /api/health
GET /api/health/db
GET /api/health/redis
GET /api/health/integrations
```

---

This complete specification provides everything Claude Code needs to set up and build the Agentic Social system from scratch.