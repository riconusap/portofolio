# * build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# * production stage
FROM nginx:alpine
# Create the target directory structure
RUN mkdir -p /var/www/riconusap.tech/portofolioServe

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files to the portofolioServe folder
COPY --from=builder /app/dist /var/www/riconusap.tech/portofolioServe

# Expose port 3000
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]