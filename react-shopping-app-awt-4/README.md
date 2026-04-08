# React Shopping App

A modern shopping cart application built with React, React Hooks, and React Router.

## Features

- 🛍️ Browse 12 different products across multiple categories
- 🔍 Filter products by category
- 🛒 Add/remove items from cart
- ➕➖ Adjust item quantities
- 💳 Complete payment form with user details
- ✅ Order confirmation page
- 📊 Summary panel on every page
- 📱 Fully responsive design

## Tech Stack

- React 18
- React Router DOM
- React Hooks (useState, useContext, useEffect)
- Vite
- CSS3

## Installation

1. Navigate to the project directory:
```bash
cd react-shopping
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit the URL shown in the terminal (usually http://localhost:5173)

## Project Structure

```
react-shopping/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Shop.jsx
│   │   ├── Cart.jsx
│   │   ├── Payment.jsx
│   │   └── Success.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Usage

1. **Shop Page**: Browse products and add items to cart
2. **Cart Page**: Review items, adjust quantities, or remove items
3. **Payment Page**: Enter shipping and payment details
4. **Success Page**: View order confirmation

## Features Implemented

✅ Multiple product categories (Electronics, Audio, Accessories, Wearables)
✅ Cart management with add/remove/update quantity
✅ React Context API for global state management
✅ React Router for navigation
✅ Payment form with validation
✅ Order summary on all pages
✅ Responsive design for mobile and desktop
✅ Modern UI with gradients and animations
