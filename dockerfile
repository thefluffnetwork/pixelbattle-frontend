FROM node:23-slim AS node-base


FROM node-base AS install

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


FROM node-base AS build

WORKDIR /app

COPY . .

COPY --from=install /app/node_modules node_modules

RUN npm run build


FROM nginx:stable-alpine

WORKDIR /usr/share/nginx

COPY --from=build /app/dist html

CMD ["sh", "-c", "envsubst < html/env.template.js > html/env.js && nginx -g 'daemon off;'"]
