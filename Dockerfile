FROM mhart/alpine-node:latest

COPY package.json yarn.lock /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /usr/var/app && cp -a /tmp/node_modules /usr/var/app/

WORKDIR /usr/var/app/web
COPY . /usr/var/app/web

EXPOSE 8080
