const fs = require('fs');
const path = require('path');

const wwwPath = path.join(__dirname, 'www');

// Ensure a perfectly fresh Android build folder
if (fs.existsSync(wwwPath)) fs.rmSync(wwwPath, { recursive: true, force: true });
fs.mkdirSync(wwwPath);

// The exact, secure frontend files your Android app actually needs
const dirsToCopy = ['Admin', 'Blog', 'Cart', 'Image', 'Login'];
const filesToCopy = ['index.html', 'style.css', 'script.js'];

console.log('🚀 Extracting strict frontend assets for Android build...');

// Clone the folders dynamically
dirsToCopy.forEach(dir => {
    if (fs.existsSync(path.join(__dirname, dir))) {
        fs.cpSync(path.join(__dirname, dir), path.join(wwwPath, dir), { recursive: true });
    }
});

// Clone the singular files dynamically
filesToCopy.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        fs.copyFileSync(path.join(__dirname, file), path.join(wwwPath, file));
    }
});

console.log('✅ Android `www/` packaging complete! Sensitive backend data successfully filtered.');
