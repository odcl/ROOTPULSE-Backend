from django.db import models
from django.conf import settings
from rootpulse_core.models.base import BaseRootPulseModel

class UserProfile(BaseRootPulseModel):
    """
    Detailed User Profile for RootPulse.
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255, null=True, blank=True)
    mother_name = models.CharField(max_length=255, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
        ('unknown', 'Unknown')
    ], default='unknown')
    blood_group = models.CharField(max_length=5, null=True, blank=True)
    religion = models.CharField(max_length=50, null=True, blank=True)
    marital_status = models.CharField(max_length=20, null=True, blank=True)
    occupation = models.CharField(max_length=100, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    profile_photo_url = models.URLField(max_length=500, null=True, blank=True)

    class Meta:
        db_table = 'user_profiles'
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return self.full_name or self.user.username

class UserAddress(BaseRootPulseModel):
    """
    User Addresses (Present, Permanent, etc.)
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='addresses')
    address_type = models.CharField(max_length=20, choices=[
        ('present', 'Present'),
        ('permanent', 'Permanent'),
        ('office', 'Office'),
        ('billing', 'Billing'),
        ('other', 'Other')
    ])
    address_line = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, null=True, blank=True)
    country_id = models.CharField(max_length=5) # ISO Code
    post_code = models.CharField(max_length=20, null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    is_primary = models.BooleanField(default=False)

    class Meta:
        db_table = 'user_addresses'

class UserDevice(BaseRootPulseModel):
    """
    Track User Devices for Push Notifications.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='devices')
    device_uuid = models.CharField(max_length=255, unique=True)
    device_name = models.CharField(max_length=255, null=True, blank=True)
    fcm_token = models.TextField(null=True, blank=True)
    last_login_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'user_devices'
