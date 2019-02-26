#! /bin/bash

yarn run build:app

cp -r ./packages/server/build ./dist
cp  ./packages/server/.env ./dist
cp -r ./packages/view/build ./dsit/view/
cp ./ormconfig.json ./dist/