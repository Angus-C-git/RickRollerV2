# RickRoller API

The REST api that powers the rick roller.

- [Install](#installation)
- [Run](#run)
- [Test](#test)
- [Deploy](#deploy)

## Installation

```bash
$ npm install
```

## Run

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

## Deploy

Deployments are currently achieved with heroku and are fairly painful due to the monorepo structure of the project. Currently deployments are done as follows:

1. Push changes to origin main

2. Use git subtrees to push the api repo to heroku, note a Procfile like the one present in this directory needs to be present to execute the right script to run the compiled version of the API

```
git subtree push --prefix apps/api/ heroku main
```

3. Make sure ENV variables are set

```
heroku config:set JWT_SECRET=<SECRET>
heroku config:set "MONGO_URI=<CONNECT-URI>"
```
