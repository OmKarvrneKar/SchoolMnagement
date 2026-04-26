# School Management API

Node.js + Express REST API for school management with distance-based sorting.

Data is stored in MongoDB Atlas and schools are sorted by nearest distance using geospatial queries.

## Live API Link

Update this after deployment:

- LIVE_URL_HERE

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- express-validator

## Project Structure

```
.
|- app.js
|- database.js
|- initDb.js
|- schoolController.js
|- schoolRoutes.js
|- validate.js
|- schema.sql
|- SchoolManagement.postman_collection.json
|- SchoolManagement.postman_environment.json
|- package.json
|- .env
|- .env.example
```

## API Endpoints

### GET /

Returns API info and available routes.

### GET /health

Returns health status.

### POST /addSchool

Adds a school.

Request body:

```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurugram, Haryana 122003",
  "latitude": 28.4595,
  "longitude": 77.0266
}
```

### GET /listSchools?latitude=28.4595&longitude=77.0266

Returns schools sorted by nearest distance.

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Create .env file using .env.example

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=school_management
```

3. Start server

```bash
npm start
```

App runs on:

- http://localhost:3000

## Deployment (Render)

1. Push this project to GitHub.
2. Go to Render and create a new Web Service from your repo.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add environment variables in Render:
   - `PORT` = `10000` (or keep Render default)
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = your Atlas URI
   - `MONGODB_DB_NAME` = `school_management`
6. Deploy and copy your Render URL.
7. Replace LIVE_URL_HERE in this README with that URL.

## Postman

Use these files:

- SchoolManagement.postman_collection.json
- SchoolManagement.postman_environment.json

Set `base_url` to local or deployed URL.

## Notes

- `schema.sql` is from the older MySQL version and is not used by the current MongoDB implementation.
- Unique index prevents duplicate schools with same `name + address`.
