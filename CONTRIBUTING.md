# Contributing Guide - Zlatá Lednice

## Jak přispět do projektu

### Setup pro vývoj

1. **Fork a Clone repo**
```bash
git clone <your-fork>
cd gastro
```

2. **Instalace**
```bash
bash install.sh  # macOS/Linux
# nebo
install.bat  # Windows
```

3. **Spuštění dev serveru**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

4. **Vytvoření nové větve**
```bash
git checkout -b feature/my-feature
```

### Pravidla kódu

#### JavaScript/JSX
- Používej `const` místo `let` nebo `var`
- Používej arrow functions `() => {}`
- Správné odsazení 2 mezer
- Sem-colons nejsou povinné, ale měl by je být konzistentní

```javascript
// ✅ Dobré
const MyComponent = ({ prop }) => {
  return <div>{prop}</div>
}

// ❌ Špatné
var MyComponent = function(props) {
  return (<div>{props.prop}</div>)
}
```

#### CSS
- Mobilní first approach
- Logické seskupení selektorů
- Sem-colons jsou povinné

```css
/* ✅ Dobré */
.container {
  max-width: 100%;
  padding: 20px;
}

@media (min-width: 768px) {
  .container {
    max-width: 800px;
  }
}

/* ❌ Špatné */
.container { max-width: 100% }
```

#### SQL/Backend
- Správné pojmenování tabulek: `snake_case`
- Indexy na foreign keys
- Constraints pro data integrity

```sql
-- ✅ Dobré
CREATE TABLE user_preferences (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  theme VARCHAR(20) DEFAULT 'light'
);

-- ❌ Špatné
CREATE TABLE userprefs (
  userID INT,
  theme VARCHAR
);
```

### Commit Messages

Následuj konvenci:

```
type(scope): message

examples:
feat(auth): add JWT token refresh
fix(fridge): correct ingredient validation
docs(readme): update installation steps
style(components): format css files
refactor(api): simplify error handling
test(recipes): add recipe filtering tests
```

**Typy:**
- `feat:` Nová feature
- `fix:` Bug fix
- `docs:` Dokumentace
- `style:` Formatování
- `refactor:` Refaktor kódu
- `test:` Přidání testů
- `chore:` Údržba

### Pull Request Process

1. **Před PR:**
   - Otestuj svoji změnu
   - Zkontroluj, že není žádné konflikty
   - Aktualizuj dokumentaci

2. **Vytvoření PR:**
   - Popis co se mění
   - Reference na issue
   - Screenshots (pokud je UI změna)

3. **PR Popis Template:**
```markdown
## Popis
Krátký popis změny

## Typ Změny
- [ ] Bug fix
- [ ] Nová feature
- [ ] Breaking change

## Jak testovat
Kroky k testování změny

## Checklist
- [ ] Kód jsem otestoval
- [ ] Dokumentaci jsem aktualizoval
- [ ] Žádné varování v konzoli
```

### Testing

#### Frontend Testing
```bash
# Manuální test (zatím)
cd frontend && npm run dev
# Vytvořit účet, otestovat funkce
```

#### Backend Testing
```bash
# Otestuj API s curl
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Dokumentace

- Aktualizuj README.md pokud jsou nové features
- Přidej JSDoc komentáře pro funkce
- Dokumentuj environment variables

```javascript
/**
 * Načte recepty z backend API
 * @param {number} limit - Max počet receptů
 * @returns {Promise<Array>} Pole receptů
 */
const loadRecipes = async (limit = 50) => {
  // ...
}
```

### File Structure

```
frontend/
├── src/
│   ├── components/      # React komponenty
│   ├── pages/          # Stránky (zatím v App.jsx)
│   ├── context/        # Globální stav
│   ├── styles/         # CSS soubory
│   └── App.jsx         # Main component

backend/
├── src/
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic (budoucí)
│   ├── models/         # Database models
│   ├── middleware/     # Middleware
│   ├── config/         # Config soubory
│   └── index.js        # Entry point
```

### Naming Conventions

**Components:**
```javascript
MyComponent.jsx  // PascalCase
```

**Functions/Variables:**
```javascript
const myFunction = () => {}  // camelCase
const myVariable = 'value'   // camelCase
```

**CSS Classes:**
```css
.my-class { }              /* kebab-case */
.my-class__element { }     /* BEM */
.my-class--active { }      /* BEM modifier */
```

**Database:**
```sql
-- Tabulka: snake_case (plural)
user_preferences

-- Sloupec: snake_case
user_id, created_at

-- Constraint: constraint_tablename_columnname
fk_user_id, pk_users_id
```

### Common Issues & Fixes

#### Port je obsazen
```bash
# Kill proces na portu 5000 (Linux/Mac)
lsof -ti:5000 | xargs kill -9

# Kill proces na portu 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### Database není dostupná
```bash
# Zkontroluj PostgreSQL
psql -U postgres

# Vytvoř database
createdb zlata_lednice
```

#### Dependencies issue
```bash
# Vyčisti cache a reinstaluj
rm -rf node_modules package-lock.json
npm install
```

### Performance Tips

1. **Frontend:**
   - Lazy load komponenty
   - Memorize komponenty s React.memo
   - Optimizuj re-renders

2. **Backend:**
   - Indexuj databázi správně
   - Cache výsledky
   - Paginate velké datasety

3. **Database:**
   - Explain analyze queries
   - Monitor slow queries
   - Regular backups

### Security Guidelines

1. **Frontend:**
   - Neukládej sensitive data v localStorage
   - Validuj vstupy
   - Sanitizuj HTML output

2. **Backend:**
   - Vždy validuj input
   - Používej parameterized queries
   - Hash hesla
   - Implementuj rate limiting

3. **Obecně:**
   - Necommituj .env s real secrets
   - Používej HTTPS v produkci
   - Regular security audits

## FAQ

**Q: Jak mohu testovat s reálnou databází?**
A: Spusť `docker-compose up -d` pro PostgreSQL

**Q: Mohu měnit struktura databází?**
A: Ano, ale musíš migrovat data. Vytvoř migration skript.

**Q: Jak mohu přidat nový recept?**
A: Ulož ho do `backend/src/models/recipes.js` a synchronizuj backend.

## Komunikace

- **Bugs:** Otevři GitHub issue
- **Features:** Diskutuj v discussion nebo issue
- **Questions:** Otevři Q&A discussion

## License

Přispíváním souhlasíš s MIT licencí.
