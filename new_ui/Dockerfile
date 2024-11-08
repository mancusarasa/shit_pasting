FROM ubuntu:20.04

SHELL ["/bin/bash", "--login", "-i", "-c"]

ARG AUTH_SERVICE_HOST
ARG AUTH_SERVICE_PORT
ARG PASTE_SERVICE_HOST
ARG PASTE_SERVICE_PORT

# install global dependencies
RUN apt-get update && apt-get install -y curl

# install nvm + node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
RUN nvm install 18.17.0
RUN nvm use 18.17.0

# install nextui-cli
RUN npm install -g nextui-cli

# setup the server
RUN mkdir -p /root/web_ui
WORKDIR /root/web_ui
ADD web_ui ./

# install npm shit
RUN npm install

RUN printf "NEXT_PUBLIC_AUTH_SERVICE_HOST=${AUTH_SERVICE_HOST}\n\
NEXT_PUBLIC_AUTH_SERVICE_PORT=${AUTH_SERVICE_PORT}\n\
NEXT_PUBLIC_PASTE_SERVICE_HOST=${PASTE_SERVICE_HOST}\n\
NEXT_PUBLIC_PASTE_SERVICE_PORT=${PASTE_SERVICE_PORT}\n" >> .env

# create a production build
RUN npm run build

# default entrypoint
ENTRYPOINT source ~/.bashrc && npm start
