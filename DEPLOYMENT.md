# Portfolio Deployment Guide

## Understanding Docker Entrypoint Messages

The message `/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration` is **NORMAL** and **NOT AN ERROR**.

This is nginx's standard initialization process that:
1. Configures IPv6 support
2. Sets up environment variables
3. Tunes worker processes
4. Prepares the server

✅ **Success indicators to look for:**
- `Configuration complete; ready for start up`
- HTTP 200 responses in logs
- No error messages after startup

## DigitalOcean Deployment Options

### Option 1: DigitalOcean App Platform (Recommended)

1. **Create app.yaml for App Platform:**

```yaml
name: vue-portfolio
services:
- name: web
  source_dir: /
  github:
    repo: riconusap/portofolio
    branch: main
  run_command: npm run build && npm run serve
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  http_port: 3000
  routes:
  - path: /
```

2. **Deploy Steps:**
   - Push your code to GitHub
   - Connect DigitalOcean App Platform to your GitHub repo
   - Deploy automatically on every push

### Option 2: DigitalOcean Droplet with Docker

1. **Create Droplet:**
   - Ubuntu 22.04 LTS
   - Basic plan ($6/month)
   - Install Docker

2. **Deploy Commands:**

```bash
# On your droplet
git clone https://github.com/riconusap/portofolio.git
cd portofolio

# Build and run
docker-compose up portfolio -d

# Check status (you'll see the "normal" configuration messages)
docker logs vue-portfolio
```

### Option 3: DigitalOcean Container Registry + Droplet

1. **Build and push to registry:**

```bash
# Tag for DigitalOcean registry
docker tag portofolio-portfolio registry.digitalocean.com/your-registry/portfolio:latest

# Push to registry
docker push registry.digitalocean.com/your-registry/portfolio:latest
```

2. **Deploy on droplet:**

```bash
# Pull and run from registry
docker run -d -p 80:80 registry.digitalocean.com/your-registry/portfolio:latest
```

## Production Environment Variables

Create a `.env.production` file:

```env
NODE_ENV=production
VITE_API_URL=https://your-api-domain.com
VITE_APP_URL=https://your-domain.com
```

## Domain Configuration

1. **Point your domain to DigitalOcean:**
   - Add A record pointing to your droplet IP
   - Add CNAME for www subdomain

2. **SSL Certificate (if using droplet):**

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Monitoring Your Deployment

### Check Container Health:
```bash
docker ps
docker logs vue-portfolio
curl -I http://localhost
```

### Normal Log Output (What you should see):
```
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
```

### Success Indicators:
- ✅ "Configuration complete; ready for start up"
- ✅ HTTP 200 responses
- ✅ No error messages

### Error Indicators to Actually Worry About:
- ❌ nginx: [error] messages
- ❌ Container exits immediately
- ❌ HTTP 404 or 500 responses
- ❌ "failed to start" messages

## Troubleshooting

If you're seeing actual errors (not the normal configuration messages):

1. **Check nginx syntax:**
```bash
docker exec vue-portfolio nginx -t
```

2. **Check disk space:**
```bash
df -h
```

3. **Check memory:**
```bash
free -h
```

4. **Restart container:**
```bash
docker-compose restart portfolio
```