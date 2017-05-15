FROM paasmule/golang-redis

RUN apk update && apk add git

ENV SRC_DIR=/go/src/github.com/endigo/go-weather-api

ADD . $SRC_DIR

RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/go-redis/redis
RUN go install github.com/endigo/go-weather-api

# run a redis-server in background and run our api
ENTRYPOINT redis-server --daemonize yes && /go/bin/go-weather-api

EXPOSE 8080