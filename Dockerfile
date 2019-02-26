FROM node:latest

WORKDIR /fileup

COPY ./packages/server/package.json .


RUN npm install --silent --production

COPY ./dist .

ENV NODE_ENV "production"

EXPOSE 4000

CMD ["node", "index.js"]