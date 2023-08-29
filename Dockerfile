FROM node:18-alpine AS build
WORKDIR /tmp
COPY . .
RUN yarn --pure-lockfile && yarn build:ssr

FROM oven/bun
# FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=build /tmp/dist ./dist
EXPOSE 4200
CMD ["bun", "dist/bun-universal/server/main.js"]
# CMD ["node", "dist/bun-universal/server/main.js"]
