// State management
let fallaciesData = [];
let currentFallacy = null;

// DOM elements
const homeView = document.getElementById('home-view');
const detailView = document.getElementById('detail-view');
const backButton = document.getElementById('back-button');
const cardTemplate = document.getElementById('card-template');

// Initialize the app
async function init() {
    try {
        // Load fallacies data
        const response = await fetch('fallacies.json');
        const data = await response.json();
        fallaciesData = data.fallacies;
        
        // Set up routing
        setupRouting();
        
        // Handle initial route
        handleRoute();
        
        // Set up event listeners
        setupEventListeners();
    } catch (error) {
        console.error('Error loading fallacies:', error);
        showError('Failed to load fallacies. Please refresh the page.');
    }
}

// Set up routing
function setupRouting() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', handleRoute);
}

// Handle route changes
function handleRoute() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Check if we have a slug in the URL
    const pathParts = path.split('/').filter(part => part);
    const lastPart = pathParts[pathParts.length - 1];
    
    // Check both path and hash for slug
    let slug = null;
    if (lastPart && lastPart !== 'index.html' && !lastPart.includes('.')) {
        slug = lastPart;
    } else if (hash && hash.startsWith('#/')) {
        slug = hash.substring(2);
    }
    
    if (slug) {
        showFallacyBySlug(slug);
    } else {
        showHome();
    }
}

// Show home view with all fallacy cards
function showHome() {
    homeView.style.display = 'grid';
    detailView.style.display = 'none';
    currentFallacy = null;
    
    // Clear existing cards
    homeView.innerHTML = '';
    
    // Create cards for each fallacy
    fallaciesData.forEach(fallacy => {
        const card = createFallacyCard(fallacy);
        homeView.appendChild(card);
    });
    
    // Update page title
    document.title = 'Your Woke Fallacy Is';
    
    // Update URL without page reload
    if (window.location.hash) {
        history.pushState(null, '', window.location.pathname);
    }
}

// Create a fallacy card element
function createFallacyCard(fallacy) {
    const card = cardTemplate.content.cloneNode(true);
    const article = card.querySelector('.fallacy-card');
    
    // Set card content
    card.querySelector('.card-icon').textContent = fallacy.icon;
    card.querySelector('.card-title').textContent = fallacy.title;
    card.querySelector('.card-subtitle').textContent = fallacy.subtitle;
    card.querySelector('.card-tagline').textContent = fallacy.tagline;
    
    // Add click handler
    article.addEventListener('click', () => {
        showFallacy(fallacy);
    });
    
    return card;
}

// Show detail view for a specific fallacy
function showFallacy(fallacy) {
    currentFallacy = fallacy;
    
    // Update detail view content
    document.getElementById('detail-icon').textContent = fallacy.icon;
    document.getElementById('detail-title').textContent = fallacy.title;
    document.getElementById('detail-subtitle').textContent = fallacy.subtitle;
    document.getElementById('detail-tagline').textContent = fallacy.tagline;
    document.getElementById('detail-description').textContent = fallacy.description;
    document.getElementById('detail-example').textContent = fallacy.example;
    
    const sourceLink = document.getElementById('detail-source-link');
    sourceLink.textContent = fallacy.source;
    sourceLink.href = fallacy.sourceUrl;
    
    // Show detail view, hide home view
    homeView.style.display = 'none';
    detailView.style.display = 'block';
    
    // Update page title
    document.title = `${fallacy.title} - Your Woke Fallacy Is`;
    
    // Update URL
    history.pushState({ slug: fallacy.slug }, '', `#/${fallacy.slug}`);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show fallacy by slug
function showFallacyBySlug(slug) {
    const fallacy = fallaciesData.find(f => f.slug === slug);
    
    if (fallacy) {
        showFallacy(fallacy);
    } else {
        // Fallacy not found, show home
        showHome();
    }
}

// Set up event listeners
function setupEventListeners() {
    // Back button
    backButton.addEventListener('click', () => {
        showHome();
    });
    
    // Share on Twitter
    document.getElementById('share-twitter').addEventListener('click', () => {
        if (currentFallacy) {
            const text = `Your Woke Fallacy Is: ${currentFallacy.title}`;
            const url = window.location.href;
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            window.open(twitterUrl, '_blank', 'width=550,height=420');
        }
    });
    
    // Copy link
    document.getElementById('copy-link').addEventListener('click', async () => {
        const url = window.location.href;
        
        try {
            await navigator.clipboard.writeText(url);
            showToast('Link copied to clipboard!');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                showToast('Link copied to clipboard!');
            } catch (err) {
                showToast('Failed to copy link');
            }
            
            document.body.removeChild(textArea);
        }
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2700);
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'padding: 20px; background: #e74c3c; color: white; text-align: center; font-size: 1.1rem;';
    errorDiv.textContent = message;
    document.body.insertBefore(errorDiv, document.body.firstChild);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
