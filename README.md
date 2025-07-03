# 🍽️ KhanaKart — Online Food Ordering Platform ([Live Website](https://khanakart.vercel.app))

> **Bringing your favorite meals to your doorstep, fast and fresh.**

KhanaKart is a full-stack food ordering web application designed for a seamless and modern food ordering experience. Customers can browse restaurants, add dishes to a cart, place orders, and track their order status.
---

## 🚀 Features

✅ Browse menu ad food items category wise
✅ Search across the overall menu
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
## 📸 Screenshots - Client Side       
**Homepage**
![image](https://github.com/user-attachments/assets/5928f155-37a3-447d-a28d-41f8d7a58b6b)

**Menu Section**
![image](https://github.com/user-attachments/assets/45c73b53-8e14-43cf-b40d-c39c0db26694)

**Adding Products from Menu**
![image](https://github.com/user-attachments/assets/cdf287fa-400e-40de-9323-e87f8852ca47)

**Cart**
![image](https://github.com/user-attachments/assets/864fddd1-3c99-421c-a376-9eee3429f582)

**Order Placing**
![image](https://github.com/user-attachments/assets/ecfc5717-fd22-4aee-8306-be5558926e02)

**Payment Page**
![image](https://github.com/user-attachments/assets/09e71077-244f-4f3b-b18d-e0e4e1bc36a2)

**My Orders Page**
![image](https://github.com/user-attachments/assets/1f131b55-f2b9-4a33-bc66-e18ba8f64d50)


## 📸 Screenshots - Admin Side

> ⚠️ **Note:** The admin pages are secured and will not be accessible without the admin email and password, which are provided only by the application owner.
> <br></br>
> Deployed on [https://khanakart-admin.vercel.app](https://khanakart-admin.vercel.app)

**Admin Login**
![image](https://github.com/user-attachments/assets/28dcf899-b8f6-4e4e-9e56-0a6291e5d884)

**Admin Dashboard - Add Item**
![image](https://github.com/user-attachments/assets/228fdac4-9730-4b2c-9c12-3ff79d1e7317)

**Admin Dashboard - List Items**
![image](https://github.com/user-attachments/assets/fe52f942-5b52-42d9-8124-52e47f1edc23)

**Admin Dashboard - Update Items**
![image](https://github.com/user-attachments/assets/6ce403a1-c97b-4cbc-9dd5-6606541fecda)


**Admin Dashboard - Orders Page**
![image](https://github.com/user-attachments/assets/60fffd1a-63e8-4526-b5cd-4ff4178a9b61)

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



