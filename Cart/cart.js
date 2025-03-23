const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    centeredSlides: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // last
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },

    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1 
        },
        620: {
            slidesPerView: 2 
        },
        1024: {
            slidesPerView: 3 
        }
    }
});

let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let sliderWrapper = document.querySelector('.slider-wrapper');

iconCart.addEventListener('click', function () {
    if (cart.style.right == '-100%' || cart.style.right == '') {
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
        sliderWrapper.classList.add('hide-slider'); 
    } else {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
        sliderWrapper.classList.remove('hide-slider'); 
    }
});

close.addEventListener('click', function () {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
    sliderWrapper.classList.remove('hide-slider'); 
});



// Directly initializing the product data
let products = [
    {
        "id": 1,
        "name": "Gourmet Bacon Cheeseburger",
        "price": 520,
        "image": "./Images/BG1.png"
    },
    {
        "id": 2,
        "name": "Classic Cheeseburger with Ketchup & Cheese",
        "price": 220,
        "image": "./Images/BG2.png"
    },
    {
        "id": 3,
        "name": "Gourmet Bacon Cheeseburger",
        "price": 250,
        "image": "./Images/BG3.png"
    },
    {
        "id": 4,
        "name": "McCafé Frappe",
        "price": 420,
        "image": "./Images/BG4.png"
    },
    {
        "id": 5,
        "name": "Chicken Sandwich Combo",
        "price": 120,
        "image": "./Images/BG5.png"
    },
    {
        "id": 6,
        "name": "McDonald's French Fries",
        "price": 120,
        "image": "./Images/BG6.png"
    },
    {
        "id": 7,
        "name": "McCafé Iced Coffee",
        "price": 120,
        "image": "./Images/BG7.png"
    },
    {
        "id": 8,
        "name": "McDonald's Spicy Veggie Pocket / Pie",
        "price": 120,
        "image": "./Images/BG8.png"
    }
];

// Call the function to populate the HTML
addDataToHTML();

// Function to display products in the list
function addDataToHTML() {
    // Remove default data from HTML
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // Add new data to HTML
    if (products != null) { // Check if there is product data
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button onclick="addCart(${product.id})">Add To Cart</button>`;

            listProductHTML.appendChild(newProduct);
        });
    }
}


//use cookie so the cart doesn't get lost on refresh page
let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    //// If this product is not in the cart
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        //If this product is already in the cart.
        //I just increased the quantity
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}