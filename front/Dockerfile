FROM node:12

WORKDIR /app

COPY ./src /app

COPY ./package.json /app

copy ./package-lock.json /app

RUN npm install

EXPOSE 3000

ENV NAME Frontend
ENV ENV PROD
ENV FRONT_SERVICE gp.front
ENV BACK_SERVICE gp.back
ENV DB_SERVICE gp.data
ENV FRONT_PORT 3000
ENV BACK_PORT 5000
ENV DB_PORT 27017

CMD ["npm", "run", "admin"]
