// Check authentication status
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authLink = document.getElementById('authLink');
    
    if (user) {
        // User is logged in
        const userProfileHTML = `
            <div class="user-profile">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random" alt="User Avatar" class="user-avatar">
                <span class="user-name">${user.name}</span>
                <button class="logout-btn" onclick="handleLogout()">Logout</button>
            </div>
        `;
        if (authLink) {
            authLink.insertAdjacentHTML('afterend', userProfileHTML);
            authLink.style.display = 'none';
        }
        return true;
    }
    return false;
}

// Handle login
function handleLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    }
    return false;
}

// Handle signup
function handleSignup(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        return false;
    }
    
    const newUser = {
        name: email.split('@')[0],
        email: email,
        password: password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('user');
    window.location.reload();
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only check auth if we're not on the login page
    if (!window.location.pathname.includes('login.html')) {
        const isAuthenticated = checkAuth();
        if (!isAuthenticated && !window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
}); 