// Static site generator - creates individual HTML pages for each fallacy
const fs = require('fs');
const path = require('path');

// Read the fallacies data
const fallaciesData = JSON.parse(fs.readFileSync('fallacies.json', 'utf8'));

// Read the base template
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Function to generate HTML for a single fallacy page
function generateFallacyPage(fallacy) {
    // Create a modified version of index.html for this fallacy
    let html = indexHtml;
    
    // Update the title
    html = html.replace(
        '<title>Your Woke Fallacy Is</title>',
        `<title>${fallacy.title} - Your Woke Fallacy Is</title>`
    );
    
    // Update the meta description
    html = html.replace(
        '<meta name="description" content="A collection of common logical fallacies in contemporary social justice discourse">',
        `<meta name="description" content="${fallacy.tagline} - ${fallacy.description.substring(0, 150)}...">`
    );
    
    // Add Open Graph meta tags for better social sharing
    const ogTags = `
    <meta property="og:title" content="${fallacy.title}">
    <meta property="og:description" content="${fallacy.tagline}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://wokefallacies.org/${fallacy.slug}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${fallacy.title}">
    <meta name="twitter:description" content="${fallacy.tagline}">`;
    
    html = html.replace('</head>', `${ogTags}\n</head>`);
    
    // Add a script to automatically show this fallacy
    const autoShowScript = `
    <script>
        // Automatically show this fallacy when the page loads
        window.INITIAL_FALLACY_SLUG = '${fallacy.slug}';
    </script>`;
    
    html = html.replace('</head>', `${autoShowScript}\n</head>`);
    
    return html;
}

// Create a directory for fallacy pages if it doesn't exist
const fallaciesDir = path.join(__dirname, 'fallacies');
if (!fs.existsSync(fallaciesDir)) {
    fs.mkdirSync(fallaciesDir);
}

// Generate a page for each fallacy
fallaciesData.fallacies.forEach(fallacy => {
    const html = generateFallacyPage(fallacy);
    const filename = path.join(__dirname, `${fallacy.slug}.html`);
    fs.writeFileSync(filename, html);
    console.log(`Generated: ${fallacy.slug}.html`);
});

console.log(`\n✅ Generated ${fallaciesData.fallacies.length} fallacy pages!`);
