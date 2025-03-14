$(document).ready(function () {
    const $postBoxes = $('.post-box');
    const $filterItems = $('.filter-item');

    if ($postBoxes.length) {
        // Handle click event for filter items
        $filterItems.on('click', function () {
            const value = $(this).data('filter');

            if (value === 'all') {
                $postBoxes.stop(true, true).fadeIn(1000);
            } else {
                $postBoxes.stop(true, true).fadeOut(500).filter('.' + value).fadeIn(1000);
            }

            $(this).addClass('active-filter').siblings().removeClass('active-filter');
        });
    }
});

// Header background change on scroll
let header = document.querySelector('header');

let lastScrollY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            header.classList.toggle('shadow', lastScrollY > 0);
            ticking = false;
        });

        ticking = true;
    }
});

