# Week 2 — Web Development Assignments

A collection of web development assignments covering React fundamentals, component-based UI development, routing, CSS Modules, REST APIs, authentication, and backend development.

This repository is part of my ongoing web development learning journey. It contains seven individual projects, organized into separate folders for easier development, testing, and maintenance.

## About This Repository

The goal of these assignments is to gain practical experience with frontend development using React and backend development using Node.js and Express.

The projects are being developed incrementally. Some features are implemented and tested, while others still require further development, integration, and testing.

## Tech Stack

**Frontend**
- React
- JavaScript
- HTML5
- CSS3
- React Router
- CSS Modules
- Vite

**Backend**
- Node.js
- Express.js
- REST APIs
- MongoDB and Mongoose (for the To-Do REST API)
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

**Development Tools**
- Visual Studio Code
- Git and GitHub
- npm
- PowerShell
- Postman or other API testing tools

## Project Structure

```text
WEEK2/
├── .gitignore
├── README.md
├── 01-React-Fundamentals/
├── 02-Todo-App/
├── 03-React-Router/
├── 04-CSS-Modules/
├── 05-Todo-List-REST-API/
├── 06-User-Authentication-API/
└── 07-Notes-App-Backend/
```

Each project has its own source files and, where applicable, its own `package.json` and dependencies.

## Assignments and Progress

### 1. React Fundamentals
**Folder:** `01-React-Fundamentals`

**Topics:** React components, props, state, and event handling.

The project introduces component-based UI development and interactive elements in React.

### 2. To-Do App
**Folder:** `02-Todo-App`

**Topics:** React state management and interactive lists.

Implemented features include:
- Adding tasks
- Deleting tasks
- Marking tasks as completed
- Filtering tasks

### 3. React Router
**Folder:** `03-React-Router`

**Topics:** Client-side routing and multi-page navigation in a React application.

The project includes Home, About, and Contact pages, along with a not-found page for unknown routes.

### 4. CSS Modules
**Folder:** `04-CSS-Modules`

**Topics:** Component-specific styling with CSS Modules.

The project uses a reusable product card and a CSS Module stylesheet to demonstrate scoped component styling.

### 5. To-Do List REST API
**Folder:** `05-Todo-List-REST-API`

**Topics:** Backend development, REST endpoints, Express.js, and MongoDB with Mongoose.

The API is designed to support task creation, retrieval, updating, and deletion.

**Current status:** The API routes and database integration code have been created. The MongoDB connection still needs to be resolved and the database-backed operations need to be tested successfully.

### 6. User Authentication API
**Folder:** `06-User-Authentication-API`

**Topics:** User registration, login, password hashing, and JWT-based authentication.

Implemented features include:
- User registration
- Password hashing with bcryptjs
- Login and token generation
- JWT-protected profile endpoint

**Current status:** The main authentication flow has been tested locally. User records are currently stored in a local JSON file rather than a database. Database integration and further security testing remain future improvements.

### 7. Notes App Backend
**Folder:** `07-Notes-App-Backend`

**Topics:** CRUD operations, REST APIs, JWT authentication, and user-specific data access.

Implemented endpoints support:
- Creating notes
- Viewing notes
- Retrieving an individual note
- Updating notes
- Deleting notes

**Current status:** The main CRUD operations and JWT-protected routes have been tested locally. Notes are currently stored in a local JSON file. Persistent database integration and additional testing remain future improvements.

## Getting Started

### Prerequisites

Install the following before running the projects:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

A MongoDB instance will also be required to run the To-Do REST API with its intended database integration.

### Clone the Repository

```bash
git clone https://github.com/alina01washim-aw/week2-web-development-assignments.git
cd week2-web-development-assignments
```

### Run a React Project

Open a terminal in the folder of the React project you want to run.

For example:

```bash
cd 01-React-Fundamentals
npm install
npm run dev
```

Vite will display the local URL in the terminal. Open that URL in your browser.

The same general process applies to the other React projects. Run each project from its own folder.

### Run a Backend Project

Open a separate terminal in the required backend project folder, install its dependencies, configure any required environment variables, and start the server using the script defined in its `package.json`.

For example:

```bash
cd 06-User-Authentication-API
npm install
```

Check the project's `package.json` for the available start scripts before running the server.

For the authentication and notes projects, configure a strong, private `JWT_SECRET` in the local `.env` file before using the APIs.

**Important:** Do not commit `.env` files, real credentials, or private user data to GitHub.

## API Testing

Backend endpoints can be tested using Postman or another HTTP client.

For JWT-protected endpoints:
1. Register or log in to obtain a token.
2. Include the token in the request's `Authorization` header.
3. Use the format `Bearer YOUR_TOKEN`.
4. Send the appropriate HTTP request and verify the response.

The available endpoints and request formats can be documented further as each backend project is completed.

## Current Limitations and Future Improvements

Planned improvements include:

- Resolve and verify the MongoDB connection for the To-Do REST API.
- Add persistent database storage to the authentication and notes projects.
- Expand API validation and error handling.
- Add more comprehensive endpoint testing.
- Improve project-specific documentation with screenshots and examples.
- Review security configuration before any public deployment.

## Learning Outcomes

Through these assignments, I am working toward improving my understanding of:

- Building reusable React components
- Managing state and handling user interactions
- Implementing client-side navigation
- Writing maintainable component styles
- Designing RESTful APIs
- Implementing authentication and authorization
- Working with databases and backend services
- Using Git and GitHub to track and publish development work

## Repository

**GitHub:** [week2-web-development-assignments](https://github.com/alina01washim-aw/week2-web-development-assignments)

---

This repository is a work in progress and will be updated as the assignments evolve.
