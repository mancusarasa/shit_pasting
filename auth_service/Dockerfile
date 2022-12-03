FROM python:3.9

# setup the server
RUN mkdir -p /root/auth_service
WORKDIR /root/auth_service
ADD app ./
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

# default entrypoint
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
