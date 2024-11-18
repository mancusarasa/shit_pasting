FROM python:3.9

# install global dependencies (these are related to bcrypt)
RUN apt-get update && apt-get install -y build-essential cargo

# setup the server
RUN mkdir -p /root/auth_service
WORKDIR /root/auth_service
ADD app/requirements.txt ./
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

# default entrypoint
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
