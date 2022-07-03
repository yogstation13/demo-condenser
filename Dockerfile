FROM alpine:3.16.0

RUN apk add --no-cache xz

COPY ./condense.sh .

RUN chmod +x ./condense.sh

ENTRYPOINT ["./condense.sh"]
