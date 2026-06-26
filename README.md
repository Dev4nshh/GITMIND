# 🤖 GitMind – MERN AI Coding Agent

GitMind is a full-stack MERN AI Coding Agent application that connects to your GitHub repositories, allows you to chat with an AI model that understands your codebase in real time, and executes file writes, edits, terminal commands, and commits in an isolated sandboxed container. When the changes are done, it can automatically push the commits and open a Pull Request.

---

## 🧠 Key Features

* **🔐 User Authentication:** Secure email/password login and session management.
* **🔗 GitHub Integration:** Connect your GitHub profile via OAuth to select, list, and modify your target repositories.
* **🧱 Isolated Sandbox Executions:** Leverages **Upstash Box** to spin up isolated container runtimes for reading/editing files, running tests, or installing npm packages.
* **⚡ Real-time Stream Output:** Watch the agent formulate thoughts, call tools, and execute scripts in real time.
* **📝 File & Command Tools:** Rich capabilities for listing directories, reading, writing, overwriting, grepping, and running bash commands.
* **🌿 Git Workflow Automation:** Stage changes, Conventional Commits generation, branch checking, push, and opening Pull Requests on GitHub.
* **🧠 Free AI Tier Support:** Fully integrated with the Vercel AI SDK utilizing Google's Gemini 2.5 Flash model for fast, capable, and cost-free coding agent tasks.

---

## 🏗️ Technology Stack

* **Frontend:** React, TypeScript, Vite, Tailwind CSS, ShadcnUI, TanStack Query, and Vercel AI SDK React hooks.
* **Backend:** Node.js, Express, TypeScript, Mongoose (MongoDB), and Passport.js (JWT Authentication).
* **AI Orchestration:** Vercel AI SDK (`ai` and `@ai-sdk/google`).
* **Sandbox Container:** Upstash Box (`@upstash/box`).
* **Search Integration:** Exa Web Search (`@exalabs/ai-sdk`).

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js** (v18+ recommended)
* **MongoDB** (Local instance or MongoDB Atlas Cloud URI)

### 2. Environment Configurations

#### Backend Setup
Create a `.env` file in the `backend/` directory:
```ini
# Server Setup
NODE_ENV=development
PORT=8000
BASE_URL=http://localhost:8000
FRONTEND_ORIGIN=http://localhost:5173

# Database Connection
MONGO_URI=mongodb://localhost:27017/gitmind-db

# JWT Configuration
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

# GitHub OAuth Setup
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_OAUTH_STATE_SECRET=your_state_secret
GITHUB_TOKEN_ENCRYPTION_KEY=your_token_encryption_key

# Sandbox Integration (Upstash Box)
UPSTASH_BOX_API_KEY=your_upstash_box_key

# Google Gemini API Key (Free tier from Google AI Studio)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Search Integration (Exa)
EXA_API_KEY=your_exa_search_key
```

#### Frontend Setup
Create a `.env` file in the `client/` directory:
```ini
VITE_BASE_API_URL=http://localhost:8000/api/
```

### 3. Installation & Run

Open two terminal tabs to run the project locally:

#### Start the Backend Server
```bash
cd backend
npm install
npm run dev
```

#### Start the Frontend Client
```bash
cd client
npm install
npm run dev
```

Now, navigate your browser to `http://localhost:5173` to register, log in, link your GitHub, and start building with your coding agent!
