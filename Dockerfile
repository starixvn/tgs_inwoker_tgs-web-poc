FROM node:16.14.2-stretch-slim AS build
WORKDIR /src
COPY . .

RUN yarn install
RUN yarn build:standard

FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/build /usr/share/caddy
