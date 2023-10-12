FROM node:18

RUN mkdir -p /app

WORKDIR /app
COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000
