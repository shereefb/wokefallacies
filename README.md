# Your Woke Fallacy Is

A collection of common logical fallacies in contemporary social justice discourse, inspired by [Your Logical Fallacy Is](https://yourlogicalfallacyis.com/).

## Overview

This website presents 12 common reasoning patterns and logical fallacies that appear in contemporary social justice discourse. Each fallacy is presented with:

- **Title and subtitle**: Clear identification of the fallacy
- **Tagline**: A one-sentence summary
- **Description**: Detailed explanation of the fallacy
- **Example**: A concrete illustration of the fallacy in action
- **Source**: Academic or journalistic reference

## Features

- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- 🔗 **Direct Links**: Each fallacy has its own URL (e.g., `#/disparity-discrimination`)
- 🎨 **Modern UI**: Clean, card-based interface inspired by yourlogicalfallacyis.com
- 📤 **Social Sharing**: Share fallacies on Twitter or copy direct links
- ⚡ **Fast & Lightweight**: Pure HTML, CSS, and JavaScript - no frameworks needed
- 🎯 **SEO Friendly**: Proper meta tags and semantic HTML

## Project Structure

```
wokefallacies/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js              # JavaScript for templating and routing
├── fallacies.json      # Data file containing all fallacies
├── fallacies.md        # Original markdown source
└── README.md           # This file
```

## Hosting on GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `wokefallacies` (or any name you prefer)
3. Make it public
4. Don't initialize with README (we already have one)

### Step 2: Push Your Code

```bash
# Navigate to your project directory
cd "/Users/teacher/Dropbox/My Mac (Shereefs-MacBook-Pro.local)/Documents/code/wokefallacies"

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Woke Fallacies website"

# Add your GitHub repository as remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/wokefallacies.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **main** branch
5. Click **Save**
6. Your site will be published at `https://USERNAME.github.io/wokefallacies/`

### Step 4: Custom Domain (Optional)

If you want to use a custom domain like `wokefallacy.com`:

1. Purchase a domain from a registrar (Namecheap, Google Domains, etc.)
2. In your repository settings under **Pages**, add your custom domain
3. Configure your DNS settings at your registrar:
   - Add a CNAME record pointing to `USERNAME.github.io`
   - Or add A records pointing to GitHub's IP addresses
4. Wait for DNS propagation (can take up to 48 hours)

## Local Development

To run the site locally:

1. **Simple HTTP Server** (Python 3):
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

2. **Using Node.js**:
   ```bash
   npx http-server
   ```

3. **Using PHP**:
   ```bash
   php -S localhost:8000
   ```

> **Note**: You need a local server because the site loads `fallacies.json` via fetch, which requires HTTP protocol.

## Adding New Fallacies

To add a new fallacy:

1. Open `fallacies.json`
2. Add a new object to the `fallacies` array with the following structure:

```json
{
  "id": 13,
  "slug": "your-fallacy-slug",
  "title": "Fallacy Title",
  "subtitle": "Subtitle or Category",
  "tagline": "One-line description",
  "description": "Detailed explanation of the fallacy...",
  "example": "A concrete example illustrating the fallacy...",
  "icon": "🎯",
  "source": "Source Name",
  "sourceUrl": "https://source-url.com"
}
```

3. Save the file and refresh your browser

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Main dark color */
    --secondary-color: #e74c3c;    /* Accent red */
    --accent-color: #3498db;       /* Links and buttons */
    --background-color: #ecf0f1;   /* Page background */
    --card-background: #ffffff;    /* Card background */
}
```

### Changing Icons

Edit the `icon` field in `fallacies.json`. You can use any emoji or Unicode character.

### Modifying Layout

The grid layout is controlled in `styles.css`:

```css
.fallacy-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5**: Semantic markup with template elements
- **CSS3**: Grid layout, flexbox, custom properties, animations
- **Vanilla JavaScript**: ES6+ features, Fetch API, History API
- **JSON**: Data storage and templating

## Credits

- Inspired by [Your Logical Fallacy Is](https://yourlogicalfallacyis.com/)
- Fallacy content based on academic sources and contemporary discourse analysis
- Design influenced by modern card-based UI patterns

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request with:

- New fallacies
- Improved descriptions or examples
- Bug fixes
- Design improvements

## Contact

For questions or suggestions, please open an issue on GitHub.
