let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
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
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>`;
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

    // All good
    return true;
}