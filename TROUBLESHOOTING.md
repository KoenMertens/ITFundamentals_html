# Troubleshooting

## Probleem: Lege pagina / Niets zichtbaar

### Oorzaak 1: ES6 Modules met file:// protocol
**Symptoom**: Lege pagina, mogelijk CORS errors in console

**Oplossing**: Gebruik een lokale webserver (zie README.md)

### Oorzaak 2: JavaScript errors
**Symptoom**: Lege pagina, errors in browser console (F12)

**Oplossing**: 
1. Open browser console (F12)
2. Controleer op errors
3. Controleer of alle bestanden correct zijn geladen in Network tab

### Oorzaak 3: Router laadt niet
**Symptoom**: Lege pagina, geen errors

**Oplossing**: 
1. Controleer browser console voor errors
2. Controleer of `js/app.js` correct wordt geladen
3. Test in console: `document.getElementById('app')` - moet een element retourneren

## Debug stappen

1. **Open browser console** (F12)
2. **Controleer Network tab**:
   - Zijn alle `.js` bestanden geladen?
   - Zijn er 404 errors?
3. **Test in console**:
   ```javascript
   document.getElementById('app')
   // Moet een element retourneren, niet null
   ```
4. **Controleer routes**:
   ```javascript
   // In console na pagina laadt
   window.location.hash
   // Moet "#/" of "#/WholeNumberConverter" etc zijn
   ```

## Veelvoorkomende errors

### "Failed to load module script"
- **Oorzaak**: Gebruikt file:// protocol
- **Oplossing**: Gebruik lokale webserver

### "Cannot read property 'innerHTML' of null"
- **Oorzaak**: App element niet gevonden
- **Oplossing**: Controleer of `<article id="app">` in HTML staat

### "loadIndex is not a function"
- **Oorzaak**: Import error
- **Oplossing**: Controleer of alle bestanden in `js/pages/` aanwezig zijn

