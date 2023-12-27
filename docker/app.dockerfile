FROM node:20.9.0 AS production
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
COPY . .
CMD ["npm", "run", "start:prod"]

FROM node:20.9.0 AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]
