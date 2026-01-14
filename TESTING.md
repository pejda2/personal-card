# Testovací Případ - Zlatá Lednice

## Test Plán

### 1. Registrace a Přihlášení

#### Test 1.1: Registrace nového uživatele
- [ ] Klikni na "VSTOUPIT"
- [ ] Vidíš přihlašovací formulář
- [ ] Klikni na "Registruj se"
- [ ] Vyplň email, jméno, heslo
- [ ] Klikni "Registrovat se"
- [ ] Měl by se přihlásit a vidíš hlavní menu

#### Test 1.2: Přihlášení
- [ ] Klikni na "VSTOUPIT"
- [ ] Vyplň existující email a heslo
- [ ] Klikni "Přihlásit se"
- [ ] Měl by ses přihlásit a vidíš hlavní menu

#### Test 1.3: Chybné přihlášení
- [ ] Vyplň špatný email
- [ ] Měla by se zobrazit chyba

### 2. Moje Lednice

#### Test 2.1: Přidání suroviny
- [ ] Klikni "Moje Lednice"
- [ ] Vyber surovinu z dropdown menu
- [ ] Vyplň množství (např. 500)
- [ ] Vyplň datum vypršení (např. 2026-02-14)
- [ ] Vyplň cenu (např. 100)
- [ ] Klikni "Přidat"
- [ ] Surovina se zobrazí v seznamu

#### Test 2.2: Rozbalení detailu suroviny
- [ ] Klikni na přidanou surovinu
- [ ] Měl by se zobrazit detail s trvanlivostí a cenou

#### Test 2.3: Smazání suroviny
- [ ] Klikni na surovinu pro rozbalení
- [ ] Klikni "Smazat"
- [ ] Surovina zmizí ze seznamu

#### Test 2.4: Přidání 3 surovin a tlačítko Doporučit
- [ ] Přidej 3 různé suroviny
- [ ] Mělo by se objevit tlačítko "Doporučit recept"
- [ ] Klikni na něj
- [ ] Přesune tě to na stránku s recepty

### 3. Doporučení Receptů

#### Test 3.1: Zobrazení receptů
- [ ] Vidíš kategorie (Slané, Sladké, Do 15 minut, Máš všechny suroviny)
- [ ] Klikni na kategorii pro rozbalení

#### Test 3.2: Náhodný recept
- [ ] Klikni na "🎲 Náhodný recept"
- [ ] Měl by se náhodně vybrat recept

#### Test 3.3: Detailní pohled na recept
- [ ] Klikni na libovolný recept
- [ ] Vidíš:
  - Název receptu
  - Čas přípravy
  - Kategorie
  - Cenu
  - Seznam ingrediencí (✓ máš, ✗ chybí)

#### Test 3.4: Hotovo recept
- [ ] Klikni "Hotovo"
- [ ] Přesune tě to na "Ušetřeno"

### 4. Ušetřeno

#### Test 4.1: Zobrazení statistiky
- [ ] Vidíš celkem ušetřeno (Kč)
- [ ] Vidíš počet receptů

#### Test 4.2: Filtrování
- [ ] Vyber "Tento týden"
- [ ] Vyber "Tento měsíc"
- [ ] Vyber "Tento rok"
- [ ] Vyber "Vše"
- [ ] Statistika by měla změnit podle období

### 5. Trvanlivost

#### Test 5.1: Zobrazení receptů
- [ ] Klikni "Trvanlivost"
- [ ] Vidíš seznam surovin seřazených podle data vypršení
- [ ] Suroviny s nejmenší trvanlivostí jsou nahoře

#### Test 5.2: Vizualizace vypršení
- [ ] Suroviny bez data: "Bez data trvanlivosti"
- [ ] Platné suroviny: "X dní do vypršení"
- [ ] Vypršelé suroviny: "Expirováno!"

### 6. Navigace

#### Test 6.1: Tlačítko zpět
- [ ] Na každé stránce je tlačítko "← Zpět"
- [ ] Funguje správně a vrátí tě na předchozí stránku

#### Test 6.2: Odhlášení
- [ ] Na hlavním menu klikni "Odhlásit"
- [ ] Vrátí tě na domovskou stránku
- [ ] Přihlášení je zrušeno

### 7. Responsive Design

#### Test 7.1: Desktop
- [ ] Aplikace se zobrazuje správně na 1920x1080
- [ ] Všechna tlačítka fungují

#### Test 7.2: Tablet
- [ ] Aplikace se zobrazuje správně na 768x1024
- [ ] Layout je odpovídající

#### Test 7.3: Mobile
- [ ] Aplikace se zobrazuje správně na 375x667
- [ ] Všechna funkce funguje

### 8. Edge Cases

#### Test 8.1: Přidání více surovin stejného typu
- [ ] Přidej stejnou surovinu 2x s různým množstvím
- [ ] Měly by se zobrazit obě položky

#### Test 8.2: Velmi dlouhé názvy
- [ ] Přidej surovinu s dlouhým názvem
- [ ] Text by měl být správně zalamován

#### Test 8.3: Výkon se 100 surovinami
- [ ] Přidej řadu surovin
- [ ] Aplikace by měla zůstat responzivní

## Checklisty

### ✅ Frontend
- [ ] Registrace funguje
- [ ] Přihlášení funguje
- [ ] Moje lednice je plně funkční
- [ ] Doporučení receptů funguje
- [ ] Ušetřeno zobrazuje správné údaje
- [ ] Trvanlivost je seřazena správně
- [ ] Navigace funguje
- [ ] Responsive design je OK
- [ ] Všechny chyby se zobrazují

### ✅ Backend
- [ ] Register endpoint funguje
- [ ] Login endpoint funguje
- [ ] GET /api/recipes vrací recepty
- [ ] GET /api/ingredients vrací ingredience
- [ ] POST /api/fridge přidává položky
- [ ] GET /api/fridge vrací items
- [ ] DELETE /api/fridge smaže items
- [ ] JWT autentifikace funguje

### ✅ Database
- [ ] Tabulky se vytvoří automaticky
- [ ] Data se správně ukládají
- [ ] Relace fungují
- [ ] Indexy jsou na místě

## Hlášení Chyb

Pokud najdeš bug, prosím zaznamenej:

1. **Co se stalo:**
   - Kroky pro reprodukci
   - Co ses očekával
   - Co se místo toho stalo

2. **Prostředí:**
   - Prohlížeč
   - Operační systém
   - Verze aplikace

3. **Logy:**
   - Browser console (F12)
   - Backend logy (npm run dev output)

## Performance Expectations

- Page load: < 2 sekundy
- Interakce: < 500ms
- API odpověď: < 1 sekunda
