FROM ubuntu:20.04

SHELL ["/bin/bash", "--login", "-i", "-c"]

# install global dependencies
RUN apt-get update && apt-get install -y curl

# install nvm + node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
RUN nvm install node

# setup the server
RUN mkdir -p /root/web_ui
WORKDIR /root/web_ui
ADD web_ui ./

# default entrypoint
ENTRYPOINT source ~/.bashrc && REACT_APP_AUTH_SERVICE_PORT=$AUTH_SERVICE_PORT REACT_APP_AUTH_SERVICE_HOST=$AUTH_SERVICE_HOST REACT_APP_PASTE_SERVICE_HOST=$PASTE_SERVICE_HOST REACT_APP_PASTE_SERVICE_PORT=$PASTE_SERVICE_PORT npm start
