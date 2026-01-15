/* ===================================
   Component Detail Page JavaScript
   =================================== */

// ===================================
// Background Toggle
// ===================================
const bgBtns = document.querySelectorAll('.bg-btn');
const previewCanvas = document.querySelector('.preview-canvas');

bgBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        bgBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        previewCanvas.dataset.bg = btn.dataset.bg;
    });
});

// ===================================
// Variant Selection
// ===================================
const variantCards = document.querySelectorAll('.variant-card');
const livePreviewBtn = document.getElementById('live-preview-btn');

variantCards.forEach(card => {
    card.addEventListener('click', () => {
        variantCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const variant = card.dataset.variant;
        updateLivePreview(variant);
        updateCodePreview(variant);
    });
});

function updateLivePreview(variant) {
    // Reset classes
    livePreviewBtn.className = 'stripe-btn';

    // Apply variant class
    livePreviewBtn.classList.add(`stripe-btn-${variant}`);

    // Update button text based on variant
    const variantTexts = {
        primary: 'Get started',
        secondary: 'Learn more',
        outline: 'View docs',
        ghost: 'Skip',
        destructive: 'Delete',
        link: 'Learn more →'
    };

    livePreviewBtn.innerHTML = variant === 'primary' ?
        `${variantTexts[variant]}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
        </svg>` :
        variantTexts[variant] || 'Button';
}

// ===================================
// Export Tab Switching
// ===================================
const exportTabs = document.querySelectorAll('.export-tab');
const codePreview = document.getElementById('code-preview');

const codeSnippets = {
    react: {
        primary: `<span class="code-keyword">import</span> { Button } <span class="code-keyword">from</span> <span class="code-string">'./components/Button'</span>

<span class="code-comment">// Primary button</span>
<span class="code-tag">&lt;Button</span>
  <span class="code-attr">variant</span>=<span class="code-string">"primary"</span>
  <span class="code-attr">size</span>=<span class="code-string">"md"</span>
  <span class="code-attr">rightIcon</span>={<span class="code-tag">&lt;ArrowRight /&gt;</span>}
<span class="code-tag">&gt;</span>
  Get started
<span class="code-tag">&lt;/Button&gt;</span>`,
        secondary: `<span class="code-keyword">import</span> { Button } <span class="code-keyword">from</span> <span class="code-string">'./components/Button'</span>

<span class="code-comment">// Secondary button</span>
<span class="code-tag">&lt;Button</span>
  <span class="code-attr">variant</span>=<span class="code-string">"secondary"</span>
  <span class="code-attr">size</span>=<span class="code-string">"md"</span>
<span class="code-tag">&gt;</span>
  Learn more
<span class="code-tag">&lt;/Button&gt;</span>`,
        outline: `<span class="code-keyword">import</span> { Button } <span class="code-keyword">from</span> <span class="code-string">'./components/Button'</span>

<span class="code-comment">// Outline button</span>
<span class="code-tag">&lt;Button</span>
  <span class="code-attr">variant</span>=<span class="code-string">"outline"</span>
  <span class="code-attr">size</span>=<span class="code-string">"md"</span>
<span class="code-tag">&gt;</span>
  View docs
<span class="code-tag">&lt;/Button&gt;</span>`
    },
    html: {
        primary: `<span class="code-comment">&lt;!-- Primary button --&gt;</span>
<span class="code-tag">&lt;button</span> <span class="code-attr">class</span>=<span class="code-string">"btn btn-primary"</span><span class="code-tag">&gt;</span>
  Get started
  <span class="code-tag">&lt;svg</span> <span class="code-attr">class</span>=<span class="code-string">"icon"</span><span class="code-tag">&gt;</span>...<span class="code-tag">&lt;/svg&gt;</span>
<span class="code-tag">&lt;/button&gt;</span>

<span class="code-comment">&lt;!-- CSS Variables --&gt;</span>
<span class="code-tag">&lt;style&gt;</span>
.btn-primary {
  <span class="code-attr">background</span>: <span class="code-string">#635bff</span>;
  <span class="code-attr">color</span>: <span class="code-string">white</span>;
  <span class="code-attr">padding</span>: <span class="code-string">12px 24px</span>;
  <span class="code-attr">border-radius</span>: <span class="code-string">8px</span>;
}
<span class="code-tag">&lt;/style&gt;</span>`
    },
    figma: {
        primary: `<span class="code-comment">// Figma Plugin Code</span>
<span class="code-keyword">const</span> button = figma.createComponent()
button.name = <span class="code-string">"Button/Primary"</span>

<span class="code-comment">// Set properties</span>
button.fills = [{
  type: <span class="code-string">'SOLID'</span>,
  color: { r: 0.39, g: 0.36, b: 1 }
}]
button.cornerRadius = <span class="code-string">8</span>

<span class="code-comment">// Add text</span>
<span class="code-keyword">const</span> text = figma.createText()
text.characters = <span class="code-string">"Get started"</span>
text.fills = [{ type: <span class="code-string">'SOLID'</span>, color: { r: 1, g: 1, b: 1 } }]`
    }
};

exportTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        exportTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const exportType = tab.dataset.export;
        updateCodePreview(null, exportType);
    });
});

function updateCodePreview(variant, exportType) {
    // Get current variant
    const activeVariant = document.querySelector('.variant-card.active');
    const currentVariant = variant || (activeVariant ? activeVariant.dataset.variant : 'primary');

    // Get current export type
    const activeExportTab = document.querySelector('.export-tab.active');
    const currentExport = exportType || (activeExportTab ? activeExportTab.dataset.export : 'react');

    // Get code snippet
    const snippets = codeSnippets[currentExport];
    const code = snippets[currentVariant] || snippets.primary || snippets;

    codePreview.innerHTML = `<pre><code class="language-jsx">${code}</code></pre>`;
}

// ===================================
// Copy Code
// ===================================
const copyCodeBtn = document.getElementById('copy-code');

copyCodeBtn?.addEventListener('click', () => {
    const code = codePreview.textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!');

        // Visual feedback
        const originalHTML = copyCodeBtn.innerHTML;
        copyCodeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Copied!
        `;
        setTimeout(() => {
            copyCodeBtn.innerHTML = originalHTML;
        }, 2000);
    });
});

// ===================================
// Download Component
// ===================================
const downloadBtn = document.getElementById('download-component');

downloadBtn?.addEventListener('click', () => {
    showToast('Preparing component files...');

    // Simulate download preparation
    setTimeout(() => {
        showToast('Download started: stripe-button.zip');
    }, 500);
});

// ===================================
// Copy AI Context (Reverse Prompt)
// ===================================
const copyAIContextBtn = document.getElementById('copy-ai-context');

const reversePrompt = `Create a button component matching Stripe's design system:

VISUAL SPECIFICATIONS:
- Background: #635BFF (Stripe's signature purple)
- Text: White (#FFFFFF), Inter font, 600 weight, 15px
- Border radius: 8px
- Padding: 12px vertical, 24px horizontal
- Shadow: 0 4px 6px rgba(99, 91, 255, 0.25)

STATES:
- Hover: Lighten to #7A73FF, translateY(-1px), increase shadow
- Active: Darken to #5046E5, translateY(0), reduce shadow
- Disabled: #A5A3FF with 60% opacity, no shadow, cursor: not-allowed

VARIANTS:
- Primary: Purple background, white text
- Secondary: Dark navy (#0A2540) background
- Outline: Transparent with purple border and text
- Ghost: Transparent with muted text
- Destructive: Red (#DF1B41) background
- Link: No background, purple text, underline on hover

SIZES:
- Small: 32px height, 12px 16px padding, 13px font
- Medium: 44px height, 12px 24px padding, 15px font
- Large: 52px height, 16px 32px padding, 17px font

ANIMATION:
- Transition: all 150ms ease
- Subtle lift effect on hover

Include support for icons (left/right) with 8px gap.`;

copyAIContextBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(reversePrompt).then(() => {
        showToast('Reverse prompt copied! Paste into Claude or Cursor.');

        // Visual feedback
        const originalHTML = copyAIContextBtn.innerHTML;
        copyAIContextBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Copied!
        `;
        setTimeout(() => {
            copyAIContextBtn.innerHTML = originalHTML;
        }, 2000);
    });
});

// ===================================
// Save Component
// ===================================
const saveComponentBtn = document.getElementById('save-component');
let isSaved = false;

saveComponentBtn?.addEventListener('click', () => {
    isSaved = !isSaved;

    if (isSaved) {
        saveComponentBtn.classList.add('active');
        saveComponentBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            Saved
        `;
        showToast('Component saved to collection');
    } else {
        saveComponentBtn.classList.remove('active');
        saveComponentBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            Save
        `;
        showToast('Component removed from collection');
    }
});

// ===================================
// Compare Button
// ===================================
const compareBtn = document.getElementById('compare-btn');

compareBtn?.addEventListener('click', () => {
    showToast('Compare mode: Select another component to compare');
    compareBtn.classList.toggle('active');
});

// ===================================
// Color Swatch Copy
// ===================================
document.querySelectorAll('.spec-color .color-swatch').forEach(swatch => {
    swatch.style.cursor = 'pointer';
    swatch.addEventListener('click', () => {
        const colorValue = swatch.nextElementSibling.textContent;
        navigator.clipboard.writeText(colorValue).then(() => {
            showToast(`Copied: ${colorValue}`);
        });
    });
});

// ===================================
// Toast Function (fallback if not in main script)
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

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states
    const firstVariant = document.querySelector('.variant-card');
    if (firstVariant && !document.querySelector('.variant-card.active')) {
        firstVariant.classList.add('active');
    }
});
