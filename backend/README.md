# 📚 The Book Stacker

## 🧩 Feature Summary & Design Decisions

This is a very simple dummy app serving as a basic demonstration of using **containers to deploy a three-tier application**. I chose the following stack purely for getting the project up and running in the **fastest and friendliest way for me**:

- **Presentation Layer**: [EJS](https://ejs.co/) Templates
- **Application Layer**: [Express](https://expressjs.com/) route handlers
- **Data Layer**: [PostgreSQL](https://www.postgresql.org/)

Since I didn’t use React (as was originally suggested), there was no need to deploy three separate containers.  
Instead, I bundled the **Presentation and Application layers into one container**, and kept **PostgreSQL in its own**.

---

## 📚 About the App

The app is called **The Book Stacker**, because — you guessed it — it stacks books. It’s a CRUD interface that:

- Prompts the user for three values: **book title**, **author's first name**, and **last name**
- Displays all added books in a simple table
- Stores everything in a single PostgreSQL table

It’s lightweight, server-rendered, and doesn’t rely on frontend frameworks like React — just raw forms, routes, and database queries.

---

## 🚀 How to Use It (for local manual deployments)

1. Clone the repo — yes, the `.env` file (with dummy creds) is included
2. Run the app:
   ```bash
   docker-compose up --build
   ```
3. Once both containers are up, open your browser and go to:
   👉 http://localhost:3000

👉 [View Cloud Deployment plan](DEPLOYMENT.md)
