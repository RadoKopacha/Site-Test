/**
 * ==========================================================================
 * MONSTER HUNTER SWITCH AXE PROGRESSION CORE JAVASCRIPT
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initCollapsibleCards();
    initSearchAndFilters();
    initBackToTopButton();
    initMobileNav();
});

/**
 * Handle Mobile Navigation Toggle Display
 */
function initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
        });
    }
}

/**
 * Initialize Collapsible Functionality for Build Cards
 */
function initCollapsibleCards() {
    const cardHeaders = document.querySelectorAll('.build-header');
    
    cardHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const card = header.parentElement;
            card.classList.toggle('collapsed');
        });
    });
}

/**
 * Handle Live Filtering and Searching Client-Side
 */
function initSearchAndFilters() {
    const searchInput = document.getElementById('buildSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const buildCards = document.querySelectorAll('.build-card');
    
    if (!searchInput && filterButtons.length === 0) return;

    function filterBuilds() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let activeFilter = 'all';
        
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) {
            activeFilter = activeBtn.getAttribute('data-filter');
        }

        buildCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardStars = card.getAttribute('data-stars') || '';
            
            const matchesSearch = cardText.includes(query);
            let matchesFilter = false;

            if (activeFilter === 'all') {
                matchesFilter = true;
            } else if (activeFilter === 'early' && (cardStars.includes('1-2') || cardStars.includes('3-4') || cardStars.includes('1-2') || cardStars.includes('hr4') || cardStars.includes('hr5') || cardStars.includes('mr1-2') || cardStars.includes('mr3-4'))) {
                matchesFilter = true;
            } else if (activeFilter === 'mid' && (cardStars.includes('5') || cardStars.includes('hr6') || cardStars.includes('hr7') || cardStars.includes('mr5-6'))) {
                matchesFilter = true;
            } else if (activeFilter === 'endgame' && (cardStars.includes('6') || cardStars.includes('endgame') || cardStars.includes('10+') || cardStars.includes('100+'))) {
                matchesFilter = true;
            }

            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterBuilds);
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterBuilds();
        });
    });
}

/**
 * Manage Back To Top Button Visibility and Smooth Click Functionality
 */
function initBackToTopButton() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}