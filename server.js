const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const port = 3018; // Specify port
const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Connecting MongoDB
mongoose.connect('mongodb://localhost:27017/customer', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
}); // Use a callback for better error handling

db.once('open', () => {
    console.log('MongoDB Connection Successful');
});

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    uname: String,
    untime: String,
    upassword: String,
    uemail: String,
    uaddress: String
}); // Added required properties for validation

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
        const { name, email, password, uname, untime, upassword, uemail, uaddress } = req.body;

        if (!name || !email || !password) {
            // Server-side validation for required fields
            return res.status(400).send('Name, email, and password are required!');
        }

        const user = new Users({
            name,
            email,
            password,
            uname,
            untime,
            upassword,
            uemail,
            uaddress,
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
    console.log(`Server started on port ${port}`); // Improved log formatting
});