# Authentication Implementation Guide

This guide explains how to implement authentication in your web application.

## Backend Setup (Already Implemented)

The authentication system is already set up in your backend with the following components:

1. **User Model** (`models/User.js`)
   - Handles user data structure
   - Includes password hashing using bcryptjs
   - Provides password comparison method

2. **Auth Controller** (`controllers/authController.js`)
   - Handles user registration
   - Manages user login
   - Generates JWT tokens

3. **Auth Middleware** (`middleware/auth.js`)
   - Verifies JWT tokens
   - Protects routes that require authentication

## How to Use Authentication

### 1. Register a New User

```javascript
fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'User Name',
    email: 'user@example.com',
    password: 'password123'
  })
});
```

### 2. Login

```javascript
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});
```

### 3. Accessing Protected Routes

Add the JWT token to the Authorization header:

```javascript
fetch('http://localhost:3000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## Frontend Implementation

1. Store the JWT token after login:
```javascript
local Storage.setItem('token', response.token);
```

2. Add authentication header to API requests:
```javascript
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

3. Handle authentication state:
```javascript
const isAuthenticated = !!localStorage.getItem('token');
```

4. Logout:
```javascript
local Storage.removeItem('token');
```

## Security Best Practices

1. Always use HTTPS in production
2. Store JWT tokens securely (preferably in HTTP-only cookies)
3. Implement token expiration and refresh mechanisms
4. Validate user input on both frontend and backend
5. Use strong password requirements

## Dependencies Required

- jsonwebtoken
- bcryptjs
- mongoose

These are already installed in your project.

## Environment Variables

Make sure these are set in your .env file:

```
JWT_SECRET=your-secret-key
MONGODB_URI=your-mongodb-uri
```