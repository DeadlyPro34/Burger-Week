const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs'); // Will be available after user installs
const jwt = require('jsonwebtoken'); // Will be available after user installs
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = 3018; 
const app = express();

// Middleware
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
    phone: String,
    address: String,
    city: String,
    items: Array,
    totalAmount: Number,
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now }
});
const Orders = mongoose.model('orders', orderSchema);

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

app.get('/index', (req, res) => res.sendFile(path.join(__dirname, 'index.htm')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'Login/login.htm')));

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

// New Order API
app.post('/api/orders', async (req, res) => {
    try {
        const order = new Orders(req.body);
        await order.save();
        res.json({ success: true, message: 'Order placed successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ordering failed.' });
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));