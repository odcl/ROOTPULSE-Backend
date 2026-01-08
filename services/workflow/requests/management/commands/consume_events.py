import pika
import json
import logging
from django.core.management.base import BaseCommand
from django.conf import settings
from requests.models import ServiceRequest
from engine.models import WorkflowStep

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Consumes events from RabbitMQ (Saga Pattern)'

    def handle(self, *args, **options):
        host = getattr(settings, 'RABBITMQ_HOST', 'localhost')
        port = getattr(settings, 'RABBITMQ_PORT', 5672)
        user = getattr(settings, 'RABBITMQ_USER', 'guest')
        password = getattr(settings, 'RABBITMQ_PASS', 'guest')

        credentials = pika.PlainCredentials(user, password)
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=host, port=port, credentials=credentials))
        channel = connection.channel()

        # Declare the exchange and queue
        channel.exchange_declare(exchange='finance_events', exchange_type='topic', durable=True)
        result = channel.queue_declare(queue='workflow_finance_queue', durable=True)
        queue_name = result.method.queue

        # Bind to relevant events
        channel.queue_bind(exchange='finance_events', queue=queue_name, routing_key='payment.completed')

        logger.info(f"Workflow Consumer started. Waiting for events on {queue_name}...")

        def callback(ch, method, properties, body):
            try:
                event = json.loads(body)
                event_type = event.get('event_type')
                data = event.get('data')

                if event_type == 'payment.completed':
                    self.process_payment_completed(data)

                ch.basic_ack(delivery_tag=method.delivery_tag)
            except Exception as e:
                logger.error(f"Error processing event: {str(e)}")
                # In production, we'd use a dead-letter-exchange (DLX)
                ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

        channel.basic_consume(queue=queue_name, on_message_callback=callback)
        channel.start_consuming()

    def process_payment_completed(self, data):
        request_uuid = data.get('service_request_uuid')
        if not request_uuid:
            return

        try:
            service_request = ServiceRequest.objects.get(id=request_uuid)
            
            # Logic to find the next step (Step 4 -> Step 5)
            # For simplicity, we assume Step 5 is the next step in the loop
            # In a real system, we'd check current_step.order + 1
            current_order = service_request.current_step.order
            try:
                next_step = WorkflowStep.objects.get(order=current_order + 1)
                service_request.current_step = next_step
                service_request.save()
                logger.info(f"Service Request {request_uuid} moved to {next_step.name}")
            except WorkflowStep.DoesNotExist:
                logger.warning(f"No next step found for {request_uuid} after order {current_order}")

        except ServiceRequest.DoesNotExist:
            logger.error(f"Service Request {request_uuid} not found in database")
