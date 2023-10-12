FROM node:16

WORKDIR /app

COPY package*.json .

COPY . .

RUN yarn 

RUN yarn build
