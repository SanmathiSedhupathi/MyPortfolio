# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files first
# This helps leverage Docker's cache to install dependencies only when these files change
COPY package*.json ./

# Install dependencies
RUN npm install --unsafe-perm=true

# Ensure that the node_modules/.bin folder has executable permissions
RUN chmod -R +x /app/node_modules/.bin

# Copy the rest of the application files
COPY . .

# Build the React application
RUN npm run build

# Use a smaller image to serve the app
FROM nginx:alpine

# Copy the build files from the previous stage into the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
