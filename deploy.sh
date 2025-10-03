#!/bin/bash

echo "🚀 Deploying Vue Portfolio to Production..."

# Stop existing container if running
echo "📦 Stopping existing container..."
docker-compose -f docker-compose.prod.yml down

# Build the image
echo "🔨 Building Docker image..."
docker-compose -f docker-compose.prod.yml build

# Start the container
echo "▶️ Starting container..."
docker-compose -f docker-compose.prod.yml up -d

# Wait a moment for startup
sleep 5

# Check container status
echo "📊 Container Status:"
docker ps | grep vue-portfolio-prod

# Check logs (including the normal configuration messages)
echo ""
echo "📋 Startup Logs (this includes normal configuration messages):"
docker logs vue-portfolio-prod

# Test the deployment
echo ""
echo "🧪 Testing deployment..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
    echo "✅ Portfolio is successfully deployed and accessible!"
    echo "🌐 Your portfolio is running at: http://localhost"
    echo ""
    echo "ℹ️ Note: The 'docker-entrypoint.sh' messages you see are NORMAL nginx initialization."
    echo "   Look for 'Configuration complete; ready for start up' to confirm success."
else
    echo "❌ Deployment test failed. Check the logs above for errors."
fi

echo ""
echo "📚 For DigitalOcean deployment, see DEPLOYMENT.md"