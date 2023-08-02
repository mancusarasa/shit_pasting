from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

import requests


class ExternalBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        host = settings.AUTH_SERVICE_HOST
        port = settings.AUTH_SERVICE_PORT
        url = f'http://{host}:{port}/login'
        r = requests.post(
            url,
            headers={'Content-type': 'application/json'},
            data={'username': username, 'password': password}
        )
        if r.status_code == 200:
            pass

    def get_user(self, user_id):
        # FIXME: what the hell should I implement here?
        return User(username=f"{user_id}")

# i was following https://realpython.com/django-view-authorization/#detecting-logged-in-users-and-their-roles-in-a-view
