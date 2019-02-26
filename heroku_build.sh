#! /bin/bash

yarn run build:app

cp -r ./packages/server/build ./build
cp  ./packages/server/.env ./build
cp -r ./packages/view/build ./build/view/
cp ./ormconfig.json ./build/