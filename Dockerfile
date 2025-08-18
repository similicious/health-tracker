# Build stage for the SvelteKit app
FROM node:lts-alpine AS builder

# Install yarn
RUN corepack enable

WORKDIR /app

# Copy package files
COPY app/package.json app/yarn.lock app/.yarnrc.yml ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY app/ .

# Build the application
RUN yarn build

# Runtime stage
FROM alpine:3.18

# Install curl and other runtime dependencies
RUN apk add --no-cache curl unzip

# Set working directory
WORKDIR /app

# Download PocketBase
RUN curl -L "https://github.com/pocketbase/pocketbase/releases/download/v0.29.2/pocketbase_0.29.2_linux_amd64.zip" -o pocketbase.zip && \
    unzip pocketbase.zip && \
    chmod +x pocketbase && \
    rm pocketbase.zip

# Copy built application from builder stage
COPY --from=builder /app/build ./public

# Copy database migrations
COPY pb_migrations/ ./pb_migrations/

# Create pb_data directory
RUN mkdir -p pb_data

# Expose port
EXPOSE 8080

# Start PocketBase with the built app
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080", "--dir=/app/pb_data", "--publicDir=/app/public"]