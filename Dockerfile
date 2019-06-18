FROM mhart/alpine-node:latest as build

COPY package.json package-lock.json /tmp/
RUN cd /tmp && npm ci
RUN mkdir -p /usr/var/app && cp -a /tmp/node_modules /usr/var/app/

WORKDIR /usr/var/app/web
COPY . ./

EXPOSE 3000

# Stage 2 - the production environment
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /usr/var/app/web/build /usr/share/nginx/html
# EXPOSE 80

# compose
# nginx:
#   image: nginx:1.17.0
#   container_name: cryptocommits_web_nginx
#   command: ["nginx", "-g", "daemon off;"]
#   ports:
#    - "80:80"
#    - "443:443"
#   networks:
#     - crypto-network