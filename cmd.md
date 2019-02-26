### CMD

- heroku
  heroku logs --app=fast-coast-19533 --tail

- docker
  docker build -t fileup .
  docker run -d -p 4000:4000 fileup
  docker container ps
  docker container ls -a
  docker container rm `<id>`
  docker container prune
  docker image ls
  docker image prune
  docker imgaes prune -a
  docker tag `<id>` vyshakg/`<imageName>`:`<tagname>`
  docker push vyshakg/`<imageName>`:`<tagname>`
