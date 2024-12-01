#!/usr/bin/env bash

# Build env file on the fly - default values applied (If ARGS not provided)
cat <<EOF > .env
NODE_ENV=${NODE_ENV:-development}
DB_NAME=${DB_NAME:-notes}
DB_USER=${DB_USER:-root}
DB_PASS=${DB_PASS:-root}
DB_HOST=${DB_HOST:-"host.docker.internal"}
JWT_SECRET=${JWT_SECRET:-your_jwt_secret}
REDIS_HOST=${REDIS_HOST:-"host.docker.internal"}
REDIS_PORT=${REDIS_PORT:-6379}
REDIS_PASS=${REDIS_PASS:-your_redis_password}
LOG_LEVEL=${LOG_LEVEL:-verbose}
EOF

. ./.env
# Start the application using Docker Compose
sudo docker-compose -p respondio up -d
