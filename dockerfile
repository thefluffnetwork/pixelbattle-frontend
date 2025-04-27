FROM node:23-slim AS node-base


FROM node-base AS install

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


FROM node-base AS build

WORKDIR /app

COPY --from=install /app/node_modules node_modules

COPY . .

RUN cp .env.example .env

RUN npm run build


FROM nginx:stable-alpine

WORKDIR /usr/share/nginx

COPY --from=build /app/dist html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["sh", "-c", "envsubst < html/env.template.js > html/env.js && nginx -g 'daemon off;'"]
