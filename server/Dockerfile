FROM node:12-alpine3.14

WORKDIR /usr/src/app

RUN npm install

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
COPY . .
