FROM node:12

WORKDIR /app

COPY ./src /app

COPY ./package.json /app

copy ./package-lock.json /app

RUN npm install

EXPOSE 3000

ENV NAME Frontend

CMD ["npm", "run", "admin"]
