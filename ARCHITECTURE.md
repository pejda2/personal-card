# Projektová Architektura - Zlatá Lednice

## Architektura Aplikace

```
┌─────────────────────────────────────────────────────┐
│                  User Devices                        │
│         (Desktop, Tablet, Mobile)                   │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│          Frontend (React + Vite)                    │
│  ┌──────────────────────────────────────────────┐  │
│  │      Components                              │  │
│  │  ├─ Home (úvodní stránka)                   │  │
│  │  ├─ Auth (Login/Register)                   │  │
│  │  ├─ MainMenu (hlavní menu)                  │  │
│  │  ├─ Fridge (správa lednice)                 │  │
│  │  ├─ Recipes (doporučení receptů)            │  │
│  │  ├─ Savings (statistika)                    │  │
│  │  └─ Expiration (trvanlivost)                │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │      Context (State Management)              │  │
│  │  └─ AuthContext (přihlášení)                │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │      Services                                │  │
│  │  └─ Axios (HTTP client)                     │  │
│  └──────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │   HTTP/HTTPS    │
        │   REST API      │
        ▼                  ▼
┌─────────────────────────────────────────────────────┐
│          Backend (Node.js + Express)               │
│  ┌──────────────────────────────────────────────┐  │
│  │      Routes                                  │  │
│  │  ├─ /auth (Login, Register)                 │  │
│  │  └─ /api (CRUD operace)                     │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │      Controllers (Business Logic)             │  │
│  │  ├─ AuthController                          │  │
│  │  └─ FridgeController (budoucí)              │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │      Middleware                              │  │
│  │  ├─ Authentication (JWT)                    │  │
│  │  ├─ Error Handling                          │  │
│  │  └─ CORS                                    │  │
│  └──────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │   SQL Queries   │
        │   (pg)          │
        ▼                  ▼
┌─────────────────────────────────────────────────────┐
│          Database (PostgreSQL)                      │
│  ┌──────────────────────────────────────────────┐  │
│  │      Tables                                  │  │
│  │  ├─ users                                   │  │
│  │  ├─ ingredients                             │  │
│  │  ├─ fridge_items                            │  │
│  │  ├─ recipes                                 │  │
│  │  ├─ recipe_ingredients                      │  │
│  │  └─ saved_recipes                           │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Registrace/Přihlášení

```
User Input (Email, Password)
        ▼
Register/Login Form
        ▼
Axios POST to /auth/login
        ▼
Backend validates input
        ▼
Hash password check
        ▼
Create JWT token
        ▼
Return token to frontend
        ▼
Save to localStorage
        ▼
Update AuthContext
        ▼
Redirect to MainMenu
```

### 2. Přidání Suroviny

```
User selects ingredient
        ▼
Input quantity, expiration, cost
        ▼
POST /api/fridge
        ▼
Backend validates data
        ▼
Create fridge_item in DB
        ▼
Return new item
        ▼
Update frontend state
        ▼
Display in Fridge component
```

### 3. Doporučení Receptu

```
User has 3+ ingredients
        ▼
Click "Doporučit recept"
        ▼
GET /api/recipes
        ▼
Backend returns all recipes
        ▼
Frontend filters by:
  - Category (salty/sweet)
  - Time (< 15 min)
  - Available ingredients
        ▼
Display in categories
        ▼
User clicks recipe
        ▼
Show recipe detail
        ▼
Compare with fridge items
        ▼
Highlight missing ingredients
```

### 4. Ušetřeno

```
User clicks "Hotovo" na receptu
        ▼
POST /api/saved-recipes
        ▼
Backend calculates savings
        ▼
Insert into saved_recipes table
        ▼
GET /api/savings?period=X
        ▼
Backend sums by period
        ▼
Display statistics
        ▼
Filter by time period
```

## Bezpečnostní Architektura

```
┌─────────────────────────────────────────────────┐
│           Frontend Security                     │
│  ├─ Input validation                           │
│  ├─ XSS protection (React)                    │
│  ├─ HTTPS only                                 │
│  └─ Token storage (localStorage)              │
└────────────────┬────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │   JWT Token     │
        │   in Header     │
        ▼                  
┌─────────────────────────────────────────────────┐
│          Backend Security                       │
│  ├─ CORS whitelist                             │
│  ├─ JWT verification                           │
│  ├─ Input sanitization                         │
│  ├─ Password hashing (bcryptjs)               │
│  ├─ SQL parameterization                       │
│  ├─ Rate limiting (budoucí)                   │
│  └─ Error handling                             │
└────────────────┬────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │   Encrypted     │
        │   Connection    │
        ▼                  
┌─────────────────────────────────────────────────┐
│          Database Security                      │
│  ├─ User roles/permissions                      │
│  ├─ Foreign key constraints                    │
│  ├─ Row-level security (budoucí)              │
│  └─ Encrypted backups                          │
└─────────────────────────────────────────────────┘
```

## Deployment Architektura

### Development
```
Frontend (localhost:3000)
Backend (localhost:5000)
PostgreSQL (localhost:5432)
```

### Production (Docker)
```
┌─────────────────────────────────────┐
│        Docker Network               │
│  ┌──────────────────────────────┐  │
│  │   Frontend Container         │  │
│  │   (nginx port 80/443)        │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │   Backend Container          │  │
│  │   (Node port 5000)           │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │   PostgreSQL Container       │  │
│  │   (Port 5432)                │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
         │
         ▼
    Load Balancer
         │
         ▼
    Users Internet
```

## Databázové Schéma

```sql
users (id, email, username, password, created_at)
    │
    ├─→ fridge_items (id, user_id, ingredient_id, ...)
    │   └─→ ingredients (id, name, unit, avg_price)
    │
    └─→ saved_recipes (id, user_id, recipe_id, total_cost, ...)
        └─→ recipes (id, name, time, category, price)
            └─→ recipe_ingredients (recipe_id, ingredient_id, ...)
                └─→ ingredients (id, name, unit, avg_price)
```

## Výkonnnostní Metriky

```
Frontend Performance:
├─ Page Load: < 2s
├─ Time to Interactive: < 3s
├─ Component Render: < 100ms
└─ API Call: < 500ms

Backend Performance:
├─ Auth Endpoint: < 200ms
├─ GET /api/recipes: < 100ms
├─ POST /api/fridge: < 150ms
└─ GET /api/savings: < 200ms

Database Performance:
├─ Query Time: < 50ms (indexed)
├─ Connection Pool: 10 connections
└─ Max Concurrent Users: 100+
```

## Škálovatelnost

### Horizontální Škálování

```
┌──────────────────┐
│  Load Balancer   │
└────────┬─────────┘
         │
    ┌────┼────┐
    ▼    ▼    ▼
  API  API  API  (Backend Instances)
    │    │    │
    └────┼────┘
         │
      Database
```

### Vertikální Škálování

- Zvýšení CPU/RAM
- Database optimization
- Caching layer (Redis)
- CDN pro frontend

## Technologické Stack

**Frontend:**
- React 18 (UI Framework)
- Vite (Build tool)
- Axios (HTTP Client)
- CSS3 (Styling)

**Backend:**
- Node.js (Runtime)
- Express (Web Framework)
- PostgreSQL (Database)
- JWT (Authentication)
- bcryptjs (Password Hashing)

**DevOps:**
- Docker (Containerization)
- Docker Compose (Orchestration)
- nginx (Web Server)
- Let's Encrypt (SSL/TLS)

## Monitoring & Observability

```
Frontend Monitoring:
├─ Error tracking (Sentry/equivalent)
├─ Performance monitoring (Datadog)
└─ User analytics (GA)

Backend Monitoring:
├─ Application logs (Winston/equivalent)
├─ Error tracking
├─ Performance metrics
└─ Database monitoring

Database Monitoring:
├─ Query logs
├─ Connection pool status
└─ Backup verification
```

---

**Architektura byl navržen pro:**
- Skalabilitu
- Údržbovost
- Bezpečnost
- Výkon

**Poslední aktualizace:** Leden 2026
