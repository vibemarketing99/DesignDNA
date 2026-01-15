/* ===================================
   Library Page JavaScript
   =================================== */

// ===================================
// View Toggle (Grid/List)
// ===================================
const viewGridBtn = document.getElementById('view-grid');
const viewListBtn = document.getElementById('view-list');
const sitesGrid = document.getElementById('sites-grid');

viewGridBtn?.addEventListener('click', () => {
    viewGridBtn.classList.add('active');
    viewListBtn.classList.remove('active');
    sitesGrid.classList.remove('list-view');
});

viewListBtn?.addEventListener('click', () => {
    viewListBtn.classList.add('active');
    viewGridBtn.classList.remove('active');
    sitesGrid.classList.add('list-view');
});

// ===================================
// Color Filter Selection
// ===================================
const colorFilters = document.querySelectorAll('.filters-sidebar .color-filter');

colorFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        filter.classList.toggle('active');
        updateActiveFilters();
    });
});

// ===================================
// Component Range Slider
// ===================================
const componentRange = document.getElementById('component-range');
const componentValue = document.getElementById('component-value');

componentRange?.addEventListener('input', () => {
    componentValue.textContent = `${componentRange.value}+`;
});

// ===================================
// Filter Checkbox Handling
// ===================================
const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');

filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateActiveFilters();
        updateResultsCount();
    });
});

// ===================================
// Clear All Filters
// ===================================
const clearFiltersBtn = document.getElementById('clear-filters');

clearFiltersBtn?.addEventListener('click', () => {
    // Uncheck all checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Clear color filters
    colorFilters.forEach(filter => {
        filter.classList.remove('active');
    });

    // Reset range
    if (componentRange) {
        componentRange.value = 5;
        componentValue.textContent = '5+';
    }

    // Reset radio to "Any time"
    const anyTimeRadio = document.querySelector('input[name="date"][value="any"]') ||
        document.querySelector('.filter-option.radio input[type="radio"]');
    if (anyTimeRadio) {
        anyTimeRadio.checked = true;
    }

    updateActiveFilters();
    showToast('All filters cleared');
});

// ===================================
// Update Active Filters Display
// ===================================
function updateActiveFilters() {
    const activeFiltersContainer = document.querySelector('.active-filters');
    if (!activeFiltersContainer) return;

    // Get all checked filters
    const checkedFilters = document.querySelectorAll('.filter-option input[type="checkbox"]:checked');
    const activeColors = document.querySelectorAll('.filters-sidebar .color-filter.active');

    // Clear existing filter tags (keep results count)
    const resultsCount = activeFiltersContainer.querySelector('.results-count');
    activeFiltersContainer.innerHTML = '';

    // Add checkbox filters
    checkedFilters.forEach(checkbox => {
        const label = checkbox.closest('.filter-option').querySelector('.filter-label').textContent;
        const tag = createFilterTag(label);
        activeFiltersContainer.appendChild(tag);
    });

    // Add color filters
    activeColors.forEach(colorFilter => {
        const colorName = colorFilter.dataset.color;
        const colorStyle = colorFilter.style.background;
        const tag = createColorFilterTag(colorName, colorStyle);
        activeFiltersContainer.appendChild(tag);
    });

    // Re-add results count
    if (resultsCount) {
        activeFiltersContainer.appendChild(resultsCount);
    } else {
        const count = document.createElement('span');
        count.className = 'results-count';
        count.textContent = 'Showing 234 results';
        activeFiltersContainer.appendChild(count);
    }
}

function createFilterTag(label) {
    const tag = document.createElement('span');
    tag.className = 'active-filter';
    tag.innerHTML = `
        ${label}
        <button class="filter-remove" data-label="${label}">×</button>
    `;

    tag.querySelector('.filter-remove').addEventListener('click', () => {
        // Find and uncheck the corresponding checkbox
        const checkbox = Array.from(filterCheckboxes).find(cb => {
            const cbLabel = cb.closest('.filter-option').querySelector('.filter-label').textContent;
            return cbLabel === label;
        });
        if (checkbox) {
            checkbox.checked = false;
        }
        updateActiveFilters();
    });

    return tag;
}

function createColorFilterTag(colorName, colorStyle) {
    const tag = document.createElement('span');
    tag.className = 'active-filter color-filter-tag';
    tag.innerHTML = `
        <span class="color-dot" style="background: ${colorStyle}"></span>
        ${colorName.charAt(0).toUpperCase() + colorName.slice(1)}
        <button class="filter-remove" data-color="${colorName}">×</button>
    `;

    tag.querySelector('.filter-remove').addEventListener('click', () => {
        const colorFilter = document.querySelector(`.filters-sidebar .color-filter[data-color="${colorName}"]`);
        if (colorFilter) {
            colorFilter.classList.remove('active');
        }
        updateActiveFilters();
    });

    return tag;
}

// ===================================
// Update Results Count (Mock)
// ===================================
function updateResultsCount() {
    const resultsCount = document.querySelector('.results-count');
    if (!resultsCount) return;

    // Mock calculation based on active filters
    const checkedFilters = document.querySelectorAll('.filter-option input[type="checkbox"]:checked');
    const baseCount = 2847;
    const reduction = checkedFilters.length * 150;
    const count = Math.max(50, baseCount - reduction + Math.floor(Math.random() * 100));

    resultsCount.textContent = `Showing ${count} results`;
}

// ===================================
// Sort Select
// ===================================
const sortSelect = document.getElementById('sort-select');

sortSelect?.addEventListener('change', () => {
    const value = sortSelect.value;
    showToast(`Sorting by: ${value.replace('-', ' ')}`);

    // Simulate re-sorting animation
    const cards = document.querySelectorAll('.library-site-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// ===================================
// Pagination
// ===================================
const pageButtons = document.querySelectorAll('.page-btn');
const paginationBtns = document.querySelectorAll('.pagination-btn');

pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        pageButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update prev/next button states
        const pageNum = parseInt(btn.textContent);
        paginationBtns[0].disabled = pageNum === 1;
        paginationBtns[1].disabled = pageNum === 24;

        // Scroll to top and animate
        window.scrollTo({ top: 0, behavior: 'smooth' });
        animateCards();
    });
});

paginationBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const activePage = document.querySelector('.page-btn.active');
        const currentPage = parseInt(activePage.textContent);

        let newPage;
        if (index === 0) {
            // Previous
            newPage = Math.max(1, currentPage - 1);
        } else {
            // Next
            newPage = Math.min(24, currentPage + 1);
        }

        // Find and click the new page button
        const targetBtn = Array.from(pageButtons).find(b => parseInt(b.textContent) === newPage);
        if (targetBtn) {
            targetBtn.click();
        }
    });
});

// ===================================
// Animate Cards
// ===================================
function animateCards() {
    const cards = document.querySelectorAll('.library-site-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 60);
    });
}

// ===================================
// Site Card Hover Effects
// ===================================
const siteCards = document.querySelectorAll('.library-site-card');

siteCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial animation
    setTimeout(animateCards, 100);
});

// ===================================
// Toast Function (fallback)
// ===================================
if (typeof showToast === 'undefined') {
    function showToast(message) {
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
}
