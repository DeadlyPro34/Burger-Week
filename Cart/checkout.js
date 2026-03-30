let listCart = [];
function checkCart(){
    const savedCart = localStorage.getItem('listCart');
    if(savedCart){
        listCart = JSON.parse(savedCart);
    } else {
        listCart = [];
    }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image.toLowerCase().replace('./images/', 'images/')}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">Rs${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">Rs${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'Rs' + totalPrice;
}

function validateCheckout() {
    const name = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;

    // Name: letters, spaces only
    const namePattern = /^[A-Za-z ]+$/;
    // Phone: digits only, 10–15 chars
    const phonePattern = /^\d{10,15}$/;

    if (!namePattern.test(name)) {
      alert('Full name should contain letters and spaces only.');
      return false;
    }
    if (!phonePattern.test(phone)) {
      alert('Phone number must be 10–15 digits.');
      return false;
    }
    if (address.length < 5) {
      alert('Address is too short.');
      return false;
    }
    if (!country) {
      alert('Please select a country.');
      return false;
    }
    if (!city) {
      alert('Please select a city.');
      return false;
    }

    // SEND TO BACKEND
    const orderData = {
        customerName: name,
        phone: phone,
        address: address,
        city: city,
        items: listCart.filter(item => item !== null),
        totalAmount: document.querySelector('.totalPrice').innerText.replace('Rs', '')
    };

    fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            alert('Order Placed Successfully! We will contact you soon.');
            localStorage.removeItem('listCart');
            window.location.href = '../index.htm';
        } else {
            alert('Something went wrong. Please try again.');
        }
    });

    return false; // Prevent default form submission
}