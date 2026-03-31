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
                    `<img src="${product.image}">
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
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;

    // Name: letters, spaces only
    const namePattern = /^[A-Za-z ]+$/;
    // Phone: digits only, 10–15 chars
    const phonePattern = /^\d{10,15}$/;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,10}$/;

    if (!namePattern.test(name)) {
      alert('Full name should contain letters and spaces only.');
      return false;
    }
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
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

    // RAZORPAY PAYMENT INTEGRATION
    const totalAmountRaw = document.querySelector('.totalPrice').innerText.replace('Rs', '').trim();
    if (parseInt(totalAmountRaw) <= 0 || isNaN(parseInt(totalAmountRaw))) {
        alert("Your cart is empty!");
        return false;
    }

    const amountInPaise = parseInt(totalAmountRaw) * 100;

    var options = {
        "key": "rzp_test_SXarYqgJi0IFtw",
        "amount": amountInPaise.toString(),
        "currency": "INR",
        "name": "Burger House",
        "description": "Secure Checkout",
        "image": "../Image/burger.png",
        "handler": function (response) {
            // Once payment succeeds via Razorpay window, proceed to hit our MongoDB Server!
            const orderData = {
                customerName: name,
                email: email,
                phone: phone,
                address: address,
                city: city,
                items: listCart.filter(item => item !== null),
                totalAmount: totalAmountRaw,
                paymentId: response.razorpay_payment_id
            };

            fetch('https://burger-week.onrender.com/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    alert('Payment Successful & Order Placed! Trxn ID: ' + response.razorpay_payment_id);
                    localStorage.removeItem('listCart');
                    window.location.href = '../index.html';
                } else {
                    alert('Something went wrong contacting the server.');
                }
            });
        },
        "prefill": {
            "name": name,
            "email": email,
            "contact": phone
        },
        "theme": {
            "color": "#ff9718"
        }
    };

    if(typeof Razorpay === "undefined") {
        alert("Secure Payment Gateway failed to load. Please check connection.");
        return false;
    }

    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
        alert("Payment Failed! Reason: " + response.error.description);
    });
    // Open the Razorpay Payment Modal
    rzp1.open();

    return false; // Prevent form from doing a real HTML submit!
}