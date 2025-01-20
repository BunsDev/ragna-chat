# Ragna - ⚠︎ ⓘ ｡°⚠︎°｡ ⚠️ deeply underconstruction

## Overview

Ragna.Day is a multilingual LLM (Language Learning Model) application that utilizes the OpenRouter API to fetch AI chat responses. This documentation provides a detailed overview of the project, the technologies used, and step-by-step instructions on how to use it.

## Current Todo

- [ ] Fix the react hook related typing errors in components
- [ ] Fix the resend api code

## Tech Stack

The Ragna.Day project is built using the following technologies:

- Next.js: A React framework for building server-side rendered applications.
- Prisma: An open-source database toolkit for TypeScript and Node.js.
- PostgreSQL: A powerful, open-source relational database management system.
- NextAuth: An authentication library for Next.js applications.
- OpenRouter API: An API that provides AI chat responses.

## Installation

To use the Ragna.Day project, follow these steps:

1. Clone the project repository from GitHub.
2. Install the required dependencies by running the following command:
   ```bash
   npm install
   ```

## Folder Structure

The Ragna.Day project follows the following folder structure:

- `app`: Contains different layouts based on permissions.
- `components`: Contains reusable components.
- `schemas`: Contains Zod schemas for data validation.
- `actions`: Contains server actions.
- `prisma` : Contains db schema
- `lib`: All initializations of objects required in the project
- `data` : All reusable functions for db query fetching

This structure helps organize the project and makes it easier to navigate and locate specific files based on their functionality.

## Configuration

Before running the project, you need to configure the following:

1. Set up the PostgreSQL database and configure the connection in the project's configuration file.
2. Obtain API credentials for the OpenRouter API and update the configuration accordingly.

## Database Migration

To set up the database schema, run the following command:

```bash
npx prisma migrate dev
```

## Starting the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

## Usage

Once the development server is running, you can access the Ragna.Day application in your browser at `http://localhost:3000`. Follow the instructions provided by the application to interact with the multilingual LLM model and fetch AI chat responses using the OpenRouter API.

## Additional Notes

- Make sure to keep your API credentials secure and avoid committing them to version control.
- For production deployment, refer to the Next.js documentation for deployment options and best practices.

That's it! You are now ready to explore and utilize the Ragna.Day project, which incorporates the mentioned tech stack and utilizes the OpenRouter API for AI chat functionality.
