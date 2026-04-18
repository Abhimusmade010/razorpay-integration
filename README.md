# Razorpay Payment Integration

This project is a simple **Razorpay payment flow** built with a **React frontend** and a **Node/Express backend**.

## Table of Contents
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Run the Project](#run-the-project)
- [Razorpay Checkout Notes](#razorpay-checkout-notes)
- [Important Files](#important-files)
- [Test Card Example](#test-card-example)
- [Security Notes](#security-notes)
- [License](#license)

## Architecture

### Frontend
- Built with **React**
- Shows the payment button/UI
- Creates Razorpay Checkout using the **Razorpay Key ID**
- Sends payment details to the backend for:
  - order creation
  - payment verification

### Backend
- Built with **Node.js + Express**
- Uses **Razorpay Secret Key** securely
- Creates Razorpay orders
- Verifies payment signature after checkout success

### Payment Flow
1. User clicks **Pay Now**
2. Frontend requests backend to create an order
3. Backend creates Razorpay order using Secret Key
4. Frontend opens Razorpay Checkout using Key ID
5. User completes payment
6. Razorpay returns payment response
7. Frontend sends response to backend
8. Backend verifies payment signature
9. Success or failure is shown to the user

---

## Folder Structure

Example structure:

```text
rpay/
├─ client/
│  ├─ src/
│  │  ├─ api/
│  │  │  └─ paymentApi.js
│  │  ├─ components/
│  │  │  └─ PaymentForm.jsx
│  │  ├─ config/
│  │  │  └─ env.js
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ .env
│  └─ package.json
├─ server/
│  ├─ controllers/
│  │  └─ paymentController.js
│  ├─ routes/
│  │  └─ paymentRoutes.js
│  ├─ utils/
│  │  └─ razorpay.js
│  ├─ index.js
│  ├─ .env
│  └─ package.json
└─ README.MD
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd rpay
```

### 2. Install dependencies

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

---

## Environment Variables

### Frontend `.env`
Create `client/.env`:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

> If the project uses CRA instead of Vite, use:
```env
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

### Backend `.env`
Create `server/.env`:

```env
PORT=5000
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## Run the Project

### Start backend
```bash
cd server
npm run dev
```

### Start frontend
```bash
cd client
npm run dev
```

If using CRA:

```bash
npm start
```

---

## Razorpay Checkout Notes

- Use **test keys** in development
- Do **not** expose `RAZORPAY_KEY_SECRET` in frontend code
- UPI QR may appear in test mode
- For testing, use Razorpay-supported **test cards** or test payment methods
- Payment verification must always happen on the backend

---

## Important Files

### `client/src/components/PaymentForm.jsx`
Main payment UI and Razorpay Checkout trigger.

### `client/src/config/env.js`
Reads frontend environment variables.

### `server/index.js`
Express server entry point.

### `server/routes/paymentRoutes.js`
Defines payment routes.

### `server/controllers/paymentController.js`
Handles order creation and payment verification.

---

## Test Card Example

Use Razorpay test card details from official docs.  
A commonly used test card is:

- **Card Number:** `4111 1111 1111 1111`
- **Expiry:** any future date
- **CVV:** any 3 digits
- **OTP:** `123456` if prompted

---

## Security Notes

- Keep the secret key only in backend `.env`
- Never commit `.env` files to Git
- Verify payment signature on backend before confirming success

---

## License
This project is for learning and testing purposes.