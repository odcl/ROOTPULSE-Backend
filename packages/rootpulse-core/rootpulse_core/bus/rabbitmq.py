import pika
import json
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

class RabbitMQBus:
    """
    Standardizes RabbitMQ communication for all RootPulse services.
    Supports Publishing and Consuming with a unified event structure.
    """
    
    def __init__(self, host=None, port=None, user=None, password=None):
        self.host = host or getattr(settings, 'RABBITMQ_HOST', 'localhost')
        self.port = port or getattr(settings, 'RABBITMQ_PORT', 5672)
        self.user = user or getattr(settings, 'RABBITMQ_USER', 'guest')
        self.password = password or getattr(settings, 'RABBITMQ_PASS', 'guest')
        self._connection = None
        self._channel = None

    def connect(self):
        if not self._connection or self._connection.is_closed:
            credentials = pika.PlainCredentials(self.user, self.password)
            parameters = pika.ConnectionParameters(
                host=self.host,
                port=self.port,
                credentials=credentials,
                heartbeat=600,
                blocked_connection_timeout=300
            )
            self._connection = pika.BlockingConnection(parameters)
            self._channel = self._connection.channel()
        return self._channel

    def publish_event(self, exchange, routing_key, event_type, data):
        """
        Publishes a JSON event to the specified exchange.
        """
        try:
            channel = self.connect()
            channel.exchange_declare(exchange=exchange, exchange_type='topic', durable=True)
            
            payload = {
                "event_type": event_type,
                "data": data,
                "schema_version": "1.0"
            }
            
            channel.basic_publish(
                exchange=exchange,
                routing_key=routing_key,
                body=json.dumps(payload),
                properties=pika.BasicProperties(
                    delivery_mode=2,  # make message persistent
                    content_type='application/json'
                )
            )
            logger.info(f"Published event {event_type} to {exchange}/{routing_key}")
        except Exception as e:
            logger.error(f"Failed to publish event: {str(e)}")
            raise

    def close(self):
        if self._connection and self._connection.is_open:
            self._connection.close()

# Singleton instance for easy import
bus = RabbitMQBus()
