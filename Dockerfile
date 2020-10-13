FROM alpine:3.12.0

COPY ./condense.sh .

RUN chmod +x ./condense.sh

ENTRYPOINT ["./condense.sh"]