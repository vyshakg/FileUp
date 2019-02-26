FROM node:latest

WORKDIR /fileup

COPY ./packages/server/package.json .


RUN npm install --silent --production


COPY  ./packages/server/build .
COPY  ./packages/server/.env .
COPY ./packages/view/build ./view
COPY ./packages/view/.env.production .
COPY ./ormconfig.json .

ENV NODE_ENV "production"

EXPOSE 4000

CMD ["node", "index.js"]