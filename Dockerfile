FROM golang

ENV SRC_DIR=/go/src/github.com/endigo/go-weather-api

ADD . $SRC_DIR

RUN go get -u github.com/gorilla/mux
RUN go install github.com/endigo/go-weather-api

ENTRYPOINT /go/bin/go-weather-api

# CMD ["./main"]

EXPOSE 8080