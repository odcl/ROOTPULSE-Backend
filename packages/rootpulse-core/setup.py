from setuptools import setup, find_packages

setup(
    name="rootpulse-core",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "django>=4.2",
        "djangorestframework>=3.14",
        "pika>=1.3.1",  # RabbitMQ
        "django-environ>=0.11.2",
    ],
    description="Shared core library for RootPulse Microservices",
)
