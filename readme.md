# Rangurura - Complaint Management System

Rangurura is a comprehensive complaint management system designed to facilitate the submission, tracking, and resolution of complaints between citizens and government agencies. The system provides a streamlined workflow for handling complaints, with features for escalation, response, and status tracking.

## 🌟 Features

- **User Authentication**: Secure signup and login for citizens and agency staff
- **Role-Based Access Control**: Different roles including Citizens, Agency Staff, and Admin
- **Complaint Management**: Submit, view, and track complaints
- **Multi-level Escalation**: Automatic escalation of unresolved complaints
- **Response System**: Agency staff can respond to complaints
- **Attachment Support**: Upload files related to complaints
- **Category Management**: Organize complaints by categories
- **Agency Management**: Manage different government agencies and their staff
- **Real-time Updates**: Track complaint status in real-time

## Documentation
- **APP Documentation**: [DeepWiki](https://deepwiki.com/MuhireIghor/rangurura)

## 🛠️ Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** for the API server
- **Prisma** as the ORM
- **PostgreSQL** database
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Winston** for logging

### Frontend
- **React** with **TypeScript**
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Query** for data fetching and caching
- **Formik** and **Yup** for form handling and validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rangurura.git
   cd rangurura
   ```

2. **Set up the backend**
   ```bash
   cd server
   cp .env.example .env
   # Update the .env file with your database credentials
   npm install
   npx prisma migrate dev
   npm run dev:server
   ```

3. **Set up the frontend**
   ```bash
   cd ../client_3
   cp .env.example .env
   # Update the .env file with your API URL
   npm install
   npm run dev
   ```

## 📚 API Documentation

### Authentication

- `POST /api/auth/signup` - Register a new citizen user
- `POST /api/auth/signup/agencyStaff` - Register a new agency staff (admin only)
- `POST /api/auth/login` - User login

### Complaints

- `GET /api/complaints` - Get all complaints (filterable)
- `POST /api/complaints` - Create a new complaint
- `GET /api/complaints/:id` - Get a specific complaint
- `PUT /api/complaints/:id` - Update a complaint
- `POST /api/complaints/:id/respond` - Respond to a complaint
- `POST /api/complaints/:id/escalate` - Escalate a complaint
- `POST /api/complaints/:id/attachments` - Upload attachments for a complaint

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category (admin only)
- `GET /api/categories/:id` - Get a specific category
- `PUT /api/categories/:id` - Update a category (admin only)

### Agencies

- `GET /api/agencies` - Get all agencies
- `POST /api/agencies` - Create a new agency (admin only)
- `GET /api/agencies/:id` - Get a specific agency
- `PUT /api/agencies/:id` - Update an agency (admin only)

## 🔐 Environment Variables

### Server

```env
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/rangurura?schema=public"
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Client

```env
VITE_API_URL=http://localhost:3001/api
# Other frontend environment variables
```

## 📊 Database Schema

The database consists of the following main tables:

- **Users**: Stores user information (citizens and agency staff)
- **Agencies**: Government agencies that handle complaints
- **Categories**: Categories for organizing complaints
- **Complaints**: Main complaints submitted by users
- **Responses**: Responses to complaints
- **Attachments**: Files attached to complaints



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Muhire Ighor** - [GitHub](https://github.com/MuhireIghor)
