FROM node

WORKDIR /app
COPY package.json /app

RUN npm install
COPY . /app
CMD CD /app

CMD node Main.js
EXPOSE 8080
