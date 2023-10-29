FROM node:20.9.0 AS prisma-migrate

WORKDIR /app

COPY prisma ./prisma
COPY package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli
RUN npx prisma generate



FROM node:20.9.0 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

FROM node:20.9.0 AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=prisma-migrate /app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 3000
CMD ["npm","run", "start:prod"]

FROM node:20.9.0 AS dev

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli


COPY . .
CMD ["npm","run", "start:dev"]