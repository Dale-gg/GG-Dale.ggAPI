FROM node:12-alpine

WORKDIR /usr/src/app
ARG NPM_AUTH_PKG

# ------------------------------------------
# copy content
# ------------------------------------------
COPY . .

RUN echo "//npm.pkg.github.com/:_authToken=${NPM_AUTH_PKG}" >> .npmrc

RUN yarn
RUN rm .npmrc

ADD . /usr/src/app

RUN yarn build
