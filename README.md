# 🍔 Burger Week – The Ultimate Burger Destination

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB Atlas](https://img.shields.io/badge/database-MongoDB%20Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/atlas)
[![Deployed on Render](https://img.shields.io/badge/deployed-Render-46E3B7?style=flat&logo=render)](https://burger-week.onrender.com)
[![Android APK](https://img.shields.io/badge/platform-Android%20APK-3DDC84?style=flat&logo=android)](https://github.com/DeadlyPro34/Burger-Week)

**Burger Week** is a premium, full-stack food ordering platform deployed live to the cloud. It features a real-time Node.js backend, MongoDB Atlas cloud database, secure authentication, Razorpay payment integration, and a native Android app powered by Capacitor.

🌐 **Live URL**: [https://burger-week.onrender.com](https://burger-week.onrender.com)

---

## ✨ Key Features

-   **📽️ Dynamic Hero Experience**: Immersive video background with mouse-parallax animations.
-   **🔐 Secure Authentication**: Full user registration and login using **JWT** and **bcrypt** password hashing stored in MongoDB Atlas.
-   **🛒 Real-time Ordering**: Menu browsing with a functional cart, search, and dietary filters (Veg / Non-Veg / Beverages).
-   **💳 Razorpay Payment Gateway**: Seamless checkout supporting UPI, NetBanking, and cards with automatic `Txn:` ID tracking.
-   **⚙️ Admin Dashboard**: Secure control panel for kitchen staff to view live orders and manage menu items via full CRUD.
-   **🍔 Dynamic Menu Management**: Add/remove items through the Admin Portal — changes reflect instantly on the live cart.
-   **📝 MongoDB Blog Engine**: Staff can publish articles directly to the live Blog page.
-   **📧 Automated Email Receipts**: NodeMailer sends full order confirmations instantly upon checkout.
-   **📬 Inquiry Management**: Contact form stores user messages directly in the cloud database.
-   **📱 Native Android App**: Built with **Capacitor** — the app loads live from the Render server, so updates deploy automatically without rebuilding the APK.

---

## 🛠️ Tech Stack

### Frontend
-   **HTML5, CSS3, JavaScript (ES6+)**
-   **[AOS](https://michalsnik.github.io/aos/)** – Scroll-reveal animations
-   **[Remix Icons](https://remixicon.com/)** – Iconography
-   **[Swiper.js](https://swiperjs.com/)** – Carousels

### Backend
-   **Node.js & Express.js** – REST API server
-   **MongoDB Atlas & Mongoose** – Cloud NoSQL database
-   **JWT + bcrypt** – Stateless authentication & password security
-   **NodeMailer** – Automated email receipts
-   **CORS** – Enabled for Android APK cross-origin requests

### Hosting & Deployment
-   **[Render.com](https://render.com)** – Cloud backend hosting (auto-deploys on every GitHub push)
-   **[MongoDB Atlas](https://www.mongodb.com/atlas)** – Cloud database with IP whitelist (`0.0.0.0/0`)

### Mobile
-   **[Capacitor](https://capacitorjs.com/)** – Web-to-Android bridge
-   **Android Studio + Java 21** – APK compilation (AGP 8.6.1)

---

## 🚀 Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/) (v18+)
-   A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/DeadlyPro34/Burger-Week.git
    cd Burger-Week
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?appName=Cluster0
    JWT_SECRET=your_super_secret_key
    EMAIL_USER=your_gmail@gmail.com
    EMAIL_PASS=your_app_password
    ```

4.  **Start the server**:
    ```bash
    # Development
    npm run dev

    # Production
    node server.js
    ```

5.  **Visit the app**: Open [http://localhost:3018](http://localhost:3018)

---

## ☁️ Cloud Deployment (Render)

1. Push code to GitHub.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`
6. In MongoDB Atlas → **Network Access** → Add `0.0.0.0/0` to allow Render's IP.

---

## 📱 Android APK

The app is built with **Capacitor** and configured to load live from the Render server:

```json
{
  "server": {
    "url": "https://burger-week.onrender.com"
  }
}
```

This means any updates pushed to GitHub are **automatically live on the Android app** — no APK rebuild needed!

To rebuild the APK after config changes:
```bash
npx cap sync
npx cap open android
# Then: Build → Build APK(s) in Android Studio
```

---

## 📂 Project Structure

```text
Burger Week/
├── 📁 Admin/              # Secure Kitchen Dashboard & Menu management
├── 📁 Blog/               # Dynamic MongoDB-driven Blog layouts
├── 📁 Cart/               # Shopping cart, checkout, product.json
├── 📁 Image/              # Optimized image assets and videos
├── 📁 Login/              # Authentication pages
├── 📁 android/            # Capacitor Android project
├── 📁 www/                # Capacitor web build output
├── index.html             # Main entry point
├── style.css              # Global design system
├── script.js              # Client-side interactivity
├── server.js              # Express backend & DB connection
├── capacitor.config.json  # Capacitor + Render server config
├── package.json           # Project metadata & dependencies
└── .env                   # Sensitive configuration (not committed)
```

---

## 🛤️ Roadmap

-   [x] Admin Dashboard with real-time order management
-   [x] Dynamic Menu CRUD via Admin Portal
-   [x] Blog CMS with MongoDB
-   [x] Razorpay payment integration
-   [x] Automated email receipts via NodeMailer
-   [x] Search & dietary filters
-   [x] Cloud deployment on Render
-   [x] MongoDB Atlas cloud database
-   [x] Native Android APK via Capacitor
-   [ ] Push notifications for order updates
-   [ ] Google/Apple login (OAuth)
-   [ ] iOS App

---

## 📄 License
This project is licensed under the **ISC License**.

---

### 🍔 Stay Burgerlicious!
*Crafted with ❤️ by the Burger House Team – 2025*
