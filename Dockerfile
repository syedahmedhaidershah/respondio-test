# Stage 1: Build
ARG BASE_IMG="20.11-slim"
FROM node:20.11-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run
ARG BASE_IMG="20.11-slim"
FROM node:20.11-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY --from=builder /app/.env.example /app/.env
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

RUN npm install --only=production

EXPOSE 3000

CMD ["/app/entrypoint.sh"]
