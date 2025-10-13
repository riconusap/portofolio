#!/bin/bash

# Simple Vue Portfolio Deployment Script
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

case "${1:-deploy}" in
    "deploy"|"")
        echo -e "${YELLOW}Deploying Vue Portfolio...${NC}"
        docker-compose -f docker-compose.prod.yml down || true
        docker-compose -f docker-compose.prod.yml up --build -d
        echo -e "${GREEN}✓ Deployed successfully!${NC}"
        echo "Access: http://localhost:3000"
        echo "NPM Config: vue-portfolio:80"
        ;;
    "stop")
        echo -e "${YELLOW}Stopping deployment...${NC}"
        docker-compose -f docker-compose.prod.yml down
        echo -e "${GREEN}✓ Stopped${NC}"
        ;;
    "logs")
        docker-compose -f docker-compose.prod.yml logs -f
        ;;
    "status")
        docker ps | grep vue-portfolio || echo "Container not running"
        ;;
    *)
        echo "Usage: $0 [deploy|stop|logs|status]"
        ;;
esac