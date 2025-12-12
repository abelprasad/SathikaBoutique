# Sathika Boutique - E-commerce Platform

A full-featured e-commerce platform built with Next.js, Node.js, and MongoDB.

## Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Stripe** for payments
- **React Hook Form + Zod** for form handling

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **TypeScript**
- **JWT** for authentication
- **Stripe** for payment processing
- **Multer + Sharp** for image handling

## Project Structure

```
sathika-boutique/
├── frontend/          # Next.js application
│   ├── app/          # App Router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities
│   └── store/        # Zustand stores
│
├── backend/          # Express API
│   └── src/
│       ├── models/       # Mongoose schemas
│       ├── controllers/  # Business logic
│       ├── routes/       # API routes
│       ├── middleware/   # Auth, validation
│       └── config/       # Configuration
│
└── docs/             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
```bash
cd SathikaBoutique
```

2. **Install dependencies**
```bash
# Install root workspace dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

3. **Set up environment variables**

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

**Backend** (`backend/.env`):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sathika-boutique
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CORS_ORIGIN=http://localhost:3000
```

4. **Set up MongoDB Atlas**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a database user
   - Whitelist your IP address
   - Copy the connection string to `MONGODB_URI`

5. **Get Stripe API keys**
   - Sign up at [Stripe](https://stripe.com)
   - Get test API keys from the dashboard
   - Add them to environment variables

### Running the Application

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Run individually:**
```bash
# Frontend only (http://localhost:3000)
npm run dev:frontend

# Backend only (http://localhost:5000)
npm run dev:backend
```

**Production build:**
```bash
npm run build
npm start
```

## API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `GET /api` - API info
- `GET /api/products` - List products
- `GET /api/products/:slug` - Get product details
- `POST /api/cart/:sessionId/items` - Add to cart
- `POST /api/orders` - Create order
- `POST /api/payment/create-intent` - Create Stripe payment

### Admin Endpoints (Protected)
- `POST /api/auth/login` - Admin login
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - List orders

## Development Roadmap

### ✅ Week 1: Foundation (Completed)
- [x] Monorepo setup
- [x] Frontend setup (Next.js + Tailwind)
- [x] Backend setup (Express + TypeScript)
- [x] Database schemas (Product, Order, Admin, Cart)
- [x] UI component library
- [x] Layout components (Header, Footer)

### ✅ Week 2: Products & Cart (Completed)
- [x] Product API endpoints
- [x] Product listing page
- [x] Product detail page
- [x] Shopping cart functionality
- [x] Cart state management
- [x] About and Contact pages

### 📋 Week 3: Checkout & Payments
- [ ] Checkout flow
- [ ] Stripe integration
- [ ] Order creation
- [ ] Order confirmation

### 📋 Week 4: Admin & Polish
- [ ] Admin authentication
- [ ] Product management UI
- [ ] Order management
- [ ] Testing & deployment prep

## Available Scripts

**Root:**
- `npm run dev` - Run both frontend and backend
- `npm run dev:frontend` - Run frontend only
- `npm run dev:backend` - Run backend only
- `npm run build` - Build both apps

**Frontend:**
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start with nodemon
- `npm run build` - Compile TypeScript
- `npm run start` - Run compiled JavaScript

## Contributing

This is a private project for Sathika Boutique.

## License

All rights reserved © 2024 Sathika Boutique
