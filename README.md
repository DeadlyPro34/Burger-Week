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

## 📱 Android APK & Installation

The native Android app is built using **Capacitor** and Android Studio. The application is configured with a live server URL, meaning the installed app dynamically pulls the newest updates directly from the Render server — you **never need to manually rebuild the APK** when changing HTML/JS!

### Where is the APK File?
Upon clicking `Build -> Build APK(s)` in Android Studio, the compiled installer is generated here:
`android/app/build/outputs/apk/debug/app-debug.apk`

### How to Install on Your Phone:
1. Connect your Android phone to your PC via a USB cable.
2. Locate `app-debug.apk` inside your `Burger Week` project folder (path above).
3. Copy the file and paste it into your phone's `Downloads` folder.
4. On your phone, open the **Files** app, navigate to Downloads, and tap `app-debug.apk`.
5. If prompted, click **Settings** and allow "Install from unknown sources."
6. Tap **Install** and then **Open**!

---

## 📂 Exhaustive Project Structure

```text
Burger Week/
├── 📁 Admin/                  # Secure Kitchen Dashboard System
│   ├── admin.css              # Styling for the admin panel
│   ├── admin.html             # UI for viewing orders and managing the DB
│   └── admin.js               # Logic for fetching API orders & adding food
├── 📁 Blog/                   # Dynamic Article System
│   ├── Blog.css               # Blog page styling
│   ├── Blog.html              # Blog reading interface
│   └── Blog.js                # API hooks to fetch MongoDB articles
├── 📁 Cart/                   # Shopping Cart & Checkout Engine
│   ├── cart.css               # Unified styling for cart interfaces
│   ├── cart.html              # Main shopping menu with Swiper & filters
│   ├── cart.js                # Shopping cart logic (add/remove, local storage)
│   ├── checkout.js            # Payment summary logic
│   └── product.json           # Cloud-synced food inventory mapping
├── 📁 Image/                  # Static Media Library
│   ├── BG1.png -> BG3.png     # Application background assets
│   ├── burgerplate.png        # Promo image mapping
│   ├── cart.png               # Small favicon asset
│   ├── Classic Coffee...png   # Menu image
│   ├── Crispy veggie...png    # Menu image
│   ├── Fries (Large).png      # Menu image
│   ├── Iced Coffee...png      # Menu image
│   ├── Veg Pizza McPuff.png   # Menu image
│   ├── IMG-1.png -> IMG-3.png # Core design layout assets
│   ├── video.mp4              # Dynamic hero mouse-parallax background
│   └── video2.mp4             # Alternative active background
├── 📁 Login/                  # Authentication Module
│   ├── login.css              # Login UI styling
│   ├── login.html             # Login/registration UI overlay
│   └── login.js               # Registration & JWT backend hooks
├── 📁 android/                # Capacitor Android Native Wrapper
│   └── 📁 app/build/outputs/apk/debug/
│       └── app-debug.apk      # 🔥 The Final Compiled Android Installer
├── 📁 www/                    # Capacitor Cached Build Files
├── index.html                 # The Homepage & Hero entry point
├── style.css                  # Global website typography and layout CSS
├── script.js                  # Global navbar & interactive component logic
├── server.js                  # Node.js backend & MongoDB Atlas Router
├── build-apk.js               # Utility script for syncing files to Capacitor
├── capacitor.config.json      # Maps appId and points the APK to the live URL
├── package.json               # Full NPM dependency & configuration list
├── .gitignore                 # Excludes heavy node_modules & API keys
└── README.md                  # This documentation file
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
