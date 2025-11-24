# movieist

This repository contains a Spring Boot backend (Movieist API) and a frontend (React or similar) in a mono-repo layout.

Quick start (backend):

1. Set environment variables for MongoDB (recommended):

```powershell
$env:MONGO_URI = 'mongodb+srv://<user>:<pass>@cluster.mongodb.net/?retryWrites=true&w=majority'
$env:MONGO_DATABASE = 'movie-api-db'
$env:JWT_SECRET = '<base64-32-byte-secret>'
```

2. Run backend:

```powershell
cd movieist
.\mvnw.cmd spring-boot:run
```

Frontend

- Place your frontend project inside `frontend/` or `client/` folder and add appropriate instructions.

Important

- Do NOT commit secrets. This repo's `.gitignore` excludes `application.properties` and `.env` files to avoid accidental commits.


