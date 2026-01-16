// Load Vercel pages from extraction manifest
async function loadVercelPages() {
    try {
        // Check if we're using file:// protocol
        const isFileProtocol = window.location.protocol === 'file:';

        let manifest;

        if (isFileProtocol) {
            // For file:// protocol, show a helpful message
            const grid = document.querySelector('.pages-gallery-grid');
            if (grid) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--color-text-tertiary);">
                        <p style="margin-bottom: 20px;">⚠️ Cannot load pages when opening file directly.</p>
                        <p style="font-size: 14px; opacity: 0.7;">Please run a local server:</p>
                        <code style="display: block; margin-top: 10px; padding: 10px; background: var(--color-bg-secondary); border-radius: 8px;">
                            python3 -m http.server 8889
                        </code>
                        <p style="font-size: 14px; opacity: 0.7; margin-top: 10px;">Then open: http://localhost:8889/site-detail-2.html</p>
                    </div>
                `;
            }
            return;
        }

        const response = await fetch('extraction/output/vercel.com/pages/manifest.json');
        manifest = await response.json();

        const grid = document.querySelector('.pages-gallery-grid');
        if (!grid) return;

        // Clear loading message
        grid.innerHTML = '';

        // Filter for featured pages first, then add others
        const featuredPages = manifest.pages.filter(p => p.featured);
        const otherPages = manifest.pages.filter(p => !p.featured);

        // Display featured pages first
        [...featuredPages, ...otherPages].forEach(page => {
            const card = createPageCard(page);
            grid.appendChild(card);
        });

        // Store all pages globally for filtering
        allPages = manifest.pages;

        // Update results count
        const resultsCount = document.querySelector('.results-count');
        if (resultsCount) {
            resultsCount.textContent = `${manifest.pages.length} pages`;
        }

        // Setup category filters after pages are loaded
        setupCategoryFilters();

    } catch (error) {
        console.error('Failed to load pages:', error);
        const grid = document.querySelector('.pages-gallery-grid');
        if (grid) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--color-text-tertiary);">
                    <p style="margin-bottom: 10px;">Failed to load pages.</p>
                    <p style="font-size: 14px; opacity: 0.7;">Error: ${error.message}</p>
                    <p style="font-size: 14px; opacity: 0.7; margin-top: 10px;">Make sure you're running a local server.</p>
                </div>
            `;
        }
    }
}

function createPageCard(page) {
    const card = document.createElement('div');
    card.className = 'page-gallery-card';
    card.setAttribute('data-type', page.type);
    card.setAttribute('data-page-name', page.name);
    card.setAttribute('data-page-badge', capitalizeType(page.type));
    if (page.featured) {
        card.setAttribute('data-featured', 'true');
    }

    // Construct screenshot path
    const screenshotPath = `extraction/output/vercel.com/pages/${page.screenshot}`;

    // Add click handler to open lightbox
    card.addEventListener('click', (e) => {
        // Don't open lightbox if clicking on action buttons
        if (!e.target.closest('.page-screenshot-actions')) {
            openScreenshotLightbox(page.name, screenshotPath, capitalizeType(page.type));
        }
    });

    card.innerHTML = `
        <div class="page-card-preview" style="background: url('${screenshotPath}') top center / cover no-repeat;"></div>
        <div class="page-card-info">
            <div class="page-card-header">
                <h3>${page.name}</h3>
                <span class="page-type-badge ${page.type}">${capitalizeType(page.type)}</span>
                <div class="page-screenshot-actions">
                    <button class="page-action-btn">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"/>
                        </svg>
                    </button>
                    <div class="page-actions-menu">
                        <button class="page-action-option" data-action="collection">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z"/>
                            </svg>
                            <span>Add To Collection</span>
                        </button>
                        <button class="page-action-option" data-action="download">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"/>
                                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"/>
                            </svg>
                            <span>Download PNG</span>
                        </button>
                    </div>
                </div>
            </div>
            <span class="page-sections-count">${getSectionCount(page)} sections</span>
        </div>
    `;

    return card;
}

function capitalizeType(type) {
    const typeMap = {
        'home': 'Home',
        'pricing': 'Pricing',
        'product': 'Product',
        'docs': 'Docs',
        'auth': 'Auth',
        'dashboard': 'Dashboard',
        'company': 'Company',
        'resource': 'Resource',
        'solution': 'Solution'
    };
    return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

function getSectionCount(page) {
    // Estimate section count based on page type
    const sectionCounts = {
        'home': 7,
        'pricing': 5,
        'product': 6,
        'docs': 3,
        'auth': 1,
        'dashboard': 6,
        'company': 4,
        'resource': 4,
        'solution': 5
    };
    return sectionCounts[page.type] || 4;
}

// Store all pages globally for filtering
let allPages = [];

// Category filtering
function setupCategoryFilters() {
    const categoryLinks = document.querySelectorAll('.page-nav-link');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Get category from data-filter attribute
            const category = link.getAttribute('data-filter');

            filterPagesByCategory(category);
        });
    });
}

function filterPagesByCategory(category) {
    const grid = document.querySelector('.pages-gallery-grid');
    if (!grid || !allPages.length) return;

    // Clear grid
    grid.innerHTML = '';

    // Filter pages
    let filteredPages = allPages;

    if (category === 'all' || category === 'new') {
        // Show all pages
        filteredPages = allPages;
    } else if (category === 'featured') {
        // Show only featured pages
        filteredPages = allPages.filter(p => p.featured);
    } else {
        // Filter by category (company, products, solutions, resources)
        filteredPages = allPages.filter(p => p.category === category);
    }

    // Display filtered pages
    if (filteredPages.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--color-text-tertiary);">No pages in this category.</div>';
    } else {
        filteredPages.forEach(page => {
            const card = createPageCard(page);
            grid.appendChild(card);
        });
    }

    // Update results count
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `${filteredPages.length} pages`;
    }
}

// Screenshot Lightbox Functions
function createLightbox() {
    // Check if lightbox already exists
    if (document.querySelector('.screenshot-lightbox')) {
        return;
    }

    const lightbox = document.createElement('div');
    lightbox.className = 'screenshot-lightbox';
    lightbox.innerHTML = `
        <div class="screenshot-lightbox-content">
            <div class="screenshot-lightbox-header">
                <div class="screenshot-lightbox-title">
                    <h3 id="lightbox-title"></h3>
                    <span id="lightbox-badge" class="page-type-badge"></span>
                </div>
                <button class="screenshot-lightbox-close">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                    </svg>
                </button>
            </div>
            <img id="lightbox-image" class="screenshot-lightbox-image" alt="Screenshot">
        </div>
    `;

    document.body.appendChild(lightbox);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on close button click
    lightbox.querySelector('.screenshot-lightbox-close').addEventListener('click', closeLightbox);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function openScreenshotLightbox(title, imagePath, badge) {
    createLightbox();

    const lightbox = document.querySelector('.screenshot-lightbox');
    const titleElement = document.getElementById('lightbox-title');
    const badgeElement = document.getElementById('lightbox-badge');
    const imageElement = document.getElementById('lightbox-image');

    titleElement.textContent = title;
    badgeElement.textContent = badge;
    badgeElement.className = `page-type-badge ${badge.toLowerCase()}`;
    imageElement.src = imagePath;
    imageElement.alt = title;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.querySelector('.screenshot-lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Load pages when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadVercelPages);
} else {
    loadVercelPages();
}
