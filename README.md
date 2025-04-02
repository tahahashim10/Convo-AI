# Convo-AI 🧠💬  
**A full-stack AI chatbot inspired by ChatGPT**

Convo-AI is a secure and responsive chatbot built using the **MERN stack** with **TypeScript** and **OpenAI API** integration. It enables users to have intelligent conversations, manage their chat history, and experience seamless authentication—all within a modern chat interface.

---

## ⚙️ Tech Stack

- **Frontend:** React, Vite, TypeScript, Material UI  
- **Backend:** Node.js, Express, TypeScript, OpenAI API  
- **Database:** MongoDB  
- **Authentication:** JWT, HTTPOnly & signed cookies, bcrypt  

---

## ✨ Features

- 🔐 **Secure Authentication**  
  JWT-based login with HTTPOnly cookies to prevent common web vulnerabilities.

- 🧠 **AI Chat Integration**  
  OpenAI-powered conversational AI assistant.

- 💾 **Persistent Chat History**  
  Users can store, retrieve, and delete conversations via a REST API.

- 💬 **Responsive Chat UI**  
  Sleek chat interface with React, Material UI, and animations.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Convo-AI.git
cd Convo-AI
```

### 2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure environment variables  
Create a `.env` file in the `backend/` directory with the following keys:

```
OPEN_AI_SECRET=
OPEN_AI_ORGANIZATION_ID=
MONGODB_URL=
JWT_SECRET=
COOKIE_SECRET=
PORT=5000
```


### 4. Start the development servers
```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```