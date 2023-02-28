   FROM node:17-alpine as development

   WORKDIR /api

   COPY package.json .

   RUN npm install

   COPY . .

   EXPOSE 4000

   RUN npm run build

   CMD ["npm","run","build"]

   FROM node:17-alpine as production

   ARG NODE_ENV=production
   ENV NODE_ENV=${NODE_ENV}

   WORKDIR /api

   COPY package*.json .

   RUN npm install --only=production

   COPY --from=development /api/build ./build

   CMD [ "npm","run","start" ]
