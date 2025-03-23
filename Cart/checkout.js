let listCart = [];

// Function to check cart data from cookies
function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();

// Function to render cart details on the page
function addCartToHTML() {
    // Select HTML elements for displaying cart and totals
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = ''; // Clear any existing data

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let totalPrice = 0;

    // Check if the cart has products
    if (listCart) {
        listCart.forEach(product => {
            if (product) {
                // Create HTML for each product in the cart
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">Price: $${product.price} / unit</div>
                    </div>
                    <div class="quantity">Quantity: ${product.quantity}</div>
                    <div class="returnPrice">Total: $${product.price * product.quantity}</div>`;
                
                // Add the product element to the cart HTML
                listCartHTML.appendChild(newCart);

                // Update total quantities and prices
                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        });
    }

    // Display total quantities and price in the respective fields
    totalQuantityHTML.innerText = `Total Items: ${totalQuantity}`;
    totalPriceHTML.innerText = `Total Price: $${totalPrice}`;
}