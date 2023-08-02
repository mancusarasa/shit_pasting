FROM python:3.9

RUN apt-get update

# setup the server
RUN mkdir -p /root/web_ui
WORKDIR /root/web_ui
ADD web_ui ./
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

# default entrypoint
ENTRYPOINT ["python3", "manage.py", "runserver", "0.0.0.0:8080"]
