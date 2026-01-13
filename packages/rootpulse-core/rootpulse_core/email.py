import os
from pathlib import Path
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
from typing import List, Optional, Dict, Any

# Resolve templates directory relative to this file
TEMPLATES_DIR = Path(__file__).parent / "templates"

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("EMAIL_HOST_USER", "info@expotechglobal.com"),
    MAIL_PASSWORD=os.getenv("EMAIL_HOST_PASSWORD", ""),
    MAIL_FROM=os.getenv("EMAIL_HOST_USER", "info@expotechglobal.com"),
    MAIL_PORT=int(os.getenv("EMAIL_PORT", 465)),
    MAIL_SERVER=os.getenv("EMAIL_HOST", "sg2plzcpnl476824.prod.sin2.secureserver.net"),
    MAIL_FROM_NAME=os.getenv("EMAIL_FROM_NAME", "RootPulse"),
    MAIL_STARTTLS=os.getenv("EMAIL_USE_TLS", "False").lower() == "true",
    MAIL_SSL_TLS=os.getenv("EMAIL_USE_SSL", "True").lower() == "true",
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=TEMPLATES_DIR
)

async def send_email(
    subject: str,
    recipients: List[EmailStr],
    template_name: str,
    template_body: Dict[str, Any]
):
    """
    Generic function to send templated emails.
    """
    message = MessageSchema(
        subject=subject,
        recipients=recipients,
        template_body=template_body,
        subtype=MessageType.html,
    )

    fm = FastMail(conf)
    await fm.send_message(message, template_name=template_name)

async def send_verification_email(
    email: str, 
    otp: str, 
    guest_password: Optional[str] = None
):
    """
    Helper for registration/verification emails.
    """
    subject = "Verify your RootPulse Account"
    if guest_password:
        subject = "Welcome to RootPulse - Your Account Details"
        title = "Welcome Aboard!"
        body = "Thank you for registering. Below are your account details and verification code."
    else:
        title = "Email Verification"
        body = "Please use the code below to complete your registration."

    await send_email(
        subject=subject,
        recipients=[email],
        template_name="email_base.html",
        template_body={
            "title": title,
            "body": body,
            "otp": otp,
            "guest_password": guest_password
        }
    )
