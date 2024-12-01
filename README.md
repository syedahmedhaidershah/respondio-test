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
   NODE_ENV=development
   DB_HOST=host.docker.internal
   DB_NAME=notes
   DB_USER=root
   DB_PASS=root
   JWT_SECRET=your_jwt_secret
   REDIS_HOST=host.docker.internal
   REDIS_PORT=6379
   REDIS_PASS=your_redis_password
   LOG_LEVEL=verbose
   ```
3. Make the `./bin/*.sh` scripts executable:
   ```bash
   chmod +x ./bin/*.sh
   ```
4. Run the build script:
   ```bash
   ./bin/build.sh
   ```
   The output will look similar to:
   ![Build Output](./docs/img/screenshots/Screenshot%202024-12-01%20at%2016.29.06.png "Build Output")
   
5. Start the application using Docker Compose:
   ```bash
   ./bin/run.sh
   ```
   The output will look similar to:
   ![Build Output](./docs/img/screenshots/Screenshot%202024-12-01%20at%2017.12.20.png "Docker Compose Up & App Running")
   This takes about take a bit depending on your platform and environment specs, the API service waits for servers to be started and healthy.
   
6. The application will be available at `http://localhost:3000`. You can verify your container state from docker as well, using Docker Desktop, for instance:
   ![Build Output](./docs/img/screenshots/Screenshot%202024-12-01%20at%2017.20.54.png "Docker Container Log").
   You can also verify the API health via the `/api/health` endpoint on port `3000`.
   ![Build Output](./docs/img/screenshots/Screenshot%202024-12-01%20at%2017.25.58.png "cURL for API health").

## Note

The `run.sh` script is used to inject environment variables into the container at runtime. This ensures that secrets are not stored within the Docker image, making it more portable and secure. The mechansim does support `.env` file usage.

## MySQL Configuration

The application uses MySQL as the database. The configuration is managed through environment variables defined in the `.env` file. Ensure that the MySQL service is correctly set up in the `docker-compose.yml` file.

## Redis Configuration

Redis is used for caching and session management. The configuration is managed through environment variables defined in the `.env` file. Ensure that the Redis service is correctly set up in the `docker-compose.yml` file.

## Design Patterns

The application follows the MVC (Model-View-Controller) design pattern:
- **Model**: Defines the data structure and interacts with the database.
- **Controller**: Handles the business logic and processes incoming requests.

### Singleton Pattern

The Singleton Pattern is used to ensure a single instance of the logger class is used throughout the application.

### Factory Method Pattern

The Factory Method Pattern is implemented to create instances of different types of notes (e.g., personal, work).

## API Endpoints
### API Base - `/api/v1`/

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login a user and receive a token.
- `POST /notes`: Create a new note (requires authentication).
- `GET /notes`: Retrieve all notes (requires authentication).
- `GET /notes/:id`: Retrieve a specific note (requires authentication).
- `PUT /notes/:id`: Update a note (requires authentication).
- `DELETE /notes/:id`: Delete a note (requires authentication).

## Testing

Use a tool like Postman to test the API endpoints. Ensure that you include the JWT token in the `Authorization` header for endpoints that require authentication.

### Sample cURL Requests

#### Register a new user
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpassword",
  "email": "testuser@example.com"
}'
```
#### Sample test:
   ![Build Output](./docs/img/screenshots/Screenshot%202024-12-01%20at%2017.40.41.png "Build Output")



#### Login a user
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpassword"
}'
```

#### Create a new note
```bash
curl -X POST http://localhost:3000/api/v1/notes \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>" \
-d '{
  "title": "Sample Note",
  "content": "This is a sample note."
}'
```

#### Retrieve all notes
```bash
curl -X GET http://localhost:3000/api/v1/notes \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>"
```

#### Retrieve a specific note
```bash
curl -X GET http://localhost:3000/api/v1/notes/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>"
```

#### Update a note
```bash
curl -X PUT http://localhost:3000/api/v1/notes/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>" \
-d '{
  "title": "Updated Note",
  "content": "This is an updated note."
}'
```

#### Delete a note
```bash
curl -X DELETE http://localhost:3000/api/v1/notes/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>"
```

## Building with Webpack

The application uses Webpack to transpile ES6 code. The Dockerfile is configured to build the application using Webpack in a multi-stage build process.

## Project Structure
```
.
├── Dockerfile
├── README.md
├── app.log
├── bin
│   ├── build.sh
│   └── run.sh
├── docker-compose.yml
├── entrypoint.sh
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── config
    │   ├── db.js
    │   ├── rate-limiter.js
    │   └── sequelize.js
    ├── config.js
    ├── libraries
    │   ├── logger.library.js
    │   └── redis-client.library.js
    ├── main.js
    ├── middleware
    │   ├── auth.middleware.js
    │   ├── json-parser.middleware.js
    │   └── rate-limiter.middleware.js
    ├── models
    │   ├── note.model.js
    │   └── user.model.js
    ├── modules
    │   ├── auth
    │   │   ├── auth.controller.js
    │   │   └── auth.service.js
    │   ├── config
    │   │   └── config.service.js
    │   └── note
    │       ├── note.controller.js
    │       ├── note.factory.js
    │       └── note.service.js
    └── routes
        ├── auth.routes.js
        └── notes.routes.js
