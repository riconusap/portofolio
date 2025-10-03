# * build stage
FROM node:22.12.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --optimize-for-size

# * production stage
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html/
RUN rm -rf ./*
COPY --from=builder /app/dist ./portofolio
EXPOSE 3000