# Stage 1: Build the app
FROM node:18 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build

# Stage 2: Serve the built app with NGINX
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-c", "/etc/nginx/nginx.conf"]