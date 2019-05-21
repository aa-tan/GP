FROM mongo:4

WORKDIR /app

RUN mkdir ./data && chmod 777 data

ENV NAME Database

CMD ["mongod", "--dbpath=./data"]
