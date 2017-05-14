FROM golang

RUN apt-get update && apt-get install -y redis-server

ENV SRC_DIR=/go/src/github.com/endigo/go-weather-api

ADD . $SRC_DIR

RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/go-redis/redis
RUN go install github.com/endigo/go-weather-api

# CMD service redis-server start
# ENTRYPOINT /go/bin/go-weather-api

ENTRYPOINT ["service redis-server start", "/go/bin/go-weather-api"]

EXPOSE 8080