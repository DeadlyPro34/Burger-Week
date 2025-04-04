const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3018; // Choose one port for simplicity

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Connecting MongoDB
mongoose.connect('mongodb://localhost:27017/customer', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB Connection Successful');
});

// Creating a database schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Users = mongoose.model('data', userSchema);

// Route for 'index.htm'
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.htm'));
});

// Route for 'login.htm'
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.htm'));
});

// Common POST route for form submissions
app.post('/post', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new Users({
            name,
            email,
            password
        });
        await user.save();
        console.log(user);
        res.send('Form Submission Successful');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('An error occurred while saving the user');
    }
});

app.listen(port, () => {
    console.log('Server started on port', port);
});