# Use Node.js 18-alpine image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --unsafe-perm=true  # Add this line to ensure proper permission handling

# Ensure react-scripts is executable (if permission issue persists)
RUN chmod +x node_modules/.bin/react-scripts

# Copy the rest of the files into the container
COPY . .

# Build the application
RUN npm run build

# Expose necessary port (optional, depending on your app)
EXPOSE 3000
