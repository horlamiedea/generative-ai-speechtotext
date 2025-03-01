FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18

WORKDIR /app

RUN npm install -g serve

# Generate a self-signed certificate for local HTTPS testing
RUN mkdir -p /app/cert && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /app/cert/key.pem -out /app/cert/cert.pem -subj "/CN=localhost"

COPY --from=builder /app/dist /app

EXPOSE 8080

CMD ["serve", "-s", ".", "--ssl-cert", "/app/cert/cert.pem", "--ssl-key", "/app/cert/key.pem", "-l", "8080"]