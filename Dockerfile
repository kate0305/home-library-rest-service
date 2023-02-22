FROM node:18.14-alpine3.16

WORKDIR /user/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE ${PORT}

CMD [ "npm", "run", "start:docker" ]
