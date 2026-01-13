import os
import logging
import boto3
from botocore.client import Config
from typing import Optional, BinaryIO

logger = logging.getLogger(__name__)

class StorageService:
    """
    Standardized S3-compatible storage integration for RootPulse using MinIO.
    Supports global data replication and secure multi-site access.
    """

    def __init__(self, endpoint=None, access_key=None, secret_key=None, bucket=None):
        self.endpoint = endpoint or os.getenv("S3_ENDPOINT", "http://localhost:9000")
        self.access_key = access_key or os.getenv("S3_ACCESS_KEY", "minioadmin")
        self.secret_key = secret_key or os.getenv("S3_SECRET_KEY", "minioadmin")
        self.bucket = bucket or os.getenv("S3_BUCKET", "rootpulse")
        self._s3 = None

    @property
    def s3(self):
        if self._s3 is None:
            self._s3 = boto3.resource(
                's3',
                endpoint_url=self.endpoint,
                aws_access_key_id=self.access_key,
                aws_secret_access_key=self.secret_key,
                config=Config(signature_version='s3v4'),
                region_name='us-east-1' # Default for MinIO
            )
            logger.info(f"Connected to MinIO at {self.endpoint}")
        return self._s3

    def upload_file(self, file_obj: BinaryIO, object_name: str, extra_args: Optional[dict] = None):
        """
        Upload a file object to the MinIO bucket.
        """
        try:
            self.s3.Bucket(self.bucket).put_object(Key=object_name, Body=file_obj, ExtraArgs=extra_args or {})
            return True
        except Exception as e:
            logger.error(f"MinIO upload error: {str(e)}")
            return False

    def get_download_url(self, object_name: str, expires_in: int = 3600):
        """
        Generate a presigned URL for secure temporary access.
        """
        try:
            return self.s3.meta.client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket, 'Key': object_name},
                ExpiresIn=expires_in
            )
        except Exception as e:
            logger.error(f"MinIO presigned URL error: {str(e)}")
            return None

# Singleton instance
storage_service = StorageService()
