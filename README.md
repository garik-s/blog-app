# Minimal Blog Application

This repository contains a minimal blog application built with Next.js (frontend) and Node.js (backend).

## Tech Stack

-   **Frontend:**
    -   Next.js
    -   Tailwind CSS
    -   Zustand (State Management)
    -   React Hook Form (Form Handling)
    -   Toast notifications for API errors
-   **Backend:**
    -   Node.js + Express.js
    -   PostgreSQL
    -   Sequelize (ORM)
    -   JWT Authentication
-   **Deployment:**
    -   Vercel (Frontend)
    -   Railway (Backend)

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/garik-s/blog-app.git](https://www.google.com/search?q=https://github.com/garik-s/blog-app.git)
    cd blog-app
    ```

2.  **Backend Setup:**

    -   Navigate to the `backend` directory: `cd backend`
    -   Install dependencies: `npm install`
    -   Create a `.env` file and  the required environment variables 
            DATABASE_URL=postgresql://your_db_user:your_db_password@your_db_host:your_db_port/your_db_name.
    -   Set up your PostgreSQL database.
    -   Start the server: `npm run dev`

3.  **Frontend Setup:**

    -   Navigate to the `frontend` directory: `cd ../frontend`
    -   Install dependencies: `npm install`
    -   Create a `.env` file with `NEXT_PUBLIC_API_URL` pointing to your backend URL (e.g., `http://localhost:5000`).
    -   Start the development server: `npm run dev`

4.  **Live Demo**

    -   **Frontend (Vercel):** [https://blog-app-zeta-peach.vercel.app](https://blog-app-zeta-peach.vercel.app).
    -   **Backend (Railway):** [https://blog-app-production-2b86.up.railway.app](https://blog-app-production-2b86.up.railway.app).

## Approach

-   **Frontend:**
    -   Used Zustand for centralized state management of blog posts.
    -   React Hook Form for efficient form handling.
    -   Tailwind CSS for responsive and customizable styling.
    -   Toast notifications to provide feedback for API actions.
-   **Backend:**
    -   Express.js for routing and API endpoints.
    -   Sequelize for database interactions and migrations.
    -   JWT authentication for secure API access.
    -   Controllers for handling business logic.
    -   Middlewares for authentication and error handling.
    -   Pagination and search are implemented in the controller files.

## API Endpoints

-   `GET /posts`: Fetch all blog posts (with pagination and search/filter).
-   `GET /posts/:id`: Fetch a single blog post.
-   `POST /posts`: Create a new blog post (auth only).
-   `PUT /posts/:id`: Update an existing blog post (auth only).
-   `DELETE /posts/:id`: Delete a blog post (auth only).

## Authentication

-   JWT authentication is implemented for securing the backend API.

## Pagination

-   Pagination is supported for fetching all blog posts.

## Search

-   Search functionality is implemented for blog posts.