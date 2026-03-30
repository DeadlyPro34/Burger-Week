let isRegisterMode = false;

function toggleMode() {
    isRegisterMode = !isRegisterMode;
    const title = document.getElementById('formTitle');
    const nameBox = document.getElementById('nameContainer');
    const btn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleText');
    const extra = document.getElementById('extraOptions');
    const roleDiv = document.getElementById('roleSelectorDiv');

    if (isRegisterMode) {
        title.innerText = "Register";
        nameBox.style.display = "block";
        document.getElementById('uname').setAttribute('required', 'true');
        btn.innerText = "Sign Up";
        extra.style.display = "none";
        if(roleDiv) roleDiv.style.display = "none";
        toggleText.innerHTML = `Already have an account? <a href="javascript:void(0)" onclick="toggleMode()">Login</a>`;
    } else {
        title.innerText = "Login";
        nameBox.style.display = "none";
        document.getElementById('uname').removeAttribute('required');
        btn.innerText = "Login";
        extra.style.display = "flex";
        if(roleDiv) roleDiv.style.display = "block";
        toggleText.innerHTML = `Don't have an account? <a href="javascript:void(0)" onclick="toggleMode()">Register</a>`;
    }
}

async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    const emailPattern = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9]+)\.([a-z]+)(\.[a-z]+)?$/;
    if (!emailPattern.test(email)) {
        alert("Invalid Email format.");
        return false;
    }

    if (password.length < 6) {
        alert("Password should be at least 6 characters long.");
        return false;
    }

    if (isRegisterMode) {
        const name = document.getElementById('uname').value;
        const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_@\s]*$/;
        if (!usernamePattern.test(name)) {
            alert("Invalid Username.");
            return false;
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (data.success) {
                alert("Registration successful! Please login.");
                toggleMode();
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Server error during registration.");
        }
    } else {
        // Login Mode
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                const selectedRole = document.getElementById('roleSelect').value;
                
                // If they selected Admin, redirect to admin if role == admin
                // OR just trust the selection for this simple project
                if (selectedRole === 'admin' || data.user.role === 'admin') {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/index';
                }
            } else {
                alert(data.message || "Invalid credentials.");
            }
        } catch (error) {
            console.error(error);
            alert("Server error during login.");
        }
    }
}