/* ===================================
   Pages Gallery JavaScript
   =================================== */

// ===================================
// Filter Chip Selection
// ===================================
const filterChips = document.querySelectorAll('.filter-chip');

filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        // Remove active from all chips
        filterChips.forEach(c => c.classList.remove('active'));
        // Add active to clicked chip
        chip.classList.add('active');

        // Get filter type
        const filterType = chip.textContent.trim().toLowerCase();
        filterPages(filterType);
    });
});

function filterPages(type) {
    const pageCards = document.querySelectorAll('.page-card');

    pageCards.forEach((card, index) => {
        const pageType = card.querySelector('.page-type')?.textContent.toLowerCase() || '';

        if (type === 'all pages' || pageType.includes(type.replace(/[^\w]/g, ''))) {
            card.style.display = '';
            // Stagger animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            card.style.display = 'none';
        }
    });

    showToast(`Filtering: ${type}`);
}

// ===================================
// View Toggle (Grid/List)
// ===================================
const viewGridBtn = document.getElementById('view-grid');
const viewListBtn = document.getElementById('view-list');
const pagesGrid = document.getElementById('pages-grid');

viewGridBtn?.addEventListener('click', () => {
    viewGridBtn.classList.add('active');
    viewListBtn.classList.remove('active');
    pagesGrid.classList.remove('list-view');
});

viewListBtn?.addEventListener('click', () => {
    viewListBtn.classList.add('active');
    viewGridBtn.classList.remove('active');
    pagesGrid.classList.add('list-view');
});

// ===================================
// Sort Functionality
// ===================================
const sortSelect = document.querySelector('.sort-select');

sortSelect?.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    showToast(`Sorting by: ${sortValue.replace('-', ' ')}`);

    // Animate cards to show sorting
    const cards = document.querySelectorAll('.page-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 30);
    });
});

// ===================================
// Page Card Interactions
// ===================================
const pageCards = document.querySelectorAll('.page-card');

pageCards.forEach(card => {
    // Click handler for viewing full page
    card.querySelector('.overlay-btn.primary')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const pageTitle = card.querySelector('.page-title').textContent;
        showToast(`Opening: ${pageTitle}`);
        // Would navigate to page-view.html with page ID
        // window.location.href = `page-view.html?page=${encodeURIComponent(pageTitle.toLowerCase())}`;
    });

    // Export button
    card.querySelector('.overlay-btn:not(.primary)')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const pageTitle = card.querySelector('.page-title').textContent;
        showExportModal(pageTitle);
    });
});

// ===================================
// Export Modal (placeholder)
// ===================================
function showExportModal(pageName) {
    showToast(`Export options for: ${pageName}`);
    // Would show modal with export options:
    // - Full page screenshot (PNG/JPEG)
    // - Page HTML structure
    // - All sections as separate files
    // - Design tokens JSON
}

// ===================================
// Toast Function
// ===================================
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        padding: 12px 24px;
        background: var(--color-bg-elevated);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        color: var(--color-text-primary);
        font-size: 14px;
        font-weight: 500;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Animate cards on load
    const cards = document.querySelectorAll('.page-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 60));
    });
});
