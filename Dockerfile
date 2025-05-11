FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --unsafe-perm=true

# Ensure react-scripts is executable
RUN chmod -R +x node_modules/.bin

# Copy the rest of the files
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000
