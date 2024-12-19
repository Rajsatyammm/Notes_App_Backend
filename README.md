# Notes App Backend

Welcome to the **Notes App** backend! This API allows users to register, log in, and manage their notes. The app supports user authentication and CRUD operations for notes.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
  - [User Endpoints](#user-endpoints)
  - [Note Endpoints](#note-endpoints)

## Installation

Follow these steps to set up the backend locally.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rajsatyammm/Notes_App_Backend
Install dependencies: Make sure you have Node.js installed. Then, run:

```bash
npm install
```

Set up environment variables: Create a .env file in the root of the project and add the following environment variables:

.env file
```
PORT=5000
MONGODB_URI=<your_mongodb_connection_uri>
JWT_SECRET=<your_jwt_secret_key>
Run the app:

```bash
npm run dev
```
This will start the backend server on port 5000 (or the port specified in .env).

2. **Endpoints**:

User Endpoints
1. Register User
Endpoint: 
```POST /api/users/register ```

Description: 

Register a new user.
Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
200 OK: Success message with a JWT token
400 Bad Request: If the user already exists or input is invalid.
```
2. Login User
Endpoint: ```POST /api/users/login```

Description: 

Login an existing user and get a JWT token.
Request Body:
```json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Response:
200 OK: Success message with a JWT token.
400 Bad Request: If invalid credentials are provided.
```
3. Get Logged-in User Profile
Endpoint: ```GET /api/users/me```

Description: 

Get the profile of the currently logged-in user.

```Headers: Authorization: Bearer <token>
Response:
200 OK: User profile details (name, email, etc.)
401 Unauthorized: If the user is not authenticated.
```
4. Update User Profile
Endpoint: ```PUT /api/users/updateProfile```

Description: 

Update the profile of the currently logged-in user.
Headers: Authorization: Bearer <token>
Request Body:
```json
{
  "name": "New Name",
  "email": "newemail@example.com"
}

Response:
200 OK: Success message with updated user data.
401 Unauthorized: If the user is not authenticated.
```
### Note Endpoints
1. Add a Note

Endpoint: ```POST /api/notes/add```

Description: 

Add a new note for the logged-in user.
```
Headers: Authorization: Bearer <token>
```
Request Body:
```json
Copy code
{
  "title": "My Note",
  "content": "This is a sample note"
}

Response:
200 OK: Success message with the note details.
400 Bad Request: If the request data is invalid.
```
2. Get All Notes of the User

Endpoint: ```GET /api/notes/getAll```

Description: 

Get all notes of the currently logged-in user.
```
Headers: Authorization: Bearer <token>
```
```
Response:
200 OK: List of notes for the user.
401 Unauthorized: If the user is not authenticated.
```
3. Delete a Note

Endpoint: ```PUT /api/notes/delete/:id```

Description: Delete a specific note by ID.
```
Headers: Authorization: Bearer <token>
Response:
200 OK: Success message indicating that the note has been deleted.
400 Bad Request: If the note ID is invalid.
404 Not Found: If the note is not found.
```