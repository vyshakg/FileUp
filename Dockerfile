FROM node:latest

WORKDIR /fileup

COPY ./packages/server/package.json .


RUN npm install --silent --production
RUN npm audit fix

COPY  ./packages/server/build .
COPY  ./packages/server/.env .

COPY ./ormconfig.json .

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "index.js"]