# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the frontend files to the default Nginx public folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
