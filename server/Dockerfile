FROM node:latest

WORKDIR /server
COPY package.json .

RUN npm i
COPY . .

EXPOSE 8080

CMD npm start