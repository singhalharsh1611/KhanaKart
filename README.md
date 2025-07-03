# 🍽️ KhanaKart — Online Food Ordering Platform ([Live Website](https://khanakart.vercel.app))

> **Bringing your favorite meals to your doorstep, fast and fresh.**

KhanaKart is a full-stack food ordering web application designed for a seamless and modern food ordering experience. Customers can browse restaurants, add dishes to a cart, place orders, and track their order status.
---

## 🚀 Features

✅ Browse restaurants and menus  
✅ Add items to a cart with quantity management  
✅ Secure checkout with payment gateway integration  
✅ User authentication (sign-up, login)  
✅ Easy Google login and signup  
✅ EMail Authentication using OTP  
✅ Forgot Password  
✅ Order history and order tracking  
✅ Admin dashboard for managing menu and orders  
✅ Responsive and mobile-friendly design  
✅ Deployed on **Vercel** for a fast, production-grade experience  


## ⚙️ Tech Stack

- **Frontend**: ReactJS
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Authentication**: JWT, OAuth, Passport
- **Cloud Storage**: Cloudinary
- **Payment Gateway**: Stripe
- **Deployment**: Vercel  

---

## 🏗️ Architecture

```
React (Frontend)
       |
Express (REST API) ---- MongoDB
```

---

## 📄 Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/singhalharsh1611/khanakart.git
   cd khanakart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

### ✅ Frontend (`/frontend/.env`)

```env
REACT_APP_MONGO_URI=your_mongodb_connection_string
VITE_BACKEND_URL=http://localhost:4000
VITE_REST_LAN=your_latitude_of_restaurant
VITE_REST_LONG=your_longitude_of_restaurant
```

### ✅ Admin (`/admin/.env`)

```env
VITE_BACKEND_URL=http://localhost:4000
```

### ✅ Backend (`/backend/.env`)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:4000
ADMIN_URL=http://localhost:5174
SENDER_GMAIL=your_email_for_notifications
SENDER_PASS=your_email_app_password
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```


4. **Run in the correct order:**

✅ First, start the **customer frontend** on port 5173:  
```bash
cd frontend
npm run dev
```

✅ Then, start the **admin frontend** on port 5174:  
```bash
cd ../admin
npm run dev -- --port 5174
```

✅ Finally, start the **backend**:  
```bash
cd ../backend
npm run server
```

5. **Visit the applications:**  
- **Customer Frontend:** [http://localhost:5173](http://localhost:5173)  
- **Admin Frontend:** [http://localhost:5174](http://localhost:5174)  
- **API Server:** [http://localhost:4000](http://localhost:4000)

---

## 🌐 Deployment

KhanaKart is deployed on **Vercel**. You can check it live here:  
👉 [https://khanakart.vercel.app](https://khanakart.vercel.app)



