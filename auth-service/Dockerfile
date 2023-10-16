FROM node:18

WORKDIR /app

COPY package*.json .

COPY . .

RUN yarn 

RUN yarn test

RUN yarn build
