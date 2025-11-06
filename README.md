# IT Fundamentals - HTML/JavaScript Version

This is a pure HTML and JavaScript version of the IT Fundamentals website, converted from the original Blazor application.

## Structure

- `index.html` - Main entry point
- `js/` - JavaScript modules
  - `app.js` - Main application entry point and routing
  - `router.js` - Client-side router
  - `util.js` - Utility functions for number conversions
  - `NumberConverter.js` - Whole number converter
  - `FractionConverter.js` - Fractional number converter
  - `SignNumberConverter.js` - Signed number converter
  - `IEEE754Converter.js` - IEEE-754 floating point converter
  - `TruthTableGenerator.js` - Truth table generator
  - `CRCCalculator.js` - CRC calculator
  - `HammingCodeCalculator.js` - Hamming code calculator
  - `pages/` - Page loaders for each route
- `css/` - Stylesheets
  - `app.css` - Main stylesheet

## How to Use

**BELANGRIJK**: ES6 modules werken niet met het `file://` protocol. Je hebt een lokale webserver nodig!

### Optie 1: Python (eenvoudigst)
```bash
cd ITFundamentals_html
python -m http.server 8000
```
Open dan: http://localhost:8000

### Optie 2: Node.js (http-server)
```bash
npm install -g http-server
cd ITFundamentals_html
http-server
```

### Optie 3: VS Code Live Server
- Installeer de "Live Server" extensie in VS Code
- Rechts-klik op `index.html` → "Open with Live Server"

### Optie 4: PHP
```bash
cd ITFundamentals_html
php -S localhost:8000
```

Na het starten van een server:
1. Open de URL in een moderne web browser
2. The application uses hash-based routing (e.g., `#/WholeNumberConverter`)
3. All functionality works client-side - no backend server required

## Features

- ✅ Whole Number Converter
- ✅ Signed Number Converter
- ✅ Fractional Number Converter
- ✅ IEEE-754 Floating Point Converter
- ✅ Truth Table Generator
- ✅ Veitch-Karnaugh Generator
- ✅ Hamming Code Calculator
- ✅ CRC Calculator

## Browser Compatibility

Requires a modern browser with ES6 module support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Notes

- All converters and calculators are fully functional
- The original Blazor version remains unchanged in the parent directory

## GitHub Pages Deployment

This repository can be deployed to GitHub Pages for free hosting:

1. Push this repository to GitHub
2. Go to Settings → Pages in your GitHub repository
3. Select the branch (usually `main` or `master`) and folder (`/` root)
4. Your site will be available at `https://[username].github.io/[repository-name]`

**Note**: GitHub Pages serves files over HTTPS, so ES6 modules will work correctly.

