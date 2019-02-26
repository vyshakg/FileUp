#! /bin/bash/env


heroku container:push --app=fast-coast-19533 web

heroku container:release --app=fast-coast-19533 web

