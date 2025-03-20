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
            slidesPerView: 1 // Corrected typo here
        },
        620: {
            slidesPerView: 2 // Corrected typo here
        },
        1024: {
            slidesPerView: 3 // Corrected typo here
        }
    }
});
