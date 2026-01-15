/* ===================================
   Flow Detail Page JavaScript
   =================================== */

// ===================================
// Step Navigation
// ===================================
const stepNavBtns = document.querySelectorAll('.step-nav-btn');
const flowSteps = document.querySelectorAll('.flow-step');

stepNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const stepNum = btn.dataset.step;
        navigateToStep(stepNum);
    });
});

function navigateToStep(stepNum) {
    // Update nav buttons
    stepNavBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.step === stepNum) {
            btn.classList.add('active');
        }
    });

    // Highlight the selected step card
    flowSteps.forEach(step => {
        step.classList.remove('active');
        const stepCard = step.querySelector('.step-card');
        if (step.dataset.step === stepNum) {
            step.classList.add('active');
            // Scroll to step
            stepCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add highlight animation
            stepCard.style.transform = 'scale(1.02)';
            stepCard.style.boxShadow = 'var(--shadow-xl), 0 0 0 2px var(--color-accent)';
            setTimeout(() => {
                stepCard.style.transform = '';
                stepCard.style.boxShadow = '';
            }, 1000);
        }
    });

    showToast(`Viewing Step ${stepNum}`);
}

// ===================================
// View Toggle (Canvas/Linear)
// ===================================
const viewCanvasBtn = document.getElementById('view-canvas');
const viewLinearBtn = document.getElementById('view-linear');
const flowCanvas = document.getElementById('flow-canvas');

viewCanvasBtn?.addEventListener('click', () => {
    viewCanvasBtn.classList.add('active');
    viewLinearBtn.classList.remove('active');
    flowCanvas.classList.remove('linear-view');
    showToast('Canvas View');
});

viewLinearBtn?.addEventListener('click', () => {
    viewLinearBtn.classList.add('active');
    viewCanvasBtn.classList.remove('active');
    flowCanvas.classList.add('linear-view');
    showToast('Linear View');
});

// ===================================
// Step Card Interactions
// ===================================
const stepCards = document.querySelectorAll('.step-card');

stepCards.forEach(card => {
    card.addEventListener('click', () => {
        const step = card.closest('.flow-step');
        const stepNum = step.dataset.step;
        navigateToStep(stepNum);
    });

    // Hover effects
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Export Options
// ===================================
const exportBtns = document.querySelectorAll('.export-option-btn');

exportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const exportType = btn.textContent.trim();
        showToast(`Exporting: ${exportType}`);
        // Simulate export
        btn.style.background = 'var(--color-accent)';
        btn.style.color = 'white';
        btn.style.borderColor = 'var(--color-accent)';
        setTimeout(() => {
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 1000);
    });
});

// ===================================
// Component Items
// ===================================
const componentItems = document.querySelectorAll('.component-item');

componentItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const componentName = item.querySelector('.component-name').textContent;
        showToast(`Opening: ${componentName}`);
    });
});

// ===================================
// Similar Flows
// ===================================
const similarFlowCards = document.querySelectorAll('.similar-flow-card');

similarFlowCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const flowName = card.querySelector('.similar-flow-name').textContent;
        showToast(`Loading: ${flowName}`);
    });
});

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    const currentStep = document.querySelector('.step-nav-btn.active');
    const currentStepNum = parseInt(currentStep?.dataset.step || 1);

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextStep = Math.min(6, currentStepNum + 1);
        navigateToStep(nextStep.toString());
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevStep = Math.max(1, currentStepNum - 1);
        navigateToStep(prevStep.toString());
    }
});

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
    // Animate step cards on load
    const cards = document.querySelectorAll('.step-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });

    // Animate connectors
    const connectors = document.querySelectorAll('.step-connector-line');
    connectors.forEach((connector, index) => {
        connector.style.opacity = '0';
        setTimeout(() => {
            connector.style.transition = 'opacity 0.3s ease';
            connector.style.opacity = '1';
        }, 300 + (index * 100));
    });
});
