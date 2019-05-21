FROM mongo:4

WORKDIR /app

RUN mkdir ./data && chmod 777 data

ENV NAME Database

ENV ENV PROD

CMD ["mongod", "--dbpath=./data"]
