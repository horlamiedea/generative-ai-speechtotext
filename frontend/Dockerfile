
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


FROM node:18

WORKDIR /app

RUN npm install -g serve


COPY --from=builder /app/dist /app

EXPOSE 5000 

CMD ["serve", "-s", ".", "-l", "5000"]