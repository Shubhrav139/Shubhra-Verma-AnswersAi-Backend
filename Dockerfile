# Use an official Node.js runtime as the base image
FROM node:16

# Copy the rest of the application code into the container
COPY . .

# Install application dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV PORT=3000

# Start the application
CMD ["npm", "start"]
