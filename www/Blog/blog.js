$(document).ready(async function () {
    // Fetch Dynamic Backend Blogs
    try {
        const response = await fetch('https://burger-week.onrender.com/api/blogs');
        const blogs = await response.json();
        const container = $('#post-container');

        blogs.forEach(blog => {
            const dateStr = new Date(blog.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            const catLower = blog.category.toLowerCase();
            
            const html = `
            <div class="post-box ${catLower}">
                <img src="${blog.image}" alt="${blog.title}" class="post-img" style="object-fit:cover; height:200px; width:100%;">
                <h2 class="category">${blog.category}</h2>
                <a href="#" class="post-title" onclick="alert('Full post view coming soon!')">
                    ${blog.title}
                </a>
                <span class="post-date">${dateStr}</span>
                <p class="post-discription">${blog.description}</p>
                <div class="profile">
                    <img src="Img/Profile1.png" alt="${blog.author}" class="profile-img">
                    <span class="profile-name">${blog.author}</span>
                </div>
            </div>`;
            container.prepend(html);
        });
    } catch (e) {
        console.error("Failed to fetch blogs:", e);
    }

    // Re-query post-boxes now that dynamic ones are injected
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

