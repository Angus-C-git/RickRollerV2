# Rick Roller V2

Conduct mass rick rolling campaigns and track the results all the while learning about phishing.

-   [Rick Roller V2](#rick-roller-v2)
    -   [DevOps](#devops)
    -   [About](#about)

## DevOps

This project uses turborepo which in turn uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

-   `docs`: a [Next.js](https://nextjs.org) app
-   `api`: a [NestJS](https://docs.nestjs.com) app
-   `web`: another [Next.js](https://nextjs.org) app

-   `ui`: a stub React component library shared by both `web` and `docs` applications
-   `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Setup

This repository is used in the `npx create-turbo` command, and selected when choosing which package manager you wish to use with your monorepo (Yarn).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn run dev
```

## About

This project was initially built (quite rapidly) as part of a phishing activity in a cyber security course but I had a lot of fun building the original so I decided to remake the app using some newer web frameworks and such.

The idea of the website is to generate unique links, which emulate links to malicious websites, and trick/convince people to click on them. However, instead of being greeted with a malicious website the 'phishing' victim is instead brutally [rickrolled](). The roller (person who sent the generated link to the victim(s)) can then track how many people clicked on the link. The new webapp takes this further allowing rollers to conduct and track phishing campaigns with new insights and a leaderboard system. Cause why not.

Enjoy :)
