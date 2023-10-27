## First run

### Database
You can use the database/Dockerfile to bring up a postgres container:
```bash
$ docker build .
$ docker run --name db -p 5433:5432 IMAGE_ID
```

### Env
Create a .env file in the root of the project:
```file
DATABASE_URL="postgresql://postgres:fiap123@localhost:5433/fiap?schema=public"
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