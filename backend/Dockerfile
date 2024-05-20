# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source code to the container
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the backend server
CMD ["npm", "start"]
