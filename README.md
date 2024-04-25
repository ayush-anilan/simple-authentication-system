# Simple Authentication System

This is a simple authentication system with sign-in and sign-up functionality.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Password Encryption: bcrypt

## Features

- Sign In
- Sign Up with email otp
- Password Reset
- Authentication with JWT

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have Node.js and MongoDB installed on your local machine.

- Node.js: [Download](https://nodejs.org/)
- MongoDB: [Download](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ayush-anilan/highway-delite-task.git
2. Navigate to the project directory:
   ```bash
   cd highway-delite-task
3. Install dependencies for both the backend and frontend:
   ```bash
   cd backend
   npm install
  
   cd ../frontend
   npm install

### Configuration
1. Create a .env file in the backend directory:
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key

### Running the Application
1. Start the backend server:
   ```bash
   cd backend
   nodemon run dev
2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
3. Open your browser and go to http://localhost:5000 to see the application running.

### Usage
Sign In: Navigate to http://localhost:5000/signin and enter your email and password.
Sign Up: Navigate to http://localhost:5000/signup and fill in the required details.
Password Reset: Click on the "Reset Password?" link on the index page to reset your password.

### Author
Ayush Anilan
