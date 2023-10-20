# Use an official Node.js runtime as a parent image
FROM node:17-alpine
# Set the env vars [192.168.1.119] chould be changed to your local machine ip adresse 
ENV URI="mongodb://root:rootpassword@192.168.1.119:27017/demodb?authSource=admin&directConnection=true" 
ENV PORT="3000"
ENV SECRET_ACCESS_TOKEN="5KALP0VITCH"
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

# docker build -t user-service .
# docker container run -d -p 3000:3000 --name user-service user-service
