# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:kate0305/nodejs2022Q4-service.git
cd nodejs2022Q4-service
git checkout dev-part3
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
