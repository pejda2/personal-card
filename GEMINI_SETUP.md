# Nastavení Gemini API pro Vercel

Pro správné fungování Gemini AI integrace je potřeba nastavit environment proměnnou na Vercelu:

1. Přejdi na https://vercel.com/pejda2/personal-card/settings/environment-variables
2. Přidej novou proměnnou:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `AIzaSyA7pooPq5v7A-AJY3xDO_lcPSlZkWgndfo`
   - Environment: Production, Preview, Development (vyber všechny)
3. Klikni na "Save"
4. Redeploy aplikaci (Project Settings → Deployments → ... → Redeploy)

Aplikace pak bude mít přístup k Gemini API pro odhad cen surovin.

## Co Gemini dělá?

- **Odhad cen**: Když zapneš "Použít Gemini AI pro odhad cen" v receptech, Gemini poskytne aktuální ceny surovin na českém trhu
- **Realistické ceny**: Místo pevných cen v databázi dostaneš živé odhady podle aktuálního trhu
- **Generování receptů**: (připraveno pro budoucí implementaci) Gemini může generovat recepty podle dostupných surovin

## Lokální vývoj

Pro lokální vývoj stačí mít soubor `frontend/.env` s obsahem:
```
VITE_GEMINI_API_KEY=AIzaSyA7pooPq5v7A-AJY3xDO_lcPSlZkWgndfo
```

Tento soubor je v `.gitignore` a nebude nahraný na GitHub.
