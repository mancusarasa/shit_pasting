FROM python:3.9

# install global dependencies (these are related to bcrypt)
RUN apt-get update && apt-get install -y build-essential cargo

# setup the server
RUN mkdir -p /root/paste_service
WORKDIR /root/paste_service
ADD app ./
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

# default entrypoint
ENTRYPOINT ["python3", "main.py"]
