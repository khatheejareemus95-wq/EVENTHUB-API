# Kalvium EventHub API + Frontend

**Project:** EventHub — backend API for managing event bookings & attendee registration, with a simple HTML frontend for testing and interaction.

---

## Overview
This project provides:
- **Backend API** (Node.js + Express) to manage events
- **Frontend HTML page** (`index.html`) to create and list events using the API
- **Data persistence** via `data/events.json`

Key features:
- Create new event: `POST /api/events`
- List all events: `GET /api/events`
- Live frontend integration with CORS enabled

---

## File Structure
```
project-root/
├─ data/
│  └─ events.json       # persistent event storage (create an empty array: [])
├─ routes/
│  └─ events.js         # route handlers for /api/events
├─ server.js            # Express server
├─ index.html           # frontend interface (create/list events)
├─ package.json
└─ README.md
```

---

## Prerequisites
- Node.js (>= 14)
- npm
- Browser (for using `index.html`)

---

## Installation (Local)
1. Clone the repository:
```bash
git clone <your-repo-url>
cd <repo-folder>
```
2. Install dependencies:
```bash
npm install
```
3. Ensure `data/events.json` exists with an empty array:
```json
[]
```
4. Start the server:
```bash
npm start
```
The API runs on `http://localhost:3000` (or Render URL when deployed).

5. Open `index.html` in a browser. Update `API_BASE` variable inside `<script>` if using a deployed Render URL.

---

## API Documentation

### Create a new event
**POST** `/api/events`

**Request body:**
```json
{
  "title": "Community Hackathon",
  "description": "A 24-hour coding event",
  "date": "2025-10-01T09:00:00.000Z",
  "location": "Community Hall, City",
  "maxAttendees": 100
}
```

**Response:**
- `201 Created` with event JSON on success
- `400 Bad Request` if required fields missing or invalid
- `500 Internal Server Error` if file operations fail

---

### Get all events
**GET** `/api/events`

**Response:**
- `200 OK` with array of event objects
- `500 Internal Server Error` if `events.json` missing/corrupted

---

## Frontend (index.html)
The HTML file provides:
- A form to create events (POST request)
- A dynamic list of events (GET request)
- Buttons to reset form and refresh events list

To use with deployed API:
- Open `index.html`
- Change the line:
```js
const API_BASE = '';
```
to:
```js
const API_BASE = 'https://eventhub-api-khatheeja-reemu.onrender.com';
```

---

## Deployment (Render)
1. Push code to GitHub.
2. On Render → New → Web Service → Connect repo.
3. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`
4. Deploy → API 
5. Update `index.html` → `API_BASE` with your deployed URL.

---

## Submission Checklist
- ✅ Project code (server.js, routes/, package.json, data/, index.html)
- ✅ README.md (this file)
- ✅ PDF with screenshots:
  - Successful `POST` & `GET` in Postman/Browser
  - Render dashboard screenshot
  - Live API URL visible
- ✅ ZIP archive of project (excluding node_modules)

---

## Notes
- Ensure `maxAttendees` is a positive integer.
- Events are appended to `data/events.json`.
- CORS is enabled for frontend → backend requests.
- Troubleshooting Git push:
  - If `src refspec main does not match any`, rename your branch: `git branch -M main` then push.

---

## Next Steps (Optional)
- Add attendee registration endpoint (`/api/events/:id/register`)
- Implement update/delete event endpoints
- Deploy `index.html` on GitHub Pages or Netlify for a live demo frontend
