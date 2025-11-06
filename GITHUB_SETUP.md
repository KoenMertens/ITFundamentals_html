# GitHub Setup Instructies

## Stap 1: Maak een nieuwe repository op GitHub

1. Ga naar [GitHub.com](https://github.com) en log in
2. Klik op het **+** icoon rechtsboven → **New repository**
3. Vul in:
   - **Repository name**: `ITFundamentals_html` (of een andere naam naar keuze)
   - **Description**: "HTML/JavaScript version of IT Fundamentals educational website"
   - **Visibility**: Public (voor GitHub Pages) of Private
   - **DON'T** initialiseer met README, .gitignore of license (we hebben deze al)
4. Klik op **Create repository**

## Stap 2: Koppel lokale repository aan GitHub

Na het aanmaken van de repository, GitHub toont instructies. Gebruik deze commando's:

```bash
# Voeg de remote repository toe (vervang [username] met je GitHub username)
git remote add origin https://github.com/[username]/ITFundamentals_html.git

# Hernoem branch naar 'main' als nodig (GitHub gebruikt vaak 'main' in plaats van 'master')
git branch -M main

# Push de code naar GitHub
git push -u origin main
```

**Als je branch 'master' heet en GitHub 'main' verwacht:**
```bash
git branch -M main
git push -u origin main
```

**Als je branch al 'main' heet:**
```bash
git push -u origin main
```

## Stap 3: Activeer GitHub Pages

1. Ga naar je repository op GitHub
2. Klik op **Settings** (bovenaan de repository pagina)
3. Scroll naar **Pages** in het linker menu
4. Onder **Source**, selecteer:
   - **Branch**: `main` (of `master`)
   - **Folder**: `/` (root)
5. Klik op **Save**
6. Wacht een paar minuten - GitHub Pages wordt geactiveerd
7. Je site is beschikbaar op: `https://[username].github.io/ITFundamentals_html`

## Stap 4: Toekomstige updates

Wanneer je wijzigingen maakt:

```bash
git add .
git commit -m "Beschrijving van je wijzigingen"
git push
```

GitHub Pages wordt automatisch bijgewerkt binnen een paar minuten.

## Troubleshooting

**Probleem**: `git push` vraagt om authenticatie
- **Oplossing**: Gebruik een Personal Access Token of SSH key
- Zie: https://docs.github.com/en/authentication

**Probleem**: GitHub Pages werkt niet
- Controleer of de branch naam correct is (`main` of `master`)
- Controleer of de root folder correct is geselecteerd
- Wacht 5-10 minuten na het activeren

**Probleem**: Site laadt niet correct
- Controleer de browser console voor errors
- Zorg dat alle bestanden correct zijn gecommit en gepusht
- GitHub Pages serveert over HTTPS, dus ES6 modules werken correct

