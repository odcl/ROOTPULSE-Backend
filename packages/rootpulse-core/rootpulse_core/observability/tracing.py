from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from django.conf import settings

def setup_tracing(service_name):
    """
    Standardizes OpenTelemetry tracing across all services.
    """
    endpoint = getattr(settings, 'OTEL_EXPORTER_OTLP_ENDPOINT', "http://localhost:4317")
    
    resource = Resource(attributes={
        SERVICE_NAME: service_name
    })

    provider = TracerProvider(resource=resource)
    processor = BatchSpanProcessor(OTLPSpanExporter(endpoint=endpoint))
    provider.add_span_processor(processor)
    trace.set_tracer_provider(provider)

def get_tracer(name):
    return trace.get_tracer(name)
