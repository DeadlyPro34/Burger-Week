// Navigation bar
var navlink = document.getElementById('navlink');
function showmenu(){
    navlink.style.right = '0';
}
function hidemenu(){
    navlink.style.right='-200px';
}

// Scroll smooth
window.addEventListener('scroll',reveal); 
function reveal(){
    var reveals = document.querySelectorAll('.reveal');

    for(var i=0; i<reveals.length; i++)
        {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150;

        if(revealTop < windowHeight - revealPoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}

// Swiper Slider for Menu
const swiper = new Swiper('.swiper-slider', {
    grabCursor: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 'auto',
    centeredSlide: true,
  
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

    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },

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