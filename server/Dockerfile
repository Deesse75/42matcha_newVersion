FROM node:lts-alpine

WORKDIR /server

COPY package.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "sleep 20", "sh", "start.sh" ]

