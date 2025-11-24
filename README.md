# FullStack Movie App (Spring Boot + React)

## 📌 Overview

This is a full‑stack movie management application built using **Spring Boot** for backend (folder: `movieist`) and **React** for frontend (folder: `BestM4U`). It supports movie listing functionality and can be extended with CRUD features, authentication, and more.

---

## 🏗 Project Structure

```
springboot-fullstack-p01/
 ├── movieist      # Backend – Spring Boot REST API
 └── BestM4U       # Frontend – React Application
```

---

## 🚀 Technologies Used

### Backend (movieist)

* Java 17
* Spring Boot
* Spring Web
* Spring Data MongoDB
* MongoDB Atlas
* Maven

### Frontend (BestM4U)

* React.js
* JavaScript
* Axios
* Bootstrap / Material UI

---

## ▶ How to Run the Backend

### Prerequisites

* Java 17 installed
* Maven installed
* MongoDB Atlas cluster connection string configured in `application.properties`

### Steps

```bash
cd movieist
mvn spring-boot:run
```

Backend will start on:

```
http://localhost:8080
```

---

## ▶ How to Run the Frontend

### Prerequisites

* Node.js & npm installed

### Steps

```bash
cd BestM4U
npm install
npm start
```

Frontend will run on:

```
http://localhost:3000
```

---

## 🔗 Connecting Frontend & Backend

In frontend Axios calls, change the base URL to:

```javascript
http://localhost:8080
```

---

## 📦 Build & Deploy

### Build Backend JAR

```bash
mvn clean install
```

### Build Frontend Production Build

```bash
npm run build
```

You can deploy backend on **Render / Railway / AWS** and frontend on **Netlify / Vercel**.

---

## 📚 API Endpoints Example

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | /movies      | Get all movies     |
| POST   | /movies      | Add a new movie    |
| DELETE | /movies/{id} | Delete movie by ID |

---

## 🧑‍💻 Author

**Ajay Kumar**
Full‑Stack Developer – Java & React

GitHub: [https://github.com/ajay2003-hub](https://github.com/ajay2003-hub)

---

## ⭐ Show Your Support

If you like this project, please **star the repo ⭐**

---

### Future Enhancements

* JWT Authentication
* Search + Pagination
* Cloud deployment
* User roles (Admin & User)

---

Thank you for checking out this project 🙌
