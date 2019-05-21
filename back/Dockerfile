FROM python:3.6.8

WORKDIR /app

COPY . /app

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5000

ENV NAME Backend
ENV ENV PROD
ENV FRONT_SERVICE gp.front
ENV BACK_SERVICE gp.back
ENV DB_SERVICE gp.data
ENV FRONT_PORT 3000
ENV BACK_PORT 5000
ENV DB_PORT 27017

CMD ["python", "server.py"]
