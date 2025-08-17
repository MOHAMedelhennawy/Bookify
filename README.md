# 🎪 Bookify - Event Booking Platform

A modern, full-stack event booking platform that enables users to discover, book, and manage events seamlessly. Built with React.js frontend and Node.js backend, featuring secure authentication, real-time booking management, and a comprehensive admin dashboard.

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.7.0-2D3748.svg)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791.svg)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://docker.com/)

## ✨ Features

### 🔐 Authentication & Security
- **Multi-Provider Authentication**: Email/password and Google OAuth 2.0
- **JWT-based Sessions**: Secure token-based authentication
- **Password Security**: bcrypt hashing with salt rounds
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: Helmet.js for HTTP security

### 📱 User Experience
- **Responsive Design**: Modern UI with Tailwind CSS
- **Event Discovery**: Browse events with pagination and filtering
- **Real-time Booking**: Instant booking confirmation
- **Email Notifications**: Automated booking confirmations via Nodemailer
- **User Dashboard**: Personal booking history and management

### 🛠️ Admin Features
- **Event Management**: Create, edit, and delete events
- **Category Management**: Organize events by categories
- **User Management**: Monitor user registrations and bookings
- **File Upload**: Event image management with Multer
- **Analytics Dashboard**: Booking statistics and insights

### 🚀 Performance & Reliability
- **Redis Caching**: Fast session and data caching
- **Database Optimization**: Prisma ORM with optimized queries
- **Error Handling**: Comprehensive error tracking with Winston
- **Request Logging**: Morgan HTTP request logger
- **Input Validation**: AJV JSON schema validation

---

## 🏗️ Architecture

### Backend (Node.js/Express)
```
backend/
├── controllers/         # Request handlers
├── services/           # Business logic
├── routes/             # API endpoints
├── middlewares/        # Custom middleware
├── prisma/            # Database schema & migrations
├── config/            # Configuration files
└── utils/             # Helper utilities
```

### Frontend (React/Vite)
```
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route components
│   ├── Context/       # React Context providers
│   ├── services/      # API communication
│   ├── layouts/       # Layout components
│   └── utils/         # Helper functions
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with hooks
- **Vite** - Fast development build tool
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Router Dom 7.6.3** - Client-side routing
- **Axios 1.10.0** - HTTP client for API calls
- **FontAwesome & React Icons** - Icon libraries
- **Joi 17.13.3** - Client-side validation

### Backend
- **Node.js & Express 5.1.0** - Server runtime and framework
- **Prisma 6.7.0** - Next-generation ORM
- **PostgreSQL 15** - Robust relational database
- **Redis 5.0.1** - In-memory caching and sessions
- **Passport.js** - Authentication middleware
- **Multer** - File upload handling
- **Winston** - Advanced logging

### DevOps & Tools
- **Docker & Docker Compose** - Containerization
- **ESLint & Prettier** - Code quality and formatting
- **Jest** - Testing framework
- **Nodemon** - Development auto-restart

---

## 🚀 Quick Start

### Prerequisites
- **Docker** & **Docker Compose**
- **Node.js 18+** (if running without Docker)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/MOHAMedelhennawy/Bookify.git
cd Bookify
```

### 2. Environment Configuration
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=bookify
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# Redis
REDIS_HOST=caching
REDIS_PORT=6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration
MAILER_USER=your-email@gmail.com
MAILER_PASSWORD="your-app-password"
```

### 3. Launch with Docker
```bash
# Build and start all services
docker-compose -f docker-compose.dev.yml up --build

# Or run in background
docker-compose -f docker-compose.dev.yml up -d --build
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Database**: PostgreSQL on port 5432
- **Redis**: Cache server on port 6379

---

## 🔧 Development

### Local Development (Without Docker)

1. **Backend Setup**:
```bash
cd backend
npm install
npm run db:init    # Initialize database and seed data
npm run start-dev  # Start development server
```

2. **Frontend Setup**:
```bash
cd frontend
npm install
npm run dev        # Start Vite dev server
```

### Available Scripts

#### Backend
```bash
npm run start-dev    # Development with auto-restart
npm run start        # Production server
npm run db:init      # Database setup and seeding
npm run test         # Run Jest tests
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix ESLint issues
```

#### Frontend
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
```

---

## 🔐 Admin Access

### Default Admin Credentials
```
Email: admin@gmail.com
Password: AdminPassword123
```

> ⚠️ **Security Note**: Change these credentials in production!

### Admin Features
- Event creation and management
- User account oversight
- Booking analytics and reports
- Category management
- System configuration

---

## 📊 Database Schema

### Core Models
- **User**: Authentication and profile data
- **Event**: Event details, pricing, and scheduling
- **Category**: Event categorization
- **Booking**: User event reservations

### Key Relationships
- Users can have multiple bookings
- Events belong to categories
- Bookings link users to events

---

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests (if configured)
cd frontend
npm test
```

### Test Coverage
- Integration tests for API endpoints
- Authentication flow testing
- Database operation testing

---

## 🔍 API Documentation

### Authentication Endpoints
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
GET  /api/auth/google        # Google OAuth
POST /api/auth/logout       # User logout
```

### Event Endpoints
```
GET    /api/events          # List events (paginated)
GET    /api/events/:id      # Get event details
POST   /api/events          # Create event (admin)
PUT    /api/events/:id      # Update event (admin)
DELETE /api/events/:id      # Delete event (admin)
```

### Booking Endpoints
```
GET  /api/bookings          # User bookings
POST /api/bookings          # Create booking
PUT  /api/bookings/:id      # Update booking
DELETE /api/bookings/:id    # Cancel booking
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/MOHAMedelhennawy/Bookify/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MOHAMedelhennawy/Bookify/discussions)

### Common Issues
- **Port conflicts**: Ensure ports 4000, 5173, 5432, and 6379 are available
- **Docker issues**: Try `docker-compose down` then rebuild
- **Database connection**: Verify PostgreSQL container is running

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Prisma for the excellent ORM
- Tailwind CSS for the utility-first approach
- All contributors and users of this project

---

<div align="center">
  <strong>Built with ❤️ by Mohamed El-Hennawy</strong>
</div>
