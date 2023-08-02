# Shitpasting

In this repo I'm trying to recreate the functionality provided by Pastebin, in order to apply some microservices knowledge into the design.

# How to use this repo

First, build and start the containers:

```shell
docker-compose build && docker-compose down && docker-compose up
```

Then in a separate terminal, run:

```shell
curl -H "Content-type: application/json" -X POST localhost:8000/register -d '{"username": "user", "password": "password1"}
curl -H "Content-type: application/json" -X POST localhost:8000/login -d '{"username": "user", "password": "password1"}
```

You should get an output that looks something like this:

```shell
{"auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTgwYjM2NGYtMmU2NC00ZTQ1LWEwN2EtNTBkZjJmZGU5M2NlIiwiZXhwIjoxNjkwOTgzNDIxfQ.HUYQd24CYplB_Is2BPL4AahB-merGFd-zjQT2_IZbho"}
```
