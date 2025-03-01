# frontend/Dockerfile
# Stage 1: Build the React app
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the static files with serve and HTTPS
FROM node:18

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Generate a self-signed certificate for HTTPS (for development/testing)
RUN mkdir -p /app/cert && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /app/cert/key.pem -out /app/cert/cert.pem -subj "/CN=healthcareapp.eastus.cloudapp.azure.com"

# Copy the build output from the builder stage
COPY --from=builder /app/dist /app

EXPOSE 443

# Serve with HTTPS using the self-signed certificate
CMD ["serve", "-s", ".", "--ssl-cert", "/app/cert/cert.pem", "--ssl-key", "/app/cert/key.pem", "-l", "443"]