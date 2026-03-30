const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs'); // Will be available after user installs
const jwt = require('jsonwebtoken'); // Will be available after user installs
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const port = 3018; 
const app = express();

// Middleware
app.use(cors()); // Critical for Android APK Backend communication
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Connecting MongoDB
mongoose.connect('mongodb://localhost:27017/burger_house', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('MongoDB Connection Successful'));

// --- SCHEMAS ---

// USER SCHEMA with Auth integration
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'viewer' }, // 'viewer' or 'admin'
    createdAt: { type: Date, default: Date.now }
}); 
const Users = mongoose.model('users', userSchema);

// ORDER SCHEMA
const orderSchema = new mongoose.Schema({
    customerName: String,
    email: { type: String, default: 'No email' },
    phone: String,
    address: String,
    city: String,
    items: Array,
    totalAmount: Number,
    paymentId: { type: String, default: 'Cash' },
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now }
});
const Orders = mongoose.model('orders', orderSchema);

// BLOG SCHEMA
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    content: { type: String, required: true }
});
const Blogs = mongoose.model('blogs', blogSchema);

// CONTACT/REVIEW SCHEMA
const inquirySchema = new mongoose.Schema({
    uname: String,
    uphone: String,
    untime: String,
    uemail: String,
    uaddress: String, // Used for 'Message' field
    date: { type: Date, default: Date.now }
});
const Inquiries = mongoose.model('inquiries', inquirySchema);

// --- ROUTES ---

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'Login/login.html')));
app.get(['/admin', '/admin/'], (req, res) => res.sendFile(path.join(__dirname, 'Admin/admin.html')));

// Handle Contact Form submissions
app.post('/post', async (req, res) => {
    try {
        const inquiry = new Inquiries(req.body);
        await inquiry.save();
        res.send('Your inquiry has been sent to Burger House!');
    } catch (error) {
        res.status(500).send('Error sending inquiry.');
    }
});

// --- AUTH ENTPOINTS ---

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Users({ name, email, password: hashedPassword });
        await user.save();
        res.json({ success: true, message: 'Account created!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Email already exists!' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid password' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({ success: true, user: { name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Order APIs
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Orders.find().sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const order = new Orders(req.body);
        await order.save();
        
        // Send Email Notification Safely
        try {
            const nodemailer = require('nodemailer');
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS && order.email) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
                });
                const mailOptions = {
                    from: `"Burger House" <${process.env.EMAIL_USER}>`,
                    to: order.email,
                    subject: '🍔 Burger House - Order Confirmed!',
                    html: `<h2>Order Successfully Placed!</h2>
                           <p>Hi <b>${order.customerName}</b>,</p>
                           <p>Your payment (Transaction ID: <b>${order.paymentId}</b>) has been successfully verified.</p>
                           <p><b>Total Paid:</b> ₹${order.totalAmount}</p>
                           <br />
                           <p>We are preparing your delicious meal right now. It will be delivered to <b>${order.address}, ${order.city}</b> shortly.</p>
                           <p>Stay Burgerlicious!<br>- The Burger House Team</p>`
                };
                transporter.sendMail(mailOptions).catch(err => console.log('Mail drop error:', err));
            }
        } catch (mailError) {
            console.log("Email skipped: Nodemailer not installed or env missing.");
        }

        res.json({ success: true, message: 'Order placed successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ordering failed.' });
    }
});

app.patch('/api/orders/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await Orders.findByIdAndUpdate(req.params.id, { status });
        res.json({ success: true, message: 'Order updated!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Update failed.' });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        await Orders.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Order deleted!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Deletion failed.' });
    }
});

// Blog APIs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blogs.find().sort({ date: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch blogs.' });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = new Blogs(req.body);
        await blog.save();
        res.json({ success: true, message: 'Blog created successfully!', blog });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create blog.' });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        await Blogs.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Blog deleted!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete blog.' });
    }
});

// Menu Management API
app.get('/api/menu', (req, res) => {
    const filePath = path.join(__dirname, 'Cart', 'product.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, message: 'Could not fetch menu.' });
        res.json(data ? JSON.parse(data) : []);
    });
});

app.post('/api/menu', (req, res) => {
    try {
        const { name, price, image } = req.body;
        const filePath = path.join(__dirname, 'Cart', 'product.json');
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return res.status(500).json({ success: false, message: 'Could not read menu' });
            
            let products = [];
            if (data) products = JSON.parse(data);
            
            // Find max ID
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            const newItem = { id: newId, name, price: Number(price), image };
            
            products.push(newItem);
            
            fs.writeFile(filePath, JSON.stringify(products, null, 4), 'utf8', (err) => {
                if (err) return res.status(500).json({ success: false, message: 'Could not save menu item' });
                res.json({ success: true, message: 'Food item added to cart system!', item: newItem });
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.delete('/api/menu/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const filePath = path.join(__dirname, 'Cart', 'product.json');
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return res.status(500).json({ success: false, message: 'Could not read menu' });
            
            let products = data ? JSON.parse(data) : [];
            const initialLength = products.length;
            
            products = products.filter(p => p.id !== id);
            
            if (products.length === initialLength) {
                return res.status(404).json({ success: false, message: 'Item not found' });
            }
            
            fs.writeFile(filePath, JSON.stringify(products, null, 4), 'utf8', (err) => {
                if (err) return res.status(500).json({ success: false, message: 'Could not update menu' });
                res.json({ success: true, message: 'Food item removed successfully!' });
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));