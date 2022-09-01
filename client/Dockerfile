FROM node:17

WORKDIR /client

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run","dev" ]
