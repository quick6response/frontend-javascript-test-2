# base image
FROM node:14-alpine as build

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install

# add app
COPY . .

# build app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/pub /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]