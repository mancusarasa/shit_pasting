import pika
from pika.exchange_type import ExchangeType

from settings import get_settings


class Connection:
    def __init__(self):
        settings = get_settings()
        credentials = pika.PlainCredentials(
            settings.rabbit_mq_user,
            settings.rabbit_mq_pass
        )
        parameters = pika.ConnectionParameters(
            settings.rabbit_mq_host,
            settings.rabbit_mq_port,
            virtual_host='/',
            credentials=credentials
        )
        self.connection = pika.BlockingConnection(parameters)
        self.channel = self.connection.channel()
        self.channel.exchange_declare(
            exchange='emails',
            exchange_type=ExchangeType.direct
        )
        self.channel.queue_declare(queue='posts_queue')
        self.channel.queue_bind(
            exchange='emails',
            queue='posts_queue',
            routing_key='posts_routing_key'
        )

    def send_message(self, message: str):
        self.channel.basic_publish(
            exchange='emails',
            routing_key='posts_routing_key',
            body=message
        )
