# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your app source code
COPY . .

# Expose the port the app runs on
EXPOSE 5010
# Define the command to run your app
CMD ["node", "index.js"]
