# 🚀 Profile Engine

Profile Engine is a full-stack web application designed for managing user profiles and processing plan-based orders. It features a modern, responsive frontend and a robust backend with MongoDB integration.

## ✨ Features

- **👤 Profile Management**: Full CRUD operations for user profiles (Create, Read, Update, Delete).
- **💳 Ordering System**: Integrated pricing plans with order tracking.
- **🔍 Data Aggregation**: Backend logic to link profiles with their respective order history.
- **🛡️ Validation**: Comprehensive form validation on both client and server sides.
- **🎨 Modern UI**: Clean, responsive design built with React and custom CSS.

## 🛠️ Tech Stack

**Frontend:**
- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [React Router](https://reactrouter.com/) - Routing
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling

**Backend:**
- [Node.js](https://nodejs.org/) - Runtime Environment
- [Express](https://expressjs.com/) - Web Framework
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud Database
- [Mongoose](https://mongoosejs.com/) - ODM for MongoDB
- [Dotenv](https://www.npmjs.com/package/dotenv) - Environment Variable Management

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd User-Form-Program
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your configuration:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### Profiles
- `GET /api/profiles` - Fetch all profiles with associated orders.
- `POST /api/profiles` - Create a new profile.
- `PUT /api/profiles/:id` - Update an existing profile.
- `DELETE /api/profiles/:id` - Delete a profile.

### Orders
- `POST /api/orders` - Create a new order.

---

## 📄 License
This project is licensed under the ISC License.

---
*Created with ❤️ for managing profiles efficiently.*
