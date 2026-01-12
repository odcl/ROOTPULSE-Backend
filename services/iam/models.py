from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text, Date, Integer, Float, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from rootpulse_core.models.base import BaseRootPulseModel
import datetime
import enum

# --- Enums for Schema Integrity ---

class Gender(str, enum.Enum):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"
    PREFER_NOT_TO_SAY = "PreferNotToSay"
    UNKNOWN = "Unknown"

class MaritalStatus(str, enum.Enum):
    SINGLE = "Single"
    MARRIED = "Married"
    DIVORCED = "Divorced"
    WIDOWED = "Widowed"
    SEPARATED = "Separated"

class AddressType(str, enum.Enum):
    PRESENT = "present"
    PERMANENT = "permanent"
    OFFICE = "office"
    OTHER = "other"
    BILLING = "billing"

class ContactType(str, enum.Enum):
    PHONE = "phone"
    WHATSAPP = "whatsapp"
    EMERGENCY = "emergency"
    SECONDARY = "secondary"
    WORK = "work"

class VerificationType(str, enum.Enum):
    EMAIL = "email"
    PHONE = "phone"
    MFA = "mfa"
    ID_LIVENESS = "id_liveness"
    KYC_UPLOAD = "kyc_upload"

class VerificationStatus(str, enum.Enum):
    PENDING = "Pending"
    SENT = "Sent"
    FAILED = "Failed"
    VERIFIED = "Verified"
    EXPIRED = "Expired"

class SocialProvider(str, enum.Enum):
    GOOGLE = "google"
    FACEBOOK = "facebook"
    APPLE = "apple"
    GITHUB = "github"

# --- Models ---

class User(BaseRootPulseModel):
    __tablename__ = 'users'
    
    username = Column(String(150), unique=True, nullable=False)
    email = Column(String(254), unique=True, nullable=False)
    phone = Column(String(20), unique=True, nullable=True)
    password_hash = Column(String(128), nullable=False)
    
    # Status & Flags
    is_staff = Column(Boolean, default=False)
    is_superuser = Column(Boolean, default=False)
    is_banned = Column(Boolean, default=False)
    banned_at = Column(DateTime, nullable=True)
    banned_reason = Column(Text, nullable=True)
    
    # Verification Timestamps
    email_verified_at = Column(DateTime, nullable=True)
    phone_verified_at = Column(DateTime, nullable=True)
    
    # Activity tracking
    last_login_at = Column(DateTime, nullable=True)
    last_login_ip = Column(String(45), nullable=True)
    
    # Preferences & Extensibility
    preferred_language = Column(String(10), default='en')
    timezone = Column(String(50), default='UTC')
    meta = Column(JSONB, default={}, nullable=False) # Flexible extra data
    
    # Referral System
    referral_code = Column(String(50), unique=True, nullable=True)
    referred_by_id = Column(ForeignKey('users.id'), nullable=True)
    
    # Relationships
    referred_by = relationship("User", remote_side="User.id", back_populates="referrals")
    referrals = relationship("User", back_populates="referred_by")
    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    addresses = relationship("UserAddress", back_populates="user", cascade="all, delete-orphan")
    contacts = relationship("UserContact", back_populates="user", cascade="all, delete-orphan")
    devices = relationship("UserDevice", back_populates="user", cascade="all, delete-orphan")
    verifications = relationship("UserVerification", back_populates="user", cascade="all, delete-orphan")
    social_links = relationship("UserSocialLink", back_populates="user", cascade="all, delete-orphan")
    activity_logs = relationship("UserActivityLog", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.username or self.email}>"

class UserProfile(BaseRootPulseModel):
    __tablename__ = 'user_profiles'
    
    user_id = Column(ForeignKey('users.id'), nullable=False, unique=True)
    full_name = Column(String(255), nullable=False)
    father_name = Column(String(255), nullable=True)
    mother_name = Column(String(255), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(SQLEnum(Gender), default=Gender.UNKNOWN)
    blood_group = Column(String(10), nullable=True)
    religion = Column(String(50), nullable=True)
    marital_status = Column(SQLEnum(MaritalStatus), default=MaritalStatus.SINGLE)
    occupation = Column(String(100), nullable=True)
    notes = Column(Text, nullable=True)
    profile_photo_url = Column(String(500), nullable=True)
    meta = Column(JSONB, default={}, nullable=False)
    
    user = relationship("User", back_populates="profile")

class UserAddress(BaseRootPulseModel):
    __tablename__ = 'user_addresses'
    
    user_id = Column(ForeignKey('users.id'), nullable=False)
    address_type = Column(SQLEnum(AddressType), default=AddressType.PRESENT)
    address_line = Column(String(500), nullable=False)
    road_house = Column(String(255), nullable=True)
    village = Column(String(255), nullable=True)
    union_name = Column(String(255), nullable=True)
    thana = Column(String(255), nullable=True)
    district = Column(String(255), nullable=True)
    division = Column(String(255), nullable=True)
    post_code = Column(String(20), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    country_id = Column(String(5), nullable=False, default="BD")
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    is_primary = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="addresses")

class UserContact(BaseRootPulseModel):
    __tablename__ = 'user_contacts'
    
    user_id = Column(ForeignKey('users.id'), nullable=False)
    contact_type = Column(SQLEnum(ContactType), default=ContactType.PHONE)
    contact_name = Column(String(255), nullable=True)
    contact_relation = Column(String(100), nullable=True)
    contact_value = Column(String(255), nullable=False)
    is_primary = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="contacts")

class UserDevice(BaseRootPulseModel):
    __tablename__ = 'user_devices'
    
    user_id = Column(ForeignKey('users.id'), nullable=False)
    device_uuid = Column(String(255), nullable=False)
    device_name = Column(String(255), nullable=True)
    fcm_token = Column(Text, nullable=True)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    last_login_at = Column(DateTime, default=datetime.datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    user = relationship("User", back_populates="devices")

class UserVerification(BaseRootPulseModel):
    __tablename__ = 'user_verifications'
    
    user_id = Column(ForeignKey('users.id'), nullable=False)
    verification_type = Column(SQLEnum(VerificationType), nullable=False)
    status = Column(SQLEnum(VerificationStatus), default=VerificationStatus.PENDING)
    otp_code = Column(String(20), nullable=True)
    otp_sent_at = Column(DateTime, nullable=True)
    otp_expires_at = Column(DateTime, nullable=True)
    attempts = Column(Integer, default=0)
    verified_time = Column(DateTime, nullable=True)
    metadata_json = Column(JSONB, default={}, nullable=False) # For KYC doc links, etc.
    
    user = relationship("User", back_populates="verifications")

class UserSocialLink(BaseRootPulseModel):
    __tablename__ = 'user_social_links'
    
    user_id = Column(ForeignKey('users.id'), nullable=False)
    provider = Column(SQLEnum(SocialProvider), nullable=False)
    provider_user_id = Column(String(255), nullable=False)
    provider_data = Column(JSONB, default={}, nullable=False)
    
    user = relationship("User", back_populates="social_links")

class UserActivityLog(BaseRootPulseModel):
    __tablename__ = 'user_activity_logs'
    
    user_id = Column(ForeignKey('users.id'), nullable=False)
    action = Column(String(100), nullable=False) # e.g. "password_change", "status_update"
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    payload = Column(JSONB, default={}, nullable=False) # Before/After values
    
    user = relationship("User", back_populates="activity_logs")
