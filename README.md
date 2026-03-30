# 🍔 Burger Week – The Ultimate Burger Destination

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

**Burger Week** is a premium, data-driven web application designed for burger enthusiasts. It features a modern, responsive user interface with a full-stack backend to handle user authentication, ordering, and inquiries.

---

## ✨ Key Features

-   **📽️ Dynamic Hero Experience**: Immersive video background with mouse-parallax animations for interactive burger elements.
-   **🔐 Secure Authentication**: Full user registration and login system using **JWT** (JSON Web Tokens) and **bcrypt** for password hashing.
-   **🛒 Real-time Ordering**: Seamless menu browsing with a functional shopping cart and order persistence natively through **product.json** mapping.
-   **💳 Secure Payment Gateway**: Bank-grade checkout flow natively integrating **Razorpay** modal SDK capable of handling UPI, NetBanking, and credit validation seamlessly saving internal `Txn:` IDs automatically.
-   **⚙️ Kitchen Admin Dashboard**: A premium, secure control panel for staff to manage orders via live data streaming and direct database manipulation.
-   **🍔 Dynamic Menu Management**: Complete CRUD capability directly through the Admin Portal, automatically mapping items directly to the live User Cart without touching code.
-   **📝 MongoDB Blog Engine**: Fully integrated dynamic blogging system allowing staff to publish rich-text articles directly to the live `Blog` component.
-   **🚀 Performance Focused**: Optimized scroll-reveal animations (AOS), smart navigation tracking, and a dynamic scroll progress bar.
-   **📬 Inquiry Management**: A dedicated contact system allows users to send messages directly to the kitchen, stored safely in the database.
-   **📱 Fully Responsive**: Crafted with modern CSS techniques to ensure a stunning immersive experience on mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

### Frontend
-   **HTML5 & CSS3**: Custom styles with glassmorphism and modern gradients.
-   **JavaScript (ES6+)**: Core logic and DOM interactions.
-   **Libraries**: 
    -   [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) – For entrance animations.
    -   [Remix Icons](https://remixicon.com/) – For high-quality iconography.
    -   [Swiper.js](https://swiperjs.com/) – For smooth carousels.

### Backend
-   **Node.js & Express.js**: High-performance server-side environment.
-   **MongoDB & Mongoose**: NoSQL database for flexible data management.
-   **Authentication**: JWT (Stateless) and HttpOnly Cookies for security.

---

## 🚀 Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/) (v14+)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas)

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
    Create a `.env` file in the root directory and add:
    ```env
    MONGO_URI=mongodb://localhost:27017/burger_house
    JWT_SECRET=your_super_secret_key
    PORT=3018
    ```

4.  **Start the server**:
    ```bash
    # For development (using nodemon)
    npm run dev
    
    # For production
    node server.js
    ```

5.  **Visit the app**: Open [http://localhost:3018](http://localhost:3018) in your browser.

---

## 📂 Project Structure

```text
Burger Week/
├── 📁 Admin/         # Secure Kitchen Dashboard & Menu management
├── 📁 Blog/          # Dynamic MongoDB-driven Blog layouts
├── 📁 Cart/          # Shopping cart logic and JSON Datastore
├── 📁 Image/         # Optimized assets and videos
├── 📁 Login/         # Authentication pages
├── index.htm        # Main entry point (Frontend)
├── style.css        # Global design system
├── script.js        # Client-side interactivity
├── server.js        # Express backend & DB connection
├── package.json     # Project metadata & dependencies
└── .env             # Sensitive configuration
```

---

## 🛤️ Future Roadmap

-   [x] **Admin Dashboard**: Real-time order management for kitchen staff.
-   [x] **Dynamic Inventory**: Live Cart item creation and deletion.
-   [x] **Blog CMS**: Integrated publishing system.
-   [x] **Payment Integration**: Secure checkout with Razorpay SDK integration.
-   [ ] **Email Notifications**: Automated order confirmation emails.
-   [ ] **Search & Filters**: Advanced dish search and dietary filtering.

---

## 📄 License
This project is licensed under the **ISC License**.

---

### 🍔 Stay Burgerlicious!
*Created with ❤️ by the Burger House Team – 2025*
