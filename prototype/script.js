/* DesignDNA - Interactive JavaScript */

// ===================================
// Search Modal
// ===================================
const searchModal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-input');
const searchModalInput = document.getElementById('search-modal-input');
const intentSearchBtn = document.getElementById('intent-search-btn');

// Open search modal
function openSearchModal() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchModalInput.focus(), 100);
}

// Close search modal
function closeSearchModal() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    searchModalInput.value = '';
}

// Search input click opens modal
if (searchInput) {
    searchInput.addEventListener('focus', (e) => {
        e.target.blur();
        openSearchModal();
    });
}

// Intent search button opens modal
if (intentSearchBtn) {
    intentSearchBtn.addEventListener('click', openSearchModal);
}

// Close on overlay click
searchModal?.querySelector('.search-modal-overlay')?.addEventListener('click', closeSearchModal);

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal?.classList.contains('active')) {
        closeSearchModal();
    }

    // Cmd/Ctrl + K opens search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (searchModal?.classList.contains('active')) {
            closeSearchModal();
        } else {
            openSearchModal();
        }
    }
});

// ===================================
// Intent Chips
// ===================================
const intentChips = document.querySelectorAll('.intent-chip');

intentChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const query = chip.dataset.query;
        openSearchModal();
        if (searchModalInput) {
            searchModalInput.value = query;
        }
    });
});

// ===================================
// Theme Toggle (Placeholder)
// ===================================
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // For now, just show a subtle animation
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);

        // In a real implementation, this would toggle light/dark mode
        console.log('Theme toggle clicked - implement light mode');
    });
}

// ===================================
// Export Button Interactions
// ===================================
const exportBtns = document.querySelectorAll('.export-btn');

exportBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active from siblings
        const siblings = btn.parentElement.querySelectorAll('.export-btn');
        siblings.forEach(sib => sib.classList.remove('active'));

        // Add active to clicked
        btn.classList.add('active');

        // Show feedback
        const originalText = btn.textContent;
        btn.style.pointerEvents = 'none';

        // Visual feedback
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.4s ease-out;
        `;
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
            btn.style.pointerEvents = '';
        }, 400);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.collection-card, .site-card, .intent-chip').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    animateOnScroll.observe(el);
});

// Add animate-in class styles
const animateStyle = document.createElement('style');
animateStyle.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animateStyle);

// ===================================
// Card Hover Effects
// ===================================
document.querySelectorAll('.site-card, .collection-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Copy to Clipboard Utility
// ===================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Toast notification
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

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after delay
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===================================
// Tabs Navigation (for site detail page)
// ===================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Function to switch to a specific tab
    function switchToTab(targetTab) {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Find and activate the target tab button
        const targetBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
        document.getElementById(`tab-${targetTab}`)?.classList.add('active');
    }

    // Tab button click handlers
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            if (targetTab) {
                switchToTab(targetTab);
            }
        });
    });

    // Tab trigger buttons (e.g., "View all" links that switch tabs)
    document.querySelectorAll('[data-tab-trigger]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = trigger.dataset.tabTrigger;
            if (targetTab) {
                switchToTab(targetTab);
                // Scroll to top of tab content
                const tabContent = document.querySelector('.tab-content');
                if (tabContent) {
                    tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// Initialize tabs if present
if (document.querySelector('.tab-btn')) {
    initTabs();
}

// ===================================
// Flows Gallery Filter
// ===================================
function initFlowsFilter() {
    const flowNavLinks = document.querySelectorAll('.flow-nav-link');
    const flowCards = document.querySelectorAll('.flow-gallery-card');
    const resultsCount = document.querySelector('#tab-flows .results-count');

    flowNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.dataset.filter;

            // Update active state
            flowNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Filter cards
            let visibleCount = 0;
            flowCards.forEach(card => {
                const cardType = card.dataset.type;
                if (filter === 'all' || cardType === filter) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Update results count
            if (resultsCount) {
                resultsCount.textContent = `${visibleCount} flow${visibleCount !== 1 ? 's' : ''}`;
            }
        });
    });
}

// Initialize flows filter if present
if (document.querySelector('.flow-nav-link')) {
    initFlowsFilter();
}

// ===================================
// Pages Gallery Filter
// ===================================
function initPagesFilter() {
    const pageNavLinks = document.querySelectorAll('.page-nav-link');
    const pageCards = document.querySelectorAll('.page-gallery-card');
    const resultsCount = document.querySelector('#tab-pages .results-count');

    pageNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.dataset.filter;

            // Update active state
            pageNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Filter cards
            let visibleCount = 0;
            pageCards.forEach(card => {
                const cardType = card.dataset.type;
                const isFeatured = card.dataset.featured === 'true';

                let shouldShow = false;
                if (filter === 'all') {
                    shouldShow = true;
                } else if (filter === 'featured') {
                    shouldShow = isFeatured;
                } else {
                    shouldShow = cardType === filter;
                }

                if (shouldShow) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Update results count
            if (resultsCount) {
                resultsCount.textContent = `${visibleCount} page${visibleCount !== 1 ? 's' : ''}`;
            }
        });
    });
}

// Initialize pages filter if present
if (document.querySelector('.page-nav-link')) {
    initPagesFilter();
}

// ===================================
// Page Lightbox
// ===================================
function initPageLightbox() {
    const lightbox = document.getElementById('page-lightbox');
    if (!lightbox) return;

    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPreview = lightbox.querySelector('.lightbox-preview');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxBadge = lightbox.querySelector('.lightbox-badge');
    const pageCards = document.querySelectorAll('.page-gallery-card');

    // Open lightbox on card click
    pageCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();

            // Get card info
            const title = card.querySelector('h3')?.textContent || 'Page';
            const badge = card.querySelector('.page-type-badge');
            const badgeText = badge?.textContent || '';
            const badgeClass = badge?.className.replace('page-type-badge', '').trim() || '';
            const preview = card.querySelector('.page-card-preview');
            const previewStyle = preview ? window.getComputedStyle(preview).background : '';

            // Set lightbox content
            lightboxTitle.textContent = title;
            lightboxBadge.textContent = badgeText;
            lightboxBadge.className = 'lightbox-badge ' + badgeClass;
            lightboxPreview.style.background = previewStyle;

            // Open lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close on overlay click
    lightboxOverlay?.addEventListener('click', closeLightbox);

    // Close on button click
    lightboxClose?.addEventListener('click', closeLightbox);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Initialize page lightbox if present
if (document.getElementById('page-lightbox')) {
    initPageLightbox();
}

// ===================================
// Component State Switcher
// ===================================
function initStateSwitcher() {
    const stateButtons = document.querySelectorAll('.state-btn');

    stateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const state = btn.dataset.state;
            const group = btn.closest('.state-group');

            // Update active state button
            group.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update component preview
            const preview = document.querySelector('.component-preview');
            if (preview) {
                preview.dataset.state = state;
            }
        });
    });
}

// Initialize if present
if (document.querySelector('.state-btn')) {
    initStateSwitcher();
}

// ===================================
// Color Swatch Copy
// ===================================
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        const color = swatch.dataset.color;
        copyToClipboard(color);
    });
});

// ===================================
// Keyboard Shortcuts Help
// ===================================
const shortcuts = {
    'k': 'Search',
    's': 'Save to collection',
    'e': 'Export',
    'c': 'Compare mode',
    '?': 'Show shortcuts'
};

document.addEventListener('keydown', (e) => {
    // Only if not in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === '?') {
        console.log('Keyboard shortcuts:', shortcuts);
        showToast('Press ⌘K to search');
    }
});

// ===================================
// Performance: Lazy Load Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Export Dropdown (Site Detail Page)
// ===================================
const exportBtn = document.getElementById('export-btn');
const exportDropdown = document.getElementById('export-dropdown');
const exportOptions = document.querySelectorAll('.export-option');

// Toggle dropdown
exportBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    exportDropdown?.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (exportDropdown && !exportBtn?.contains(e.target) && !exportDropdown?.contains(e.target)) {
        exportDropdown.classList.remove('active');
    }
});

// Handle export option selection
exportOptions.forEach(option => {
    option.addEventListener('click', () => {
        const exportType = option.dataset.export;
        const exportName = option.querySelector('span').textContent;

        // Close dropdown
        exportDropdown?.classList.remove('active');

        // Show export toast
        showToast(`Exporting as ${exportName}...`);

        // Handle different export types
        switch(exportType) {
            case 'json':
                handleJsonExport();
                break;
            case 'figma':
                handleFigmaExport();
                break;
            case 'prompt':
                handlePromptExport();
                break;
            case 'css':
                handleCssExport();
                break;
        }
    });
});

// Export handlers (mock implementations)
function handleJsonExport() {
    setTimeout(() => {
        showToast('JSON file downloaded successfully');
    }, 1500);
}

function handleFigmaExport() {
    setTimeout(() => {
        showToast('Opened in Figma plugin');
    }, 1500);
}

function handlePromptExport() {
    setTimeout(() => {
        showToast('Reverse prompt generated');
    }, 1500);
}

function handleCssExport() {
    setTimeout(() => {
        showToast('CSS Variables copied to clipboard');
    }, 1500);
}

// ===================================
// Site Actions Dropdown (Homepage Cards)
// ===================================
const siteActionBtns = document.querySelectorAll('.site-action-btn');
const siteActionsMenus = document.querySelectorAll('.site-actions-menu');

// Toggle dropdown on button click
siteActionBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Close all other dropdowns
        siteActionsMenus.forEach((menu, menuIndex) => {
            if (menuIndex !== index) {
                menu.classList.remove('active');
            }
        });

        // Toggle current dropdown
        siteActionsMenus[index]?.classList.toggle('active');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-actions-dropdown')) {
        siteActionsMenus.forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// Handle action option clicks
document.querySelectorAll('.site-action-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const action = option.dataset.action;
        const siteName = option.closest('.site-card').querySelector('.site-name')?.textContent || 'Site';

        // Close dropdown
        option.closest('.site-actions-menu')?.classList.remove('active');

        // Handle different actions
        switch(action) {
            case 'collection':
                showToast(`Added ${siteName} to collection`);
                break;
            case 'download':
                showToast(`Downloading ${siteName} PNG...`);
                setTimeout(() => {
                    showToast(`${siteName} PNG downloaded`);
                }, 1500);
                break;
        }
    });
});

// ===================================
// Console Welcome
// ===================================
console.log('%c DesignDNA ',
    'background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;'
);
console.log('See it. Understand it. Build it.');
console.log('Press ⌘K to search, ? for shortcuts');
