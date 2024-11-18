FROM python:3.9

# setup the server
RUN mkdir -p /root/paste_service
WORKDIR /root/paste_service
ADD app/requirements.txt ./
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

# default entrypoint
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000", "--reload"]
