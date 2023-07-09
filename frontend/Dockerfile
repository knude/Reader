# Stage 1: Build the app
FROM node:18 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built app with NGINX
FROM nginx:latest

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY reader.conf /etc/nginx/conf.d/reader.conf
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
