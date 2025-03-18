FROM node:20.13.1

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]