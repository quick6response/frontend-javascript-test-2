# base image
FROM node:18-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY ["package.json", "./"]
COPY . .

RUN npm i

# build app
RUN npm run build
