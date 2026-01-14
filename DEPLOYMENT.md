# Deployment Guide - Zlatá Lednice

## Možnosti nasazení

### 1. Lokální vývoj (Already Set Up)
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 2. Production na jednom serveru (VPS/Dedicated)

#### Požadavky
- Ubuntu/Debian server
- Node.js v18+
- PostgreSQL v12+
- nginx (reverse proxy)
- SSL certifikát (Let's Encrypt)

#### Kroky

1. **Klon repozitáře**
```bash
git clone <repo> /opt/zlata-lednice
cd /opt/zlata-lednice
```

2. **Instalace závislostí**
```bash
cd backend && npm install --production
cd ../frontend && npm install --production
```

3. **Build Frontend**
```bash
cd frontend
npm run build
```

4. **Nastavení .env pro produkci**
```bash
# backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zlata_lednice
DB_USER=postgres
DB_PASSWORD=<strong_password>
JWT_SECRET=<generate_random_secret>
NODE_ENV=production
PORT=5000
```

5. **PostgreSQL Setup**
```bash
sudo -u postgres psql
CREATE DATABASE zlata_lednice;
CREATE USER zlata WITH PASSWORD '<strong_password>';
ALTER ROLE zlata SET client_encoding TO 'utf8';
GRANT ALL PRIVILEGES ON DATABASE zlata_lednice TO zlata;
```

6. **Spuštění Backendu (PM2)**
```bash
npm install -g pm2
cd /opt/zlata-lednice/backend
pm2 start src/index.js --name "zlata-backend"
pm2 startup
pm2 save
```

7. **Nginx Config**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /opt/zlata-lednice/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /auth {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **SSL (Let's Encrypt)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 3. Docker Deployment

#### docker-compose-prod.yml
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: zlata_lednice
      POSTGRES_USER: zlata
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - zlata-network

  backend:
    build:
      context: ./backend
    ports:
      - "5000:5000"
    environment:
      DB_HOST: postgres
      DB_USER: zlata
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: zlata_lednice
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    depends_on:
      - postgres
    networks:
      - zlata-network

  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    networks:
      - zlata-network

volumes:
  postgres_data:

networks:
  zlata-network:
```

#### Dockerfile pro Backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src ./src

CMD ["node", "src/index.js"]
```

#### Dockerfile pro Frontend
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 4. Heroku Deployment

1. **Instalace Heroku CLI**
```bash
npm install -g heroku
```

2. **Login**
```bash
heroku login
```

3. **Vytvoření App (Backend)**
```bash
heroku create zlata-lednice-api
heroku addons:create heroku-postgresql:hobby-dev
```

4. **Nastavení env vars**
```bash
heroku config:set JWT_SECRET=<generate_secret> -a zlata-lednice-api
```

5. **Deploy**
```bash
git push heroku main
```

### 5. AWS Deployment (Elastic Beanstalk)

```bash
eb init -p node.js-16 zlata-lednice
eb create zlata-lednice-env
eb setenv JWT_SECRET=<secret>
eb deploy
```

## Monitoring & Logging

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### Database Backups
```bash
# Denní backup
pg_dump zlata_lednice > /backups/zlata_lednice_$(date +%Y%m%d).sql

# Automatizuj cron joben
0 2 * * * pg_dump zlata_lednice > /backups/zlata_lednice_$(date +\%Y\%m\%d).sql
```

### SSL Renewal (Auto)
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## Performance Tips

1. **Frontend Optimization**
   - Enable gzip compression in nginx
   - Use CDN for static files
   - Implement image optimization

2. **Backend Optimization**
   - Add database indexes
   - Implement caching (Redis)
   - Load balancing with multiple instances

3. **Database**
   - Regular backups
   - Monitor slow queries
   - Optimize indexes

## Troubleshooting

**Backend won't start:**
```bash
pm2 logs zlata-backend
```

**Database connection error:**
```bash
psql -h localhost -U zlata -d zlata_lednice
```

**Frontend not loading:**
Check nginx logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

## Rollback Procedure

```bash
git revert <commit_hash>
git push
pm2 restart zlata-backend
```
