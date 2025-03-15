// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation menu
    const menuToggle = document.getElementById('menu-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (menuToggle && dropdown) {
        menuToggle.addEventListener('change', function() {
            dropdown.style.display = menuToggle.checked ? 'block' : 'none';
        });
    }
    
    // Product carousel functionality
    const scrollProducts = document.querySelector('.products');
    const dealContainers = document.querySelectorAll('.deals-container');
    
    // Arrow navigation for product carousels
    function createCarouselControls(container) {
        const leftArrow = document.createElement('button');
        leftArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        leftArrow.className = 'carousel-control left-control';
        
        const rightArrow = document.createElement('button');
        rightArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        rightArrow.className = 'carousel-control right-control';
        
        container.parentElement.style.position = 'relative';
        container.parentElement.appendChild(leftArrow);
        container.parentElement.appendChild(rightArrow);
        
        leftArrow.addEventListener('click', function() {
            container.scrollBy({
                left: -600,
                behavior: 'smooth'
            });
        });
        
        rightArrow.addEventListener('click', function() {
            container.scrollBy({
                left: 600,
                behavior: 'smooth'
            });
        });
    }
    
    // Apply carousel controls to all scrollable containers
    if (scrollProducts) createCarouselControls(scrollProducts);
    dealContainers.forEach(container => createCarouselControls(container));
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-icon');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            if (searchInput.value.trim() !== '') {
                alert('Searching for: ' + searchInput.value);
                // In a real implementation, you would redirect to search results page
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                alert('Searching for: ' + searchInput.value);
                // In a real implementation, you would redirect to search results page
            }
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartCount = 0;
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                cartCount++;
                updateCartCount();
                const productName = this.getAttribute('data-product');
                showNotification(`${productName} added to cart!`);
            });
        });
    }
    
    // Cart notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 2000);
        }, 10);
    }
    
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        } else {
            const cartIcon = document.querySelector('.nav-cart');
            if (cartIcon) {
                const countBadge = document.createElement('span');
                countBadge.className = 'cart-count';
                countBadge.textContent = cartCount;
                cartIcon.appendChild(countBadge);
            }
        }
    }
    
    // Back to top functionality
    const backToTopButton = document.querySelector('.foot-panel1');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add "Add to Cart" buttons to deal items
    const dealItems = document.querySelectorAll('.deal-item');
    dealItems.forEach(item => {
        const addButton = document.createElement('button');
        addButton.className = 'add-to-cart';
        addButton.textContent = 'Add to Cart';
        addButton.setAttribute('data-product', item.querySelector('.deal-desc').textContent.split(' - ')[0]);
        item.appendChild(addButton);
    });
    
    // Responsive navigation for mobile
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.prepend(mobileMenuToggle);
        
        mobileMenuToggle.addEventListener('click', function() {
            document.body.classList.toggle('mobile-menu-open');
        });
    }
});

// Image slider for hero section
let heroSlideIndex = 0;
const heroImages = [
    'hero_image.jpg',
    'hero_image2.jpg', // Add your image paths
    'hero_image3.jpg'  // Add your image paths
];

function changeHeroImage() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSlideIndex = (heroSlideIndex + 1) % heroImages.length;
        heroSection.style.backgroundImage = `url('${heroImages[heroSlideIndex]}')`;
    }
}

// Change hero image every 5 seconds
setInterval(changeHeroImage, 5000);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(img => {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
});