# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/userService

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy your application code to the container
COPY . .

# Expose the port your Express.js app is running on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
