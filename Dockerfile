FROM node:18

WORKDIR /app

# Copy backend
COPY backend ./backend

WORKDIR /app/backend
RUN npm install

# Copy frontend
WORKDIR /app
COPY frontend ./frontend

WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Move build to backend
WORKDIR /app
RUN cp -r frontend/build backend/

WORKDIR /app/backend

EXPOSE 5000

CMD ["node", "server.js"]