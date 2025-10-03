# Vue 3 Portfolio Docker Setup

## Quick Start

Your Vue 3 portfolio is now Docker-ready! 🐳

### Prerequisites
- Docker installed and running on your system
- Docker Compose (included with Docker Desktop)

### Available Commands

Use the provided Docker setup script for easy management:

```bash
# Make script executable (already done)
chmod +x docker-setup.sh

# Production Mode (port 3000)
./docker-setup.sh production

# Development Mode (port 5173) with hot reload
./docker-setup.sh dev

# Build both images
./docker-setup.sh build

# Stop all containers
./docker-setup.sh stop

# View logs
./docker-setup.sh logs        # Production logs
./docker-setup.sh logs dev    # Development logs

# Check container status
./docker-setup.sh status

# Restart containers
./docker-setup.sh restart     # Production
./docker-setup.sh restart dev # Development
```

### Manual Docker Commands

If you prefer manual control:

#### Production
```bash
# Build production image
docker build -t vue-portfolio:latest .

# Run production container
docker run -d --name vue-portfolio -p 3000:80 vue-portfolio:latest

# Access at: http://localhost:3000
```

#### Development
```bash
# Build development image
docker build -f Dockerfile.dev -t vue-portfolio:dev .

# Run development container with hot reload
docker run -d --name vue-portfolio-dev -p 5173:5173 \
  -v "$(pwd):/app" -v /app/node_modules vue-portfolio:dev

# Access at: http://localhost:5173
```

#### Using Docker Compose
```bash
# Production
docker-compose up production

# Development
docker-compose up development

# Both services
docker-compose up
```

### Container Details

**Production Container:**
- Based on Nginx Alpine
- Optimized build with multi-stage Docker
- Serves static files from `/usr/share/nginx/html`
- Includes SPA routing support
- Security headers configured
- Gzip compression enabled
- Port: 3000 → 80

**Development Container:**
- Based on Node.js 18 Alpine
- Hot Module Replacement (HMR) enabled
- Volume mounted for live code changes
- Development server with Vite
- Port: 5173 → 5173

### Configuration Files

- `Dockerfile` - Production multi-stage build
- `Dockerfile.dev` - Development container
- `docker-compose.yml` - Service orchestration
- `nginx.conf` - Nginx configuration for SPA
- `.dockerignore` - Build optimization
- `docker-setup.sh` - Management script

### Troubleshooting

1. **Port conflicts:**
   ```bash
   # Check what's using the port
   lsof -i :3000  # or :5173
   
   # Stop conflicting processes
   docker stop vue-portfolio vue-portfolio-dev
   ```

2. **Permission issues on macOS:**
   ```bash
   # Ensure Docker has access to your project folder
   # Go to Docker Desktop → Settings → Resources → File Sharing
   ```

3. **Build failures:**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker build --no-cache -t vue-portfolio:latest .
   ```

4. **Volume mounting issues:**
   ```bash
   # Use absolute path for Windows/WSL
   docker run -v "$(pwd):/app" ...
   ```

### Next Steps

1. **Test the setup:**
   ```bash
   ./docker-setup.sh production
   # Open http://localhost:3000
   ```

2. **Development workflow:**
   ```bash
   ./docker-setup.sh dev
   # Edit files locally, see changes at http://localhost:5173
   ```

3. **Deploy to production:**
   - Use the production Docker image
   - Consider container orchestration (Docker Swarm, Kubernetes)
   - Add environment-specific configurations

Your Vue 3 portfolio with glassmorphism design is now containerized and ready for deployment! 🚀