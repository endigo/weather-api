FROM iron/go:dev

WORKDIR /app

ENV SRC_DIR=/go/src/github.com/endigo/go-weather-api

ADD . $SRC_DIR

RUN cd $SRC_DIR; go build -o main; cp main /app/

CMD ["./main"]