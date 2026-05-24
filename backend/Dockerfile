FROM node:20-alpine
WORKDIR /app

# Build deps for better-sqlite3 native compilation
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

RUN mkdir -p /app/data
VOLUME /app/data

EXPOSE 4000
CMD ["node", "src/index.js"]
