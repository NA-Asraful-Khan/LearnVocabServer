# 日本 Learn - Backend

This is the backend API for **日本 Learn**, a web-based platform for learning Japanese vocabulary. It manages authentication, role-based access, and CRUD operations for users, lessons, and vocabulary.

## 🚀 Features

- 🔑 **Role-based Access Control**: Admins manage users, lessons, and vocabulary.
- 🔐 **JWT Authentication**: Secure login and registration system.
- 📚 **Vocabulary & Lessons Management**: CRUD operations for vocabulary.
- 🎥 **Embedded Tutorials**: YouTube video integration for learning.
- 📦 **MongoDB Database**: Stores users, lessons, and progress data.

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Backend framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cors** - Cross-origin resource sharing

## ⚡ Getting Started

### Prerequisites

Ensure you have **Node.js**, **npm**, and **MongoDB** installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/japanese-learn-backend.git
   cd japanese-learn-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the following variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/japaneseLearnDB
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### 📜 API Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| GET    | `/api/users`         | Get all users       |
| POST   | `/api/lessons`       | Add a new lesson    |
| GET    | `/api/lessons`       | Get all lessons     |
| PUT    | `/api/lessons/:id`   | Update a lesson     |
| DELETE | `/api/lessons/:id`   | Delete a lesson     |
| POST   | `/api/vocabulary`    | Add new vocabulary  |
| GET    | `/api/vocabulary`    | Get all vocabulary  |

## 📜 Folder Structure

```
/src
  ├── config/         # Database configuration
  ├── controllers/    # Route controllers
  ├── middleware/     # Authentication and authorization
  ├── models/        # Mongoose schemas
  ├── routes/        # API endpoints
  ├── utils/         # Utility functions
  ├── server.js      # Entry point
```

## 🚀 Deployment

To run in production mode:

```bash
npm start
```

## 👨‍💻 Contributors

- [Nur A Asraful Khan](https://github.com/NA-Asraful-Khan)

## 📜 License

This project is licensed under the MIT License.
