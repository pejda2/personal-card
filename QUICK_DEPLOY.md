# ⚡ Rychlé Nasazení - 5 Minut

## 🚀 Nejrychlejší Způsob (bez instalace PostgreSQL)

### Krok 1: GitHub (1 minuta)
```bash
# V terminálu v gastro/ složce:
git init
git add .
git commit -m "Initial: Zlata Lednice"
```

Pak jdi na https://github.com/new
- Vytvoř nový repozitář "zlata-lednice"
- NEPŘIDÁVEJ README, .gitignore ani licenci

```bash
git remote add origin https://github.com/TVOJE_JMENO/zlata-lednice.git
git branch -M main
git push -u origin main
```

### Krok 2: Nasazení na Web (2 minuty)

#### **🟣 MOŽNOST A: Railway (DOPORUČUJI - databáze zdarma)**

1. Jdi na https://railway.app
2. Klikni **"Start a New Project"**
3. Vyber **"Deploy from GitHub repo"**
4. Vyber svůj `zlata-lednice` repozitář
5. Railway automaticky:
   - Nasadí backend na `https://zlata-lednice-production.up.railway.app`
   - Vytvoří PostgreSQL databázi
   - Propojí vše dohromady

**Nastavení proměnných:**
- Klikni na svůj projekt
- Jdi do **Variables**
- Přidej:
  ```
  JWT_SECRET=tajny_klic_12345
  NODE_ENV=production
  ```

✅ **Tvůj backend běží na:** `https://tvuj-projekt.railway.app`

#### **🔷 MOŽNOST B: Vercel (frontend) + Supabase (backend + DB)**

**Frontend na Vercel:**
1. https://vercel.com → přihlásit GitHub
2. **Import Project** → vyber `zlata-lednice`
3. Root Directory: `frontend`
4. Framework Preset: `Vite`
5. Deploy

**Backend + DB na Supabase:**
1. https://supabase.com → nový projekt
2. SQL Editor → spusť:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_ingredients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ingredient_id INTEGER NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  expiration_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ... (další tabulky)
```

3. Project Settings → API → zkopíruj URL a API KEY
4. Nahraj backend na Vercel nebo Railway s těmito proměnnými

#### **🟠 MOŽNOST C: Render (zdarma vše)**

1. https://render.com → Sign Up
2. **New +** → **Web Service**
3. Connect GitHub → vyber `zlata-lednice`
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. **New +** → **PostgreSQL** → vytvoř databázi
8. Propoj backend s databází přes Environment Variables

### Krok 3: Otevři Aplikaci (10 sekund)

🌐 **Tvůj web:** `https://zlata-lednice.vercel.app`  
🔧 **API:** `https://zlata-lednice.railway.app`

---

## 🎯 Nejjednodušší (bez kódování)

Pokud nechceš nic nastavovat:

1. Zazipuj celou složku `gastro/`
2. Pošli mi email nebo na Fiverr/Upwork
3. Za $5-10 ti to někdo nasadí za 10 minut

Nebo použij **Replit:**
1. https://replit.com
2. Import from GitHub
3. Klikni RUN
4. Hotovo! Web běží okamžitě

---

## ⚠️ Poznámky

- Railway dává **500 hodin zdarma měsíčně**
- Vercel je **zdarma pro hobby projekty**
- Supabase má **500 MB databázi zdarma**
- Render restartuje server po 15 minutách neaktivity (free tier)

## 📧 Potřebuješ Pomoc?

Pokud máš problém, napiš mi:
- Screenshot chybové hlášky
- Kterou platformu používáš
- Kde jsi zaseknutý

Pomůžu ti to dokončit! 🚀
