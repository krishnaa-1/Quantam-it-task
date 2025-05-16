# Quantam-it-task

This project is a **full-stack authentication system** built using **Vite (React), Node.js, Express, MongoDB, and JWT**. It includes **user registration**, **login**, and **protected pages** that display user information.

## 🚀 Features

- ✅ **User Registration** with name, date of birth, email, and password  
- 🔒 **User Login** with JWT-based authentication  
- 🔐 **Protected Routes** for authenticated users  
- 📱 **Responsive Design** with a modern UI  
- 💾 **Local Storage** for session management  

## 🛠️ Tech Stack

- **Frontend:** Vite (React.js)  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT (JSON Web Token)  

## 📋 Prerequisites

- **Node.js (v18+)**  
- **MongoDB database** (local or cloud)  

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/krishnaa-1/Quantam-it-task.git
cd Quantam-it-task


2. Install Dependencies

# Install server dependencies
cd backend
npm install

# Install client dependencies
cd frontend
npm install

3. Environment Variables

Create a .env file in the backend folder with the following contents:

MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key

Create a .env file in the frontend folder with the following contents:

VITE_API_URL=http://localhost:4000

4. Run the Application

# Run server
cd backend
npm start

# Run client
cd frontend
npm run dev

5. Access the Application

Frontend: http://localhost:5173

Backend: http://localhost:4000


API Endpoints

POST /api/auth/signup - Register a new user

POST /api/auth/login - Login an existing user
