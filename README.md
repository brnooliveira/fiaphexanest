## First run

Create a .env file in the root of the project:

```file
DATABASE_URL="postgresql://USER:PASSWORD@localhost:PORT/database?schema=public"
```

After that,

```bash
$ npm install
$ npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```