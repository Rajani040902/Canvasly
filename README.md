# Canvasly

A mini design canvas application built as part of the **Glazia Full Stack Developer Intern Assignment**.

Canvasly allows users to create canvases, add and edit graphical elements, move and transform them, and persist canvas data using a Node.js, Express.js, and MongoDB backend.

## Features

* Create a new canvas
* Add Rectangle, Circle, and Text elements
* Select and drag elements
* Resize elements using React Konva Transformer
* Rotate elements
* Edit element properties:

  * X position
  * Y position
  * Width
  * Height
  * Rotation
  * Fill / Color
  * Text content
* Delete selected elements
* Save canvases to MongoDB
* Load saved canvases
* Update existing canvases
* Delete canvases
* REST API for canvas persistence
* Frontend and backend separated into independent folders
* React state management for editor state
* Backend validation and centralized error handling
* Responsive editor interface

## Tech Stack

### Frontend

* Next.js
* React
* React Konva
* Konva
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Development Tools

* Git & GitHub
* VS Code
* Postman

## Project Structure

```text
Canvasly/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── canvasController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validate.js
│   │   ├── models/
│   │   │   ├── Canvas.js
│   │   │   └── Element.js
│   │   ├── routes/
│   │   │   └── canvasRoutes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── EditorCanvas.js
│   │   │   ├── PropertiesPanel.js
│   │   │   ├── TestCanvas.js
│   │   │   └── Toolbar.js
│   │   ├── lib/
│   │   │   └── api.js
│   │   └── store/
│   │       └── useEditorStore.js
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

* Node.js 18 or higher
* npm
* MongoDB locally or a MongoDB Atlas account
* Git

## Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

The actual `.env` file should **not** be committed to GitHub.

A safe template is provided as:

```text
backend/.env.example
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rajani040902/Canvasly.git
cd Canvasly
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create your `.env` file and add your MongoDB connection string.

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/canvases`     | Create a new canvas |
| GET    | `/api/canvases`     | Get all canvases    |
| GET    | `/api/canvases/:id` | Get a canvas by ID  |
| PUT    | `/api/canvases/:id` | Update a canvas     |
| DELETE | `/api/canvases/:id` | Delete a canvas     |

## API Example

### Create Canvas

```http
POST /api/canvases
Content-Type: application/json
```

Example request:

```json
{
  "name": "My Canvas",
  "elements": []
}
```

### Update Canvas

```http
PUT /api/canvases/:id
Content-Type: application/json
```

The canvas elements are sent as structured JSON data and stored in MongoDB.

## Architecture

```text
                 ┌─────────────────────┐
                 │       User          │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Next.js + React     │
                 │     Frontend        │
                 └──────────┬──────────┘
                            │
                    React State
                            │
                            ▼
                 ┌─────────────────────┐
                 │ React Konva /       │
                 │ Canvas Editor       │
                 └──────────┬──────────┘
                            │
                       REST API
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Node.js + Express   │
                 │      Backend        │
                 └──────────┬──────────┘
                            │
                         Mongoose
                            │
                            ▼
                 ┌─────────────────────┐
                 │      MongoDB        │
                 └─────────────────────┘
```

## Data Storage

Canvas information is stored as structured data in MongoDB rather than as an image.

Each canvas contains its elements and their properties, such as:

* Element ID
* Element type
* X and Y position
* Width and height
* Rotation
* Fill/color
* Text content where applicable

This allows the canvas to be loaded and edited again without losing individual element properties.

## Architecture Decisions

### Separate Frontend and Backend

The frontend and backend are maintained separately to keep the application modular and easier to maintain.

### REST API

REST APIs are used for canvas CRUD operations so that the frontend communicates with the backend through clear and reusable endpoints.

### React Konva

React Konva provides the canvas rendering and interaction layer, including selecting, dragging, resizing, and rotating elements.

### MongoDB

MongoDB is used because canvas elements are naturally represented as flexible JSON-like documents and can contain different properties depending on their type.

### Validation and Error Handling

Backend validation and centralized error handling are used to return meaningful HTTP responses and prevent invalid data from being stored.

## Bonus Features

The following bonus features were considered as part of the assignment:

* [ ] Layer management / reordering
* [ ] Undo / Redo
* [ ] Autosave
* [ ] Authentication and user-owned canvases
* [ ] Export canvas as PNG

## Known Limitations

* Authentication is not currently implemented.
* Undo/Redo is not currently implemented.
* Layer reordering is not currently implemented.
* Autosave is not currently implemented.
* PNG export is not currently implemented.

## Repository

GitHub:

https://github.com/Rajani040902/Canvasly

## Author

**Rajani Jha**

B.E. Information Technology Engineering

---

