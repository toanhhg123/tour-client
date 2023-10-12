FROM node:16-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
EXPOSE 3000
