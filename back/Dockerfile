FROM python:3.6.8

WORKDIR /app

COPY . /app

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5000

ENV NAME Backend

CMD ["ENV='PROD'", "python", "server.py"]
