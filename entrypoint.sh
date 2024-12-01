#!/bin/sh

# Check if .env file exists
if [ ! -f .env ]; then
  echo ".env file not found!"
  exit 1
fi

# Replace environment variables in .env file
sed -i "s/NODE_ENV=.*/NODE_ENV=${NODE_ENV}/" .env
sed -i "s/DB_NAME=.*/DB_NAME=${DB_NAME}/" .env
sed -i "s/DB_USER=.*/DB_USER=${DB_USER}/" .env
sed -i "s/DB_PASS=.*/DB_PASS=${DB_PASS}/" .env
sed -i "s/DB_HOST=.*/DB_HOST=${DB_HOST}/" .env
sed -i "s/JWT_SECRET=.*/JWT_SECRET=${JWT_SECRET}/" .env
sed -i "s/REDIS_HOST=.*/REDIS_HOST=${REDIS_HOST}/" .env
sed -i "s/REDIS_PORT=.*/REDIS_PORT=${REDIS_PORT}/" .env
sed -i "s/REDIS_PASS=.*/REDIS_PASS=${REDIS_PASS}/" .env
sed -i "s/LOG_LEVEL=.*/LOG_LEVEL=${LOG_LEVEL}/" .env

# Ensure REDIS_HOST is set correctly
if [ -z "$REDIS_HOST" ]; then
  echo "REDIS_HOST is not set!"
  exit 1
fi

# Start the application
exec node dist/main.js
