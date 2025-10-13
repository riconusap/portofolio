# Vue Portfolio

Modern Vue 3 portfolio website with Docker deployment.

## 🚀 Quick Deployment

### Production
```bash
./deploy-prod.sh
```
Access: http://localhost:3000

### Development  
```bash
docker-compose up -d
```
Access: http://localhost:5173

## 📋 Nginx Proxy Manager Setup

1. **Create Proxy Host:**
   - Domain: `your-domain.com`
   - Scheme: `http`
   - Forward Host: `vue-portfolio`
   - Forward Port: `80`

2. **Enable SSL** (optional)

## 🛠️ Commands

- `./deploy-prod.sh` - Deploy production
- `./deploy-prod.sh stop` - Stop deployment
- `./deploy-prod.sh logs` - View logs
- `./deploy-prod.sh status` - Check status

## 📁 Structure

```
├── src/           # Vue source code
├── Dockerfile     # Production build
├── Dockerfile.dev # Development
├── docker-compose.prod.yml  # Production config
└── deploy-prod.sh # Deployment script
```

## ⚙️ Environment

Copy `.env.example` to `.env.local` and configure as needed.

---
**Simple. Fast. Reliable.**