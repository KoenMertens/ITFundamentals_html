# Testplan IT Fundamentals HTML/JavaScript

## Test Checklist

### Basis Functionaliteit
- [ ] **Index pagina laadt correct**
  - Open `index.html` in browser
  - Controleer of home pagina zichtbaar is
  - Controleer of alle links werken

- [ ] **Navigatie werkt**
  - Klik op elke link in het menu
  - Controleer of de juiste pagina laadt
  - Controleer of de actieve link wordt gemarkeerd

### Number Converters

- [ ] **Whole Number Converter**
  - Test: Input "1010" (Binary) → Controleer Decimal = 10, Octal = 12, Hex = A
  - Test: Input "255" (Decimal) → Controleer Binary, Octal, Hex
  - Test: Input "FF" (Hexadecimal) → Controleer alle conversies
  - Test: Input "777" (Octal) → Controleer alle conversies

- [ ] **Signed Number Converter**
  - Test: Input "127" (Decimal) → Controleer Sign-Magnitude, Excess-127, Two's Complement
  - Test: Input "-128" (Decimal) → Controleer Two's Complement = 10000000
  - Test: Input "10000000" (Two's Complement) → Controleer Decimal = -128
  - Test: Input "01111111" (Sign-Magnitude) → Controleer Decimal = 127

- [ ] **Fractional Converter**
  - Test: Input "10.5" (Decimal) → Controleer Binary, Octal, Hex
  - Test: Input "1010.1" (Binary) → Controleer Decimal
  - Test: Input met komma separator "10,5" → Werkt dit ook?

- [ ] **IEEE-754 Floating Point Converter**
  - Test: Input "1.5" → Controleer Sign Bit, Exponent, Mantissa, Binary
  - Test: Input "-0.5" → Controleer negatieve waarden
  - Test: Input "0" → Controleer edge case

### Advanced Tools

- [ ] **Truth Table Generator**
  - Test: Input "p and q" → Controleer truth table
  - Test: Input "p or q" → Controleer truth table
  - Test: Input "not p" → Controleer truth table
  - Test: Input "p -> q" → Controleer implicatie
  - Test: Input "p <-> q" → Controleer equivalentie
  - Test: Input met 3 variabelen "p and q and s"

- [ ] **Veitch-Karnaugh Generator**
  - Test: Input "x*y" met 2 variabelen → Controleer DNF, CNF, Minimal Expression, Diagram
  - Test: Input "x+y" met 2 variabelen → Controleer diagram
  - Test: Input "x*y + ~x*z" met 3 variabelen → Controleer volledige output
  - Test: Variabele detectie → Controleer of detectie werkt
  - Test: Validatie → Controleer of foutmeldingen verschijnen bij verkeerd aantal variabelen

- [ ] **Hamming Code Calculator**
  - Test: Input "1011" → Controleer Hamming Code, Data Bits, Parity Bits
  - Test: Input "101101" → Controleer voor langere input
  - Test: Input "1" → Controleer edge case
  - Test: Input met alleen 0's → Controleer edge case
  - Test: Visualisatie → Controleer of grid correct wordt weergegeven

- [ ] **CRC Calculator**
  - Test: Input Data "101101", Polynomial "1101" → Controleer CRC Checksum
  - Test: Input Data "101101", Polynomial "1011" → Controleer verschillende polynomial
  - Test: Validatie → Controleer of alleen 0's en 1's worden geaccepteerd

### Edge Cases & Error Handling

- [ ] **Lege input**
  - Test alle converters met lege input → Controleer foutmeldingen

- [ ] **Ongeldige input**
  - Test: Letters in number converters → Controleer foutmeldingen
  - Test: Te lange input → Controleer limieten
  - Test: Speciale karakters → Controleer validatie

- [ ] **Browser Compatibiliteit**
  - Test in Chrome/Edge (latest)
  - Test in Firefox (latest)
  - Test in Safari (latest)

### UI/UX

- [ ] **Responsive Design**
  - Test op desktop (1920x1080)
  - Test op tablet (768x1024)
  - Test op mobile (375x667)
  - Controleer of sidebar correct werkt op mobile

- [ ] **Styling**
  - Controleer of alle styling correct wordt geladen
  - Controleer of Font Awesome icons werken
  - Controleer of Bootstrap styling correct is

## Bekende Issues

Geen bekende issues op dit moment.

## Test Resultaten

Datum: _______________
Tester: _______________

### Resultaten per Component:
- [ ] Index: ✅ / ❌
- [ ] Whole Number Converter: ✅ / ❌
- [ ] Signed Number Converter: ✅ / ❌
- [ ] Fractional Converter: ✅ / ❌
- [ ] Floating Point Converter: ✅ / ❌
- [ ] Truth Table Generator: ✅ / ❌
- [ ] Veitch-Karnaugh Generator: ✅ / ❌
- [ ] Hamming Code: ✅ / ❌
- [ ] CRC Calculator: ✅ / ❌

### Opmerkingen:
_________________________________________________
_________________________________________________
_________________________________________________

