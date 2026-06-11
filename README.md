# Advanced Chat Application 💬

A full-stack real-time chat application with AI features, built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for real-time communication.

## 🎯 Features Overview

### 🔐 Authentication
- User registration with email verification
- Secure login/logout with JWT
- Forgot password functionality
- Protected routes with role-based access

### 💬 Chat Features
- Modern responsive chat interface
- One-to-one and group messaging
- Sidebar with chat list and search
- Online/offline status indicators
- Typing indicators
- Message timestamps
- Unread message counter

### 📤 Message Options
- Send text messages
- Emoji picker integration
- Image sharing
- Video sharing
- File sharing (PDF, DOCX, ZIP, etc.)
- Voice message recording
- Reply to specific messages
- Delete messages
- Edit messages

### 👤 User Profile
- Upload and change profile picture
- Update user information
- Change password securely
- View active status
- Last seen timestamp

### 🤖 AI-Powered Features
- **AI Chat Assistant**: Answer questions intelligently
- **Smart Suggestions**: Context-aware reply suggestions
- **Message Translation**: Translate to 100+ languages
- **Conversation Summarizer**: Summarize long chats
- **Sentiment Analysis**: Detect message sentiment
- **Smart Replies**: Quick response suggestions

### ⚡ Real-Time Features (Socket.io)
- Instant message delivery
- Live typing status
- Read receipts (Seen markers)
- Online/offline presence
- Real-time notifications
- Auto-refresh chat list

### 🎨 UI/UX Features
- Dark mode support
- Mobile responsive design
- Infinite scrolling
- Loading skeletons
- Error handling & notifications
- Smooth animations

## 🛠️ Tech Stack

### Frontend
```
- React 18
- Vite (Build tool)
- Tailwind CSS
- Socket.io-client
- Axios
- Redux Toolkit / Context API
- React Router v6
- React Query
- Framer Motion
- React Emoji Picker
```

### Backend
```
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io
- JWT (JSON Web Tokens)
- OpenAI API
- Multer (File uploads)
- Bcryptjs (Password hashing)
- Dotenv
- CORS
- Express Validator
```

## 📁 Project Structure

```
chart-applaction/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Chat/
│   │   │   ├── Sidebar/
│   │   │   ├── UserProfile/
│   │   │   └── Common/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ChatContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useChat.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Conversation.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── messages.js
│   │   └── conversations.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── messageController.js
│   │   └── conversationController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validators.js
│   ├── sockets/
│   │   ├── socketHandlers.js
│   │   └── socketEvents.js
│   ├── config/
│   │   ├── database.js
│   │   └── constants.js
│   ├── utils/
│   │   ├── emailService.js
│   │   ├── aiService.js
│   │   └── fileUpload.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- OpenAI API Key (for AI features)

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your environment variables in .env
# Start the server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Configure your environment variables
# Start the development server
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/chat-app
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chat-app

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# CORS
CORS_ORIGIN=http://localhost:5173

# Email Service (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload
MAX_FILE_SIZE=50mb
UPLOAD_DIR=./uploads

# Redis (Optional, for caching)
REDIS_URL=redis://localhost:6379
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=ChatApp
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/verify-email/:token` - Verify email

### Users
- `GET /api/users` - Get all users (for search)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/avatar` - Upload profile picture
- `PUT /api/users/:id/password` - Change password

### Conversations
- `GET /api/conversations` - Get user's conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id` - Get conversation details
- `PUT /api/conversations/:id` - Update conversation
- `DELETE /api/conversations/:id` - Delete conversation

### Messages
- `GET /api/messages/:conversationId` - Get conversation messages
- `POST /api/messages` - Send new message
- `PUT /api/messages/:id` - Edit message
- `DELETE /api/messages/:id` - Delete message
- `POST /api/messages/:id/seen` - Mark message as seen

### AI Features
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/translate` - Translate message
- `POST /api/ai/summarize` - Summarize conversation
- `POST /api/ai/sentiment` - Analyze sentiment
- `POST /api/ai/suggestions` - Get smart replies

## 🔌 Socket.io Events

### Client → Server
```javascript
socket.emit('user:online', userId)
socket.emit('user:offline', userId)
socket.emit('message:send', { conversationId, message, attachments })
socket.emit('message:typing', { conversationId, userId })
socket.emit('message:stop-typing', { conversationId, userId })
socket.emit('message:seen', { conversationId, messageIds })
socket.emit('call:initiate', { recipientId })
```

### Server → Client
```javascript
socket.on('message:new', (message))
socket.on('user:online', (userId))
socket.on('user:offline', (userId))
socket.on('typing:status', ({ userId, isTyping }))
socket.on('message:seen', ({ messageIds, seenAt }))
socket.on('error:notification', (error))
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  profilePicture: String,
  bio: String,
  status: String (online/offline),
  lastSeen: Date,
  role: String (user/admin),
  isEmailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Conversations Collection
```javascript
{
  _id: ObjectId,
  participants: [ObjectId],
  lastMessage: ObjectId,
  lastMessageAt: Date,
  isGroup: Boolean,
  groupName: String,
  groupIcon: String,
  groupDescription: String,
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Messages Collection
```javascript
{
  _id: ObjectId,
  sender: ObjectId,
  conversation: ObjectId,
  message: String,
  messageType: String (text/image/video/file/voice),
  attachments: [{
    url: String,
    type: String,
    fileName: String
  }],
  repliedTo: ObjectId,
  seenBy: [ObjectId],
  seenAt: Date,
  deletedBy: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation & sanitization
- ✅ XSS protection
- ✅ Secure file upload handling
- ✅ HTTPS ready
- ✅ Environment variable protection

## 📦 Docker Deployment

```bash
# Start all services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
```bash
# Build for production
cd frontend
npm run build

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

### Backend (Railway/Render)
```bash
# Push to GitHub
git push origin main

# Connect repository to Railway/Render
# Set environment variables
# Deploy automatically on push
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create cluster
3. Create database user
4. Whitelist IP addresses
5. Use connection string in `.env`

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Create a discussion
- Contact: anishakhtar@example.com

## 🎓 Learning Resources

- [Socket.io Documentation](https://socket.io/docs/)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [OpenAI API Guide](https://platform.openai.com/docs)

---

**Made with ❤️ using MERN Stack**

Last Updated: June 2026
