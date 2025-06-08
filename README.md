# CitizenConnect 2.0 - MERN Stack Application

A comprehensive citizen grievance management system built using the MERN (MongoDB, Express.js, React, Node.js) stack. The application allows citizens to submit complaints and administrators to manage and resolve them.

## Project Overview

CitizenConnect 2.0 is a full-stack application with separate client and server components, both containerized for easy deployment.

### Features

- User Authentication (Login/Signup)
- Complaint Submission System
- Admin Dashboard for Complaint Management
- Complaint Resolution System
- Responsive Design

## Deployment Architecture

The application is deployed using a modern containerized architecture:

### Frontend (Client)
- Built with React + Vite
- Containerized using Docker
- Deployed using Docker Hub

### Backend (Server)
- Node.js + Express backend
- MongoDB database (Cloud hosted)
- Containerized API service
- Deployed on Render

### Database
- MongoDB Atlas for cloud database hosting
- Secure connection with environment variables

## Deployment Screenshots

### Admin Dashboard
![Admin Interface](Screenshots/Admin%20page.png)

### Backend Deployment
![Backend on Render](Screenshots/Backend%20at%20Render.png)

### Cloud Deployment
![Cloud Run Deployment](Screenshots/Cloud%20Run%20Deploy%202.png)
![Cloud Run Status](Screenshots/Cloud%20Run%20deployment.png)

### Docker Container
![Docker Hub Repository](Screenshots/Docker%20hub.png)

### Database Setup
![MongoDB Deployment](Screenshots/MongoDb%20deployement.png)

### Application Interface
![Login Interface](Screenshots/Site%20working%20login%20page.png)
![User Dashboard](Screenshots/User%20page.png)

## Container Setup

### Client Container

```dockerfile
# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Server Container

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

## Deployment Instructions

### Local Development

1. Clone the repository
```powershell
git clone <repository-url>
cd CitizenConnect2.0
```

2. Start the client
```powershell
cd client
npm install
npm run dev
```

3. Start the server
```powershell
cd server
npm install
npm start
```

### Docker Deployment

1. Build and run client container
```powershell
cd client
docker build -t citizenconnect-client .
docker run -d -p 80:80 citizenconnect-client
```

2. Build and run server container
```powershell
cd server
docker build -t citizenconnect-server .
docker run -d -p 5000:5000 citizenconnect-server
```

### Cloud Deployment

1. Push containers to Docker Hub
```powershell
docker tag citizenconnect-client yourusername/citizenconnect-client
docker push yourusername/citizenconnect-client

docker tag citizenconnect-server yourusername/citizenconnect-server
docker push yourusername/citizenconnect-server
```

2. Deploy using cloud services:
   - Frontend is deployed using Docker Hub and Cloud Run
   - Backend is hosted on Render
   - Database is hosted on MongoDB Atlas

## Environment Variables

Make sure to set up the following environment variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `PORT`: Server port (default: 5000)

## Additional Notes

- The application uses Nginx as the web server for the client container
- Backend API is containerized separately for scalability
- MongoDB Atlas provides cloud database hosting
- Render and Cloud Run provide container orchestration

Feel free to contribute to this project by submitting pull requests or reporting issues.
