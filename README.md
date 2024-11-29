# Note Taking Application

## Description

A Note Taking application using ExpressJS, MySQL, and Redis.

## Requirements

- Node.js
- Docker
- Docker Compose

## Setup

1. Clone the repository.
2. Create a `.env` file in the root directory and add the following environment variables:
   ```
   DB_HOST=db
   DB_NAME=notes
   DB_USER=root
   DB_PASS=root
   JWT_SECRET=your_jwt_secret
   ```
3. Build and start the application using Docker Compose:
   ```
   docker-compose up --build
   ```
4. The application will be available at `http://localhost:3000`.

## API Endpoints

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login a user and receive a token.
- `POST /notes`: Create a new note (requires authentication).
- `GET /notes`: Retrieve all notes (requires authentication).
- `GET /notes/:id`: Retrieve a specific note (requires authentication).
- `PUT /notes/:id`: Update a note (requires authentication).
- `DELETE /notes/:id`: Delete a note (requires authentication).

## Testing

Use a tool like Postman to test the API endpoints.
