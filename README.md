# Event Management Platform – Full Stack Assignment

## Author

**Amitesh Singh**  
Full Stack Developer

---

## Overview

This project is a **full-stack Event Management Platform** built as part of an assignment.  
It supports **creating, viewing, updating, and deleting events**, with a clean UI and a REST-based backend.

The application is implemented using **Next.js for both frontend and backend**, with a focus on clean architecture, predictable data flow, and production-ready practices.

---

## Features

- Create new events
- View a list of all events
- View detailed information for a single event
- Update existing events
- Delete events
- Image upload and hosting via ImageKit
- Optimized client-side data fetching and mutations

---

## Application Structure

### Frontend Routes

| Route               | Description            |
| ------------------- | ---------------------- |
| `/`                 | Displays all events    |
| `/events/new`       | Create a new event     |
| `/events/[id]`      | View a specific event  |
| `/events/[id]/edit` | Edit an existing event |

---

### Backend API Routes

| Method   | Endpoint          | Description            |
| -------- | ----------------- | ---------------------- |
| `GET`    | `/api/events`     | Fetch all events       |
| `POST`   | `/api/event`      | Create a new event     |
| `GET`    | `/api/event/[id]` | Fetch a specific event |
| `PUT`    | `/api/event/[id]` | Update an event        |
| `DELETE` | `/api/event/[id]` | Delete an event        |

---

## Screenshots

### Home Page – Events List

Displays all available events.
![steps](./home-page.png)

### Event Details Page

Shows detailed information about a single event.
![steps](./each-event.png)

### Create / Update Event Page

Used for both creating and editing events.
![steps](./event.png)

---

## Tech Stack

- **Runtime**: Bun
- **Frontend & Backend**: Next.js
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **State & Data Fetching**: TanStack Query
- **Image Hosting**: ImageKit

---

## Environment Variables

Mock environment variables are provided in `.example.env`.

```env
DATABASE_URL="postgresql://postgres:secretpassword@localhost:5432/assignment"
IMAGE_KIT_PRIVATE_KEY="nope"
IMAGE_KIT_PUBLIC_KEY="nope"
IMAGE_KIT_URL="nope"
```

## Deployment

The application is deployed on Vercel and can be accessed here:

https://full-stack-assignment-02.vercel.app/

---

## Setup Instructions

1. Install dependencies:

   ```bash
   bun i
   ```

2. Create a .env file and add the required environment variables from .example.env

3. Run the development server

   ```bash
   bun run dev
   ```

## Notes

- The project follows REST principles for backend APIs.
- Client-side data fetching and mutations are handled using TanStack Query.
- The codebase emphasizes readability, separation of concerns, and scalability.

---

## Additional Documentation

This README is also available on Notion for easier reading and navigation.

You can view it here:  
[https://scarlet-bearberry-d42.notion.site/Full-Stack-Assignment-Event-Management-Platform-2d2dd45550a7801b8680da36e2119ce7]
