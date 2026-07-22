# GhumGham

GhumGham is a full-stack travel booking web application focused on exploring Nepal. It helps users search flights, browse stays, make bookings, manage their trips, and access role-based dashboards. The project is organized as a separate React frontend and Node.js/Express backend, with Docker support for running both services together.

## Features

- Modern landing page for Nepal travel discovery
- Flight search by departure city, destination, and departure date
- Stay search by destination, property type, rooms, and guests
- Featured stays and popular flight routes
- User registration and login
- JWT-based authentication
- Role-based access for customer, admin, and agency users
- Admin-only flight creation endpoint
- Customer booking flow for flights and stays
- Payment page with booking summary
- Booking creation, listing, and cancellation
- User dashboard for personal bookings
- Admin dashboard for all bookings, revenue, travelers, and pending requests
- Stripe Checkout session backend integration
- Responsive frontend pages using React, Vite, Tailwind CSS, and icon components
- Dockerized frontend and backend services

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React icons
- React Icons
- Framer Motion
- React Type Animation
- Axios and Fetch API
- Poppins font via `@fontsource/poppins`
- ESLint
- Prettier

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing
- Stripe payment integration
- dotenv environment variables
- multer setup for file uploads
- Passport
- Express session package setup
- Nodemon for development

### DevOps and Tools

- Docker
- Docker Compose
- npm
- Git
- Vite development server
- MongoDB database connection through environment variables

## Project Structure

```text
GhumGham/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      index.js
    Dockerfile
    package.json

  frontend/
    public/
    src/
      assets/
      component/
      pages/
      App.jsx
      main.jsx
      index.css
    Dockerfile
    package.json
    vite.config.js

  docker-compose.yml
  README.md
```

## Frontend Pages

- `/` - Home page with hero video, destination highlights, testimonials, and footer
- `/flight` - Flight search, result listing, and booking start flow
- `/stay` - Stay search, featured properties, and booking start flow
- `/login` - User login with token storage
- `/signup` - Signup UI
- `/profile` - User profile page
- `/my-bookings` - Customer booking dashboard
- `/admin` - Admin dashboard for booking operations
- `/payment` - Payment form and booking confirmation flow

## Backend Concepts Used

- MVC-style structure with routes, controllers, models, middleware, and config files
- REST API routing with Express Router
- MongoDB schemas and models using Mongoose
- Password hashing with bcrypt before saving users
- JWT token generation during login
- Protected routes using authentication middleware
- Role-based authorization middleware for admin access
- Query filtering for flight and stay searches
- Embedded passenger documents inside bookings
- Booking lifecycle management with pending, confirmed, cancelled, and completed statuses
- Payment status tracking with pending, paid, failed, and refunded states
- Stripe Checkout session creation
- Environment-based configuration using `.env`
- CORS handling for frontend-backend communication
- Docker containers for isolated frontend and backend runtime

## Main API Routes

### User Routes

```text
POST /api/v1/users/register
POST /api/v1/users/login
```

### Flight Routes

```text
POST   /api/v1/flight/addflight
GET    /api/v1/flight
GET    /api/v1/flight/search
GET    /api/v1/flight/:id
PUT    /api/v1/flight/:id
DELETE /api/v1/flight/:id
```

### Stay Routes

```text
POST /api/v1/stay/addstay
GET  /api/v1/stay/search
```

### Booking Routes

```text
POST  /api/v1/bookings/cbooking
GET   /api/v1/bookings/me
GET   /api/v1/bookings/all
PATCH /api/v1/bookings/:id/cancel
```

### Payment Routes

```text
POST /api/payments/create-checkout-session
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
```

The frontend currently calls the backend at `http://localhost:4000`, so keep the backend port aligned with that value when running locally.

## Run Locally

### 1. Install frontend dependencies

```bash
cd frontend
npm install
```

### 2. Install backend dependencies

```bash
cd ../backend
npm install
```

### 3. Start the backend

```bash
cd backend
npm run dev
```

Backend runs on the port defined in `backend/.env`.

### 4. Start the frontend

```bash
cd frontend
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Run With Docker

Make sure Docker Desktop is running, then use:

```bash
docker compose up --build
```

This builds and starts:

- `ghumgham-backend`
- `ghumgham-frontend`

If Docker shows an error about `dockerDesktopLinuxEngine`, Docker Desktop is not running or the Linux engine is unavailable.

## Build Frontend

```bash
cd frontend
npm run build
```

The production build is generated in:

```text
frontend/dist
```

## Data Models

### User

- username
- email
- password
- role: customer, admin, agency
- timestamps

### Flight

- airline
- from
- to
- departure time
- arrival time
- price
- available seats
- total seats
- status
- timestamps

### Stay

- name
- description
- property type: hotel, home, villa
- address
- contact number
- rooms
- availability dates
- price per night
- max guests
- amenities
- images
- timestamps

### Booking

- user reference
- flight or trip title
- trip type
- destination
- start and end dates
- passenger details
- total amount
- currency
- booking status
- payment status
- timestamps

### Payment

- booking reference
- user reference
- amount
- currency
- gateway
- payment status
- payment method
- Stripe session and payment IDs
- transaction ID
- timestamps

## Current Notes

- The app uses JWT tokens stored in `localStorage` for frontend authentication.
- Protected frontend pages redirect unauthenticated users to login.
- Admin users are redirected to the admin dashboard, while customers use the booking dashboard.
- Stripe Checkout is implemented in the backend, while the frontend payment page currently creates confirmed bookings through the booking API.
- Docker Compose expects both frontend and backend Dockerfiles to be present.

## Author

GhumGham travel booking application.
