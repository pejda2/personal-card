# Osobní vizitka — ukázkový web

Jednoduchá statická stránka určená pro GitHub Pages.

Jak nasadit na GitHub (příkazová řádka):

1. Inicializujte repozitář a commitněte soubory:

```bash
cd personal-card
git init
git add .
git commit -m "Initial personal-card site"
git branch -M main
```

2. Vytvořte nový repozitář na GitHubu (webem) a přidejte remote, nebo použijte `gh`:

Web: vytvořte repo s názvem `personal-card` bez README (nebo s ním), poté spusťte:

```bash
git remote add origin https://github.com/VAŠE_UŽIVATELSKÉ_JMENO/personal-card.git
git push -u origin main
```

nebo s GitHub CLI:

```bash
gh repo create VAŠE_UŽIVATELSKÉ_JMENO/personal-card --public --source=. --remote=origin --push
```

3. Povolení GitHub Pages (v GitHub web UI):
- Jděte do `Settings` → `Pages` → `Branch` → vyberte `main` a `/ (root)`, klikněte `Save`.

4. Po pár minutách bude stránka dostupná na `https://VAŠE_UŽIVATELSKÉ_JMENO.github.io/personal-card/`.
