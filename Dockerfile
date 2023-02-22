FROM node:18.14-alpine3.16 as develop

WORKDIR /user/app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

FROM node:18.14-alpine3.16

COPY --from=develop /user/app/node_modules ./node_modules
COPY --from=develop /user/app/package*.json ./
COPY --from=develop /user/app/src ./src
COPY --from=develop /user/app/prisma ./prisma
COPY --from=develop /user/app/test ./test
COPY --from=develop /user/app/tsconfig*.json ./

EXPOSE ${PORT}

CMD [ "npm", "run", "start:docker" ]
