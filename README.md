# Zlatá Lednice - Aplikace pro správu lednice a doporučování receptů

## Popis projektu

Webová aplikace, která pomáhá uživatelům spravovat suroviny v jejich lednici a navrhuje recepty na základě dostupných ingrediencí. Aplikace sleduje také ušetřenou částku a trvanlivost potravin.

## Struktura projektu

```
gastro/
├── frontend/          # React + Vite aplikace
├── backend/          # Node.js + Express server
├── docker-compose.yml # PostgreSQL setup
└── README.md
```

## Instalace a spuštění

### Požadavky

- Node.js (v14 nebo vyšší)
- PostgreSQL (v12 nebo vyšší) NEBO Docker + Docker Compose
- npm nebo yarn

### Možnost 1: Automatická instalace (Windows)

1. Spusť skript:
```bash
install.bat
```

Skript nainstauje všechny závislosti pro frontend i backend.

### Možnost 2: Automatická instalace (macOS/Linux)

1. Spusť skript:
```bash
bash install.sh
```

### Možnost 3: Manuální instalace

#### PostgreSQL Setup (pomocí Docker)

Jestli máš Docker, spusť:
```bash
docker-compose up -d
```

Jestli máš PostgreSQL instalovaný lokálně, vytvoř databázi:
```sql
CREATE DATABASE zlata_lednice;
```

#### Backend Setup

1. Přejdi do backend adresáře:
```bash
cd backend
```

2. Nainstaluj závislosti:
```bash
npm install
```

3. Vytvoř `.env` soubor (zkopíruj z `.env.example`):
```bash
cp .env.example .env
```

4. Nakonfiguruj v `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zlata_lednice
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=tvuj_tajny_klic_zde
NODE_ENV=development
PORT=5000
```

5. Spusť server:
```bash
npm run dev
```

Server běží na portu 5000.

#### Frontend Setup

1. Otevři nový terminál a přejdi do frontend adresáře:
```bash
cd frontend
```

2. Nainstaluj závislosti:
```bash
npm install
```

3. Spusť vývojový server:
```bash
npm run dev
```

Aplikace běží na `http://localhost:3000`

## Funkce aplikace

### 1. Přihlášení a Registrace
- Nový uživatel se může zaregistrovat
- Přihlášení pomocí emailu a hesla
- Bezpečné ukládání hesel (bcrypt)

### 2. Moje Lednice
- Přidávání surovin s množstvím, trvanlivostí a cenou
- Upravování a mazání surovin
- Rozbalovací seznam surovin
- Minimálně 3 suroviny pro doporučení receptů

### 3. Doporučení Receptů
- Rozbalovací kategorie:
  - Slané recepty
  - Sladké recepty
  - Recepty do 15 minut
  - Recepty, kde máš všechny suroviny
- Tlačítko pro náhodný recept
- Detailní pohled na recept s:
  - Časem přípravy
  - Seznamem surovin (které máš/nemáš)
  - Orientační cenou
  - Tlačítko "Hotovo" pro uložení

### 4. Ušetřeno
- Přehled ušetřených peněz
- Filtrování podle období:
  - Tento týden
  - Tento měsíc
  - Tento rok
  - Vše
- Celkové statistiky

### 5. Trvanlivost
- Chronologicky seřazené suroviny
- Od nejmenší trvanlivosti po největší
- Zvýraznění vypršelých potravin

### 6. Navigace
- Tlačítko zpět na každé stránce
- Odhlášení
- Intuitivní menu

## API Endpoints

### Autentifikace
- `POST /auth/register` - Registrace
- `POST /auth/login` - Přihlášení

### API (vyžaduje autentifikaci)
- `GET /api/recipes` - Získej všechny recepty
- `GET /api/recipes/random` - Náhodný recept
- `GET /api/ingredients` - Všechny ingredience
- `POST /api/fridge` - Přidej do lednice
- `GET /api/fridge` - Obsah lednice
- `PUT /api/fridge/:id` - Aktualizuj položku
- `DELETE /api/fridge/:id` - Smaž položku
- `POST /api/saved-recipes` - Uložit recept
- `GET /api/saved-recipes` - Uložené recepty
- `GET /api/savings` - Statistika ušetřených peněz

## Technologie

### Frontend
- React 18
- Vite
- Axios (HTTP client)
- CSS3

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (autentifikace)
- bcryptjs (šifrování hesel)

## Databázové tabulky

- `users` - Uživatelé
- `ingredients` - Seznam ingrediencí
- `fridge_items` - Suroviny v lednici
- `recipes` - Recepty
- `recipe_ingredients` - Ingredience receptů
- `saved_recipes` - Uložené recepty (statistika)

## Vývoj

### Frontend
- Hot reload při změně kódu
- Proxy na backend server

### Backend
- Nodemon pro automatické restartování
- Jest testy (připraveno)

## Troubleshooting

### Port je již obsazen

Jestli port 5000 nebo 3000 je již obsazen:

**Backend:**
```bash
# Změň PORT v .env
PORT=5001
```

**Frontend:**
```bash
# Změň port v vite.config.js
server: { port: 3001 }
```

### Chyba při připojení k databázi

Zkontroluj:
1. Je PostgreSQL spuštěný?
2. Jsou správné přihlašovací údaje v `.env`?
3. Existuje databáze `zlata_lednice`?

```bash
psql -U postgres
CREATE DATABASE zlata_lednice;
```

### CORS chyba

Zkontroluj, že jsou backend a frontend na správných portech a že proxy v `vite.config.js` je správně nastavený.

## Budoucí vylepšení

- [ ] Fotografování receptů
- [ ] Sdílení receptů
- [ ] Synchronizace s nákupními seznamy
- [ ] Notifikace o blížící se vypršení trvanlivosti
- [ ] Offline režim
- [ ] Mobilní aplikace
- [ ] Nákupní seznam
- [ ] Vlastní recepty

## Autor

Vytvořeno pro projekt Zlatá Lednice

## Licence

MIT
