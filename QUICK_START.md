# Zlatá Lednice - Rychlý Start

## Jaký je nejrychlejší způsob, jak spustit aplikaci?

### Pro Windows:
```cmd
install.bat
```

Pak ve dvou terminálu:
```cmd
cd backend && npm run dev
```

```cmd
cd frontend && npm run dev
```

### Pro macOS/Linux:
```bash
bash install.sh
```

Pak ve dvou terminálu:
```bash
cd backend && npm run dev
```

```bash
cd frontend && npm run dev
```

## Potřebuji PostgreSQL

### S Dockerem (Doporučujeme):
```bash
docker-compose up -d
```

### Bez Dockeru:
1. Nainstaluj PostgreSQL
2. Vytvoř databázi:
```sql
CREATE DATABASE zlata_lednice;
```
3. Zkonfiguruj `.env` v backend složce

## Jakmile je vše spuštěné

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- PostgreSQL: localhost:5432 (jestli používáš Docker)

## Testovací přihlášení

1. Klikni na "VSTOUPIT"
2. Registruj si nový účet (jakýkoliv email a heslo)
3. Přidej si 3+ suroviny
4. Zobrazí se ti tlačítko "Doporučit recept"

## Co dělat v aplikaci?

### Moje Lednice
- Přidej suroviny, které máš doma
- Nastav jim cenu a trvanlivost
- Až bude 3+ surovin, můžeš doporučit recepty

### Doporučit Recept
- Sleduj recepty podle kategorií
- Vidíš, které suroviny ti chybí
- Klikni "Hotovo" po vaření

### Ušetřeno
- Sleduj, kolik peněz jsi ušetřil
- Filtruj podle týdne, měsíce, roku

### Trvanlivost
- Vidíš suroviny seřazené podle data vypršení
- První jsou ty, které se mají nejdřív spotřebovat

## Problémy?

**Port je již obsazen:**
- Backend: Změň `PORT` v `.env`
- Frontend: Změň `port` v `vite.config.js`

**Chyba s databází:**
- Zkontroluj, že PostgreSQL běží
- Zkontroluj přihlašovací údaje v `.env`

**Frontend se nezobrazuje:**
- Zkontroluj, že backend běží na portu 5000
- Zkontroluj browser console pro chyby (F12)

## Další pomoc

Viz README.md pro podrobnou dokumentaci
