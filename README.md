# Real-Time Collaborative Notes App

### Objective

Build a real-time collaborative notes app where multiple users can create, edit, and view notes in real-time. Implement JWT-based authentication with access & refresh tokens for secure access and session management. The project utilizes React, WebSocket (Socket.io), Express.js, Node.js, MongoDB, and Tailwind CSS.

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Request Examples](#request-examples)
- [Response Examples](#request-and-response-examples)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

# Installation

```bash
   # Clone the repository
   git clone https://github.com/Rayhan-abdullha/Real-Time-Collaborative-Notes-App-backend.git

   # Install dependencies
   npm install

   # Start the server
   npm run dev
```

- .env

```js
   See .env.example file
```

# Authentication

## User Authentication (Signup/Login with Access & Refresh Tokens)

- Implemented JWT-based authentication with:
  - Access Token (Short-lived, used for API requests).
  - Refresh Token (Long-lived, used to renew access tokens).
- Store hashed passwords in MongoDB using bcrypt.
- Implemented API routes for:
  - User registration (signup)
  - User login (returns access & refresh tokens)
  - Token refresh (issues a new access token when the old one expires)
  - Logout (invalidates refresh token)
- Store the refresh token securely in an HTTP-only cookie.

## Backend (Express.js, Node.js, MongoDB, Socket.io)

- Set up an Express.js server with Socket.io for real-time updates.
- Used MongoDB to store:
  - Users: email, password, refreshToken, name.
  - Notes: title, content, updatedAt, author (user ID).
- Implemented middleware to verify JWT tokens before accessing protected routes.
- Developed API endpoints for:
  - CRUD operations on notes (Only authenticated users can create, read, update).
  - WebSockets (Socket.io) for real-time updates when a note is modified.
- Emit live updates when users edit notes collaboratively.

# Endpoints

All of the Endpoints are here:

- Create a new User
  - POST /api/v1/auth/register
- Login to use the API
  - POST /api/v1/auth/login
- Refresh token
  - POST /api/v1/auth/refresh-token
- Logout
  - POST /api/v1/auth/logout
- Profile
  - GET /api/v1/profile
- Notes CRUD
  - GET /api/v1/notes
  - GET /api/v1/notes/\:id
  - POST /api/v1/notes
  - DELETE /api/v1/notes/\:id

# Request and Response Examples

Provide detailed examples of request payloads and response payloads for each endpoint. Use code blocks or JSON examples to make it clear.

- Request

```json
   POST /api/v1/auth/register

   {
      "name": "john",
      "email": "john@gmail.com",
      "password": "test1122"
   }
```

- Response

```json
{
  "statusCode": 201,
  "message": "User Created Successfully",
  "data": {
    "id": "kuytfcvswedgmnbghtyrcd",
    "name": "john",
    "email": "john@gmail.com",
    "accessToken": "adfadf656asf45a6sfdafasdfd645asef54asdf6544dsf645asfasdf" //
  },
}
```

# Error Handling

How errors are handled in the API. Below are common error responses:

-
  #### 400 Bad Request
  - The server cannot process the request due to client error.

```json
   {
      "statusCode": 400,
      "message": "Bad Request",
      "errors": [
         {
            "field": "email",
            "message": "Email is not valid"
         }
      ]
   }
```

-
  #### 401 Unauthorized
  - The client is not authenticated.

```json
   {
      "code": 401,
      "message": "Unauthorized"
   }
```

-
  #### 403 Forbidden
  - The client lacks permission.

```json
   {
      "code": 403,
      "message": "Permission Denied"
   }
```

-
  #### 404 Not Found
  - The requested resource does not exist.

```json
   {
      "code": 404,
      "message": "Resource Not Found"
   }
```

-
  #### 409 Conflict
  - Conflict with the current state of the resource.

```json
   {
      "code": 409,
      "message": "Already Exists"
   }
```

-
  #### 500 Internal Server Error
  - An unexpected error occurred on the server.

```json
   {
      "code": 500,
      "message": "Internal Server Error"
   }
```

# Testing

Everything is working fine.

# Deployment

Deployed on vercel

# License

Specify the license under which your API is distributed. Include a link to the license file if applicable.

```md
   This project is licensed under the Rayhan Abdullah License - see the [LICENSE.md](LICENSE.md) file for details.
```

