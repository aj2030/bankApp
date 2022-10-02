FROM node
USER node
WORKDIR /home/node/app
COPY package.json /home/node/app
RUN npm install
COPY . /home/node/app
CMD CD /home/node/app
CMD node Main.js
EXPOSE 8080
