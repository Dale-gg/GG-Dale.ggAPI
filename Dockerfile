FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN rm .npmrc

ADD . /usr/src/app

RUN yarn build
