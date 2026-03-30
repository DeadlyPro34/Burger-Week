// --- Admin Functionality ---

document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
    fetchMenuItems();
    // Refresh orders every 2 seconds for real-time experience
    setInterval(fetchOrders, 2000);
});

async function fetchOrders() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        
        if (Array.isArray(orders)) {
            renderOrders(orders);
            updateStats(orders);
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        showToast('Failed to fetch orders ❌');
    }
}

function renderOrders(orders) {
    const ordersBody = document.getElementById('orders-body');
    ordersBody.innerHTML = ''; // Clear current

    if (orders.length === 0) {
        ordersBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #888;">No orders found. 🍔</td></tr>`;
        return;
    }

    orders.forEach(order => {
        const date = new Date(order.orderDate).toLocaleString();
        const items = order.items && Array.isArray(order.items) 
            ? order.items.map(item => `${item.name} (${item.quantity})`).join(', ') 
            : 'No items';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${date}</td>
            <td>
                <strong>${order.customerName || 'Anonymous'}</strong><br>
                <small>${order.phone || 'No phone'}</small>
            </td>
            <td>${items}</td>
            <td>₹${order.totalAmount || 0}</td>
            <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
            <td>
                <button class="action-btn complete-btn" onclick="updateStatus('${order._id}', 'Completed')" title="Mark as Completed"><i class="ri-check-line"></i></button>
                <button class="action-btn cancel-btn" onclick="updateStatus('${order._id}', 'Cancelled')" title="Cancel Order"><i class="ri-close-line"></i></button>
                <button class="action-btn delete-btn" onclick="deleteOrder('${order._id}')" title="Delete Permanent"><i class="ri-delete-bin-line"></i></button>
            </td>
        `;
        ordersBody.appendChild(tr);
    });
}

function updateStats(orders) {
    document.getElementById('total-orders').innerText = orders.length;
    const pendingCount = orders.filter(o => o.status.toLowerCase() === 'pending').length;
    document.getElementById('pending-orders').innerText = pendingCount;
}

async function updateStatus(id, newStatus) {
    try {
        const response = await fetch(`/api/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        const result = await response.json();
        
        if (result.success) {
            showToast(`Order marked as ${newStatus} ✅`);
            fetchOrders(); // Refresh
        } else {
            showToast('Update failed ❌');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        showToast('Update failed ❌');
    }
}

async function deleteOrder(id) {
    if (!confirm('Are you sure you want to delete this order permanently?')) return;

    try {
        const response = await fetch(`/api/orders/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();

        if (result.success) {
            showToast('Order Deleted 🗑️');
            fetchOrders(); // Refresh
        } else {
            showToast('Delete failed ❌');
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        showToast('Delete failed ❌');
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function logout() {
    // Simple redirect for now (clearing cookies could be added if using JWT auth strictly via cookies)
    window.location.href = '/login';
}

async function addMenuItem(event) {
    event.preventDefault();

    const name = document.getElementById('menuName').value;
    const price = document.getElementById('menuPrice').value;
    const image = document.getElementById('menuImage').value || './Images/default.png';

    const btn = document.querySelector('button[type="submit"]');
    btn.innerText = "Adding...";
    btn.disabled = true;

    try {
        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, image })
        });
        const result = await response.json();

        if (result.success) {
            showToast('Food Item Added Successfully! 🍔');
            document.getElementById('addMenuForm').reset();
            fetchMenuItems(); // Refresh table dynamically
        } else {
            showToast(result.message || 'Error adding item ❌');
        }
    } catch (error) {
        console.error('Error adding menu item:', error);
        showToast('Server error ❌');
    } finally {
        btn.innerText = "Add Food +";
        btn.disabled = false;
    }
}

async function addBlogPost(event) {
    event.preventDefault();

    const title = document.getElementById('blogTitle').value;
    const category = document.getElementById('blogCategory').value;
    const image = document.getElementById('blogImage').value;
    const description = document.getElementById('blogDesc').value;
    const content = document.getElementById('blogContent').value;

    const btn = document.querySelector('#addBlogForm button[type="submit"]');
    btn.innerText = "Publishing...";
    btn.disabled = true;

    try {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, category, image, description, content })
        });
        const result = await response.json();

        if (result.success) {
            showToast('Blog Post Published! 📝');
            document.getElementById('addBlogForm').reset();
        } else {
            showToast(result.message || 'Error publishing blog ❌');
        }
    } catch (error) {
        console.error('Error adding blog:', error);
        showToast('Server error ❌');
    } finally {
        btn.innerText = "Publish Post +";
        btn.disabled = false;
    }
}

async function fetchMenuItems() {
    try {
        const response = await fetch('/api/menu');
        const items = await response.json();
        renderMenuItems(items);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

function renderMenuItems(items) {
    const tbody = document.getElementById('menu-items-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No items in menu.</td></tr>`;
        return;
    }

    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;"></td>
            <td><strong>${item.name}</strong></td>
            <td>₹${item.price}</td>
            <td style="text-align: right;">
                <button class="action-btn delete-btn" onclick="deleteMenuItem(${item.id})" title="Remove Item"><i class="ri-delete-bin-line"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function deleteMenuItem(id) {
    if (!confirm('Are you sure you want to remove this item from the Cart system?')) return;

    try {
        const response = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
        const result = await response.json();

        if (result.success) {
            showToast('Food Item Removed! 🗑️');
            fetchMenuItems(); // Refresh DOM exactly
        } else {
            showToast(result.message || 'Error removing item ❌');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        showToast('Server error ❌');
    }
}
