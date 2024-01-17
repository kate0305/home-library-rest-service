# Home Library Service

## Description
Home Library service is a NestJS application that allows `Users` to create, read, update, delete `Artists`, `Tracks` and `Albums` and add them to `Favourites` in their own home library.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:kate0305/home-library-rest-service.git
cd home-library-rest-service
example.env file rename to .env
```

## Installing NPM modules

```
npm install
```

## Running application in Docker

```
npm run docker
```

## Scanning Docker image with api

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
