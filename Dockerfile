FROM golang:latest

COPY . /go/src/app
RUN go get -d -v
RUN go install -v

CMD ["app"]