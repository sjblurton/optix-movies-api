# Optix UI tech test API

I edited the API slightly as I had access to the code and believed it was not RESTful or helpful for the frontend to take advantage of client and server caching.

I didn't make extensive improvements since the test is for a frontend role. I made changes to assist the frontend and future-proof the API. In a real-world scenario, I would have requested these changes be made before taking the job.

I also understand that consistency is sometimes more important than changing one part to be "better" if the rest is in a different format. The code as a whole should improve and not diverge in larger projects.

## Changes

- Version Control - All APIs need version control.
  - Clear Communication
  - Testing and Stability
  - Backward Compatibility
  - Deprecation Management
  - User Control
- API Endpoint Naming Convention
  - Use Plural Nouns (camelCase is not useful in URL endpoints)
  - HTTP Methods for Actions (e.g., PUT to update)

## Suggested Improvements

- TypeScript
- ESLint
- File Structure - It's important to start with a structure in mind and intent. It should be flexible as the project grows and we learn more about its shape, allowing us to review it.
- The database for reviews being an array of integers blocks any expansion and is hard to understand. My suggestion would be `{ rating: number }[]`.
- Schemas protecting the integrity of the database and providing useful error messaging for debugging.
- Automated tests - Every endpoint should be tested and testable
- swagger openApi documentation

## Deployed

https://optix-movies-api.onrender.com/

## Docker Image

https://hub.docker.com/r/sjblurton/optix-tech-test-api

`docker pull sjblurton/optix-tech-test-api`

## Installation

To install the dependencies, run:

```
npm install
```

Usage
To start the server, run:

```
npm run start
```
