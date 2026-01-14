# Struktura Projektu - Zlatá Lednice

```
gastro/
│
├── 📄 README.md                    # Hlavní dokumentace
├── 📄 QUICK_START.md              # Rychlý start guide
├── 📄 DEPLOYMENT.md               # Deployment instrukce
├── 📄 CONTRIBUTING.md             # Příspěvování do projektu
├── 📄 TESTING.md                  # Test plán
├── 📄 ARCHITECTURE.md             # Architektura aplikace
├── 📄 PROJECT_CHECKLIST.md        # Projekt checklist
├── 📄 CONTRIBUTING.md             # Příspěvování guidelines
├── 📄 FILE_STRUCTURE.md           # Tento soubor
│
├── 📁 frontend/                   # React aplikace
│   ├── 📄 package.json            # Dependencies
│   ├── 📄 vite.config.js          # Vite config
│   ├── 📄 index.html              # HTML entry point
│   ├── 📄 Dockerfile              # Docker image
│   ├── 📄 nginx.conf              # Nginx config (production)
│   ├── 📄 .env.example            # Environment variables
│   │
│   └── 📁 src/
│       ├── 📄 main.jsx            # React entry point
│       ├── 📄 App.jsx             # Main component
│       │
│       ├── 📁 components/         # React komponenty
│       │   ├── Home.jsx           # Úvodní stránka
│       │   ├── Login.jsx          # Přihlášení
│       │   ├── Register.jsx       # Registrace
│       │   ├── MainMenu.jsx       # Hlavní menu
│       │   ├── Fridge.jsx         # Správa lednice
│       │   ├── Recipes.jsx        # Doporučení receptů
│       │   ├── Savings.jsx        # Statistika ušetřená
│       │   └── Expiration.jsx     # Trvanlivost
│       │
│       ├── 📁 context/            # Context API
│       │   └── AuthContext.jsx    # Autentifikace context
│       │
│       └── 📁 styles/             # CSS soubory
│           ├── index.css          # Base styles
│           ├── App.css            # App styles
│           ├── Home.css           # Home styles
│           ├── Auth.css           # Auth styles
│           ├── Main.css           # Main menu styles
│           ├── Fridge.css         # Fridge styles
│           ├── Recipes.css        # Recipes styles
│           ├── Savings.css        # Savings styles
│           └── Expiration.css     # Expiration styles
│
├── 📁 backend/                    # Node.js API
│   ├── 📄 package.json            # Dependencies
│   ├── 📄 Dockerfile              # Docker image
│   ├── 📄 .env.example            # Environment variables
│   │
│   └── 📁 src/
│       ├── 📄 index.js            # Entry point
│       │
│       ├── 📁 config/
│       │   └── database.js        # PostgreSQL config
│       │
│       ├── 📁 middleware/
│       │   └── auth.js            # JWT middleware
│       │
│       ├── 📁 routes/
│       │   ├── auth.js            # Auth routes
│       │   └── api.js             # API routes
│       │
│       ├── 📁 controllers/        # (Pro budoucnost)
│       │   └── (prázdná)
│       │
│       └── 📁 models/
│           └── recipes.js         # Recepty a ingredience
│
├── 📄 docker-compose.yml          # Dev docker compose
├── 📄 docker-compose.prod.yml     # Production docker compose
│
├── 📄 init_data.sql               # Inicializační SQL data
│
├── 📄 install.sh                  # Install script (macOS/Linux)
├── 📄 install.bat                 # Install script (Windows)
│
└── 📄 .gitignore                  # Git ignore file
```

## Popis Složek

### frontend/
Kompletní React aplikace s Vite bundler.

**Klíčové soubory:**
- `package.json` - npm dependencies (React, Axios, Vite)
- `vite.config.js` - Vite konfigurace s proxy na backend
- `index.html` - HTML root element
- `src/App.jsx` - Main React component s routingem

**Komponenty:**
- **Home** - Landing page s logem a tlačítkem vstoupit
- **Login/Register** - Autentifikace
- **MainMenu** - Nabídka tří hlavních sekcí
- **Fridge** - CRUD pro suroviny v lednici
- **Recipes** - Zobrazení a filtrování receptů
- **Savings** - Statistika ušetřených peněz
- **Expiration** - Seznam surovin seřazené podle trvanlivosti

### backend/
Node.js + Express server s PostgreSQL databází.

**Struktura:**
- `src/index.js` - Server entry point
- `src/routes/` - Definice API endpoints
- `src/middleware/` - JWT autentifikace
- `src/config/` - Database config
- `src/models/` - Data models (recepty, ingredience)

**API Endpoints:**
- `/auth/*` - Registrace a přihlášení
- `/api/recipes` - Recepty
- `/api/fridge` - Suroviny v lednici (CRUD)
- `/api/saved-recipes` - Uložené recepty
- `/api/savings` - Statistika

### styles/
Všechny CSS soubory pro jednotlivé komponenty.

**Organizace:**
- Jednomu CSS souboru per komponenta
- Mobile-first approach
- BEM naming convention

## Databázové Schéma

```
users
├── id (PK)
├── email (UNIQUE)
├── username
├── password (hashed)
└── created_at

ingredients
├── id (PK)
├── name
├── unit (g, ml, kus, atd.)
└── avg_price

fridge_items
├── id (PK)
├── user_id (FK)
├── ingredient_id (FK)
├── quantity
├── expiration (DATE)
└── cost_per_unit

recipes
├── id (PK)
├── name
├── time (minuty)
├── category (salty/sweet)
└── price

recipe_ingredients
├── id (PK)
├── recipe_id (FK)
├── ingredient_id (FK)
├── quantity
└── unit

saved_recipes
├── id (PK)
├── user_id (FK)
├── recipe_id (FK)
├── saved_date
└── total_cost
```

## How to Navigate

### Pro vývojáře
1. Začni s [QUICK_START.md](QUICK_START.md)
2. Čti [README.md](README.md) pro detaily
3. Podívej se na [ARCHITECTURE.md](ARCHITECTURE.md) pro design

### Pro DevOps
1. Čti [DEPLOYMENT.md](DEPLOYMENT.md)
2. Použij `docker-compose.prod.yml`
3. Nastav DNS a SSL

### Pro QA/Testing
1. Čti [TESTING.md](TESTING.md)
2. Sleduj test plán
3. Hlášej bugs

### Pro Contributors
1. Čti [CONTRIBUTING.md](CONTRIBUTING.md)
2. Sleduj coding standards
3. Piš testy

## Klíčové Soubory

### Konfigurační Soubory
```
backend/.env.example          - Backend config template
frontend/.env.example         - Frontend config template
docker-compose.yml           - Development setup
docker-compose.prod.yml      - Production setup
vite.config.js               - Frontend bundler config
```

### Dokumentace
```
README.md                    - Hlavní dokumentace
QUICK_START.md              - Pro rychlý start
DEPLOYMENT.md               - Pro deployment
ARCHITECTURE.md             - Architektura
PROJECT_CHECKLIST.md        - Progress tracking
CONTRIBUTING.md             - Pro vývojáře
TESTING.md                  - Test guide
```

### Data
```
init_data.sql               - Initial receptů a ingrediencí
```

### Scripts
```
install.sh                  - Install pro Unix
install.bat                 - Install pro Windows
```

## Jak Spustit

### 1. Kopírování
```bash
git clone <repo>
cd gastro
```

### 2. Instalace
```bash
# Windows
install.bat

# macOS/Linux
bash install.sh
```

### 3. Spuštění
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### 4. Přístup
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Velikost Projektu

| Část | Soubory | Řádky Kódu |
|------|---------|-----------|
| Frontend | 20+ | ~2500 |
| Backend | 10+ | ~800 |
| Databáze | 1 | ~200 |
| Dokumentace | 7 | ~2000 |
| **Celkem** | **38+** | **~5500** |

## Jaké Technologie Se Používají

- **Frontend:** React 18, Vite, CSS3
- **Backend:** Node.js, Express, bcryptjs, JWT
- **Database:** PostgreSQL
- **DevOps:** Docker, Docker Compose, nginx
- **Dokumentace:** Markdown

## Poznámky

- Všechny soubory jsou v Českilě
- Názvy jsou descriptivní
- Struktura je modulární
- Kód je komentován
- Dokumentace je komplétní

---

**Poslední aktualizace:** Leden 2026
