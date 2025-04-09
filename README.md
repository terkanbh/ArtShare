# ArtShare
Artwork sharing website.

## Core Features
- User Management (Sign up, Login, Profile, CRUD)
- Artwork Sharing (Upload images with descriptions, CRUD)
- Interaction (Like and Comment on artworks)
- Moderation and Security (Authentication, authorization)

## Tech Stack
- Frontend: React + React Router + Bootstrap
- Backend: ASP.NET Web API + Identity + EF Core
- Database: SQLite 
- Authentication: Cookie based
- Storage: Local storage for images

## API Routes 
- /auth/me
- /auth/login
- /auth/logout
- /auth/register
- /users
- /users/id (GET)
- /users/id (PUT)
- /users/id (DELETE)

## Required Tools & Versions
- __.NET SDK__ → Ensure you have .NET 8.0 installed
- __Node.js__ → Recommended version 18.x or newer

## Setup
```
### Clone the repo:
git clone https://github.com/terkanbh/ArtShare

### Start the backend:
cd ArtShare.WebApi
dotnet run

### Start the frontend:
cd /frontend
npm install
npm run dev
```

## Access the Application
```
Backend API: http://localhost:5000/swagger/index.html
Frontend: http://localhost:3000
```