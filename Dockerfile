FROM node
USER app-root
WORKDIR /home/app-root/app
COPY package.json /home/app-root/app
RUN npm install
COPY . /home/app-root/app
CMD CD /home/app-root/app
CMD node Main.js
EXPOSE 8080
