from setuptools import setup, find_packages

setup(
    name="rootpulse-core",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi>=0.109.0",
        "uvicorn[standard]>=0.27.0",
        "pydantic>=2.5.3",
        "pydantic-settings>=2.1.0",
        "sqlalchemy>=2.0.25",
        "asyncpg>=0.29.0",
        "pika>=1.3.1",  # RabbitMQ
        "redis>=5.0.1",
        "meilisearch>=0.28.1",
        "boto3>=1.34.34",
        "python-jose[cryptography]>=3.3.0",
        "passlib[bcrypt]>=1.7.4",
        "python-dotenv>=1.0.0",
    ],
    description="Shared core library for RootPulse Microservices (FastAPI Version)",
    include_package_data=True,
    package_data={
        "rootpulse_core": ["templates/*.html"],
    },
)
