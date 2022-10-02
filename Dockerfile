FROM node

WORKDIR $HOME/app
COPY package.json $HOME/app

RUN npm install
COPY . $HOME/app
CMD CD $HOME/app

CMD node Main.js
EXPOSE 8080
