FROM NODE:20.13.1

WORKDIR /src

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "serve" ]